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

const { NEXT_PUBLIC_CONNECT_URL } = process.env;

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
    // window.open(
    //   `${NEXT_PUBLIC_CONNECT_URL}/cookie?token=${token_details.access_token}&user_id=${token_details.user.id}`,
    //   "_blank"
    // );
    setAxiosHeader(token_details.access_token);
  }
};

export const getAuthenticationToken = () => {
  const tokenDetails = cookie.get("token_details") ? cookie.get("token_details") : null;
  return tokenDetails;
};

export const removeAuthenticationToken = () => {
  cookie.remove("token_details");
};

// removing all user tokens
export const logout = () => {
  removeAuthenticationToken();
  Router.push("/signin");
};
