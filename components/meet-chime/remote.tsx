import {
  Attendees,
  LocalVideo,
  RemoteVideo,
  useAttendeeStatus,
  useRemoteVideoTileState,
} from 'amazon-chime-sdk-component-library-react';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
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
  const [user, setUser] = useState({ first_name: 'Loading', photo: null });

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = Cookies.get('accessToken');
      const userId = Number(currentId).toString();
      const BE_URL = NEXT_PUBLIC_BE_URL;
      const userData = await axios
        .get(`${BE_URL}/api/users/${userId}/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
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

    if (currentId) fetchData();
  }, [currentId]);

  const { videoEnabled } = useAttendeeStatus(chimeAttendeeID);
  const { attendeeIdToTileId } = useRemoteVideoTileState();

  console.log(`video enabled for ${chimeAttendeeID} ?`, videoEnabled);

  return (
    <div className='relative bg-[#1b1c20] h-full w-full flex justify-center items-center rounded-3xl overflow-hidden cursor-pointer'>
      {videoEnabled ? (
        <>
          {chimeAttendeeID == localAttendeeId ? (
            <LocalVideo className='relative' />
          ) : (
            <RemoteVideo
              tileId={attendeeIdToTileId[chimeAttendeeID]}
              className='relative'
            />
          )}
        </>
      ) : (
        <div className='flex justify-center items-center w-[10rem] h-[10rem] bg-gray-600 rounded-full text-5xl text-white font-semibold relative overflow-hidden'>
          {user?.photo ? (
            <img
              src={user.photo}
              className='relative block ml-auto mr-auto w-[100%] h-[100%] object-cover'
            />
          ) : (
            <>{user?.first_name?.charAt(0)?.toUpperCase()}</>
          )}
        </div>
      )}
      <div className='bg-[rgba(46,47,52,0.85)] py-2 px-3 overflow-hidden absolute bottom-5 left-5 rounded'>
        <p className='text-[14px] text-white'>
          {user?.first_name?.charAt(0)?.toUpperCase() +
            user?.first_name?.slice(1)}
        </p>
      </div>
    </div>
  );
};

export default RemoteVid;
