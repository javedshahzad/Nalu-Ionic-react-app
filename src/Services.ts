import axios from "axios";

const apiService = {
  get: async (url: string, token: any) => {
    // try {

    const customHeaders = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(url, customHeaders);
    return response.data;
    // } catch (error) {
    //   throw error;
    // }
  },

  post: async (url: string, data: any, token: any) => {
    // try {

    const customHeaders = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(url, data, customHeaders);
    return response.data;
    // } catch (error) {
    //   throw error;
    // }
  },

  put: async (url: string, data: any, token: any) => {
    const customHeaders = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.put(url, data, customHeaders);
    return response.data;
  },

  //   delete: async (url: string) => {
  //     try {
  //       const response = await axios.delete(url);
  //       return response.data;
  //     } catch (error) {
  //       throw error;
  //     }
  //   },
};

export default apiService;
