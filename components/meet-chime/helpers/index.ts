// axios
import axios from "axios";
// chime sdk
import {
  DefaultDeviceController,
  MeetingSessionConfiguration,
  ConsoleLogger,
  LogLevel,
} from "amazon-chime-sdk-js";

import { axiosChimeInstance } from "@config/axios";

const logger = new ConsoleLogger("Logger", LogLevel.INFO);

export const createMeetingSession = async (
  meet_id: string,
  userId: string,
  deviceController: DefaultDeviceController
) => {
  const response = await axiosChimeInstance.post(`/api/meet/meet-session`, {
    room: meet_id,
    userId: userId,
  });

  const { meetingResponse, attendeeResponse, status, recordResponse } = response.data;

  const configuration = new MeetingSessionConfiguration(meetingResponse, attendeeResponse);

  return { configuration, status, recordResponse };
};
