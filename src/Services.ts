import axios from "axios";

const customHeaders = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
  },
};

const apiService = {
  get: async (url: string) => (await axios.get(url, customHeaders)).data,
  post: async (url: string, data: any) =>
    (await axios.post(url, data, customHeaders)).data,
  put: async (url: string, data: any) =>
    (await axios.put(url, data, customHeaders)).data,
  // delete: async (url: string) => (await axios.delete(url, customHeaders)).data,  // Uncomment if needed
};

export default apiService;
