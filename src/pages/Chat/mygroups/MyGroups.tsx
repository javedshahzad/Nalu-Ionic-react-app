import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/store";
import { createGroupAction } from "../../../actions/groupsActions";

import {
  addOutline,
  arrowBackOutline,
  cameraOutline,
  chevronForwardOutline,
} from "ionicons/icons";
import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonPopover,
  IonText,
  IonToolbar,
  IonTitle,
  useIonActionSheet,
} from "@ionic/react";
import "./mygroups.scss";
import { useHistory } from "react-router-dom";
import { notificationsOutline } from "ionicons/icons";

import apiService from "../../../Services";

import tokenService from "../../../token";
import authService from "../../../authService";

const MyGroups: React.FC = () => {
  const [showPopover, setShowPopover] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

  const [groupsList, setGroupsList] = useState([]);

  const modal = useRef<HTMLIonModalElement>(null);
  const page = useRef(null);

  const [presentingElement, setPresentingElement] =
    useState<HTMLElement | null>(null);
  const [present] = useIonActionSheet();

  const groups = useSelector((state: RootState) => state.groups);

  const sortedGroups = [...groups].sort((a, b) => b.timestamp - a.timestamp);

  const recentGroups = sortedGroups.slice(0, 2);

  const wp_token = tokenService.getWPToken();

  useEffect(() => {
    setTimeout(() => {
      setGroupsList(groups);
    }, 5000);
  });
  const history = useHistory();

  const back = () => {
    history.goBack();
  };

  const [users, setUsers] = useState<any[]>([]);

  const dispatch = useDispatch();

  const openPopover = () => {
    setShowPopover(true);
    GetAllUsers();
  };

  const handleGroupNameChange = (e: any) => {
    setGroupName(e.target.value);
  };

  const newGroup = {
    id: String(Date.now()),
    name: groupName,
    members: selectedUsers.map((userId) => userId),
  };

  const createGroup = () => {
    const usersArr = [];
    selectedUsers.map((user: any) => {
      usersArr.push({
        name: user.name,
        userImage: user.avatar_urls["96"],
        email: user.email,
        slug: user.slug,
        nickname: user.nickname,
      });
    });

    const formDataToSend = new FormData();
    formDataToSend.append("groupName", groupName);
    formDataToSend.append("participants[]", JSON.stringify(usersArr));

    apiService
      .post("https://apidev.mynalu.com/v1/conversation/create", formDataToSend)
      .then(
        (data) => {
          dispatch(createGroupAction(data.data));
          dismiss();
          setSelectedUsers([]);
          setGroupName("");
        },
        (error) => {
          if (error.response) {
            const status = error.response.status;

            if (status === 401 || status === 403 || status === 404) {
              // Unauthorized, Forbidden, or Not Found
              authService.logout();
              history.push("/onboarding");
            }
          }

          console.error(error);
        }
      );
  };

  const handleUserSelection = (e: any, user: any) => {
    const checked = e.target.checked;
    if (checked) {
      setSelectedUsers([...selectedUsers, user]);
    } else {
      setSelectedUsers(selectedUsers.filter((obj) => obj !== user));
    }
  };
  const GetAllUsers = (keyword?: any) => {
    apiService
      .get(
        `https://app.mynalu.com/wp-json/wp/v2/users?per_page=20&page=1&search=`
      )
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        if (error.response) {
          const status = error.response.status;

          if (status === 401 || status === 403 || status === 404) {
            // Unauthorized, Forbidden, or Not Found
            // authService.logout();
            // history.push("/onboarding");
          }
        }

        console.error(error);
      });
  };

  const handleGroupClick = (groupId: any) => {
    history.push(`/groupchat/${groupId}`);
  };

  const handleBrowseGroupsClick = () => {
    history.push("/browsegroups");
  };

  useEffect(() => {
    setPresentingElement(page.current);
    GetAllUsers();
  }, []);

  function dismiss() {
    modal.current?.dismiss();
    setGroupName("");
    setSelectedUsers([]);
  }

  return (
    <IonPage ref={page}>
      <IonHeader className="ion-no-border">
        <IonToolbar className="ion-no-border">
          <IonButton slot="start" fill="clear" onClick={back}>
            <IonIcon icon={arrowBackOutline} className="backBtn" />
          </IonButton>
          <div className="top-row">
            <IonTitle className="group-title">My Groups</IonTitle>
          </div>
          <IonButton slot="end" fill="clear">
            <IonIcon icon={notificationsOutline} className="bell-icon" />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonButtons style={{ display: "flex", justifyContent: "end" }}>
          <IonButton fill="clear" id="open-modal" expand="block">
            <p className="addGrpLabel" style={{ marginRight: "5px" }}>
              Add Group
            </p>
            <IonIcon icon={addOutline} className="addIcon" />
          </IonButton>
        </IonButtons>

        <IonModal
          ref={modal}
          trigger="open-modal"
          presentingElement={presentingElement!}
        >
          <IonHeader>
            <IonToolbar>
              <h1>Create Group</h1>
              <IonButtons slot="end">
                <IonButton onClick={() => dismiss()}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <div style={{ paddingLeft: "10px", paddingRight: "10px" }}>
              <input
                style={{ padding: "20px" }}
                value={groupName}
                onChange={(e) => handleGroupNameChange(e)}
                placeholder="Group Name"
                className="group-name-input"
              />

              <h5 style={{ textAlign: "center" }}>Add Users</h5>
            </div>

            <div style={{ height: "100vh", overflow: "auto" }}>
              {users.map((user: any, index) => (
                <IonItem key={index}>
                  <img
                    src={user.avatar_urls["96"]}
                    alt=""
                    className="profile-image my-auto"
                    style={{
                      marginRight: "10px",
                      width: "40px",
                      height: "40px",
                      borderRadius: 100,
                    }}
                  />
                  <IonCheckbox
                    mode="ios"
                    checked={selectedUsers.includes(user)}
                    onIonChange={(e) => handleUserSelection(e, user)}
                  >
                    <IonText>{user.name}</IonText>
                  </IonCheckbox>
                </IonItem>
              ))}
            </div>
          </IonContent>
          <IonButton
            expand="full"
            onClick={createGroup}
            disabled={groupName === ""}
            className="createGrpBtn"
          >
            Create Group
          </IonButton>
        </IonModal>

        {recentGroups.map((group: any, index: any) => (
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

              <IonLabel>{group.groupName}</IonLabel>
            </li>
          </ul>
        ))}

        <IonButton
          fill="clear"
          onClick={handleBrowseGroupsClick}
          className="browse-grps-btn"
        >
          <IonText className="browse-grps-label">Browse Groups</IonText>
          <IonIcon
            size="small"
            icon={chevronForwardOutline}
            className="browse-grps-icon"
          />
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default MyGroups;
