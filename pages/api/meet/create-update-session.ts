// next imports
import type { NextApiRequest, NextApiResponse } from "next";
// chime sdk
import AWS from "aws-sdk";
// uuid
import { v4 as uuidV4 } from "uuid";
// middleware
import { isMeetValid } from "@components/meet-chime/helpers/middleware";
import Cookies from "js-cookie";

const { T_AWS_ACCESS_KEY_ID = "", T_AWS_SECRET_ACCESS_KEY = "" } = process.env;

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { room = "", userId = "" } = await req.body;
  const { method } = req;
  const { host } = req.headers;

  // Initialize aws credentials
  AWS.config.credentials = new AWS.Credentials(T_AWS_ACCESS_KEY_ID, T_AWS_SECRET_ACCESS_KEY);

  // Initializing chime instance
  const chimeMeetings = new AWS.ChimeSDKMeetings({ region: "us-east-1" });
  const chimeMedia = new AWS.ChimeSDKMediaPipelines({
    region: "us-east-1",
  });

  let response: any = null;

  switch (method) {
    case "POST":
      try {
        // creating a meeting room
        const createMeetingParams = {
          ClientRequestToken: uuidV4().toString(),
          MediaRegion: "us-east-1",
          ExternalMeetingId: uuidV4().toString(),
          MeetingHostId: "0" + userId.toString(),
          MeetingFeatures: {
            Audio: {
              EchoReduction: "AVAILABLE",
            },
          },
        };

        const createMeetingResponse = await chimeMeetings
          .createMeeting(createMeetingParams)
          .promise();

        // starting the meeting record
        const meet_id = createMeetingResponse?.Meeting?.MeetingId;
        const recordMeetingParams = {
          SinkArn: `arn:aws:s3:::tutela-connect-recordings/${meet_id}`,
          SinkType: "S3Bucket",
          SourceArn: `arn:aws:chime::140372967108:meeting:${meet_id}`,
          SourceType: "ChimeSdkMeeting",
          ChimeSdkMeetingConfiguration: {
            ArtifactsConfiguration: {
              Audio: {
                MuxType: "AudioWithCompositedVideo",
              },
              Content: {
                State: "Disabled",
                MuxType: "ContentOnly",
              },
              Video: {
                State: "Disabled",
                MuxType: "VideoOnly",
              },
              CompositedVideo: {
                GridViewConfiguration: {
                  ContentShareLayout: "Vertical",
                  PresenterOnlyConfiguration: {
                    PresenterPosition: "TopLeft",
                  },
                },
                Layout: "GridView",
                Resolution: "FHD",
              },
            },
          },
          ClientRequestToken: meet_id,
        };

        const recordResponse = await chimeMedia
          .createMediaCapturePipeline(recordMeetingParams)
          .promise();

        // initiating the concat operation
        const mediaPipelineArn: string =
          recordResponse?.MediaCapturePipeline?.MediaPipelineArn || "";

        const concatMediaParams = {
          Sinks: [
            {
              Type: "S3Bucket",
              S3BucketSinkConfiguration: {
                Destination: `arn:aws:s3:::tutela-connect-records/${meet_id}`,
              },
            },
          ],

          Sources: [
            {
              Type: "MediaCapturePipeline",
              MediaCapturePipelineSourceConfiguration: {
                MediaPipelineArn: mediaPipelineArn,
                ChimeSdkMeetingConfiguration: {
                  ArtifactsConfiguration: {
                    Audio: {
                      State: "Enabled",
                    },
                    Video: {
                      State: "Enabled",
                    },
                    Content: {
                      State: "Enabled",
                    },
                    DataChannel: {
                      State: "Enabled",
                    },
                    TranscriptionMessages: {
                      State: "Enabled",
                    },
                    MeetingEvents: {
                      State: "Enabled",
                    },
                    CompositedVideo: {
                      State: "Enabled",
                    },
                  },
                },
              },
            },
          ],
        };

        const concatMediaResponse = await chimeMedia
          .createMediaConcatenationPipeline(concatMediaParams)
          .promise();

        response = {
          start_url: "/meet/" + createMeetingResponse?.Meeting?.MeetingId?.toString(),
          HostId: createMeetingResponse?.Meeting?.MeetingHostId?.toString(),
          MeetingId: meet_id,
          MediaPipelineId: concatMediaResponse?.MediaConcatenationPipeline?.MediaPipelineId,
          MeetingResponse: createMeetingResponse,
        };

        console.log("this is response", response);
        return res.status(200).json({
          status: "meet_created",
          message: "Meeting created successfully",
          response: response,
          error: null,
        });
      } catch (e: any) {
        return res.status(501).json({
          status: "meet_not_created",
          message: "Failed to create meet",
          response: response,
          error: e,
        });
      }
    case "PUT": {
      try {
        // const meetingList = await chime.listMeetings().promise();

        // checking the meeting room status
        // const meetingRoomExists = (meetingList.Meetings || []).find(
        //   (it) => it.ExternalMeetingId === room
        // );

        const meetingRoomExists = await chimeMeetings.getMeeting({ MeetingId: room }).promise();

        let response: any = null;
        if (meetingRoomExists && meetingRoomExists?.Meeting?.MeetingId) {
          const attendeeResponse = await chimeMeetings
            .createAttendee({
              MeetingId: room,
              ExternalUserId: `${(userId.length < 2 ? "0" : "") + userId}`,
            })
            .promise();
          response = { meetingRoomExists, attendeeResponse };
        }

        console.log("this is response", response);
        return res.status(200).json({
          status: "attendee_created",
          message: "Attendee added successfully",
          response: response,
          error: null,
        });
      } catch (e: any) {
        return res.status(501).json({
          status: "attendee_isn't_created",
          message: "Add attendee failure",
          response: response,
          error: e,
        });
      }
    }

    default:
      res.setHeader("Allow", ["POST", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default isMeetValid(handler);
