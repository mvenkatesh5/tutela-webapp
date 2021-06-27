import axios from "axios";
// api routes
import {
  BULK_SESSION_ENDPOINT,
  SESSION_ENDPOINT,
  SESSION_WITH_ID_ENDPOINT,
  SESSION_USER_ENDPOINT,
  ZOOM_MEETING_ENDPOINT,
  SESSION_USER_WITH_ID_ENDPOINT,
  BULK_SESSION_DELETE_ENDPOINT,
} from "@constants/routes";

export const SessionBulkCreate = async (data: any) => {
  try {
    const response = await axios.post(BULK_SESSION_ENDPOINT, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const SessionCreate = async (data: any) => {
  try {
    const response = await axios.post(SESSION_ENDPOINT, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const SessionUpdate = async (data: any) => {
  try {
    const response = await axios.put(SESSION_WITH_ID_ENDPOINT(data.id), data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const SessionDelete = async (id: Number) => {
  try {
    const response = await axios.delete(SESSION_WITH_ID_ENDPOINT(id));
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const BulkSessionDelete = async (data: any) => {
  try {
    const response = await axios.post(BULK_SESSION_DELETE_ENDPOINT, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const SessionUserCreate = async (data: any) => {
  try {
    const response = await axios.post(SESSION_USER_ENDPOINT, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const SessionBulkUserCreate = async (data: any) => {
  const promiseData = [];
  for (let i = 0; i < data.length; i++) {
    promiseData.push(axios.post(SESSION_USER_ENDPOINT, data[i]));
  }
  return await Promise.all(promiseData)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error.response.data;
    });
};

export const SessionUserDelete = async (data: any) => {
  try {
    const response = await axios.delete(SESSION_USER_WITH_ID_ENDPOINT(data));
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const SessionBulkUserDelete = async (data: any) => {
  const promiseData = [];
  for (let i = 0; i < data.length; i++) {
    promiseData.push(axios.delete(SESSION_USER_WITH_ID_ENDPOINT(data[i])));
  }
  return await Promise.all(promiseData)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error.response.data;
    });
};

export const CreateZoomMeeting = async (data: any) => {
  try {
    const response = await axios.post(ZOOM_MEETING_ENDPOINT, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
