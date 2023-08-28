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
import Course from "../Course/Course";
import Community from "../Community/Community";
import Courseoverviewpaid from "../Courseoverviewpaid/Courseoverviewpaid";
import Mygroups from "../Mygroups/Mygroups";
interface MainTabsProps {}

const MainTabs: React.FC<MainTabsProps> = () => {
 
  const tabChanged = (e: any) => {
    console.log(e.detail.tab);
    // setSelectedTab(e.detail.tab);
  };

  return (
    <IonTabs onIonTabsDidChange={(e) => tabChanged(e)}>
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/tabs/tab1" />
      
        <Route path="/tabs/tab1" render={() => <Journal />} exact={true} />
        <Route path="/tabs/tab2" render={() => <Courseoverviewpaid />} exact={true} />
        <Route path="/tabs/tab3" render={() => <Mygroups />} exact={true} />
        <Route path="/tabs/tab4" render={() => <Resources />} exact={true} />
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
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
