import axios from "axios";
// cookie
import cookie from "js-cookie";
// constants
import { BASE_STAGING, BASE_LOCAL, BASE_PROD } from "@constants/routes";
// cookie helpers
import { logout } from "lib/cookie";

// if (process.env.APP_ENV === "production") {
//   axios.defaults.baseURL = BASE_PROD;
// } else if (process.env.APP_ENV === "staging") {
//   axios.defaults.baseURL = BASE_STAGING;
// } else {
//   axios.defaults.baseURL = BASE_LOCAL;
// }

axios.defaults.baseURL = BASE_PROD;
// axios.defaults.baseURL = BASE_LOCAL;

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

const UNAUTHORIZED = [401];
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
