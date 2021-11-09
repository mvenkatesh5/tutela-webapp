import axios from "axios";
// api routes
import { QUICK_MEETINGS_ENDPOINT, QUICK_MEETINGS_WITH_ID_ENDPOINT } from "@constants/routes";

export const QuickMeetingCreate = async (data: any) => {
  try {
    const response = await axios.post(QUICK_MEETINGS_ENDPOINT, data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const QuickMeetingUpdate = async (data: any) => {
  try {
    const response = await axios.put(QUICK_MEETINGS_WITH_ID_ENDPOINT(data.id), data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const QuickMeetingDelete = async (id: Number) => {
  try {
    const response = await axios.delete(QUICK_MEETINGS_WITH_ID_ENDPOINT(id));
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
