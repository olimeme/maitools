import axios from "axios";
import { CookieManager } from "../helpers/CookieManager";
import authAxios from "../helpers/authAxios";

export interface LoginData {
  email: string;
  password: string;
}

class AuthService {
  static baseURL = import.meta.env.VITE_API_BASE_URL;

  static isLoggedIn() {
    return !!CookieManager.getCookie("token");
  }

  static async login(data: LoginData) {
    try {
      const response = await authAxios.post(`/login`, data);
      if (response.status === 200) {
        this.setToken(response.data.user.token);
        this.setCredentials(response.data.user);
        return Promise.resolve(response);
      }
    } catch (error: any) {
      const message = error.response?.data?.message;
      if (message) {
        return Promise.reject(message);
      }
      const defaultErr = error.response?.data?.statusText;
      if (defaultErr) {
        return Promise.reject(defaultErr);
      } else {
        return Promise.reject("Server Error");
      }
    }
  }

  static async register(data: LoginData) {
    try {
      const response = await authAxios.post(`/register`, data);
      if (response.status === 200) {
        this.setToken(response.data.accessToken);
        this.setCredentials(response.data.user);
        return Promise.resolve(response);
      }
    } catch (error: any) {
      const message = error.response?.data?.message;
      if (message) {
        return Promise.reject(message);
      }
      const defaultErr = error.response?.data?.statusText;
      if (defaultErr) {
        return Promise.reject(defaultErr);
      } else {
        return Promise.reject("Server Error");
      }
    }
  }

  static setCredentials(response: any) {
    localStorage.setItem("user", JSON.stringify(response));
  }

  static setToken(response: any) {
    CookieManager.setCookie("token", response);
  }

  static logout() {
    CookieManager.eraseCookie("token");
    localStorage.removeItem("user");
  }
}

export default AuthService;
