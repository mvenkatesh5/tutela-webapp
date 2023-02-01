// axios
import axios from 'axios';

export const getMeetingAttendees = async (meetingId: string) => {
  const response = await axios
    .post(`/api/meet-attendees/`, {
      params: { meetingId: meetingId },
    })
    .then((res) => res)
    .catch((error) => console.log(error));

  return response;
};

export const removeMeetingAttendee = async (
  meetingId: string,
  attendeeId: string
) => {
  // console.log('this is attendee id', attendeeId);
  const response = await axios
    .post('/api/end-session/', {
      params: {
        meetingId: meetingId,
        attendeeId: attendeeId,
      },
    })
    .then((res) => res)
    .catch((err) => console.log(err));

  console.log(response);
  return response;
};
