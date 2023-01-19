// next imports
import Router from "next/router";
// next-cookie
import nextCookie from "next-cookies";
// js cookie
import cookie from "js-cookie";
// axios
import { setAxiosHeader } from "config/axios";
// redirect
import redirect from "./redirect";

// getting server side cookies
export const getServerAuthenticationCookie = (context: any) => {
  const { token_details } = nextCookie(context);
  if (token_details) return token_details;
  else return;
};

// setting authentication tokens
export const setAuthenticationToken = (token_details: any) => {
  if (token_details) {
    const token = token_details ? JSON.stringify(token_details) : "";
    cookie.set("token_details", token);
    cookie.set("user_id", token_details.user.id);
    cookie.set("token", token_details.access_token);
    setAxiosHeader(token_details.access_token);
  }
};

export const getAuthenticationToken = () => {
  const tokenDetails = cookie.get("token_details") ? cookie.get("token_details") : null;
  return tokenDetails;
};

export const removeAuthenticationToken = () => {
  cookie.remove("token_details");
  cookie.remove("user_id");
  cookie.remove("token");
};

// removing all user tokens
export const logout = () => {
  removeAuthenticationToken();
  Router.push("/signin");
};
