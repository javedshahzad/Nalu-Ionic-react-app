import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonCol,
  IonIcon,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonButton,
  IonButtons,
} from "@ionic/react";
import React, { useState } from "react";
import {
  arrowBackOutline,
  notificationsOutline,
  searchOutline,
} from "ionicons/icons";
import { useHistory } from "react-router";
import "./BrowseGroups.scss";
import NotificationBell from "../../../components/NotificationBell";

const BrowseGroups: React.FC = () => {
  const groups = useSelector((state: RootState) => state.groups);
  const [searchQuery, setSearchQuery] = useState("");

  const history = useHistory();

  const filteredGroups = groups.filter(
    (group: any) =>
      group.groupName &&
      group.groupName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleGroupClick = (groupId: any) => {
    history.push(`/groupchat/${groupId}`);
  };

  const back = () => {
    history.goBack();
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar className="ion-no-border">
          <IonHeader className="ion-no-border">
            <IonToolbar className="ion-no-border">
              <IonButton slot="start" fill="clear" onClick={back}>
                <IonIcon icon={arrowBackOutline} />
              </IonButton>
              <div className="top-row">
                <h1 className="group-title">Browse Groups</h1>
              </div>
              <IonButton slot="end" fill="clear">
                <IonIcon icon={notificationsOutline} className="bell-icon" />
              </IonButton>
            </IonToolbar>
            <IonCol size="12" style={{ display: "flex", alignItems: "center" }}>
              <IonIcon icon={searchOutline} className="input-search" />
              <input
                className="group-search"
                type="text"
                placeholder="Search groups"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </IonCol>
          </IonHeader>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="browse-grps-ion-content">
        {filteredGroups.map((group: any, index: any) => {
          const groupName = group.groupName || "";
          return (
            <ul key={index} className="browsed-grps">
              <li
                onClick={() => handleGroupClick(group._id)}
                className="browse-grp-items"
              >
                <img
                  src={group.groupImage}
                  alt=""
                  className="profile-image my-auto"
                  style={{
                    marginRight: "10px",
                    width: "40px",
                    height: "40px",
                    borderRadius: 100,
                  }}
                />
                <IonLabel>
                  {groupName.toLowerCase().includes(searchQuery.toLowerCase())
                    ? group.groupName
                    : ""}
                </IonLabel>
              </li>
            </ul>
          );
        })}
      </IonContent>
    </IonPage>
  );
};

export default BrowseGroups;
