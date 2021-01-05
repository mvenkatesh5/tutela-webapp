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
  if (!token_details) {
    if (typeof window === "undefined") {
      context.res.writeHead(302, { Location: "/signin" });
      context.res.end();
    } else {
      redirect(context, "/signin");
    }
  }
  return token_details;
};

// setting authentication tokens
export const setAuthenticationToken = (token_details: any) => {
  if (token_details) {
    cookie.set("token_details", token_details);
    setAxiosHeader(token_details.access_token);
  }
};

export const getAuthenticationToken = () => {
  const tokenDetails = cookie.get("token_details");
  return tokenDetails;
};

export const removeAuthenticationToken = () => {
  cookie.remove("token_details");
};
