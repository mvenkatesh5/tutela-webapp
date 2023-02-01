import React, { useState, useEffect } from "react";
import {
  useRemoteVideoTileState,
  VideoGrid,
  Arrow,
  useAttendeeStatus,
  useContentShareState,
} from "amazon-chime-sdk-component-library-react";
import axios from "axios";
import Tiles from "./tiles";
import RemoteContent from "@components/meet-chime/remote-content";

interface VideoTilesProps {
  localAttendeeId: string;
  localUserId: string;
  internalMeetingId: string;
  userObj: any;
}

const VideoTiles: React.FC<VideoTilesProps> = ({
  localAttendeeId,
  localUserId,
  internalMeetingId,
  userObj,
}) => {
  const [attendeeArr, setAttendeeArr] = useState([]);
  const { tiles, tileIdToAttendeeId, size } = useRemoteVideoTileState();
  const [activeAttendeeArr, setActiveAttendeeArr] = useState([""]);
  const [tilesPerPage, setTilesPerPage] = useState<number>(6);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sharingUser, setSharingUser] = useState<any>(null);

  const { sharingAttendeeId } = useContentShareState();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps

    const fetchList = async () => {
      const response = await axios
        .post(`/api/meet-attendees/`, {
          params: { meetingId: internalMeetingId },
        })
        .then((res) => {
          const arr = res.data.meetingAttendees;
          const newArr = arr.filter((item: any) => item !== localAttendeeId);
          setAttendeeArr(newArr);
        })
        .catch((error) => console.log(error));
    };
    fetchList();
  });

  const indexOfLastTile = currentPage * tilesPerPage;
  const indexOfFirstTile = indexOfLastTile - tilesPerPage;
  const currentTiles = attendeeArr.slice(indexOfFirstTile, indexOfLastTile);

  return (
    <>
      <div
        className="w-full h-[90%] p-2 rounded relative"
        style={{ display: sharingAttendeeId != null ? "none" : "inherit" }}
      >
        <VideoGrid
          className="gap-4 rounded  "
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          {currentTiles?.map((data, i) => {
            const { AttendeeId, ExternalUserId } = data;
            // const { sharingContent } = useAttendeeStatus(AttendeeId);
            // if (sharingContent) setSharingUser(data);
            return (
              <Tiles
                key={i}
                AttendeeId={AttendeeId}
                externalUser={ExternalUserId}
                localAttendeeId={localAttendeeId}
                length={attendeeArr.length}
              />
            );
          })}
        </VideoGrid>
        {tilesPerPage < attendeeArr.length && (
          <div className="flex justify-end items-center absolute top-5 right-5 gap-2">
            <button
              disabled={currentPage == 1}
              className=" border border-gray-400 bg-gray-300 font-bold  p-2 rounded-full text-gray-600 "
              onClick={() => setCurrentPage((previous) => previous - 1)}
            >
              <Arrow width="1.5rem" direction="left" />
            </button>
            <button
              disabled={currentPage == Math.ceil(attendeeArr.length / tilesPerPage)}
              className=" border border-gray-400 bg-gray-300 font-bold  p-2 rounded-full text-gray-600 "
              onClick={() => setCurrentPage((previous) => previous + 1)}
            >
              <Arrow width="1.5rem" direction="right" />
            </button>
          </div>
        )}
      </div>

      <div
        className="grid gap-3 h-[90%] w-full relative grid-cols-4 grid-row-1"
        style={{ display: sharingAttendeeId == null ? "none" : "grid" }}
      >
        <div className="md:col-span-3 sm:col-span-4 p-3">
          <VideoGrid
            className="rounded-2xl "
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <div className={`relative justify-center items-center flex h-full w-full`}>
              <RemoteContent chimeAttendeeID={sharingAttendeeId} name="Loading" />
            </div>
          </VideoGrid>
        </div>
        <div className="col-span-1 overflow-x-hidden overflow-y-auto p-3 ">
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
