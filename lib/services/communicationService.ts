import axios from "axios";
// api routes
import {
  CHANNEL_ENDPOINT,
  CHANNEL_WITH_ID_ENDPOINT,
  CHANNEL_WITH_THREAD_ENDPOINT,
  THREAD_WITH_COMMENT_ENDPOINT,
  THREAD_WITH_ID_ENDPOINT,
  COMMENT_WITH_ID_ENDPOINT,
} from "@constants/routes";

export const ChannelCreate = async (data: any) => {
  try {
    const response = await axios.post(CHANNEL_ENDPOINT, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const ChannelUpdate = async (data: any) => {
  try {
    const response = await axios.put(CHANNEL_WITH_ID_ENDPOINT(data.id), data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const ChannelDelete = async (id: Number) => {
  try {
    const response = await axios.delete(CHANNEL_WITH_ID_ENDPOINT(id));
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const ChannelWithThreadCreate = async (data: any) => {
  try {
    const response = await axios.post(CHANNEL_WITH_THREAD_ENDPOINT(data.channel), data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const ThreadUpdate = async (data: any) => {
  try {
    const response = await axios.put(THREAD_WITH_ID_ENDPOINT(data.id), data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const ThreadDelete = async (id: Number) => {
  try {
    const response = await axios.delete(THREAD_WITH_ID_ENDPOINT(id));
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const ThreadWithCommentCreate = async (data: any) => {
  try {
    const response = await axios.post(THREAD_WITH_COMMENT_ENDPOINT(data.thread), data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const CommentUpdate = async (data: any) => {
  try {
    const response = await axios.put(COMMENT_WITH_ID_ENDPOINT(data.id), data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const CommentDelete = async (id: Number) => {
  try {
    const response = await axios.delete(COMMENT_WITH_ID_ENDPOINT(id));
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
