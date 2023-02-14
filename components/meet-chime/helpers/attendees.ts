// axios
import { axiosChimeInstance } from "@config/axios";

export const getMeetingAttendees = async (meetingId: string) => {
  const response = await axiosChimeInstance
    .post(`/api/meet/meet-attendees/`, {
      params: { meetingId: meetingId },
    })
    .then((res) => res)
    .catch((error) => console.log(error));

  return response;
};
