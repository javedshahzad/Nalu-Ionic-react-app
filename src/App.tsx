import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  useIonToast,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

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
import JournalCalendarRemade from "./pages/Journalcalender/JournalCalendarRemade";
import ConfigCycleRemade from "./pages/Configcycle/ConfigCycleRemade";
import JournalAdditionRemade from "./pages/Journaladdition/JournalAdditionRemade";
import Pusher from "pusher-js";
import { addNotification } from "./store";
import { useDispatch } from "react-redux";
import OneSignal from "onesignal-cordova-plugin";
import { useState } from "react";

setupIonicReact({
  mode: "ios",
});

function OneSignalInit() {
  OneSignal.initialize("0f10d9d5-8078-4eda-b52f-c616a5398d0b");
}

const App: React.FC = () => {
  OneSignalInit();

  const [present] = useIonToast();
  const presentToast = (notification: any) => {
    present({
      message: notification,
      duration: 2000,
      position: "top",
    });
  };
  const dispatch = useDispatch();
  const pusher = new Pusher("eac7e44a867cbabf54df", {
    cluster: "us3",
  });

  const channel = pusher.subscribe("vote-channel");

  // Listen for an event
  channel.bind("vote", (data: any) => {
    dispatch(addNotification(data));
    presentToast(data.body.title);
  });

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/tabs" render={() => <MainTabs />} />
          <Route exact path="/chat">
            <Chat />
          </Route>
          <Route exact path="/community">
            <Community />
          </Route>
          <Route exact path="/configcycle">
            <Configcycle />
          </Route>

          <Route exact path="/coursechapter">
            <Coursechapter />
          </Route>

          <Route exact path="/courseoverviewfree">
            <Courseoverviewfree />
          </Route>

          <Route exact path="/courseoverviewpaid">
            <Courseoverviewpaid />
          </Route>

          <Route exact path="/eventdetail">
            <Eventdetail />
          </Route>

          <Route exact path="/filter">
            <Filtermodal />
          </Route>

          <Route exact path="/journaladdition">
            <Journaladdition />
          </Route>

          <Route exact path="/journalcalender">
            <Journalcalender />
          </Route>

          <Route exact path="/learnmore">
            <Learnmore />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/membership">
            <Membership />
          </Route>
          <Route exact path="/mygroups">
            <Mygroups />
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
            <Resourcedetail />
          </Route>
          <Route exact path="/stayup">
            <Stayup />
          </Route>
          <Route exact path="/resources">
            <Resources />
          </Route>
          <Route exact path="/journalcalendarremade">
            <JournalCalendarRemade />
          </Route>
          <Route exact path="/configcycleremade">
            <ConfigCycleRemade />
          </Route>
          {/* <Route exact path="/journaladditionremade:dateParam">
          <JournalAdditionRemade />
        </Route> */}

          <Route
            path="/journaladditionremade/:dateParam"
            render={(props) => (
              <JournalAdditionRemade
                key={props.match.params.dateParam}
                {...props}
              />
            )}
          />

          <Route exact path="/search">
            <Searchmodal />
          </Route>
          <Route exact path="/yourdata">
            <Yourdata />
          </Route>
          <Route exact path="/">
            <Redirect to="/onboarding" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
