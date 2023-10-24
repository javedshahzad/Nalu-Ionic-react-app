import { Redirect } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

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
// import Chat from "./pages/Chat/Chat";
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
import ResourceSubCategory from './pages/ResourceSubCategory/ResourceSubCategory';
import JournalCalendarRemade from "./pages/Journalcalender/JournalCalendarRemade";
import ConfigCycleRemade from "./pages/Configcycle/ConfigCycleRemade";
import JournalAdditionRemade from "./pages/Journaladdition/JournalAdditionRemade";
import Pusher from "pusher-js";
import { addNotification } from "./actions/notificationAction";
import { useDispatch } from "react-redux";
import OneSignal from "onesignal-cordova-plugin";
import { useEffect } from "react";
import { groupsListAction } from "./actions/groupsListAction";
import tokenService from "./token";
import { io } from "socket.io-client";
import BrowseGroups from "./pages/Chat/BrowseGroups/BrowseGroups";
import GroupChat from "./pages/Chat/GroupChat/GroupChat";
import GroupDetails from "./pages/Chat/GroupDetails/GroupDetails";
import GroupInfo from "./pages/Chat/GroupInfo/GroupInfo";
import MyGroups from "./pages/Chat/mygroups/MyGroups";

setupIonicReact({
  mode: "ios",
});

// ***onesignal*** //

function OneSignalInit() {
  OneSignal.initialize("0f10d9d5-8078-4eda-b52f-c616a5398d0b");
}

// ***onesignal*** //

const App: React.FC = () => {
  // ***onesignal*** //

  // OneSignalInit();

  // ***onesignal*** //

  // ***pusher*** //

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

  // ***pusher*** //

  // ***socket io*** //

  const token = tokenService.getToken();

  const socket = io("https://apidev.mynalu.com/", {
    query: {
      token,
    },
  });

  useEffect(() => {
    socket.emit("my-group-list", {
      search: "",
      page: 1,
      limit: 10,
      user: "65194710d160530510955d7d",
    });
  }, []);

  useEffect(() => {
    if (token) {
      socket.on("my-group-list", (data: any) => {
        if (data.results.length > 0) {
          dispatchFunction(data.results);
        }
      });
    }
  }, [token]);

  const dispatchFunction = (param: any) => {
    dispatch(groupsListAction(param));
  };

  // ***socket io*** //

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/tabs" render={() => <MainTabs />} />

          <Route exact path="/chat">
            {/* <PrivateRoute>
              <Chat />
            </PrivateRoute> */}
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
          <Route exact path="/journalcalendarremade">
            <JournalCalendarRemade />
          </Route>
          <Route exact path="/configcycleremade">
            <ConfigCycleRemade />
          </Route>

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
          <Route exact path="/groupchat/:groupId">
            <GroupChat />
          </Route>
          <Route exact path="/mygroups">
            <MyGroups />
          </Route>
          <Route exact path="/group-info/:groupId">
            <GroupInfo />
          </Route>

          <Route exact path="/browsegroups">
            <BrowseGroups />
          </Route>
          <Route exact path="/groupdetails/:groupId">
            <GroupDetails />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
