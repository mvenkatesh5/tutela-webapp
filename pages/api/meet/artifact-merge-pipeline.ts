// next imports
import type { NextApiRequest, NextApiResponse } from 'next';
// chime sdk
import AWS from 'aws-sdk';

const { T_AWS_ACCESS_KEY_ID = '', T_AWS_SECRET_ACCESS_KEY = '' } = process.env;

const artifactMergePipeline = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { method } = req;
  const { chunk_dest, pipelineArn } = req.body.params;

  switch (method) {
    case 'POST':
      try {
        // Initialize aws credentials
        AWS.config.credentials = new AWS.Credentials(
          T_AWS_ACCESS_KEY_ID,
          T_AWS_SECRET_ACCESS_KEY
        );
        // Initializing chime instance
        const chime = new AWS.Chime({ region: 'us-east-1' });
        chime.endpoint = new AWS.Endpoint(
          'https://service.chime.aws.amazon.com'
        );
        // Initializing SDK Media pipeline instance
        const mergeSessionPipeline = new AWS.ChimeSDKMediaPipelines({
          apiVersion: '2021-07-15',
          region: 'us-east-1',
        });

        // const mediaCapturePipeline = await mergeSessionPipeline
        //   .listMediaPipelines()
        //   .promise()
        //   .then((res) => res)
        //   .catch((e) => console.log(e));

        // console.log('this is media', mediaCapturePipeline);

        const params = {
          Sinks: [
            {
              S3BucketSinkConfiguration: {
                Destination: chunk_dest,
              },
              Type: 'S3Bucket',
            },
          ],
          Sources: [
            {
              MediaCapturePipelineSourceConfiguration: {
                ChimeSdkMeetingConfiguration: {
                  ArtifactsConfiguration: {
                    Audio: {
                      State: 'Enabled',
                    },
                    CompositedVideo: {
                      State: 'Enabled',
                    },
                    Content: {
                      State: 'Enabled',
                    },
                    DataChannel: {
                      State: 'Enabled',
                    },
                    MeetingEvents: {
                      State: 'Enabled',
                    },
                    TranscriptionMessages: {
                      State: 'Enabled',
                    },
                    Video: {
                      State: 'Enabled',
                    },
                  },
                },
                MediaPipelineArn: pipelineArn,
              },
              Type: 'MediaCapturePipeline',
            },
          ],
        };

        const mergeArtifacts = await mergeSessionPipeline
          .createMediaConcatenationPipeline(params)
          .promise()
          .then((res: any) => res)
          .catch((e: any) => console.log(e));

        console.log(mergeArtifacts);

        return res.status(200).json({
          status: 'artifact_merge_initiated',
          message: 'Merging the media artifacts',
          mergeArtifacts: mergeArtifacts,
        });
      } catch (e: any) {
        return res.status(500).json({
          status: 'merge_failed',
          message: 'Artifacts merge failed',
        });
      }
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default artifactMergePipeline;
