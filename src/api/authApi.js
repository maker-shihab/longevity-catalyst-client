import { axiosBaseQuery } from "../helpers/axios/baseQuery";

export const authApi = {
  login: async (credentials) =>
    axiosBaseQuery({
      url: "/auth/login",
      method: "POST",
      data: credentials,
    }),
  signup: async (userData) =>
    axiosBaseQuery({
      url: "/auth/signup",
      method: "POST",
      data: userData,
    }),

  getUserProfile: async (userId) =>
    axiosBaseQuery({
      url: `/users/profile/${userId}`,
      method: "GET",
    }),
  logoutUser: async () =>
    axiosBaseQuery({
      url: `/auth/logout`,
      method: "POST",
    }),

};

export default authApi;
