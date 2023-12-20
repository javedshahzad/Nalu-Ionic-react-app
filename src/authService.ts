// import { useHistory } from "react-router";

// const history = useHistory();

const authService = {
  logout: () => {
    localStorage.removeItem("jwtToken");
    sessionStorage.removeItem("jwtToken");
    localStorage.removeItem("roles");
    localStorage.removeItem("userId");
    //   history.push("/login");
  },
};

export default authService;
