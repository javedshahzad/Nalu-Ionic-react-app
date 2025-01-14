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
import ChatFrame from "./pages/Chat/iFrame/ChatFrame";
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
import { addNotification } from "./actions/notificationAction";
import { useDispatch, useSelector } from "react-redux";
// import OneSignal from "onesignal-cordova-plugin";
import React, { useEffect, useState } from "react";
import { groupsListAction } from "./actions/groupsListAction";
import tokenService from "./token";
import { io } from "socket.io-client";
import BrowseGroups from "./pages/Chat/BrowseGroups/BrowseGroups";
// import GroupChat from "./pages/Chat/GroupChat/GroupChat";
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
import { fetchColors, fetchMoonIcons } from "./actions/apiActions";
import { fetchAvatar } from "./actions/menuActions";
import { fetchCourses, fetchProgressNextChap } from "./actions/courseActions";
import { fetchJournalEntries } from "./actions/journalEntriesAction";
import apiService from "./Services";
import { fetchEventDetail, fetchEvents } from "./actions/eventsAction";
import {
  fetchResourcesFavourite,
  fetchResourcesOverview,
  fetchResourcesRecommendation,
} from "./actions/resourcesAction";

setupIonicReact({
  mode: "ios",
});

// ***onesignal*** //

// function OneSignalInit() {
//   OneSignal.initialize("0f10d9d5-8078-4eda-b52f-c616a5398d0b");
// }

// ***onesignal*** //

const App: React.FC = () => {
  const nullEntry: any[] = [];
  const [notifications, setnotifications] = useState(nullEntry);
  // ***onesignal*** //

  // OneSignalInit();s

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

  const fetchMenuData = async () => {
    const userId = localStorage.getItem("userId");
    try {
      await dispatch<any>(fetchAvatar(userId));
      // await dispatch<any>(fetchColors(year));
    } catch (error) {
      // handleDispatchError(error);
    }
  };

  const getIconsAndColors = async () => {
    let month: any = new Date().getMonth() + 1;

    if (parseInt(month) < 10) {
      month = "0" + month;
    }

    let year = new Date().getFullYear();

    // let yearMonth = `${year}-${month}`;

    try {
      await dispatch<any>(fetchMoonIcons(year));
      await dispatch<any>(fetchColors(year));
    } catch (error) {
      handleDispatchError(error);
    }
  };

  const handleDispatchError = (error) => {
    if (isPlatform("ios")) {
      if (error) {
        const status = error.status;

        if (status === 401 || status === 403 || status === 404) {
          // Unauthorized, Forbidden, or Not Found
          authService.logout();
          history.push("/onboarding");
          return;
        }
      }
    } else {
      if (error.response) {
        const status = error.response.status;

        if (status === 401 || status === 403 || status === 404) {
          // Unauthorized, Forbidden, or Not Found
          authService.logout();
          history.push("/onboarding");
          return;
        }
      }
    }
    console.error(error);
  };

  useEffect(() => {
    getIconsAndColors();
    fetchMenuData();
  }, []);

  // const currentDate = new Date();
  // const currentYear = currentDate.getFullYear();
  // const currentMonth = currentDate.getMonth() + 1;
  // const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();

  // const dates = [];
  // for (let day = 1; day <= daysInMonth; day++) {
  //   const formattedDate = `${currentYear}-${currentMonth
  //     .toString()
  //     .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
  //   dates.push(formattedDate);
  // }

  // console.log(">>>", dates);

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  useEffect(() => {
    dispatch<any>(fetchCourses());
    dispatch<any>(fetchJournalEntries(`${year}-${month}-${day}`));
    dispatch<any>(fetchEvents());
    dispatch<any>(fetchResourcesOverview());
    dispatch<any>(fetchResourcesFavourite());
    dispatch<any>(fetchResourcesRecommendation());
    dispatch<any>(fetchProgressNextChap());
  }, []);

  // useEffect(() => {
  //   fetchEventsData()
  //     .then(async (result: any) => {
  //       const data = await result;
  //       setEvents(data);
  //     })
  //     .catch((error: any) => {
  //       console.error("Error fetching events", error);
  //     });
  // }, [fetchEventsData]);

  // useEffect(() => {
  //   if (events && events.length > 0) {
  //     events.forEach((event) => {
  //       const { id } = event;
  //       dispatch<any>(fetchEventDetail(id));
  //     });
  //   }
  // }, [events]);

  // useEffect(() => {
  //   // Assuming eventsDetailData is a promise, not a result
  //   eventsDetailData
  //     .then((data: any) => {
  //       console.log("data", data);
  //     })
  //     .catch((error: any) => {
  //       console.error("Error fetching event detail data", error);
  //     });
  // }, [eventsDetailData]);

  // const showToast = async (msg: string) => {
  //   await Toast.show({
  //     text: msg,
  //   });
  // };

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
          <Route exact path="/chat">
            <PrivateRoute page={"chat"}>
              <ChatFrame />
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
          {/* <Route exact path="/groupchat/:groupId">
            <GroupChat />
          </Route> */}
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
