import React, { useEffect, useState } from "react";
import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonFab,
  IonFabButton,
  IonModal,
  IonContent,
} from "@ionic/react";
import { Route, Redirect } from "react-router";
import Resources from "../Resources/Resources";
import Journal from "../Journal/Journal";
import Courseoverviewpaid from "../Courseoverviewpaid/Courseoverviewpaid";
import Mygroups from "../Mygroups/Mygroups";
import Journalcalender from "../Journalcalender/Journalcalender";
import CourseInnerOverview from "../Courseoverviewpaid/CourseInnerOverview/CourseInnerOverview";
import CourseSubOverview from "../Courseoverviewpaid/CourseInnerOverview/CourseSubOverview/CourseSubOverview";
import ResourceSubCategory from '../ResourceSubCategory/ResourceSubCategory';
import Eventdetail from './../Eventdetail/Eventdetail';
import Resourcedetail from './../Resourcedetail/Resourcedetail';
import PrivateRoute from "../../auth/PrivateRoute";
import JournalCalendarRemade from "../Journalcalender/JournalCalendarRemade";
import { useHistory } from 'react-router-dom';
interface MainTabsProps {}

const MainTabs: React.FC<MainTabsProps> = () => {
  const history = useHistory();

  const tabChanged = (e: any) => {
    const activeTab = e.detail.tab;
  };
  
  

  return (
    <IonTabs onIonTabsDidChange={(e) => tabChanged(e)}>
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/tabs/tab1" />
      
        <Route path="/tabs/tab1" render={() => <PrivateRoute><JournalCalendarRemade /></PrivateRoute>} exact={true} />
        <Route path="/tabs/tab2" render={() => <PrivateRoute><Courseoverviewpaid /></PrivateRoute>} exact={true} />
        <Route path="/tabs/tab2/courseinneroverview" render={() => <PrivateRoute><CourseInnerOverview /></PrivateRoute>} />
        <Route path="/tabs/tab2/courseinneroverview/:id" render={() => <PrivateRoute><CourseSubOverview /></PrivateRoute>} />

        <Route path="/tabs/tab3" render={() => <PrivateRoute><Mygroups /></PrivateRoute>} exact={true} />
        <Route path="/tabs/tab3/eventdetail" render={() => <PrivateRoute><Eventdetail /></PrivateRoute>} exact={true} />

        <Route path="/tabs/tab4" render={() => <PrivateRoute><Resources /></PrivateRoute>} exact={true}/>
        <Route path="/tabs/tab4/resourcesubcateggory" render={() => <PrivateRoute><ResourceSubCategory /></PrivateRoute>} />
        <Route path="/tabs/tab4/resourcedetail" render={() => <PrivateRoute><Resourcedetail /></PrivateRoute>} />



      </IonRouterOutlet>

      <IonTabBar slot="bottom" className="ion-no-border">
          <IonTabButton tab="tab1" href="/tabs/tab1">
          <IonIcon src="assets/imgs/tabicns/tab1.svg" className="tab-icon-inactive" id="inactive" />
          <IonIcon src="assets/imgs/tabicns/tab1a.svg" className="tab-icon-active" id="active" />
            <IonLabel>Journal</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tabs/tab2">
          <IonIcon src="assets/imgs/tabicns/tab2.svg" className="tab-icon-inactive" id="inactive" />
          <IonIcon src="assets/imgs/tabicns/tab2a.svg" className="tab-icon-active" id="active" />
            <IonLabel>Course</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tabs/tab3">
          <IonIcon src="assets/imgs/tabicns/tab3.svg" className="tab-icon-inactive" id="inactive" />
          <IonIcon src="assets/imgs/tabicns/tab3a.svg" className="tab-icon-active" id="active" />
            <IonLabel>Community</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab4" href="/tabs/tab4">
          <IonIcon src="assets/imgs/tabicns/tab4.svg" className="tab-icon-inactive" id="inactive" />
          <IonIcon src="assets/imgs/tabicns/tab4a.svg" className="tab-icon-active" id="active" />
            <IonLabel>Resources</IonLabel>
          </IonTabButton>
        </IonTabBar>
    </IonTabs>
  );
};

export default MainTabs;
