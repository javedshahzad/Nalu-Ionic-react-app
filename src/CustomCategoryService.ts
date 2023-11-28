import axios from "axios";
import { HTTP } from "@awesome-cordova-plugins/http";
import { isPlatform } from "@ionic/react";

const jwtToken = localStorage.getItem("jwtToken");

const customHeaders = {
  Authorization: `Bearer ${jwtToken}`,
};

const customCordovaHeaders = {
  "Authorization": `Bearer ${jwtToken}`,
};

const CustomCategoryApiService = {
  get: async (url: string) => {
    if (isPlatform("ios")) {
      const response = await HTTP.get(url, {}, customCordovaHeaders);
      return JSON.parse(response.data);
    } else {
      return (await axios.get(url, { headers: customHeaders })).data;
    }
  },

  post: async (url: string, data: any) => {
    if (isPlatform("ios")) {
      const response = await HTTP.post(url, data, customCordovaHeaders);
      return JSON.parse(response.data);
    } else {
      return (await axios.post(url, data, { headers: customHeaders })).data;
    }
  },

  postCall2: async (url: string) => {
    if (isPlatform("ios")) {
      const response = await HTTP.post(url, {}, customCordovaHeaders);
      return JSON.parse(response.data);
    } else {
      return (await axios.post(url, {}, { headers: customHeaders })).data;
    }
  },

  postCall_3: async (url: string) => {
    if (isPlatform("ios")) {
      const response = await HTTP.post(url, {}, customCordovaHeaders);
      return JSON.parse(response.data);
    } else {
      return (await axios.post(url, null, { headers: customHeaders })).data;
    }
  },

  put: async (url: string) => {
    if (isPlatform("ios")) {
      const response = await HTTP.put(url, {}, customCordovaHeaders);
      return JSON.parse(response.data);
    } else {
      return (await axios.put(url, {}, { headers: customHeaders })).data;
    }
  },

  put_2: async (url: string) => {
    if (isPlatform("ios")) {
      const response = await HTTP.put(url, {}, customCordovaHeaders);
      return JSON.parse(response.data);
    } else {
      return (await axios.put(url, null, { headers: customHeaders })).data;
    }
  },
};

export default CustomCategoryApiService;