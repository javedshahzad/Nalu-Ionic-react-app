import axios from "axios";

const JournalAdditionApiService = {
  get: async (url: string) => {
    const response = await axios.get(url,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    });

    return response.data;
  },
};

export default JournalAdditionApiService;
