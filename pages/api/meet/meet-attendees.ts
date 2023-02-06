// next imports
import type { NextApiRequest, NextApiResponse } from "next";
// chime sdk
import AWS from "aws-sdk";
// uuid
import { v4 as uuidV4 } from "uuid";
const { T_AWS_ACCESS_KEY_ID = "", T_AWS_SECRET_ACCESS_KEY = "" } = process.env;

const getAttendees = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { meetingId } = req.body.params;
  // const meetingId = "92405929-cd4a-43de-87c2-9ea1f60b0706"
  // console.log(meetingId);
  switch (method) {
    case "POST":
      try {
        // Initialize aws credentials
        AWS.config.credentials = new AWS.Credentials(T_AWS_ACCESS_KEY_ID, T_AWS_SECRET_ACCESS_KEY);
        // Initializing chime instance
        const chime = new AWS.Chime({ region: "us-east-1" });
        chime.endpoint = new AWS.Endpoint("https://service.chime.aws.amazon.com");

        const meetings = await chime.listMeetings().promise();

        const meetingRoomExists = (meetings.Meetings || []).find(
          (it) => it.ExternalMeetingId === meetingId
        );

        const meetingAttendees = await chime
          .listAttendees({ MeetingId: meetingRoomExists?.MeetingId?.toString() || "" })
          .promise()
          .then((res: any) =>
            res?.Attendees?.filter((attendee: any) => {
              if (!attendee.ExternalUserId?.includes("MediaPipeline")) return attendee;
            })
          )
          .catch((error: any) => console.log(error));

        return res.status(200).json({
          status: "attendees_retrieved",
          message: "Meeting attendees retrieved successfully",
          meetingAttendees: meetingAttendees,
        });
      } catch (e: any) {
        return res.status(500).json({
          status: "attendees_not_retrieved",
          message: "Meeting attendees not retrieved",
        });
      }
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default getAttendees;
