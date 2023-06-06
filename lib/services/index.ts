import axios from "axios";
import { axiosPublicInstance } from "@config/axios";
// api routes
import { S3_ENDPOINT } from "@constants/routes";

export const APIFetcher = async (url: any) => {
  try {
    const response = await axios.get(url);

    return response.data;
  } catch (error: any) {
    throw error.response?.data;
  }
};

export const APIPublicFetcher = async (url: any) => {
  try {
    const response = await axiosPublicInstance.get(url);
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw error.response?.data;
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

export const AsyncUploadS3File = async (data: any) => {
  const promiseData = [];
  for (let i = 0; i < data.length; i++) {
    promiseData.push(axios.post(S3_ENDPOINT, data[i]));
  }
  return await Promise.all(promiseData)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error.response.data;
    });
};
