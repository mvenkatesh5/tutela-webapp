import axios from "axios";
// api routes
import { NEWS_ENDPOINT, NEWS_WITH_ID_ENDPOINT } from "@constants/routes";

export const NewsCreate = async (data: any) => {
  try {
    const response = await axios.post(NEWS_ENDPOINT, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const NewsUpdate = async (data: any) => {
  try {
    const response = await axios.put(NEWS_WITH_ID_ENDPOINT(data.id), data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const NewsDelete = async (id: Number) => {
  try {
    const response = await axios.delete(NEWS_WITH_ID_ENDPOINT(id));
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
