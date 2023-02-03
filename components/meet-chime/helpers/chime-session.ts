// chime sdk
import {
  DefaultDeviceController,
  MeetingSessionConfiguration,
  ConsoleLogger,
  LogLevel,
} from "amazon-chime-sdk-js";

import { axiosChimeInstance } from "@config/axios";

export const createChimeSession = async () => {
  console.log("in this helpers");
  const res = await axiosChimeInstance
    .post(`/api/meet/create-update-session`, {
      room: "string",
      userId: "string",
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
  // console.log("this is response", );

  const configuration = new MeetingSessionConfiguration(meetingRoomExists, attendeeResponse);
  return { configuration };
};
