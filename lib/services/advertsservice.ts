import axios from "axios";
// api routes
import { ADVERTS_ENDPOINT, ADVERTS_WITH_ID_ENDPOINT } from "@constants/routes";

export const AdvertsCreate = async (data: any) => {
  try {
    const response = await axios.post(ADVERTS_ENDPOINT, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const AdvertsUpdate = async (data: any) => {
  try {
    const response = await axios.put(ADVERTS_WITH_ID_ENDPOINT(data.id), data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const AdvertsDelete = async (id: Number) => {
  try {
    const response = await axios.delete(ADVERTS_WITH_ID_ENDPOINT(id));
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
