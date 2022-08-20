import axios from "axios";
// api routes
import { RESOURCE_WITH_NODE_ENDPOINT } from "@constants/routes";

export const AsyncResourceFetcher = async (data: any) => {
  const promiseData = [];
  for (let i = 0; i < data.length; i++) {
    promiseData.push(axios.get(RESOURCE_WITH_NODE_ENDPOINT(data[i])));
  }
  return await Promise.all(promiseData)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error.response.data;
    });
};
