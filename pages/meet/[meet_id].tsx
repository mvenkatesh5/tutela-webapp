import React, { ReactEventHandler, useEffect, useState } from "react";
import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import { ConsoleLogger, DefaultDeviceController, LogLevel } from "amazon-chime-sdk-js";
import {
  DeviceLabels,
  useMeetingManager,
  useMeetingStatus,
  useRemoteVideoTileState,
  VideoGrid,
} from "amazon-chime-sdk-component-library-react";
// helpers
import { createMeetingSession } from "@components/meet-chime/helpers";
import { fetchUserData } from "@components/meet-chime/helpers/auth";
// components
import LoadingScreen from "@components/meet-chime/loading";
import Controls from "@components/meet-chime/controls-box";
import VideoTiles from "@components/meet-chime/videoTiles";

const logger = new ConsoleLogger("Logger", LogLevel.INFO);

type userSchema = {
  id?: number;
  username?: string;
  email?: string;
  first_name?: string;
  is_active?: boolean;
};

const MeetingRoomPage: NextPage<userSchema | any> = ({ userInfo }) => {
  interface UserObjInterface {
    userId?: string;
    userName?: string;
    userEmail?: string;
    firstName?: string;
    isActive?: boolean;
  }
  const router = useRouter();
  const status = useMeetingStatus();
  console.log("Status", status);
  const { meet_id } = router.query as { meet_id: string };
  const [meetingSession, setMeetingSession] = useState<any>(null);
  const meetingManager = useMeetingManager();
  const [localAttendeeId, setLocalAttendeeId] = useState<any>(null);
  const [localUserId, setLocalUserId] = useState<any>(null);
  const [internalMeetingId, setInternalMeetingId] = useState<any>(null);
  const [localUserInfo, setLocalUserInfo] = useState<UserObjInterface | any>(
    userInfo
      ? {
          userId: userInfo.id,
          userName: userInfo.username,
          userEmail: userInfo.email,
          firstName: userInfo.first_name,
          isActive: userInfo.is_active,
        }
      : null
  );

  useEffect(() => {
    const initiateMeetSession = async () => {
      const deviceController = new DefaultDeviceController(logger);
      let id = userInfo.id.toString();
      const userId = (id?.length < 2 ? "0" : "") + userInfo.id;

      const session = await createMeetingSession(meet_id.toString(), userId, deviceController)
        .then((re) => re)
        .catch((e) => {
          router.replace("/");
          return null;
        });
      const meetingOptions = {
        deviceLabels: DeviceLabels.AudioAndVideo,
      };
      if (session) {
        await meetingManager.join(session.configuration, meetingOptions);
        await meetingManager.start();

        setMeetingSession(session.configuration);
        // console.log(session);
        setLocalAttendeeId(session.configuration.credentials?.attendeeId);
        setLocalUserId(session.configuration?.credentials?.externalUserId);
        setInternalMeetingId(session.configuration.meetingId);
      }
    };

    if (meet_id && localUserInfo) initiateMeetSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meet_id, localUserInfo]);

  return (
    <div className="relative h-screen w-screen flex flex-col">
      {status == 0 ? (
        <LoadingScreen />
      ) : (
        <div className="relative overflow-hidden flex justify-center align-middle h-full">
          <VideoTiles
            localAttendeeId={localAttendeeId}
            localUserId={localUserId}
            internalMeetingId={internalMeetingId}
            userObj={localUserInfo}
          />
          <Controls
            meet_id={meet_id}
            internalMeetId={internalMeetingId}
            user={localUserInfo}
            attendee={localAttendeeId}
          />
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = async (context: NextPageContext) => {
  const { meet_id } = context.query;
  const userData = await fetchUserData(context);
  if (userData) {
    return { props: { userInfo: userData } };
  } else {
    return {
      redirect: {
        destination: `/signin?next=/meet/${meet_id}`,
      },
    };
  }
};

export default MeetingRoomPage;
