import React, { useState } from 'react';
import {
  useAttendeeStatus,
  ScreenShare,
  Microphone,
} from 'amazon-chime-sdk-component-library-react';
// components
import RemoteVid from 'components/stream/remote';

interface TilesProps {
  AttendeeId: string;
  userObj?: any;
  externalUser: string;
  localAttendeeId: string;
  length: number;
  style?: any;
}
const Tiles: React.FC<TilesProps> = ({
  AttendeeId,
  userObj,
  externalUser,
  localAttendeeId,
  style,
  length,
}) => {
  const { sharingContent, muted } = useAttendeeStatus(AttendeeId);

  let hw;
  if (length == 1) hw = 'h-full w-full';
  else if (length == 2) hw = 'h-full w-[43%]';
  else if (length == 3) hw = 'h-[25vw] w-[30vw]';
  else hw = 'h-[20vw] w-[25vw]';

  if (sharingContent) {
    console.log('this is from tiles sharing content attendee id', AttendeeId);
  }

  return (
    <div
      className={`relative justify-center items-center flex ${hw}`}
      style={{ ...style }}
    >
      <RemoteVid
        chimeAttendeeID={AttendeeId}
        currentId={externalUser}
        localAttendeeId={localAttendeeId}
      />

      <div className='absolute flex gap-2 top-5 right-5'>
        <ScreenShare
          width='1.8rem'
          className='bg-gray-200 p-1 rounded-full'
          style={{ display: sharingContent ? 'block' : 'none' }}
        />
        <Microphone
          width='1.8rem'
          muted={muted}
          className='bg-gray-200 p-1 rounded-full'
          style={{ display: muted ? 'block' : 'none' }}
        />
      </div>
    </div>
  );
};

export default Tiles;
