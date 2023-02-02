import { v4 as uuidV4 } from 'uuid';
import type { NextApiRequest, NextApiResponse } from 'next';
import AWS from 'aws-sdk';
const { T_AWS_ACCESS_KEY_ID = '', T_AWS_SECRET_ACCESS_KEY = '' } = process.env;

const InitializeMediaCapturing = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const {
    meet_id = '',
    pipelineId = '',
    mediaPipelineArn = '',
  } = req.body.params;
  const { method } = req;

  AWS.config.credentials = new AWS.Credentials(
    T_AWS_ACCESS_KEY_ID,
    T_AWS_SECRET_ACCESS_KEY
  );
  const chime = new AWS.Chime({ region: 'us-east-1' });
  const chimeMedia = new AWS.ChimeSDKMediaPipelines({ region: 'us-east-1' });
  chime.endpoint = new AWS.Endpoint('https://service.chime.aws.amazon.com');

  switch (method) {
    case 'POST':
      try {
        const params = {
          SinkArn: `arn:aws:s3:::tutela-connect-recordings/${meet_id}`,
          SinkType: 'S3Bucket',
          SourceArn: `arn:aws:chime::140372967108:meeting:${meet_id}`,
          SourceType: 'ChimeSdkMeeting',
          ChimeSdkMeetingConfiguration: {
            ArtifactsConfiguration: {
              Audio: {
                MuxType: 'AudioOnly',
              },
              Content: {
                State: 'Enabled',
                MuxType: 'ContentOnly',
              },
              Video: {
                State: 'Enabled',
                MuxType: 'VideoOnly',
              },
            },
          },
          ClientRequestToken: uuidV4().toString(),
        };

        await chimeMedia
          .createMediaCapturePipeline(params)
          .promise()
          .then(async (response: any) => {
            await chimeMedia
              .createMediaConcatenationPipeline({
                Sinks: [
                  {
                    Type: 'S3Bucket',
                    S3BucketSinkConfiguration: {
                      Destination: `arn:aws:s3:::tutela-connect-recordings/${meet_id}`,
                    },
                  },
                ],

                Sources: [
                  {
                    Type: 'MediaCapturePipeline',
                    MediaCapturePipelineSourceConfiguration: {
                      MediaPipelineArn:
                        response?.MediaCapturePipeline?.MediaPipelineArn,
                      ChimeSdkMeetingConfiguration: {
                        ArtifactsConfiguration: {
                          Audio: {
                            State: 'Enabled',
                          },
                          Video: {
                            State: 'Enabled',
                          },
                          Content: {
                            State: 'Enabled',
                          },
                          DataChannel: {
                            State: 'Enabled',
                          },
                          TranscriptionMessages: {
                            State: 'Enabled',
                          },
                          MeetingEvents: {
                            State: 'Enabled',
                          },
                          CompositedVideo: {
                            State: 'Enabled',
                          },
                        },
                      },
                    },
                  },
                ],
              })
              .promise()
              .then((r) =>
                console.log('this is response of merge artifacts ', r)
              )
              .catch((e) => console.log('error from merge artifact', e));

            return res.status(200).json({
              status: 'meet_recording',
              message: 'Meeting is recording now',
              response: response,
              error: null,
            });
          })
          .catch((e: any) => {
            return res.status(501).json({
              status: 'record_failed',
              message: 'Failed to record this meeting',
              response: null,
              error: e,
            });
          });
      } catch (e: any) {
        return res.status(500).json({
          status: 'server_error',
          message: 'Internal server error',
          response: null,
          error: e,
        });
      }

    case 'PUT':
      try {
        // const params = ;

        await chimeMedia
          .deleteMediaCapturePipeline({
            MediaPipelineId: pipelineId,
          })
          .promise()
          .then((response: any) => {
            return res.status(200).json({
              status: 'recording_cancelled',
              message: 'Meeting record session cancelled',
              response: response,
              error: null,
            });
          })
          .catch((err) => {
            return res.status(501).json({
              status: 'cancel_record_failed',
              message: 'Failed to stop record this meeting',
              response: null,
              error: err,
            });
          });
      } catch (e: any) {
        return res.status(500).json({
          status: 'server_error',
          message: 'Internal server error',
          response: null,
          error: e,
        });
      }

    default:
      res.setHeader('Allow', ['POST', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
export default InitializeMediaCapturing;
