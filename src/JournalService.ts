import axios from "axios";
import { HTTP } from "@awesome-cordova-plugins/http";
import { isPlatform } from "@ionic/react";

const JournalAdditionApiService = {
  get: async (url: string) => {
    if (isPlatform("ios")) {
      // Using Cordova HTTP plugin for iOS
      const response = await HTTP.get(url, {}, {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      });
      return JSON.parse(response.data); // Parsing response data
    } else {
      // Using Axios for other platforms
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });
      return response.data; // Directly returning response data
    }
  },
};

export default JournalAdditionApiService;
