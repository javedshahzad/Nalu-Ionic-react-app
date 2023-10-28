import { Redirect } from "react-router-dom";
import UserAuthentication from "./UserAuthentication";
import MainTabs from './../pages/Tabs/MainTabs';
import Journal from './../pages/Journal/Journal';

function PrivateRoute({ children }) {
  const auth = UserAuthentication();
  console.log(children)
  // if(path === 'onboarding'){
  //   return auth ? <Journal /> : children;
  // }
  // // else if(path === 'onboarding'){
  // //   return !auth ? children : <Redirect to="/" />;
  // // }
  // else{
  // return auth ? children : <Redirect to="/" />;

  // }
  return auth ? children : <Redirect to="/" />;
}
export default PrivateRoute;

