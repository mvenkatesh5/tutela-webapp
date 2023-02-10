// react
import React, { useEffect, useState } from "react";
// axios
import axios from "axios";
// Cookies
import Cookies from "js-cookie";
// env
const { NEXT_PUBLIC_BE_URL } = process.env;
// chime
import {
  useAttendeeStatus,
  ScreenShare,
  Microphone,
} from "amazon-chime-sdk-component-library-react";

interface ParticipantProps {
  attendee: any;
}

const Participant: React.FC<ParticipantProps> = ({ attendee }) => {
  const { sharingContent, muted } = useAttendeeStatus(attendee.AttendeeId);

  const [user, setUser] = useState({ first_name: "Loading", photo: null });
  useEffect(() => {
    const fetchData = async () => {
      const tokenDetails = Cookies.get("token_details");
      const data = JSON.parse(tokenDetails || "");
      console.log("this is access token", data.access_token);
      const userId = Number(attendee.ExternalUserId).toString();
      const BE_URL = NEXT_PUBLIC_BE_URL;
      const userData = await axios
        .get(`${BE_URL}/api/users/${userId}/`, {
          headers: {
            Authorization: `Bearer ${data?.access_token}`,
          },
        })
        .then((response) => {
          setUser(response.data);
          // response.data
        })
        .catch((error) => {
          console.log(error);
          return null;
        });
    };

    if (attendee.ExternalUserId) fetchData();
  }, [attendee]);

  return (
    <div className="tw-flex tw-gap-3 tw-w-full tw-relative tw-my-1 tw-overflow-hidden tw-p-2 tw-rounded-md hover:tw-bg-slate-200 tw-border-slate-200  tw-border-[1px] tw-border-solid ">
      <div className="tw-flex tw-justify-center tw-items-center tw-relative tw-overflow-hidden ">
        <div className="tw-flex tw-justify-center tw-items-center tw-rounded-full tw-text-lg tw-h-[2em] tw-w-[2em] tw-bg-gray-600 tw-text-white tw-font-bold ">
          {user?.photo ? (
            <img
              src={user.photo}
              className="tw-relative tw-block tw-ml-auto tw-mr-auto tw-w-[100%] tw-h-[100%] tw-object-cover tw-rounded-full"
            />
          ) : (
            <>{user?.first_name?.charAt(0)?.toUpperCase()}</>
          )}
        </div>
      </div>
      <div className=" tw-text-xl tw-pt-1">
        {user?.first_name?.charAt(0)?.toUpperCase() + user?.first_name?.slice(1)}
      </div>
      <div className="tw-absolute tw-flex tw-gap-2 tw-top-3 tw-right-5">
        <ScreenShare
          width="1.8rem"
          className="tw-bg-gray-200 tw-p-1 tw-rounded-full"
          style={{ display: sharingContent ? "block" : "none" }}
        />
        <Microphone
          width="1.8rem"
          muted={muted}
          className="tw-bg-gray-200 tw-p-1 tw-rounded-full"
          style={{ display: muted ? "block" : "none" }}
        />
      </div>
    </div>
  );
};

export default Participant;
