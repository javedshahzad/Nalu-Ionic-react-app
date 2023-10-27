import axios from "axios";

const CustomCategoryApiService = {
  get: async (url: string) => {
    const response = await axios.get(url);

    return response.data;
  },

  post: async (url: string, data: any, token: any) => {
    // try {

    const customHeaders = {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    };
    const response = await axios.post(url, data, customHeaders);
    return response.data;
  },
};

export default CustomCategoryApiService;
