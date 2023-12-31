import { axiosBaseQuery } from "../helpers/axios/baseQuery";

export const skillApi = {
  getAllSkills: async () =>
    axiosBaseQuery({
      url: "/skills",
      method: "GET",
    }),

  // Other auth-related API functions
};

export default skillApi;
