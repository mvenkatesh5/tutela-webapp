import axios from "axios";
// api routes
import {
  DOUBTS_ENDPOINT,
  DOUBTS_WITH_ID_ENDPOINT,
  DOUBTS_WITH_REPLIES_ENDPOINT,
  DOUBTS_ID_WITH_REPLIES_ID_ENDPOINT,
} from "@constants/routes";

export const DoubtCreate = async (data: any) => {
  try {
    const response = await axios.post(DOUBTS_ENDPOINT, data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const DoubtEdit = async (data: any) => {
  try {
    const response = await axios.put(DOUBTS_WITH_ID_ENDPOINT(data.id), data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const DoubtDelete = async (data: any) => {
  try {
    const response = await axios.delete(DOUBTS_WITH_ID_ENDPOINT(data.id));
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const DoubtRepliesCreate = async (doubt_id: any, data: any) => {
  try {
    const response = await axios.post(DOUBTS_WITH_REPLIES_ENDPOINT(doubt_id), data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const DoubtRepliesEdit = async (doubt_id: any, data: any) => {
  try {
    const response = await axios.put(DOUBTS_ID_WITH_REPLIES_ID_ENDPOINT(doubt_id, data.id), data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const DoubtRepliesDelete = async (doubt_id: any, data: any) => {
  try {
    const response = await axios.delete(DOUBTS_ID_WITH_REPLIES_ID_ENDPOINT(doubt_id, data.id));
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
