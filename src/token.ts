const USER_TOKEN = localStorage.getItem("jwtToken") || "";
const WP_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwcC5teW5hbHUuY29tIiwiaWF0IjoxNjk3MjkyMTk2LCJuYmYiOjE2OTcyOTIxOTYsImV4cCI6MTY5Nzg5Njk5NiwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMTY1In19fQ.1WZS1O5JTm3koX5u90o_Cjce5BnqJrrWg-ZW16uwqEg";
const USER_ID = localStorage.getItem("userId") || "65194710d160530510955d7d";
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