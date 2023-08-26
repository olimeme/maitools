import axios from "axios";
import { CookieManager } from "./cookieManager";

const authAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 300000,
});

authAxios.interceptors.request.use(
  (request) => {
    request.headers.Authorization = `JWT ${CookieManager.getCookie("token")}`;
    return request;
  },

  (error) => Promise.reject(error)
);

authAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      CookieManager.eraseCookie("token");
      localStorage.removeItem("user");
    }

    return Promise.reject(error);
  }
);

export default authAxios;
