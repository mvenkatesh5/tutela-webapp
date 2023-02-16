import React, { ReactEventHandler, useEffect, useState } from "react";
import _ from "lodash";
import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import { ConsoleLogger, DefaultDeviceController, LogLevel } from "amazon-chime-sdk-js";
import {
  DeviceLabels,
  useMeetingManager,
  useMeetingStatus,
  useRemoteVideoTileState,
  VideoGrid,
  // MeetingManager
} from "amazon-chime-sdk-component-library-react";
// helpers
import { createMeetingSession } from "@components/meet-chime/helpers";
import { leaveMeeting, updateChimeSession } from "@components/meet-chime/helpers/chime-session";
import { fetchUserData } from "@components/meet-chime/helpers/auth";
// components
import LoadingScreen from "@components/meet-chime/loading";
import Controls from "@components/meet-chime/controls-box";
import VideoTiles from "@components/meet-chime/videoTiles";
import { axiosChimeInstance } from "@config/axios";
import { Button } from "react-bootstrap";
import Cookies from "js-cookie";

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
  const { audioVideoDidStop, meetingStatus } = useMeetingManager();
  const [localAttendeeId, setLocalAttendeeId] = useState<any>(null);
  const [localUserId, setLocalUserId] = useState<any>(null);
  const [internalMeetingId, setInternalMeetingId] = useState<any>(null);
  const [host, setHost] = useState<any>(null);
  const [attendeeArr, setAttendeeArr] = useState([]);
  const [openJoin, setOpenJoin] = useState<boolean>(true);
  const local = Cookies.get("local_id");
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

  if (meetingStatus == 3 ) {
    router.replace('/calendar')
  }
  if (meetingStatus == 4) {
    window.location.reload;
  }
 
  useEffect(() => {
    console.log("this is status", status);
    const getMembers = async () => {
      await axiosChimeInstance
        .post("/api/meet/meet-attendees/", {
          params: { meetingId: meet_id },
        })
        .then(async (res) => {
          const arr = res.data.meetingAttendees;
          const newArr = arr.filter((item: any) => item.AttendeeId !== local);
          setAttendeeArr(newArr);
          console.log("this is arr", arr);
        })
        .catch((e) => {
          console.log("this is error", e);
          router.replace('/calendar')
        });
    };

    if (meet_id && local) {
      leaveMeeting(meet_id, local);
      getMembers();
    } else if (meet_id) {
      getMembers();
    }
  }, [, meet_id]);

  const joinMeeting = async () => {
    const deviceController = new DefaultDeviceController(logger);
    let id = userInfo.user.id.toString();
    const userId = (id?.length < 2 ? "0" : "") + userInfo.user.id;

    const session = await updateChimeSession(meet_id.toString(), userId)
      .then((re) => re)
      .catch((e) => {
        console.log("this is from meeting id");
        router.replace({
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
      Cookies.set("local_id", session.configuration.credentials?.attendeeId || "");
      setInternalMeetingId(meet_id);
      setOpenJoin(false);
    }
  };

  return (
    <div className="tw-relative tw-h-screen tw-w-screen ">
      {/* {status == 0 && _.isEmpty(attendeeArr) ? (
        <LoadingScreen />
      ) : ( */}
      {/* <> */}
      {openJoin ? (
        <div className="tw-relative tw-h-screen tw-w-screen tw-bg-white tw-flex tw-justify-center tw-items-center tw-p-5 ">
          <div className="tw-h-[15em] tw-w-[25em] tw-bg-white tw-rounded-xl tw-p-8 tw-text-center tw-flex tw-items-center tw-justify-center tw-shadow-black tw-shadow-2xl  tw-border-4 ">
            <div className="tw-relative ">
              {attendeeArr.length != 0 ? (
                <h5>{attendeeArr.length} Member(s) already joined in this room</h5>
              ) : (
                <h5>No Members available in this room</h5>
              )}
              <div className="tw-flex tw-justify-center tw-items-center tw-gap-4 tw-mt-[1.5em]">
                <Button variant="success" onClick={joinMeeting}>
                  {" "}
                  Join Meeting
                </Button>
                <Button variant="danger" onClick={() => router.replace('/calendar')}>
                  {" "}
                  Leave Meeting
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="tw-relative tw-overflow-hidden tw-flex tw-justify-center tw-align-middle tw-h-screen tw-w-full tw-flex-col ">
          {status == 0 ? (
            <LoadingScreen />
          ) : (
            <>
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
            </>
          )}
        </div>
      )}
      {/* </> */}
      {/* )} */}
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
