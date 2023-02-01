import {
  ContentShare,
  useAttendeeStatus,
} from 'amazon-chime-sdk-component-library-react';
import React from 'react';

const RemoteContent = ({
  chimeAttendeeID,
  userObj,
  name,
}: {
  chimeAttendeeID: any;
  userObj?: any;
  name: string;
}) => {
  const screenShareStream = (
    <div className='relative h-full w-full flex justify-center items-center bg-none'>
      <ContentShare />
      {/* <div className='bg-[rgba(46,47,52,0.85)] py-2 px-3 overflow-hidden absolute bottom-3 left-3 rounded'>
        <p className='text-[14px] text-white'>{name}</p>
      </div> */}
    </div>
  );

  return screenShareStream;
};

export default RemoteContent;
