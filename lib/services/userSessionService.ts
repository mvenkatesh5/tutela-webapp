import axios from "axios";
// api routes
import { REQUEST_SESSION_ENDPOINT } from "@constants/routes";

export const RequestSessionCreate = async (data: any) => {
  try {
    const response = await axios.post(REQUEST_SESSION_ENDPOINT, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
