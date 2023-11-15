import { instance as axiosInstance } from "./axiosInstance";

export const axiosBaseQuery = async ({
  url,
  method,
  data,
  params,
  contentType,
}) => {
  try {
    const result = await axiosInstance({
      url,
      method,
      data,
      params,
      headers: {
        "Content-Type": contentType || "application/json",
      },
      withCredentials: true,
    });
    return result;
  } catch (axiosError) {
    let err = axiosError;
    return {
      error: {
        status: err.response?.status,
        data: err.response?.data || err.message,
      },
    };
  }
};
