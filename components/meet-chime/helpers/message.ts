// axios
import axios from 'axios';

export const createMessageChannel = async (
  AppInstanceArn: string,
  ChimeBearer: string,
  ClientRequestToken: string,
  Name: string
) => {
  const response = await axios
    .post(`/api/message-channel`, {
      params: {
        AppInstanceArn: AppInstanceArn,
        ChimeBearer: ChimeBearer,
        ClientRequestToken: ClientRequestToken,
        Name: Name,
      },
    })
    .then((response) => response)
    .catch((err) => err);

  return response;
};

export const deleteMessageChannel = async (
  channelArn: string,
  ChimeBearer: string
) => {
  const response = await axios
    .delete(`/api/message-channel`, {
      params: {
        ChannelArn: channelArn,
        ChimeBearer: ChimeBearer,
      },
    })
    .then((res) => res)
    .catch((err) => err);
  return response;
};

export const sendMessage = async (
  ChannelArn: string,
  ChimeBearer: string,
  ClientRequestToken: string,
  message: string
) => {
  const response = await axios
    .post(`/api/chat`, {
      params: {
        ChannelArn: ChannelArn,
        ChimeBearer: ChimeBearer,
        ClientRequestToken: ClientRequestToken,
        Content: message,
      },
    })
    .then((res) => res)
    .catch((err) => err);

  return response;
};

export const fetchMessages = async (
  ChannelArn: string,
  ChimeBearer: string
) => {
  const response = await axios
    .get(`/api/chat`, {
      params: {
        ChannelArn: ChannelArn,
        ChimeBearer: ChimeBearer,
      },
    })
    .then((res) => res)
    .catch((err) => err);

  return response;
};
