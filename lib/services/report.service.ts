import axios from "axios";
// api routes
import { USER_REPORTS_ENDPOINT, USER_REPORTS_WITH_ID_ENDPOINT } from "@constants/routes";

export const ReportCreate = async (data: any) => {
  try {
    const response = await axios.post(USER_REPORTS_ENDPOINT, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const ReportEdit = async (data: any) => {
  try {
    const response = await axios.put(USER_REPORTS_WITH_ID_ENDPOINT(data.id), data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const ReportDelete = async (report_id: any) => {
  try {
    const response = await axios.delete(USER_REPORTS_WITH_ID_ENDPOINT(report_id));
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
