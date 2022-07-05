import axios from "axios";
// api routes
import {
  CONCERNS_ENDPOINT,
  CONCERNS_WITH_ID_COMMENT_ENDPOINT,
  CONCERNS_ID_WITH_REPLIES_ID_ENDPOINT,
} from "@constants/routes";

export const ConcernCreate = async (data: any) => {
  try {
    const response = await axios.post(CONCERNS_ENDPOINT, data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const ConcernCommentCreate = async (data: any) => {
  try {
    const response = await axios.post(CONCERNS_WITH_ID_COMMENT_ENDPOINT(data.id), data.data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const ConcernCommentDelete = async (data: any) => {
  try {
    const response = await axios.delete(
      CONCERNS_ID_WITH_REPLIES_ID_ENDPOINT(data.id, data.reply_id)
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
