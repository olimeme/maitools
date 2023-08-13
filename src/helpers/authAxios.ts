import axios from "axios";

const authAxios = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 300000,
});

authAxios.interceptors.request.use(
  (request) => {
    request.headers.Authorization = `JWT ${localStorage.getItem("token")}`;
    return request;
  },

  (error) => Promise.reject(error)
);

authAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default authAxios;
