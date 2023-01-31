import axios from "axios";
import { axiosEdisonInstance } from "@config/axios";
// api routes
import {
  RESOURCE_CREATE_ENDPOINT,
  RESOURCE_NODE_OPERATIONS_ENDPOINT,
  S3_ENDPOINT,
  USER_RESOURCE_ENDPOINT,
  USER_RESOURCE_WITH_ID_ENDPOINT,
  RESOURCE_NODE_ENDPOINT,
  RESOURCE_ASSESSMENT_USER_ALLOCATION,
  RESOURCE_ASSESSMENT_USER_DETAILS,
  EDISON_ASSESSMENT_ENDPOINT,
} from "@constants/routes";

export const ResourceCreate = async (data: any) => {
  try {
    const response = await axios.post(RESOURCE_CREATE_ENDPOINT, data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const ResourceNodeEdit = async (data: any) => {
  try {
    const response = await axios.put(RESOURCE_NODE_ENDPOINT(data.id), data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const ResourceNodeOperation = async (data: any) => {
  try {
    const response = await axios.post(RESOURCE_NODE_OPERATIONS_ENDPOINT, data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const ResourceFileUpload = async (data: any, config: any) => {
  try {
    const response = await axios.post(S3_ENDPOINT, data, config);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const AttachResourceToUser = async (data: any) => {
  try {
    const response = await axios.post(USER_RESOURCE_ENDPOINT, data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const AttachResourceToUserPromise = async (data: any) => {
  const promiseData = [];
  for (let i = 0; i < data.length; i++) {
    promiseData.push(axios.post(USER_RESOURCE_ENDPOINT, data[i]));
  }
  return await Promise.all(promiseData)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error.response.data;
    });
};

export const RemoveResourceFromUser = async (id: any) => {
  try {
    const response = await axios.delete(USER_RESOURCE_WITH_ID_ENDPOINT(id));
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const CreateResourceUserAllocation = async (data: any) => {
  try {
    const response = await axios.post(
      RESOURCE_ASSESSMENT_USER_ALLOCATION(data?.node_id),
      data.data
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
export const UpdateResourceUserAllocation = async (data: any) => {
  try {
    const response = await axios.put(RESOURCE_ASSESSMENT_USER_ALLOCATION(data?.node_id), data.data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const FetchEdisonAssessmentResult = async (data: any) => {
  try {
    const response = await axiosEdisonInstance.post(EDISON_ASSESSMENT_ENDPOINT, data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
