import axios from "axios";
// api routes
import { PRODUCTS_ENDPOINT, PRODUCTS_WITH_ID_ENDPOINT } from "@constants/routes";

export const ProductsCreate = async (data: any) => {
  try {
    const response = await axios.post(PRODUCTS_ENDPOINT, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const ProductsUpdate = async (data: any) => {
  try {
    const response = await axios.put(PRODUCTS_WITH_ID_ENDPOINT(data.id), data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const ProductsDelete = async (id: Number) => {
  try {
    const response = await axios.delete(PRODUCTS_WITH_ID_ENDPOINT(id));
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
