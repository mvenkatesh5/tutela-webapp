// next imports
import type { NextApiRequest, NextApiResponse } from "next";
// chime sdk
import AWS from "aws-sdk";
// uuid
import { v4 as uuidV4 } from "uuid";
const { T_AWS_ACCESS_KEY_ID = "", T_AWS_SECRET_ACCESS_KEY = "" } = process.env;

const deleteSession = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { meetingId, attendeeId } = req.body.params;
  switch (method) {
    case "POST":
      try {
        AWS.config.credentials = new AWS.Credentials(T_AWS_ACCESS_KEY_ID, T_AWS_SECRET_ACCESS_KEY);
        // Initializing chime instance
        const chimeMeeting = new AWS.ChimeSDKMeetings({ region: "us-east-1" });
        const response = await chimeMeeting.deleteMeeting({ MeetingId: meetingId }).promise();
        return res.status(200).json({
          status: "Meeting Deleted",
          message: "Meeting room deleted successfully",
          response: response,
          error: null,
        });
      } catch (e: any) {
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

export default deleteSession;
