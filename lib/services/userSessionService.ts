import axios from "axios";
// api routes
import { REQUEST_SESSION_ENDPOINT, REQUEST_SESSION_WITH_ID_ENDPOINT } from "@constants/routes";

export const RequestSessionCreate = async (data: any) => {
  try {
    const response = await axios.post(REQUEST_SESSION_ENDPOINT, data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const RequestSessionUpdate = async (data: any) => {
  try {
    const response = await axios.put(REQUEST_SESSION_WITH_ID_ENDPOINT(data.id), data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
