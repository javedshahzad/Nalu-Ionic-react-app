function UserAuthentication() {
    const aut =
      localStorage.getItem("jwtToken")
        ? true
        : false;
    return aut;
  }
  export default UserAuthentication;