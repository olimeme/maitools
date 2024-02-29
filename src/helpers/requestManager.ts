import authAxios from "./authAxios";

export const requestManager = async (
  url: string,
  data: any,
  method: "get" | "post" | "update" | "delete" | "put"
) => {
  try {
    const response = await authAxios(
      url,
      method === "get" ? { params: { ...data } } : { data: { ...data }, method }
    );
    return Promise.resolve(response.data);
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
};
