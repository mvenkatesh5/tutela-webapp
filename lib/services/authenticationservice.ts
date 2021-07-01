import axios from "axios";
// api routes
import { AUTH_LOGIN, AUTH_SIGNUP, FORGOT_PASSWORD, RESET_PASSWORD } from "@constants/routes";

export const LogIn = async (data: any) => {
  try {
    const response = await axios.post(AUTH_LOGIN, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const SignUp = async (data: any) => {
  try {
    const response = await axios.post(AUTH_SIGNUP, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const ForgotPassword = async (data: any) => {
  try {
    const response = await axios.post(FORGOT_PASSWORD, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const ResetPassword = async (data: any) => {
  try {
    const response = await axios.post(RESET_PASSWORD, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
