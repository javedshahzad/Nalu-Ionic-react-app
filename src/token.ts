let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTE5NDcxMGQxNjA1MzA1MTA5NTVkN2QiLCJpYXQiOjE2OTcyOTIxOTYsImV4cCI6MTcyODkxNDU5NiwidHlwZSI6ImFjY2VzcyJ9.8zK80XuZC3BGZEqX1tvEwjKLvTvgXznWa1UGqdPaCv4";

let wp_token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwcC5teW5hbHUuY29tIiwiaWF0IjoxNjk3MjkyMTk2LCJuYmYiOjE2OTcyOTIxOTYsImV4cCI6MTY5Nzg5Njk5NiwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMTY1In19fQ.1WZS1O5JTm3koX5u90o_Cjce5BnqJrrWg-ZW16uwqEg";

const tokenService = {
  updateToken: (tken?: any) => {
    token = tken
      ? tken
      : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTE5NDcxMGQxNjA1MzA1MTA5NTVkN2QiLCJpYXQiOjE2OTcyOTIxOTYsImV4cCI6MTcyODkxNDU5NiwidHlwZSI6ImFjY2VzcyJ9.8zK80XuZC3BGZEqX1tvEwjKLvTvgXznWa1UGqdPaCv4";
  },
  updateWPToken: (tken?: any) => {
    wp_token = tken
      ? tken
      : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwcC5teW5hbHUuY29tIiwiaWF0IjoxNjk3MjkyMTk2LCJuYmYiOjE2OTcyOTIxOTYsImV4cCI6MTY5Nzg5Njk5NiwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMTY1In19fQ.1WZS1O5JTm3koX5u90o_Cjce5BnqJrrWg-ZW16uwqEg";
  },

  getToken: () => {
    return token;
  },
  getWPToken: () => {
    return wp_token;
  },
};

export default tokenService;
