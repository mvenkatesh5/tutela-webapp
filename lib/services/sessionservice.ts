import axios from "axios";
// api routes
import { SESSION_ENDPOINT, SESSION_WITH_ID_ENDPOINT } from "@constants/routes";

export const SessionCreate = async (data: any) => {
  try {
    const response = await axios.post(SESSION_ENDPOINT, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const SessionUpdate = async (data: any) => {
  try {
    const response = await axios.put(SESSION_WITH_ID_ENDPOINT(data.id), data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const SessionDelete = async (id: Number) => {
  try {
    const response = await axios.delete(SESSION_WITH_ID_ENDPOINT(id));
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
