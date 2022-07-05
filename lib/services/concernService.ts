import axios from "axios";
// api routes
import {
  CONCERN_ENDPOINT,
  CONCERN_WITH_ID_ENDPOINT,
  COMMENT_WITH_CONCERN_ID_ENDPOINT,
  CONCERN_ID_AND_COMMENT_ID_ENDPOINT,
} from "@constants/routes";

export const Concern = {
  create: async (data: any) => {
    try {
      const response = await axios.post(CONCERN_ENDPOINT, data);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  // update: async (data: any) => {
  //   try {
  //     const response = await axios.put(CONCERN_WITH_ID_ENDPOINT(data?.id), data);
  //     return response.data;
  //   } catch (error: any) {
  //     throw error.response.data;
  //   }
  // },
  // delete: async (option_id: Number) => {
  //   try {
  //     const response = await axios.delete(CONCERN_WITH_ID_ENDPOINT(option_id));
  //     return response.data;
  //   } catch (error: any) {
  //     throw error.response.data;
  //   }
  // },
};

export const ConcernComment = {
  create: async (data: any) => {
    try {
      const response = await axios.post(COMMENT_WITH_CONCERN_ID_ENDPOINT(data?.concern), data.data);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  // update: async (data: any) => {
  //   try {
  //     const response = await axios.put(CONCERN_WITH_ID_ENDPOINT(data?.id), data);
  //     return response.data;
  //   } catch (error: any) {
  //     throw error.response.data;
  //   }
  // },
  delete: async (data: any) => {
    try {
      const response = await axios.delete(
        CONCERN_ID_AND_COMMENT_ID_ENDPOINT(data?.concern, data?.comment)
      );
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
};
