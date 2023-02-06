import React, { useState } from "react";
import {
  useAttendeeStatus,
  ScreenShare,
  Microphone,
} from "amazon-chime-sdk-component-library-react";
// components
import RemoteVid from "@components/meet-chime/remote";

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
  if (length == 1) hw = "tw-h-full tw-w-full ";
  else if (length == 2) hw = "xs:tw-h-[45%] xs:tw-w-[100%] lg:tw-w-[45%] lg:tw-h-full  ";
  else if (length == 3) hw = "tw-w-[45%] tw-h-[50%] ";
  else if (length == 4) hw = " md:tw-w-[45%] md:tw-h-[50%]   ";
  else hw = " tw-w-[30%] tw-h-[50%] ";

  if (sharingContent) {
    console.log("this is from tiles sharing content attendee id", AttendeeId);
  }

  return (
    <div
      className={`tw-relative tw-justify-center tw-items-center tw-flex ${hw} `}
      style={{ ...style }}
    >
      <RemoteVid
        chimeAttendeeID={AttendeeId}
        currentId={externalUser}
        localAttendeeId={localAttendeeId}
      />

      <div className="tw-absolute tw-flex tw-gap-2 tw-top-5 tw-right-5">
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

export default Tiles;
