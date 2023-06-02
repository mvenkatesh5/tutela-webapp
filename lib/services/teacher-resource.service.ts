import axios from "axios";
// api routes
import {
  RESOURCE_ENDPOINT,
  TEACHER_NODE_ENDPOINT,
  NODE_WITH_NODE_ID_AND_TEACHER_WITH_TEACHER_ID_ENDPOINT,
  NODES_TEACHERS_ENDPOINT,
  NODES_WITH_TEACHER_ID_ENDPOINT,
} from "@constants/routes";

export const TeacherResourceService = {
  getAllResources: async () => {
    try {
      const response = await axios.get(RESOURCE_ENDPOINT);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },

  getAllTeacherResources: async () => {
    try {
      const response = await axios.get(NODES_TEACHERS_ENDPOINT);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },

  getAllTeacherResourcesByTeacherId: async (teacher_id: any) => {
    try {
      const response = await axios.get(NODES_WITH_TEACHER_ID_ENDPOINT(teacher_id));
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },

  create: async (data: any) => {
    try {
      const response = await axios.post(TEACHER_NODE_ENDPOINT(data?.node), data);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },

  edit: async (data: any) => {
    try {
      const response = await axios.put(
        NODE_WITH_NODE_ID_AND_TEACHER_WITH_TEACHER_ID_ENDPOINT(data?.id, data?.teacher_id),
        data
      );
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },

  delete: async (data: any) => {
    try {
      const response = await axios.delete(
        NODE_WITH_NODE_ID_AND_TEACHER_WITH_TEACHER_ID_ENDPOINT(data?.node, data?.teacher)
      );
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
};
