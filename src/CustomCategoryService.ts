import axios from "axios";

const CustomCategoryApiService = {
  get: async (url: string) => {
    const response = await axios.get(url);

    return response.data;
  },

  post: async (url: string, data: any, token: any) => {
    const customHeaders = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(url, data, customHeaders);
    return response.data;
  },

  postCall2: async (url: string, token: any) => {
    const customHeaders = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(url, customHeaders);

    return response.data;
  },
  put: async (url: string, token: any) => {
    const customHeaders = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.put(url, customHeaders);

    return response.data;
  },
};

export default CustomCategoryApiService;
