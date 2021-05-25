import axios from "axios";
// api routes
import {
  RESOURCE_CREATE_ENDPOINT,
  RESOURCE_NODE_OPERATIONS_ENDPOINT,
  S3_ENDPOINT,
  USER_RESOURCE_ENDPOINT,
  USER_RESOURCE_WITH_ID_ENDPOINT,
} from "@constants/routes";

export const ResourceCreate = async (data: any) => {
  try {
    const response = await axios.post(RESOURCE_CREATE_ENDPOINT, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const ResourceNodeOperation = async (data: any) => {
  try {
    const response = await axios.post(RESOURCE_NODE_OPERATIONS_ENDPOINT, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const ResourceFileUpload = async (data: any, config: any) => {
  try {
    const response = await axios.post(S3_ENDPOINT, data, config);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const AttachResourceToUser = async (data: any) => {
  try {
    const response = await axios.post(USER_RESOURCE_ENDPOINT, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const RemoveResourceFromUser = async (id: any) => {
  try {
    const response = await axios.delete(USER_RESOURCE_WITH_ID_ENDPOINT(id));
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
