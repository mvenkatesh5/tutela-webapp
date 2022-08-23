import axios from "axios";
// api routes
import { CONTACT_ENDPOINT, CONTACT_WITH_ID_ENDPOINT } from "@constants/routes";

export const ContactCreate = async (data: any) => {
  try {
    const response = await axios.post(CONTACT_ENDPOINT, data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const ContactUpdate = async (data: any) => {
  try {
    const response = await axios.put(CONTACT_WITH_ID_ENDPOINT(data.id), data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const ContactDelete = async (id: Number) => {
  try {
    const response = await axios.delete(CONTACT_WITH_ID_ENDPOINT(id));
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
