import axios from "axios";
// api routes
import {
  SESSION_ENDPOINT,
  SESSION_WITH_ID_ENDPOINT,
  SESSION_USER_ENDPOINT,
  ZOOM_MEETING_ENDPOINT,
} from "@constants/routes";

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

export const SessionUserCreate = async (data: any) => {
  try {
    const response = await axios.post(SESSION_USER_ENDPOINT, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const CreateZoomMeeting = async (data: any) => {
  try {
    const response = await axios.post(ZOOM_MEETING_ENDPOINT, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
