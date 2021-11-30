import axios from "axios";
// api routes
import { USER_MESSAGE_ENDPOINT, USER_MESSAGE_WITH_ID_ENDPOINT } from "@constants/routes";

export const MessageCreate = async (data: any) => {
  try {
    const response = await axios.post(USER_MESSAGE_ENDPOINT, data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const MessageUpdate = async (data: any) => {
  try {
    const response = await axios.put(USER_MESSAGE_WITH_ID_ENDPOINT(data.id), data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const MessageDelete = async (id: Number) => {
  try {
    const response = await axios.delete(USER_MESSAGE_WITH_ID_ENDPOINT(id));
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
