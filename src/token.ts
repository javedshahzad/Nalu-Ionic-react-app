const USER_TOKEN = localStorage.getItem("jwtToken") || "";
const WP_TOKEN = localStorage.getItem("jwtToken") || "";
const USER_ID = localStorage.getItem("userId") || "";
let user = USER_ID;
let token = USER_TOKEN;
let wp_token = WP_TOKEN;

const tokenService = {
  updateToken: (tken: string = USER_TOKEN) => {
    token = tken;
  },
  updateWPToken: (tken: string = WP_TOKEN) => {
    wp_token = tken;
  },
  updateUserId: (usr: string = USER_ID) => {
    user = usr;
  },
  getToken: () => token,
  getWPToken: () => wp_token,
  getUserId: () => user,
};

export default tokenService;