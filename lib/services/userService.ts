import axios from "axios";
// api routes
import { USER_WITH_ID_ENDPOINT, USER_PARENT_LINKING_ENDPOINT } from "@constants/routes";

export const UserUpdate = async (data: any) => {
  try {
    const response = await axios.put(USER_WITH_ID_ENDPOINT(data.id), data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const UserParentLinking = async (data: any) => {
  try {
    const response = await axios.post(USER_PARENT_LINKING_ENDPOINT, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
