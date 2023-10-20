import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  IonToggle,
  IonCheckbox,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonContent,
  IonHeader,
  IonBackButton,
  IonToolbar,
} from "@ionic/react";
import "./GroupDetails.css";
import { add } from "ionicons/icons";

import { useRef } from "react";
import { useState } from "react";
import React from "react";
const Conversation: React.FC = () => {
  const location = useLocation<{
    selectedUsers: string[];
    groupName: string;
  }>();

  const grpName = location.state ? location.state.groupName : "";

  const [GroupName, setGroupName] = useState(grpName);

  const handleInputChange = (event: any) => {
    const newGroupName = event.target.value;

    setGroupName(newGroupName);

    if (location.state) {
      const newLocation = {
        ...location,
        state: { ...location.state, groupName: newGroupName },
      };
      window.history.replaceState(newLocation, "");
    }
  };

  const modal = useRef<HTMLIonModalElement>(null);
  const dismiss = () => {
    modal.current?.dismiss();
  };

  const selectedUsers = location.state ? location.state.selectedUsers : [];

  const users = useSelector((state: any) => state.users);

  const userNames = selectedUsers.map((USER) => {
    const user = users.find((user: any) => user.id === USER);

    if (!user) return null;

    return (
      <IonRow
        key={user.id}
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "nowrap",
        }}
      >
        <IonCol size="2">
          <img src={user.display_image} className="profile-image my-auto" />
        </IonCol>
        <IonCol size="8">
          <div className="flex align-middle justify-start items-start">
            <h1 className="user-name2">{user.name}</h1>
          </div>
        </IonCol>
        <IonCol size="2">
          <IonToggle className="mt-5px" mode="ios"></IonToggle>
        </IonCol>
      </IonRow>
    );
  });

  let isUserModalOpen = false;

  const AddUser = () => {
    isUserModalOpen = true;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonRow>
            <IonCol size="2">
              <IonBackButton></IonBackButton>
            </IonCol>
            <IonCol size="10"></IonCol>
          </IonRow>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRow>
          <IonCol size="12">
            <div className="w-full flex align-middle items-center justify-center">
              <input
                className="group-title2"
                type="text"
                value={GroupName}
                onChange={handleInputChange}
              />
            </div>
            <hr className="under-line" />
          </IonCol>
        </IonRow>
        <IonGrid>
          <IonRow style={{ display: "flex", justifyContent: "end" }}>
            <IonButton shape="round" onClick={AddUser} id="open-custom-dialog">
              Add
              <IonIcon icon={add}></IonIcon>
            </IonButton>
          </IonRow>

          {userNames.map((user: any, index: any) => (
            <span key={index}>{user}</span>
          ))}
        </IonGrid>

        <IonModal id="example-modal" ref={modal} trigger="open-custom-dialog">
          <div className="wrapper">
            <IonRow>
              <IonCol size="10"></IonCol>
              <IonCol size="2">
                <button className="close-icon" onClick={dismiss}>
                  X
                </button>
              </IonCol>
            </IonRow>

            <IonList lines="none" class="list-box">
              {users.map((user: any, index: any) => (
                <IonItem button={true} detail={false} key={index}>
                  <img
                    src={user.display_image}
                    className="profile-image my-auto"
                  />
                  <IonCheckbox>
                    <IonLabel className="ml-5px">{user.name}</IonLabel>
                  </IonCheckbox>
                </IonItem>
              ))}
            </IonList>

            <IonButton expand="full" onClick={dismiss}>
              Add Users
            </IonButton>
          </div>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Conversation;
