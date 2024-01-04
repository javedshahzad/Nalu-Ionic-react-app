import axios from "axios";
import { HTTP } from "@awesome-cordova-plugins/http";
import { isPlatform } from "@ionic/react";

// Function to get the headers for the request
const getHeaders = () => {
  const jwtToken = localStorage.getItem("jwtToken");

  // if (isPlatform("ios")) {
  //   // For Cordova, use quoted keys
  //   return {
  //     "Authorization": `Bearer ${jwtToken}`,
  //   };
  // } else {
  // For other platforms, use unquoted keys
  return {
    Authorization: `Bearer ${jwtToken}`,
  };
  // }
};

const CustomCategoryApiService = {
  get: async (url: string) => {
    const headers = getHeaders();
    // if (isPlatform("ios")) {
    //   const response = await HTTP.get(url, {}, headers);
    //   return JSON.parse(response.data);
    // } else {
    return (await axios.get(url, { headers })).data;
    //}
  },

  post: async (url: string, data: any) => {
    const headers = getHeaders();
    // if (isPlatform("ios")) {
    //   const response = await HTTP.post(url, data, headers);
    //   return JSON.parse(response.data);
    // } else {
    return (await axios.post(url, data, { headers })).data;
    // }
  },

  postCall2: async (url: string) => {
    const headers = getHeaders();
    // if (isPlatform("ios")) {
    //   const response = await HTTP.post(url, {}, headers);
    //   return JSON.parse(response.data);
    // } else {
    return (await axios.post(url, {}, { headers })).data;
    //  }
  },

  postCall_3: async (url: string) => {
    const headers = getHeaders();
    // if (isPlatform("ios")) {
    //   const response = await HTTP.post(url, {}, headers);
    //   return JSON.parse(response.data);
    // } else {
    return (await axios.post(url, null, { headers })).data;
    //  }
  },

  put: async (url: string) => {
    const headers = getHeaders();
    // if (isPlatform("ios")) {
    //   const response = await HTTP.put(url, {}, headers);
    //   return JSON.parse(response.data);
    // } else {
    return (await axios.put(url, {}, { headers })).data;
    //  }
  },

  put_2: async (url: string) => {
    const headers = getHeaders();
    // if (isPlatform("ios")) {
    //   const response = await HTTP.put(url, {}, headers);
    //   return JSON.parse(response.data);
    // } else {
    return (await axios.put(url, null, { headers })).data;
    //  }
  },
};

export default CustomCategoryApiService;
