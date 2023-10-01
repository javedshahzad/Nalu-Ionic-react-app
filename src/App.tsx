import { Redirect } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { ellipse, square, triangle } from "ionicons/icons";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.scss";

import "./sass/app.scss";
import Onboarding from "./pages/Onboarding/Onboarding";
import MainTabs from "./pages/Tabs/MainTabs";
import Questioning from "./pages/Questioning/Questioning";
import Registeration from "./pages/Registeration/Registeration";
import Yourdata from "./pages/Yourdata/Yourdata";
import Configcycle from "./pages/Configcycle/Configcycle";
import Learnmore from "./pages/Learnmore/Learnmore";
import Stayup from "./pages/Stayup/Stayup";
import Searchmodal from "./pages/modals/Search/Searchmodal";
import Filtermodal from "./pages/modals/Filter/Filtermodal";
import Chat from "./pages/Chat/Chat";
import Mygroups from "./pages/Mygroups/Mygroups";
import Coursechapter from "./pages/Coursechapter/Coursechapter";
import Courseoverviewfree from "./pages/Courseoverviewfree/Courseoverviewfree";
import Courseoverviewpaid from "./pages/Courseoverviewpaid/Courseoverviewpaid";
import Journaladdition from "./pages/Journaladdition/Journaladdition";
import Resourcedetail from "./pages/Resourcedetail/Resourcedetail";
import Eventdetail from "./pages/Eventdetail/Eventdetail";
import Membership from "./pages/Membership/Membership";
import Journalcalender from "./pages/Journalcalender/Journalcalender";
import Community from "./pages/Community/Community";
import Login from "./pages/Login/Login";
import Resources from "./pages/Resources/Resources";
import PrivateRoute from "./auth/PrivateRoute";
import './i18n';
import { Suspense } from "react";

setupIonicReact({
  mode: "ios",
});

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
      {/* <Suspense fallback={<div>Loading...</div>}> */}

        <Route path="/tabs" render={() => <MainTabs />} />
        
        <Route exact path="/chat">
        <PrivateRoute>
          <Chat />
        </PrivateRoute>
        </Route>
        <Route exact path="/community">
        <PrivateRoute>
          <Community />
        </PrivateRoute>
        </Route>
        <Route exact path="/configcycle">
        <PrivateRoute>
            <Configcycle />
        </PrivateRoute>
        </Route>

        <Route exact path="/coursechapter">
        <PrivateRoute>
          <Coursechapter />
        </PrivateRoute>
        </Route>

        <Route exact path="/courseoverviewfree">
        <PrivateRoute>
          <Courseoverviewfree />
        </PrivateRoute>
        </Route>

        <Route exact path="/courseoverviewpaid">
        <PrivateRoute>
          <Courseoverviewpaid />
        </PrivateRoute>
        </Route>

        <Route exact path="/eventdetail">
        {/* <PrivateRoute> */}
          <Eventdetail />
       {/* </PrivateRoute> */}
        </Route>

        
        <Route exact path="/filter">
        <PrivateRoute>
          <Filtermodal />
        </PrivateRoute>
        </Route>

        <Route exact path="/journaladdition">
        <PrivateRoute>
          <Journaladdition />
        </PrivateRoute>
        </Route>

        <Route exact path="/journalcalender">
        <PrivateRoute>
          <Journalcalender />
        </PrivateRoute>
        </Route>
        
        
        <Route exact path="/learnmore">
        <PrivateRoute>
          <Learnmore />
        </PrivateRoute>
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/membership">
        <PrivateRoute>
          <Membership />
        </PrivateRoute>
        </Route>
        <Route exact path="/mygroups">
        <PrivateRoute>
          <Mygroups />
        </PrivateRoute>
        </Route>
        <Route exact path="/onboarding">
          <Onboarding />
        </Route>
        <Route exact path="/questioning">
          <Questioning />
        </Route>        
        <Route exact path="/registeration">
          <Registeration />
        </Route>
        <Route exact path="/resourcedetail">
        <PrivateRoute>
          <Resourcedetail />
        </PrivateRoute>
        </Route>
        <Route exact path="/stayup">
        <PrivateRoute>
          <Stayup />
        </PrivateRoute>
        </Route>
        <Route exact path="/resources">
        <PrivateRoute>
          <Resources />
        </PrivateRoute>
        </Route>

        <Route exact path="/search">
        <PrivateRoute>
          <Searchmodal />
        </PrivateRoute>
        </Route>
        <Route exact path="/yourdata">
        <PrivateRoute>
          <Yourdata />
        </PrivateRoute>
        </Route>
        <Route exact path="/">
          <Redirect to="/onboarding" />
        </Route>
        {/* </Suspense> */}

      </IonRouterOutlet>

    </IonReactRouter>
  </IonApp>
);

export default App;
