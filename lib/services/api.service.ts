import axios, { AxiosPromise } from "axios";
// cookie
import cookie from "js-cookie";

abstract class APIService {
  //Passing bearer for all api calls
  getAxiosHeaders(): any {
    return {
      Authorization: `Bearer ${cookie.get("accessToken")}`,
      "Content-Type": "application/json",
    };
  }

  // Setting access token in a cookie
  setAccessToken(token: string): void {
    cookie.set("accessToken", token);
  }

  // Setting refresh token in a cookie
  setRefreshToken(token: string): void {
    cookie.set("refreshToken", token);
  }

  purgeAuth(): void {
    cookie.remove("accessToken");
    cookie.remove("refreshToken");
  }

  // Axios get method
  get(url: string): AxiosPromise<any> {
    return axios({ method: "GET", url, headers: this.getAxiosHeaders() });
  }

  post(url: string, data = {}): AxiosPromise<any> {
    return axios({
      method: "POST",
      url,
      data,
      headers: this.getAxiosHeaders(),
    });
  }

  put(url: string, data = {}): AxiosPromise<any> {
    return axios({
      method: "PUT",
      url,
      data,
      headers: this.getAxiosHeaders(),
    });
  }

  delete(url: string): AxiosPromise<any> {
    return axios({
      method: "DELETE",
      url,
      headers: this.getAxiosHeaders(),
    });
  }
}

export default APIService;
