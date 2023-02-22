import React, { useEffect, useState } from "react";
// aws-sdk
import { LocalVideo, RemoteVideo } from "amazon-chime-sdk-component-library-react";
// axios
import axios from "axios";
// cookie
import Cookies from "js-cookie";
// env
const { NEXT_PUBLIC_BE_URL } = process.env;

const RemoteVid = ({ currentId, tileState }: { currentId: any; tileState?: any }) => {
  const [user, setUser] = useState({ first_name: "Loading", photo: null });

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

  return (
    <div className="tw-relative tw-bg-[#1b1c20] tw-h-full tw-w-full tw-flex tw-justify-center tw-items-center tw-rounded-3xl tw-overflow-hidden tw-cursor-pointer">
      {tileState && tileState?.boundVideoStream?.active ? (
        <>
          {tileState?.localTile ? (
            <LocalVideo className="tw-relative" />
          ) : (
            <RemoteVideo tileId={tileState.tileId} className="tw-relative" />
          )}
        </>
      ) : (
        <div className="tw-flex tw-justify-center tw-items-center tw-w-[4em] tw-h-[4em] tw-bg-gray-600 tw-rounded-full tw-text-5xl tw-text-white tw-font-semibold tw-relative tw-overflow-hidden">
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
