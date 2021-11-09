import axios from "axios";
// api routes
import { TESTS_ENDPOINT, TESTS_WITH_ID_ENDPOINT } from "@constants/routes";

export const TestsCreate = async (data: any) => {
  try {
    const response = await axios.post(TESTS_ENDPOINT, data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const TestsUpdate = async (data: any) => {
  try {
    const response = await axios.put(TESTS_WITH_ID_ENDPOINT(data.id), data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const TestsDelete = async (id: Number) => {
  try {
    const response = await axios.delete(TESTS_WITH_ID_ENDPOINT(id));
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
