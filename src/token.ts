let user = "65194710d160530510955d7d";

let token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwcC5teW5hbHUuY29tIiwiaWF0IjoxNjk4NjUzNjQ4LCJuYmYiOjE2OTg2NTM2NDgsImV4cCI6MTY5OTI1ODQ0OCwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.XP-ogecGY7QyrBn2tddqVT8XB1G18LoVvTSGlxpnBIM";

let wp_token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwcC5teW5hbHUuY29tIiwiaWF0IjoxNjk3MjkyMTk2LCJuYmYiOjE2OTcyOTIxOTYsImV4cCI6MTY5Nzg5Njk5NiwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMTY1In19fQ.1WZS1O5JTm3koX5u90o_Cjce5BnqJrrWg-ZW16uwqEg";

const tokenService = {
  updateToken: (tken?: any) => {
    token = tken
      ? tken
      : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwcC5teW5hbHUuY29tIiwiaWF0IjoxNjk4NjUzNjQ4LCJuYmYiOjE2OTg2NTM2NDgsImV4cCI6MTY5OTI1ODQ0OCwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.XP-ogecGY7QyrBn2tddqVT8XB1G18LoVvTSGlxpnBIM";
  },
  updateWPToken: (tken?: any) => {
    wp_token = tken
      ? tken
      : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwcC5teW5hbHUuY29tIiwiaWF0IjoxNjk3MjkyMTk2LCJuYmYiOjE2OTcyOTIxOTYsImV4cCI6MTY5Nzg5Njk5NiwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMTY1In19fQ.1WZS1O5JTm3koX5u90o_Cjce5BnqJrrWg-ZW16uwqEg";
  },
  updateUserId: (tken?: any) => {
    user = tken ? tken : "65194710d160530510955d7d";
  },

  getToken: () => {
    return token;
  },
  getWPToken: () => {
    return wp_token;
  },

  getUserId: () => {
    return user;
  },
};

export default tokenService;
