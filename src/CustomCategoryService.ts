import axios from "axios";

const jwtToken = localStorage.getItem("jwtToken");
const customHeaders = {
  headers: {
    Authorization: `Bearer ${jwtToken}`,
  },
};

const CustomCategoryApiService = {
  get: async (url: string) => (await axios.get(url)).data,

  post: async (url: string, data: any) => (await axios.post(url, data, customHeaders)).data,

  postCall2: async (url: string) => (await axios.post(url, customHeaders)).data,

  put: async (url: string) => (await axios.put(url, customHeaders)).data,
};

export default CustomCategoryApiService;