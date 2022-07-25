import axios from "axios";
// api routes
import { TAGS_WITH_ID_ENDPOINT, TAGS_ENDPOINT } from "@constants/routes";

export const Tag = {
  create: async (data: any) => {
    try {
      const response = await axios.post(TAGS_ENDPOINT, data);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  update: async (data: any) => {
    try {
      const response = await axios.put(TAGS_WITH_ID_ENDPOINT(data?.id), data);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  delete: async (tag_id: Number) => {
    try {
      const response = await axios.delete(TAGS_WITH_ID_ENDPOINT(tag_id));
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
};
