import axios from "axios";
// api routes
import { ANNOUNCEMENT_ENDPOINT, ANNOUNCEMENT_WITH_ID_ENDPOINT } from "@constants/routes";

export const AnnouncementCreate = async (data: any) => {
  try {
    const response = await axios.post(ANNOUNCEMENT_ENDPOINT, data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const AnnouncementUpdate = async (data: any) => {
  try {
    const response = await axios.put(ANNOUNCEMENT_WITH_ID_ENDPOINT(data.id), data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const AnnouncementDelete = async (id: Number) => {
  try {
    const response = await axios.delete(ANNOUNCEMENT_WITH_ID_ENDPOINT(id));
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
