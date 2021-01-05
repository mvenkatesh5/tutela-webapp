import axios from "axios";
// constants
import { BASE_STAGING, BASE_LOCAL, BASE_PROD } from "@constants/routes";

// if (process.env.APP_ENV === "production") {
//   axios.defaults.baseURL = BASE_PROD;
// } else if (process.env.APP_ENV === "staging") {
//   axios.defaults.baseURL = BASE_STAGING;
// } else {
//   axios.defaults.baseURL = BASE_LOCAL;
// }

axios.defaults.baseURL = BASE_PROD;

export function setAxiosHeader(token: string) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
  } else {
    axios.defaults.headers.common["Authorization"] = "";
  }
}
