// next imports
import type { NextApiRequest, NextApiResponse } from 'next';
// chime sdk
import AWS, { Chime } from 'aws-sdk';
// uuid
import { v4 as uuidV4 } from 'uuid';

const { T_AWS_ACCESS_KEY_ID = '', T_AWS_SECRET_ACCESS_KEY = '' } = process.env;

const chat = async (req: NextApiRequest, res: NextApiResponse) => {
  const { ChannelArn, ChimeBearer, ClientRequestToken, Content } =
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
          ChannelArn: ChannelArn,
          ChimeBearer: ChimeBearer,
          ClientRequestToken: ClientRequestToken,
          Content: Content,
          Persistence: 'PERSISTENCE',
          Type: 'STANDARD',
        };

        await messagingSDK
          .sendChannelMessage(params)
          .promise()
          .then((response) => {
            return res.status(200).json({
              status: 'message_send_success',
              message: 'Message send success',
              response: response,
              error: null,
            });
          })
          .catch((e: any) => {
            console.log(e);
            AWS.config.credentials = new AWS.Credentials(
              T_AWS_ACCESS_KEY_ID,
              T_AWS_SECRET_ACCESS_KEY
            );
            return res.status(501).json({
              status: 'message_send_failed',
              message: 'Message send failed',
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
    case 'GET':
      try {
        await messagingSDK
          .listChannelMessages({
            ChannelArn: ChannelArn,
            ChimeBearer: ChimeBearer,
          })
          .promise()
          .then((response: any) => {
            return res.status(200).json({
              status: 'fetch_message_success',
              message: 'Fetching message successful',
              response: response,
              error: null,
            });
          })
          .catch((error: any) => {
            return res.status(501).json({
              status: 'fetch_message_failed',
              message: 'Failed to fetch messages',
              response: null,
              error: error,
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
      res.setHeader('Allow', ['POST', 'GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default chat;
