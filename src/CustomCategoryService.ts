import axios from "axios";

const jwtToken = localStorage.getItem("jwtToken");
const customHeaders = {
  headers: {
    Authorization: `Bearer ${jwtToken}`,
  },
};

const CustomCategoryApiService = {
  get: async (url: string) => (await axios.get(url)).data,

  post: async (url: string, data: any) =>
    (await axios.post(url, data, customHeaders)).data,

  postCall2: async (url: string) => (await axios.post(url, customHeaders)).data,

  postCall_3: async (url: string, token: string) => {
    const customHeaders = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.post(url, null, customHeaders);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },

  put: async (url: string) => (await axios.put(url, customHeaders)).data,

  put_2: async (url: string, token: any) => {
    const customHeaders = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.put(url, null, customHeaders);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },
};

export default CustomCategoryApiService;
