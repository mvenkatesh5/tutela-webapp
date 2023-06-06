import axios from "axios";
// api routes
import {
  V2_DOUBTS_ENDPOINT,
  V2_DOUBT_WITH_ID_ENDPOINT,
  V2_DOUBTS_PERSONAL_ENDPOINT,
  V2_DOUBTS_PUBLIC_ENDPOINT,
  V2_COMMENTS_WITH_DOUBT_ID_ENDPOINT,
} from "@constants/routes";

export const DoubtsV2Service = {
  getPersonalDoubts: async () => {
    try {
      const response = await axios.get(V2_DOUBTS_PERSONAL_ENDPOINT);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  getPublicDoubts: async () => {
    try {
      const response = await axios.get(V2_DOUBTS_PUBLIC_ENDPOINT);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  create: async (data: any) => {
    try {
      const response = await axios.post(V2_DOUBTS_ENDPOINT, data);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  edit: async (data: any) => {
    try {
      const response = await axios.put(V2_DOUBT_WITH_ID_ENDPOINT(data?.id), data);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  delete: async (doubt_id: string | number) => {
    try {
      const response = await axios.delete(V2_DOUBT_WITH_ID_ENDPOINT(doubt_id));
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
};

export const DoubtsRepliesV2Service = {
  getReplies: async (doubt_id: any) => {
    try {
      const response = await axios.get(V2_COMMENTS_WITH_DOUBT_ID_ENDPOINT(doubt_id));
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  create: async (data: any) => {
    try {
      const response = await axios.post(
        V2_COMMENTS_WITH_DOUBT_ID_ENDPOINT(data?.doubt),
        data?.data
      );
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
};
