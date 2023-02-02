import axios from "axios";
import Cookies from "js-cookie";

export const convertCookieStringToObject = (cookieHeader: string | undefined) => {
  const list: any = {};
  if (!cookieHeader) return list;

  cookieHeader.split(`;`).forEach(function (cookie) {
    let [name, ...rest] = cookie.split(`=`);
    name = name?.trim();
    if (!name) return;
    const value = rest.join(`=`).trim();
    if (!value) return;
    list[name] = decodeURIComponent(value);
  });

  return list;
};

export const fetchUserData = async (context: any) => {
  const { req } = context;
  const cookies: any = convertCookieStringToObject(req?.headers?.cookie);
  let token_details = null;
  try {
    token_details = JSON.parse(cookies?.token_details);
  } catch {
    token_details = null;
  }
  // const BE_URL = process.env.NEXT_PUBLIC_BE_URL || "http://127.0.0.1:8000";
  // const accessToken = cookies.token_details.access_token;
  // const user_id = cookies.token_details.user.id;
  // const userData = await axios
  //   .get(`${BE_URL}/api/users/${user_id}/`, {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   })
  //   .then((response) => response.data)
  //   .catch((error) => {
  //     console.log("err", error);
  //     return null;
  //   });

  // console.log("Userdata", userData);

  return token_details;
};
