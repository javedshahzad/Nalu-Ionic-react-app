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
  IonPage,
  IonPopover,
  IonText,
  IonToolbar,
} from "@ionic/react";
import "./mygroups.scss";
import { useHistory } from "react-router-dom";
import { notificationsOutline } from "ionicons/icons";

import apiService from "../../../Services";

import tokenService from "../../../token";

const MyGroups: React.FC = () => {
  const [showPopover, setShowPopover] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

  const [groupsList, setGroupsList] = useState([]);

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

  const popoverRef = useRef(null);

  const [users, setUsers] = useState<any[]>([]);

  const dispatch = useDispatch();
  function dismiss() {
    setShowPopover(false);
    setGroupName("");
    setSelectedUsers([]);
  }

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
      .post(
        "https://apidev.mynalu.com/v1/conversation/create",
        formDataToSend,
        tokenService.getToken()
      )
      .then(
        (data) => {
          dispatch(createGroupAction(data.data));
          dismiss();
          setSelectedUsers([]);
          setGroupName("");
        },
        (err) => {
          console.log("err from creating group", err);
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
        `https://app.mynalu.com/wp-json/wp/v2/users?per_page=20&page=1&search=`,
        wp_token
      )
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleGroupClick = (groupId: any) => {
    history.push(`/groupchat/${groupId}`);
  };

  const handleBrowseGroupsClick = () => {
    history.push("/browsegroups");
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar className="ion-no-border">
          <IonButton slot="start" fill="clear" onClick={back}>
            <IonIcon icon={arrowBackOutline} />
          </IonButton>
          <div className="top-row">
            <h1 className="group-title">My Groups</h1>
          </div>
          <IonButton slot="end" fill="clear">
            <IonIcon icon={notificationsOutline} className="bell-icon" />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonButtons style={{ display: "flex", justifyContent: "end" }}>
          <IonButton fill="clear" onClick={openPopover}>
            <IonText style={{ marginRight: "5px" }}>Add Group</IonText>
            <IonIcon icon={addOutline}></IonIcon>
          </IonButton>
        </IonButtons>

        <IonPopover
          isOpen={showPopover}
          onDidDismiss={dismiss}
          ref={popoverRef}
        >
          <div className="popover-header">
            <h5>Create a Group</h5>
            <IonButton fill="clear">
              <IonIcon icon={cameraOutline} size="small" />
            </IonButton>
          </div>

          <div style={{ paddingLeft: "10px", paddingRight: "10px" }}>
            <input
              style={{ padding: "20px" }}
              value={groupName}
              onChange={(e) => handleGroupNameChange(e)}
              placeholder="Group Name"
              className="group-name-input"
            />
          </div>

          <h5 style={{ textAlign: "center" }}>Add Users</h5>

          <IonList>
            <IonItem>
              <div style={{ width: "100%", height: "100px", overflow: "auto" }}>
                {users.map((user: any, index) => (
                  <IonItem key={index}>
                    <img
                      src={user.avatar_urls["96"]}
                      alt=""
                      className="profile-image my-auto"
                      style={{ marginRight: "10px" }}
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
            </IonItem>
          </IonList>
          <IonButton expand="full" onClick={createGroup}>
            Create Group
          </IonButton>
          <IonButton expand="full" color="danger" onClick={dismiss}>
            Cancel
          </IonButton>
        </IonPopover>

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
                style={{ marginRight: "10px" }}
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
