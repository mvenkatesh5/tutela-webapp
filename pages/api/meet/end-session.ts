// next imports
import type { NextApiRequest, NextApiResponse } from 'next';
// chime sdk
import AWS from 'aws-sdk';
// uuid
import { v4 as uuidV4 } from 'uuid';
const { T_AWS_ACCESS_KEY_ID = '', T_AWS_SECRET_ACCESS_KEY = '' } = process.env;

const endSession = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { meetingId, attendeeId } = req.body.params;
  switch (method) {
    case 'POST':
      try {
        AWS.config.credentials = new AWS.Credentials(
          T_AWS_ACCESS_KEY_ID,
          T_AWS_SECRET_ACCESS_KEY
        );
        // Initializing chime instance
        const chime = new AWS.Chime({ region: 'us-east-1' });
        chime.endpoint = new AWS.Endpoint(
          'https://service.chime.aws.amazon.com'
        );

        return await chime
          .deleteAttendee({
            MeetingId: meetingId,
            AttendeeId: attendeeId.toString(),
          })
          .promise()
          .then(async (response) => {
            const attendees =
              (await chime
                .listAttendees({ MeetingId: meetingId })
                .promise()
                .then((res) => res?.Attendees)) || [];

            if (
              (attendees.length == 1 &&
                attendees[0].ExternalUserId?.includes('MediaPipeline')) ||
              attendees.length == 0
            ) {
              response = await chime
                .deleteMeeting({ MeetingId: meetingId })
                .promise()
                .then((r) => r)
                .catch((e) => e);
            }

            return res.status(200).json({
              status: 'attendees_removed',
              message: 'Attendee remove from this meeting',
              response: response,
              error: null,
            });
          })
          .catch((error) => {
            return res.status(401).json({
              status: 'attendees_not_removed',
              message: 'Cant able to remove Attendee from this meeting',
              response: null,
              error: error,
            });
          });
      } catch (e: any) {
        return res.status(500).json({
          status: 'attendees_not_removed',
          message: 'failed',
          response: null,
          error: e,
        });
      }
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default endSession;
