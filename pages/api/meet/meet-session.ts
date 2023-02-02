// next imports
import type { NextApiRequest, NextApiResponse } from "next";
// chime sdk
import AWS from "aws-sdk";
// uuid
import { v4 as uuidV4 } from "uuid";
// middleware
import { isMeetValid } from "@components/meet-chime/helpers/middleware";

const { T_AWS_ACCESS_KEY_ID = "", T_AWS_SECRET_ACCESS_KEY = "" } = process.env;

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { room, userId } = await req.body;
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        // Initialize aws credentials
        AWS.config.credentials = new AWS.Credentials(T_AWS_ACCESS_KEY_ID, T_AWS_SECRET_ACCESS_KEY);

        // Initializing chime instance
        const chime = new AWS.Chime({ region: "us-east-1" });
        chime.endpoint = new AWS.Endpoint("https://service.chime.aws.amazon.com");
        const chimeMedia = new AWS.ChimeSDKMediaPipelines({
          region: "us-east-1",
        });
        const meetingList = await chime.listMeetings().promise();

        // Can find a Meeting with a specific “external id” (aka, “room”)?
        const meetingRoomExists = (meetingList.Meetings || []).find(
          (it) => it.ExternalMeetingId === room
        );

        let meetingResponse: any = null;
        let attendeeResponse: any = null;
        let recordResponse: any = null;

        if (meetingRoomExists && meetingRoomExists?.MeetingId) {
          meetingResponse = meetingRoomExists;
          attendeeResponse = await chime
            .createAttendee({
              MeetingId: meetingRoomExists?.MeetingId?.toString(),
              ExternalUserId: `${(userId.length < 2 ? "0" : "") + userId}`,
            })
            .promise();

          return res.status(200).json({
            status: "attendee_created",
            message: "Attendee added successfully.",
            meetingResponse: meetingResponse,
            attendeeResponse: attendeeResponse,
          });
        } else {
          meetingResponse = await chime
            .createMeeting({
              ClientRequestToken: uuidV4(),
              MediaRegion: "us-east-1",
              ExternalMeetingId: room.toString(),
            })
            .promise();

          if (meetingResponse) {
            attendeeResponse = await chime
              .createAttendee({
                MeetingId: meetingResponse.Meeting.MeetingId.toString(),
                ExternalUserId: `${(userId.length < 2 ? "0" : "") + userId}`,
              })
              .promise();

            const meet_id = meetingResponse?.Meeting?.MeetingId;

            const params = {
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
                    Resolution: "HD",
                  },
                },
              },
              ClientRequestToken: meet_id,
            };
            recordResponse = await chimeMedia
              .createMediaCapturePipeline(params)
              .promise()
              .then(async (response: any) => {
                await chimeMedia
                  .createMediaConcatenationPipeline({
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
                          MediaPipelineArn: response?.MediaCapturePipeline?.MediaPipelineArn,
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
                  })
                  .promise()
                  .then((r) => r)
                  .catch((e) => e);
              })
              .catch((e: any) => {
                e;
              });
          }
        }

        console.log("recordResponse", recordResponse);
        console.log("meetingResponse", meetingResponse);
        console.log("attendeeResponse", attendeeResponse);

        if (meetingResponse != null && attendeeResponse != null)
          return res.status(200).json({
            status: "meeting_created",
            message: "Meeting created successfully.",
            meetingResponse: meetingResponse,
            attendeeResponse: attendeeResponse,
            recordResponse: recordResponse,
          });
        else
          return res.status(400).json({
            status: "meeting_not_created",
            message: "Meeting not created.",
          });
      } catch (e: any) {
        return res.status(500).json({
          status: "meeting_not_created",
          message: "Meeting not created.",
        });
      }

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default isMeetValid(handler);
