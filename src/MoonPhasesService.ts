import axios from "axios";

const MoonPhasesServce = {
  get: async (url: string) => {
    const response = await axios.get(url,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    });

    return response.data;
  },
};

export default MoonPhasesServce;
