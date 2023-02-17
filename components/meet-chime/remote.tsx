import {
  Attendees,
  LocalVideo,
  RemoteVideo,
  useAttendeeStatus,
  useRemoteVideoTileState,
  useMeetingStatus,
  useLocalVideo,
} from "amazon-chime-sdk-component-library-react";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import _ from "lodash";
const { NEXT_PUBLIC_BE_URL } = process.env;

const RemoteVid = ({
  chimeAttendeeID,
  currentId,
  localAttendeeId,
  localUserId,
  userObj,
}: // currentUserInfo,
{
  chimeAttendeeID: any;
  currentId: any;
  localAttendeeId: any;
  localUserId?: any;
  userObj?: any;

  // currentUserInfo: any;
}) => {
  // const [firstName, setFirstName] = useState<string>('Loading');
  const [user, setUser] = useState({ first_name: "Loading", photo: null });
  const status = useMeetingStatus();
  const { isVideoEnabled } = useLocalVideo();

  console.log("this is meeting status", status);

  useEffect(() => {
    const fetchData = async () => {
      const tokenDetails = Cookies.get("token_details");
      const data = JSON.parse(tokenDetails || "");
      console.log("this is access token", data.access_token);
      const userId = Number(currentId).toString();
      const BE_URL = NEXT_PUBLIC_BE_URL;
      const userData = await axios
        .get(`${BE_URL}/api/users/${userId}/`, {
          headers: {
            Authorization: `Bearer ${data?.access_token}`,
          },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.log(error);
          return null;
        });
    };

    if (currentId) fetchData();
  }, [currentId]);

  const { videoEnabled } = useAttendeeStatus(chimeAttendeeID);

  const { attendeeIdToTileId, tiles } = useRemoteVideoTileState();

  console.log("this is tiles", tiles);

  if (videoEnabled) {
    const id = attendeeIdToTileId[chimeAttendeeID];
    // if (!id) videoEnabled = false;
    console.log("video enabled by", user.first_name);
  }

  return (
    <div className="tw-relative tw-bg-[#1b1c20] tw-h-full tw-w-full tw-flex tw-justify-center tw-items-center tw-rounded-3xl tw-overflow-hidden tw-cursor-pointer">
      {videoEnabled ? (
        <>
          {chimeAttendeeID == localAttendeeId ? (
            <LocalVideo className="tw-relative" />
          ) : (
            <RemoteVideo tileId={attendeeIdToTileId[chimeAttendeeID]} className="tw-relative" />
          )}
        </>
      ) : (
        <div className="tw-flex tw-justify-center tw-items-center tw-w-[10rem] tw-h-[10rem] tw-bg-gray-600 tw-rounded-full tw-text-5xl tw-text-white tw-font-semibold tw-relative tw-overflow-hidden">
          {user.photo ? (
            <img
              src={user.photo}
              className="tw-relative tw-block tw-ml-auto tw-mr-auto tw-w-[100%] tw-h-[100%] tw-object-cover"
            />
          ) : (
            <>{user?.first_name?.charAt(0)?.toUpperCase()}</>
          )}
        </div>
      )}
      <div className="tw-bg-[rgba(46,47,52,0.85)] tw-py-2 tw-px-3 tw-overflow-hidden tw-absolute tw-bottom-5 tw-left-5 tw-rounded tw-text-[14px] tw-text-white">
        {user?.first_name?.charAt(0)?.toUpperCase() + user?.first_name?.slice(1)}
      </div>
    </div>
  );
};

export default RemoteVid;
