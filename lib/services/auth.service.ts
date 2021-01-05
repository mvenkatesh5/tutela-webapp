import Router from "next/router";
// endpoints
import { AUTH_LOGIN } from "@constants/routes";
// services
import APIService from "./api.service";
// axios
import axios from "axios";

class AuthService extends APIService {
  // TODO: Validate Incoming service data with an interface
  // TODO: Validate Outgoing data with an interface
  logIn(data = {}): Promise<any> {
    // url mentioned here
    return this.post(AUTH_LOGIN, data)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }

  register(data = {}): Promise<any> {
    return this.post(AUTH_LOGIN, data)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }

  authenticateUser(accessToken: string, refreshToken: string): void {
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    this.setAccessToken(accessToken);
    this.setRefreshToken(refreshToken);
    Router.push("/explore");
  }

  logOut(): void {
    this.purgeAuth();
    Router.push("/");
  }
}

export default AuthService;