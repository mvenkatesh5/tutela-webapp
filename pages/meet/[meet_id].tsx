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
import { updateChimeSession } from "@components/meet-chime/helpers/chime-session";
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
  // console.log("props", props);
  const { meet_id } = router.query as { meet_id: string };
  const [meetingSession, setMeetingSession] = useState<any>(null);
  const meetingManager = useMeetingManager();
  const [localAttendeeId, setLocalAttendeeId] = useState<any>(null);
  const [localUserId, setLocalUserId] = useState<any>(null);
  const [internalMeetingId, setInternalMeetingId] = useState<any>(null);
  const [host, setHost] = useState<any>(null);
  const [attendeeArr, setAttendeeArr] = useState([]);
  const [localUserInfo, setLocalUserInfo] = useState<UserObjInterface | any>(
    userInfo
      ? {
          userId: userInfo.user.id,
          userName: userInfo.user.username,
          userEmail: userInfo.user.email,
          firstName: userInfo.user.first_name,
          isActive: userInfo.user.is_active,
        }
      : null
  );

  useEffect(() => {
    const initiateMeetSession = async () => {
      const deviceController = new DefaultDeviceController(logger);
      let id = userInfo.user.id.toString();
      const userId = (id?.length < 2 ? "0" : "") + userInfo.user.id;

      const session = await updateChimeSession(meet_id.toString(), userId)
        .then((re) => re)
        .catch((e) => {
          router.push({
            pathname: "/calendar",
            // query: {
            //   id : meet_id.toString()
            // },
          });
          console.log(e);
          return null;
        });
      const meetingOptions = {
        deviceLabels: DeviceLabels.AudioAndVideo,
      };
      if (session) {
        setHost(session.meetingRoomExists.Meeting?.MeetingHostId);
        await meetingManager.join(session.configuration, meetingOptions);
        await meetingManager.start();

        setMeetingSession(session.configuration);
        setLocalAttendeeId(session.configuration.credentials?.attendeeId);
        setLocalUserId(session.configuration?.credentials?.externalUserId);
        setInternalMeetingId(meet_id);
      }
    };

    if (meet_id && localUserInfo) initiateMeetSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meet_id, localUserInfo]);

  return (
    <div className="tw-relative tw-h-screen tw-w-screen ">
      {status == 0 ? (
        <LoadingScreen />
      ) : (
        <div className="tw-relative tw-overflow-hidden tw-flex tw-justify-center tw-align-middle tw-h-screen tw-w-full tw-flex-col">
          <VideoTiles
            localAttendeeId={localAttendeeId}
            localUserId={localUserId}
            internalMeetingId={internalMeetingId}
            userObj={localUserInfo}
            attendeeArr={attendeeArr}
            setAttendee={(data: any) => setAttendeeArr(data)}
          />
          <Controls
            meet_id={meet_id}
            internalMeetId={internalMeetingId}
            user={localUserInfo}
            attendee={localAttendeeId}
            hostId={host}
            attendeeArr={attendeeArr}
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
