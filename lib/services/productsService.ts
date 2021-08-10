import axios from "axios";
// api routes
import {
  PRODUCTS_ENDPOINT,
  PRODUCTS_WITH_ID_ENDPOINT,
  PRODUCT_USER_ENDPOINT,
  PRODUCT_USER_DELETE_ENDPOINT,
  PRODUCT_RESOURCES_ENDPOINT,
} from "@constants/routes";

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

export const AddUserUnderProduct = async (data: any) => {
  try {
    const response = await axios.post(PRODUCT_USER_ENDPOINT(data.product));
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const AddResourceUnderProduct = async (data: any) => {
  try {
    const response = await axios.post(PRODUCT_RESOURCES_ENDPOINT(data.product), data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
