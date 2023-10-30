const USER_TOKEN = localStorage.getItem("jwtToken") || "";
let user = "65194710d160530510955d7d";
<<<<<<< HEAD
let token = USER_TOKEN;
let wp_token = USER_TOKEN;

const tokenService = {
  updateToken: (tken: string = USER_TOKEN) => {
    token = tken;
=======

let token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwcC5teW5hbHUuY29tIiwiaWF0IjoxNjk4NjUzNjQ4LCJuYmYiOjE2OTg2NTM2NDgsImV4cCI6MTY5OTI1ODQ0OCwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.XP-ogecGY7QyrBn2tddqVT8XB1G18LoVvTSGlxpnBIM";

let wp_token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwcC5teW5hbHUuY29tIiwiaWF0IjoxNjk3MjkyMTk2LCJuYmYiOjE2OTcyOTIxOTYsImV4cCI6MTY5Nzg5Njk5NiwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMTY1In19fQ.1WZS1O5JTm3koX5u90o_Cjce5BnqJrrWg-ZW16uwqEg";

const tokenService = {
  updateToken: (tken?: any) => {
    token = tken
      ? tken
      : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwcC5teW5hbHUuY29tIiwiaWF0IjoxNjk4NjUzNjQ4LCJuYmYiOjE2OTg2NTM2NDgsImV4cCI6MTY5OTI1ODQ0OCwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.XP-ogecGY7QyrBn2tddqVT8XB1G18LoVvTSGlxpnBIM";
>>>>>>> f8254eda3e9bc814e267947144dc92eaeaabe768
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
