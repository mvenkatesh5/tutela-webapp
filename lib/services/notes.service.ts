import axios from "axios";
// api routes
import { NOTES_ENDPOINT, NOTES_WITH_ID_ENDPOINT } from "@constants/routes";

export const NotesCreate = async (data: any) => {
  try {
    const response = await axios.post(NOTES_ENDPOINT, data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const NotesUpdate = async (data: any) => {
  try {
    const response = await axios.put(NOTES_WITH_ID_ENDPOINT(data.id), data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const NotesDelete = async (notes_id: any) => {
  try {
    const response = await axios.delete(NOTES_WITH_ID_ENDPOINT(notes_id));
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
