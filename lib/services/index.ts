import axios from "axios";

export const APIFetcher = async (url: any) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw error.response.data;
  }
};

export const APIPusherWithData = async (url: any, data: any) => {
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw error.response.data;
  }
};

export const APIUpdater = async (url: any, data: any) => {
  try {
    const response = await axios.put(url, data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
