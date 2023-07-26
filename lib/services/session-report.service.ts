import axios from "axios";
// api routes
import {
  SESSION_USER_REPORT_ENDPOINT,
  SESSION_USER_REPORT_WITH_ID_ENDPOINT,
  SESSION_USER_REPORT_BULK_CREATE_ENDPOINT,
  SESSION_USER_REPORT_BY_SESSION_USER_ID_ENDPOINT,
} from "@constants/routes";

export const SessionReport = {
  getAll: async () => {
    try {
      const response = await axios.get(SESSION_USER_REPORT_ENDPOINT);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  getById: async (report_id: string | number) => {
    try {
      const response = await axios.get(SESSION_USER_REPORT_WITH_ID_ENDPOINT(report_id));
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  getBySessionUserId: async (session_user_id: string | number, data: any = {}) => {
    try {
      const response = await axios.get(
        SESSION_USER_REPORT_BY_SESSION_USER_ID_ENDPOINT(session_user_id),
        data
      );
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  create: async (data: any) => {
    try {
      const response = await axios.post(SESSION_USER_REPORT_ENDPOINT, data);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  bulkCreate: async (data: any) => {
    try {
      const response = await axios.post(SESSION_USER_REPORT_BULK_CREATE_ENDPOINT, data);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  edit: async (data: any) => {
    try {
      const response = await axios.put(SESSION_USER_REPORT_WITH_ID_ENDPOINT(data?.id), data);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  delete: async (report_id: string | number) => {
    try {
      const response = await axios.delete(SESSION_USER_REPORT_WITH_ID_ENDPOINT(report_id));
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
};
