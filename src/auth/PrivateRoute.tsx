import { Redirect, Route } from "react-router-dom";
import UserAuthentication from "./UserAuthentication";

function PrivateRoute({ children, page }) {
  const auth = UserAuthentication();
  if(page === 'onboarding' && auth){
   return <Redirect to="/tabs/tab1" />
   
  }
  else if(page === 'onboarding' && !auth){
    return  children

  }
  else if(page !== 'onboarding' && auth){
  return  children

  }
  else if(page !== 'onboarding' && !auth){
    return <Redirect to="/" />

    }
  }

export default PrivateRoute;
