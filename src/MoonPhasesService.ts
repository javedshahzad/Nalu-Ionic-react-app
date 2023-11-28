import axios from "axios";
import { HTTP } from "@awesome-cordova-plugins/http";
import { isPlatform } from "@ionic/react";

const MoonPhasesService = {
  get: async (url: string) => {
    if (isPlatform("ios")) {
      // Use Cordova HTTP plugin for iOS
      const response = await HTTP.get(url, {}, {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      });
      return JSON.parse(response.data); // Parse the response data
    } else {
      // Use Axios for other platforms
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });
      return response.data; // Return the response data directly
    }
  },
};

export default MoonPhasesService;
