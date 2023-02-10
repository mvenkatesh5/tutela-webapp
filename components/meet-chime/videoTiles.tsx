import React, { useState, useEffect } from "react";
import {
  useRemoteVideoTileState,
  VideoGrid,
  Arrow,
  useAttendeeStatus,
  useContentShareState,
  MeetingStatus,
  useMeetingManager,
} from "amazon-chime-sdk-component-library-react";
import axios from "axios";
import Tiles from "./tiles";
import RemoteContent from "@components/meet-chime/remote-content";
import { axiosChimeInstance } from "@config/axios";
import { useRouter } from "next/router";

interface VideoTilesProps {
  localAttendeeId: string;
  localUserId: string;
  internalMeetingId: string;
  userObj: any;
  attendeeArr: Array<any>;
  setAttendee: Function;
}

const VideoTiles: React.FC<VideoTilesProps> = ({
  localAttendeeId,
  localUserId,
  internalMeetingId,
  userObj,
  attendeeArr,
  setAttendee,
}) => {
  const router = useRouter();
  // const [attendeeArr, setAttendeeArr] = useState([]);
  const [tilesPerPage, setTilesPerPage] = useState<number>(6);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const meetingManager = useMeetingManager();

  // calculating inner width
  let count = 0;
  useEffect(() => {
    if (window.innerWidth < 600) count = 2;
    else if (window.innerWidth > 600 && window.innerWidth < 1024) count = 4;
    else if (window.innerWidth >= 1024) count = 6;

    setCurrentPage(1);
    setTilesPerPage(count);
  }, [window.innerWidth]);

  const { sharingAttendeeId } = useContentShareState();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps

    const fetchList = async () => {
      const response = await axiosChimeInstance
        .post(`/api/meet/meet-attendees/`, {
          params: { meetingId: internalMeetingId },
        })
        .then(async (res) => {
          const arr = res.data.meetingAttendees;
          if (!arr && MeetingStatus.Ended) {
            await router.push("/calendar");
            await meetingManager.leave();
          }
          const newArr = arr.filter((item: any) => item !== localAttendeeId);
          setAttendee(newArr);
        })
        .catch((error) => console.log(error));
    };
    if (internalMeetingId) fetchList();
  }, [attendeeArr]);

  const indexOfLastTile = currentPage * tilesPerPage;
  const indexOfFirstTile = indexOfLastTile - tilesPerPage;
  const currentTiles = attendeeArr.slice(indexOfFirstTile, indexOfLastTile);

  return (
    <>
      <div
        className="tw-w-full tw-p-2 tw-rounded tw-relative xs:tw-h-[100%] md:tw-h-screen"
        style={{
          display: sharingAttendeeId != null ? "none" : "inherit",
        }}
      >
        <VideoGrid
          className="tw-gap-4 tw-rounded tw-h-screen tw-w-full "
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            padding: "1.2em",
          }}
        >
          {currentTiles?.map((data, i) => {
            const { AttendeeId, ExternalUserId } = data;
            return (
              <Tiles
                key={i}
                AttendeeId={AttendeeId}
                externalUser={ExternalUserId}
                localAttendeeId={localAttendeeId}
                length={currentTiles.length}
              />
            );
          })}
        </VideoGrid>
        {tilesPerPage < attendeeArr.length && (
          <div className="tw-flex tw-justify-end tw-items-center tw-absolute tw-top-2 tw-right-2 tw-gap-2">
            <button
              disabled={currentPage == 1}
              className=" tw-bg-zinc-800 tw-font-bold  tw-p-2 tw-rounded-full tw-text-white tw-bg-none tw-box-border tw-shadow-lg tw-shadow-slate-900 tw-drop-shadow-lg tw-border-hidden "
              onClick={() => setCurrentPage((previous) => previous - 1)}
            >
              <Arrow width="1.5rem" direction="left" />
            </button>
            <button
              disabled={currentPage == Math.ceil(attendeeArr.length / tilesPerPage)}
              className=" tw-bg-zinc-800 tw-font-bold  tw-p-2 tw-rounded-full tw-text-white tw-bg-none tw-box-border tw-shadow-lg tw-shadow-slate-900 tw-drop-shadow-lg tw-border-hidden "
              onClick={() => setCurrentPage((previous) => previous + 1)}
            >
              <Arrow width="1.5rem" direction="right" />
            </button>
          </div>
        )}
      </div>

      <div
        className="tw-grid tw-gap-3 tw-h-[90%] tw-w-full tw-relative tw-grid-cols-4 tw-grid-row-1"
        style={{ display: sharingAttendeeId == null ? "none" : "grid" }}
      >
        <div className="lg:tw-col-span-3 xs:tw-col-span-4 tw-p-3">
          <VideoGrid
            className="tw-rounded-2xl "
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <div
              className={`tw-relative tw-justify-center tw-items-center tw-flex tw-h-full tw-w-full`}
            >
              <RemoteContent chimeAttendeeID={sharingAttendeeId} name="Loading" />
            </div>
          </VideoGrid>
        </div>
        <div className="xs:tw-hidden lg:tw-block lg:tw-col-span-1 tw-overflow-x-hidden tw-overflow-y-auto tw-p-3 ">
          {attendeeArr?.map((data, i) => {
            const { AttendeeId, ExternalUserId } = data;
            return (
              <Tiles
                key={i}
                AttendeeId={AttendeeId}
                externalUser={ExternalUserId}
                localAttendeeId={localAttendeeId}
                length={1}
                style={{
                  height: "25vh",
                  marginBottom: "0.5em",
                }}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default VideoTiles;
