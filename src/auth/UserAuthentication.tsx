function UserAuthentication() {
    const aut =
      sessionStorage.getItem("jwtToken")
        ? true
        : false;
    return aut;
  }
  export default UserAuthentication;