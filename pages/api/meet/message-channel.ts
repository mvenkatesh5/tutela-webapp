// next imports
import type { NextApiRequest, NextApiResponse } from 'next';
// chime sdk
import AWS from 'aws-sdk';
// uuid
import { v4 as uuidV4 } from 'uuid';

const { T_AWS_ACCESS_KEY_ID = '', T_AWS_SECRET_ACCESS_KEY = '' } = process.env;

const messageChannel = async (req: NextApiRequest, res: NextApiResponse) => {
  const { AppInstanceArn, ChimeBearer, ClientRequestToken, Name, ChannelArn } =
    req.body.params;
  const { method } = req;

  AWS.config.credentials = new AWS.Credentials(
    T_AWS_ACCESS_KEY_ID,
    T_AWS_SECRET_ACCESS_KEY
  );

  const messagingSDK = new AWS.ChimeSDKMessaging();
  switch (method) {
    case 'POST':
      try {
        const params = {
          AppInstanceArn: AppInstanceArn,
          ChimeBearer: ChimeBearer,
          ClientRequestToken: ClientRequestToken,
          Name: Name,
          //   Privacy: 'PRIVATE',
          //   Mode: 'RESTRICTED',
        };

        await messagingSDK
          .createChannel(params)
          .promise()
          .then((response: any) => {
            return res.status(200).json({
              status: 'chat_channel_created',
              message: 'Chat channel created',
              response: response,
              error: null,
            });
          })
          .catch((e: any) => {
            console.log(e);
            return res.status(501).json({
              status: 'chat_channel_creation_failed',
              message: 'Unable to create chat channel',
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

    case 'DELETE':
      try {
        const params = {
          ChannelArn: ChannelArn,
          ChimeBearer: ChimeBearer,
        };
        await messagingSDK
          .deleteChannel(params)
          .promise()
          .then((response: any) => {
            return res.status(200).json({
              status: 'chat_channel_deleted',
              message: 'Chat channel deleted',
              response: response,
              error: null,
            });
          })
          .catch((e: any) => {
            console.log(e);
            return res.status(501).json({
              status: 'chat_channel_deletion_failed',
              message: 'Unable to delete the chat channel',
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
    default:
      res.setHeader('Allow', ['POST', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default messageChannel;
