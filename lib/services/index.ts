import axios from "axios";

export const APIFetcher = async (url: any) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
