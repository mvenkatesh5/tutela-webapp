// chime sdk
import {
  DefaultDeviceController,
  MeetingSessionConfiguration,
  ConsoleLogger,
  LogLevel,
} from "amazon-chime-sdk-js";

import { axiosChimeInstance } from "@config/axios";

export const createChimeSession = async (userId: string) => {
  console.log("in this helpers");
  const res = await axiosChimeInstance
    .post(`/api/meet/create-update-session`, {
      room: "string",
      userId: userId,
    })
    .then((r) => r)
    .catch((e) => e);
  console.log(res);
  const { MeetingResponse } = res.data.response;

  const configuration = new MeetingSessionConfiguration(MeetingResponse);
  return { configuration, ...res.data.response };
};

export const updateChimeSession = async (room: string, userId: string) => {
  const res = await axiosChimeInstance.put(`/api/meet/create-update-session`, {
    room: room,
    userId: userId,
  });
  const { meetingRoomExists, attendeeResponse } = res.data.response;
  console.log("this is response", meetingRoomExists);

  const configuration = new MeetingSessionConfiguration(meetingRoomExists, attendeeResponse);
  return { configuration, meetingRoomExists };
};

export const leaveMeeting = async (meetingId: string, attendeeId: string) => {
  const res = await axiosChimeInstance.post(`/api/meet/leave-meet`, {
    params: {
      meetingId: meetingId,
      attendeeId: attendeeId,
    },
  });

  console.log("this is response", res);
  return res;
};

export const deleteMeeting = async (meetingId: string, attendeeId: string) => {
  const res = await axiosChimeInstance.post(`/api/meet/delete-session`, {
    params: {
      meetingId: meetingId,
      attendeeId: attendeeId,
    },
  });
  console.log("this is response", res);

  return res;
};
