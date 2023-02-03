import axios from "axios";
// cookie
import cookie from "js-cookie";
// constants
import {
  BASE_STAGING,
  BASE_LOCAL,
  BASE_PROD,
  ZOOM_RECORDINGS_GO_ENDPOINT,
  EDISON_ASSESSMENT_BASE_URL,
} from "@constants/routes";
// cookie helpers
import { logout } from "lib/cookie";

// axios for go instance
export const axiosInstance = axios.create();
export const axiosPublicInstance = axios.create();
export const axiosEdisonInstance = axios.create();

let baseURL =
  process.env.NEXT_PUBLIC_APP_ENVIRONMENT === "production"
    ? BASE_PROD
    : process.env.NEXT_PUBLIC_APP_ENVIRONMENT === "development"
    ? BASE_STAGING
    : BASE_LOCAL;

axios.defaults.baseURL = baseURL;
axiosPublicInstance.defaults.baseURL = baseURL;
axiosEdisonInstance.defaults.baseURL = EDISON_ASSESSMENT_BASE_URL;

export function setAxiosHeader(token: string) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = "JWT " + token;
  } else {
    axios.defaults.headers.common["Authorization"] = "";
  }
}

(function () {
  const tokenDetails: any = cookie.get("token_details");
  if (tokenDetails) {
    const token = JSON.parse(tokenDetails);
    if (token) {
      axios.defaults.headers.common.Authorization = `JWT ${token.access_token}`;
    } else {
      axios.defaults.headers.common.Authorization = "";
    }
  }
})();

const UNAUTHORIZED = [401, 403];
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status }: any = error.response;
    if (UNAUTHORIZED.includes(status)) {
      logout();
      window.location.href = "/signin";
    }
    return Promise.reject(error);
  }
);
