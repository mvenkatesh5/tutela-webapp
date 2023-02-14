// next imports
import type { NextApiRequest, NextApiResponse } from "next";
// chime sdk
import AWS from "aws-sdk";
// uuid
import { v4 as uuidV4 } from "uuid";
const { T_AWS_ACCESS_KEY_ID = "", T_AWS_SECRET_ACCESS_KEY = "" } = process.env;

const leaveMeeting = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { meetingId, attendeeId } = req.body.params;

  AWS.config.credentials = new AWS.Credentials(T_AWS_ACCESS_KEY_ID, T_AWS_SECRET_ACCESS_KEY);
  const chimeMeeting = new AWS.ChimeSDKMeetings({ region: "us-east-1" });

  switch (method) {
    case "POST":
      try {
        const meetingRoom = await chimeMeeting.getMeeting({ MeetingId: meetingId }).promise();

        if (meetingRoom) {
          const response = await chimeMeeting
            .deleteAttendee({
              MeetingId: meetingId,
              AttendeeId: attendeeId,
            })
            .promise();

          return res.status(200).json({
            status: "attendees_removed",
            message: "Attendee remove from this meeting",
            response: response,
            error: null,
          });
        } else {
          return res.status(401).json({
            status: "attendees_not_removed",
            message: "Cant able to remove Attendee from this meeting",
            response: null,
            error: "meeting not available",
          });
        }
      } catch (e) {
        return res.status(500).json({
          status: "attendees_not_removed",
          message: "failed",
          response: null,
          error: e,
        });
      }
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default leaveMeeting;
