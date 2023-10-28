import { Redirect, Route } from "react-router-dom";
import UserAuthentication from "./UserAuthentication";

function PrivateRoute({ children }) {
  const auth = UserAuthentication();
  return auth ? children : <Redirect to="/" />;
}

export default PrivateRoute;
