import axios from "axios";

const JournalAdditionApiService = {
  get: async (url: string) => {
    const response = await axios.get(url);

    return response.data;
  },
};

export default JournalAdditionApiService;
