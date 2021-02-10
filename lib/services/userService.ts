import axios from "axios";
// api routes
import { USER_WITH_ID_ENDPOINT } from "@constants/routes";

export const UserUpdate = async (data: any) => {
  try {
    const response = await axios.put(USER_WITH_ID_ENDPOINT(data.id), data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
