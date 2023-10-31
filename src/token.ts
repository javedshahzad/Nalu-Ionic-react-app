const USER_TOKEN = localStorage.getItem("jwtToken") || "";
let user = "65194710d160530510955d7d";
let token = USER_TOKEN;
let wp_token = USER_TOKEN;

const tokenService = {
  updateToken: (tken: string = USER_TOKEN) => {
    token = tken;
  },
  updateWPToken: (tken: string = USER_TOKEN) => {
    wp_token = tken;
  },
  updateUserId: (usr: string = "65194710d160530510955d7d") => {
    user = usr;
  },
  getToken: () => token,
  getWPToken: () => wp_token,
  getUserId: () => user,
};

export default tokenService;
