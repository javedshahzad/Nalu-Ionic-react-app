import axios from "axios";
import { HTTP } from "@awesome-cordova-plugins/http";
import { isPlatform } from "@ionic/react";

const jwtToken = localStorage.getItem("jwtToken");

const customAxiosHeaders = {
  headers: {
    Authorization: `Bearer ${jwtToken}`,
  },
};

const customCordovaHeaders = {
  Authorization: `Bearer ${jwtToken}`,
};

const apiService = {
  get: async (url: string) => {
    // if (isPlatform("ios")) {
    //   const response = await HTTP.get(url, {}, customCordovaHeaders);
    //   return JSON.parse(response.data);
    // } else {
    return (await axios.get(url, customAxiosHeaders)).data;
    //  }
  },

  post: async (url: string, data: any) => {
    // if (isPlatform("ios")) {
    //   const response = await HTTP.post(url, data, customCordovaHeaders);
    //   return JSON.parse(response.data);
    // } else {
    return (await axios.post(url, data, customAxiosHeaders)).data;
    //   }
  },

  put: async (url: string, data: any) => {
    // if (isPlatform("ios")) {
    //   const response = await HTTP.put(url, data, customCordovaHeaders);
    //   return JSON.parse(response.data);
    // } else {
    return (await axios.put(url, data, customAxiosHeaders)).data;
    //  }
  },

  // Uncomment and modify the delete method if needed
  // delete: async (url: string) => {
  //   if (isPlatform("ios")) {
  //     const response = await HTTP.delete(url, {}, customCordovaHeaders);
  //     return JSON.parse(response.data);
  //   } else {
  //     return (await axios.delete(url, customAxiosHeaders)).data;
  //   }
  // },
};

export default apiService;
