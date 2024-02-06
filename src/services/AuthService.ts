import axios from "axios";
import { CookieManager } from "../helpers/CookieManager";

export interface LoginData {
  email: string;
  password: string;
}

class AuthService {
  static baseURL = import.meta.env.VITE_API_BASE_URL;

  static isLoggedIn() {
    return !!localStorage.getItem("user");
  }

  static async login(data: LoginData) {
    try {
      const response = await axios.post(`${this.baseURL}/login`, data);
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
    document.cookie = `token=${response}`;
  }

  static logout() {
    CookieManager.eraseCookie("token");
    localStorage.removeItem("user");
  }
}

export default AuthService;
