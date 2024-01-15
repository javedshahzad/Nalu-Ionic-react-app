import { Redirect, Route, useHistory } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  useIonToast,
  setupIonicReact,
  isPlatform,
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
import Membershiponboarding from "./pages/Membership/MembershipOnboarding";
import Journalcalender from "./pages/Journalcalender/Journalcalender";
import Community from "./pages/Community/Community";
import Login from "./pages/Login/Login";
import Resources from "./pages/Resources/Resources";
import PrivateRoute from "./auth/PrivateRoute";
import "./i18n";
// import { Suspense } from "react";
import ResourceSubCategory from "./pages/ResourceSubCategory/ResourceSubCategory";
import ConfigCycleRemade from "./pages/Configcycle/ConfigCycleRemade";
import Pusher from "pusher-js";
import { addNotification } from "./actions/notificationAction";
import { useDispatch } from "react-redux";
// import OneSignal from "onesignal-cordova-plugin";
import React, { useEffect, useState } from "react";
import { groupsListAction } from "./actions/groupsListAction";
import tokenService from "./token";
import { io } from "socket.io-client";
import BrowseGroups from "./pages/Chat/BrowseGroups/BrowseGroups";
import GroupChat from "./pages/Chat/GroupChat/GroupChat";
import GroupDetails from "./pages/Chat/GroupDetails/GroupDetails";
import GroupInfo from "./pages/Chat/GroupInfo/GroupInfo";
import MyChatGroups from "./pages/Chat/mygroups/MyGroups";
import JournalAdditionRemade from "./pages/Journaladdition/JournalAdditionRemade";
import JournalCalendarRemade from "./pages/Journalcalender/JournalCalendarRemade";
import UserAuthentication from "./auth/UserAuthentication";
import Menu from "./pages/Menu/Menu";
import Addcustomcategory from "./pages/Addcustomcategory/Addcustomcategory";
import MoonPhasesService from "./MoonPhasesService";
import authService from "./authService";
import { getColors, getMoonIcons } from "./actions/journalAction";

setupIonicReact({
  mode: "ios",
});

// ***onesignal*** //

function OneSignalInit() {
  //OneSignal.initialize("0f10d9d5-8078-4eda-b52f-c616a5398d0b");
}

// ***onesignal*** //

const App: React.FC = () => {
  // ***onesignal*** //

  // OneSignalInit();

  // ***onesignal*** //

  // ***pusher*** //

  const [present] = useIonToast();
  const [year, setYear] = useState(new Date().getFullYear());
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

  // ***Matomo*** ///
  useEffect(() => {
    // Create the Matomo script tag
    const scriptTag = document.createElement("script");
    scriptTag.async = true;
    scriptTag.src = "https://analytics.mynalu.com/js/container_ZvpOihfN.js";
    scriptTag.type = "text/javascript";

    // Append the script tag to the document
    document.body.appendChild(scriptTag);

    return () => {
      // Cleanup the script tag
      document.body.removeChild(scriptTag);
    };
  }, []);

  // ***pusher*** //

  // ***socket io*** //

  // ***socket io*** //

  const history = useHistory();

  const getIcons = async () => {
    try {
      const data = await MoonPhasesService.get(
        `https://app.mynalu.com/wp-json/nalu-app/v1/moon/${year}`
      );

      const newArray = [];

      for (const date in data.moonphase) {
        const dateObjects = data.moonphase[date];
        for (const dateObject of dateObjects) {
          const transformedObject = {
            date: date,
            phase_id: dateObject.phase_id,
            phase_name: dateObject.phase_name,
          };
          newArray.push(transformedObject);
        }
      }

      dispatch(getMoonIcons(newArray));
    } catch (error) {
      if (isPlatform("ios")) {
        if (error) {
          const status = error.status;

          if (status === 401 || status === 403 || status === 404) {
            // Unauthorized, Forbidden, or Not Found
            authService.logout();
            history.push("/onboarding");
          }
        }
      } else {
        if (error.response) {
          const status = error.response.status;

          if (status === 401 || status === 403 || status === 404) {
            // Unauthorized, Forbidden, or Not Found
            authService.logout();
            history.push("/onboarding");
          }
        }
      }
      console.error(error);
    }
  };
  const getMoonColors = async () => {
    let month: any = new Date().getMonth() + 1;

    if (parseInt(month) < 10) {
      month = "0" + month;
    }

    let year = new Date().getFullYear();

    let yearMonth = `${year}-${month}`;

    try {
      const data = await MoonPhasesService.get(
        `https://app.mynalu.com/wp-json/nalu-app/v1/journal-overview/${yearMonth}?lang=de`
      );

      const todayData = data["today"];

      if (todayData) {
        // setTodayPeriod(todayData.active_period.toString());
      } else {
        console.log("No data found for today");
      }
      dispatch(getColors(data));
    } catch (error) {
      if (isPlatform("ios")) {
        if (error) {
          const status = error.status;

          if (status === 401 || status === 403 || status === 404) {
            // Unauthorized, Forbidden, or Not Found
            authService.logout();
            history.push("/onboarding");
          }
        }
      } else {
        if (error.response) {
          const status = error.response.status;

          if (status === 401 || status === 403 || status === 404) {
            // Unauthorized, Forbidden, or Not Found
            authService.logout();
            history.push("/onboarding");
          }
        }
      }
      console.error(error);
    }
  };

  useEffect(() => {
    getMoonColors();
    getIcons();
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/tabs" render={() => <MainTabs />} />
          <Route exact path="/chat"></Route>
          {/* Temporary Rout to Menu */}
          <Route exact path="/menu">
            <Menu />
          </Route>
          <Route exact path="/addcustomcategory">
            <Addcustomcategory />
          </Route>
          <Route exact path="/community">
            <PrivateRoute page={"community"}>
              <Community />
            </PrivateRoute>
          </Route>

          <Route exact path="/configcycle">
            <PrivateRoute page={"configcycle"}>
              <Configcycle />
            </PrivateRoute>
          </Route>

          <Route exact path="/coursechapter">
            <PrivateRoute page={"coursechapter"}>
              <Coursechapter />
            </PrivateRoute>
          </Route>

          <Route exact path="/courseoverviewfree">
            <PrivateRoute page={"courseoverviewfree"}>
              <Courseoverviewfree />
            </PrivateRoute>
          </Route>

          <Route exact path="/courseoverviewpaid">
            <PrivateRoute page={"courseoverviewpaid"}>
              <Courseoverviewpaid />
            </PrivateRoute>
          </Route>

          <Route exact path="/filter">
            <PrivateRoute page={"filter"}>
              <Filtermodal />
            </PrivateRoute>
          </Route>

          <Route exact path="/journaladdition">
            <PrivateRoute page={"journaladdition"}>
              <Journaladdition />
            </PrivateRoute>
          </Route>

          <Route exact path="/journalcalender">
            <PrivateRoute page={"journalcalender"}>
              <Journalcalender />
            </PrivateRoute>
          </Route>

          <Route exact path="/learnmore">
            <PrivateRoute page={"learnmore"}>
              <Learnmore />
            </PrivateRoute>
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/membership">
            <PrivateRoute page={"membership"}>
              <Membership />
            </PrivateRoute>
          </Route>
          <Route exact path="/membershiponboarding">
            <PrivateRoute page={"membershiponboarding"}>
              <Membershiponboarding />
            </PrivateRoute>
          </Route>
          <Route exact path="/mygroups">
            <PrivateRoute page={"mygroups"}>
              <Mygroups />
            </PrivateRoute>
          </Route>
          {/* <Route exact path="/mychatgroups">
            <PrivateRoute page={"mygroups"}>
              <MyChatGroups />
            </PrivateRoute>
          </Route> */}
          <Route exact path="/onboarding">
            <PrivateRoute page={"onboarding"}>
              <Onboarding />
            </PrivateRoute>
          </Route>
          <Route exact path="/questioning">
            <Questioning />
          </Route>
          <Route exact path="/registeration">
            <Registeration />
          </Route>

          <Route exact path="/stayup">
            <PrivateRoute page={"stayup"}>
              <Stayup />
            </PrivateRoute>
          </Route>
          <Route exact path="/resources">
            <PrivateRoute page={"resources"}>
              <Resources />
            </PrivateRoute>
          </Route>
          <Route exact path="/journalcalendarremade">
            <PrivateRoute page={"journalcalendarremade"}>
              <JournalCalendarRemade />
            </PrivateRoute>
          </Route>
          <Route exact path="/configcycleremade">
            <ConfigCycleRemade />
          </Route>

          <Route exact path="/addcustomcategory/:dateParam">
            <Addcustomcategory />
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
            <Mygroups />
          </Route>
          {/* <Route exact path="/mychatgroups">
            <MyChatGroups />
          </Route> */}
          {/* <Route exact path="/group-info/:groupId">
            <GroupInfo />
          </Route> */}

          {/* <Route exact path="/browsegroups">
            <BrowseGroups />
          </Route> */}
          {/* <Route exact path="/groupdetails/:groupId">
            <GroupDetails />
          </Route> */}
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
