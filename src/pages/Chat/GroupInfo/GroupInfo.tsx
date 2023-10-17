// GroupInfo.tsx
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonRow,
  IonCol,
  IonIcon,
  IonContent,
  IonButton,
  IonCheckbox,
  IonToggle,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonButtons,
} from "@ionic/react";
import {
  notificationsOutline,
  arrowBackOutline,
  add,
  closeOutline,
  createOutline,
} from "ionicons/icons";
import React, { useEffect, useRef, useState } from "react";
import "./GroupInfo.scss";
import { useHistory, useParams } from "react-router";

import apiService from "../../../Services";

import tokenService from "../../../token";
import { CreateOutline } from "react-ionicons";
import NotificationBell from "../../../components/NotificationBell";

const GroupInfo: React.FC = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const history = useHistory();

  const token = tokenService.getToken();
  const wp_token = tokenService.getWPToken();

  const [UserList, setUserList] = useState([]);

  const [allUsers, setAllUsers] = useState([]);
  let isUserModalOpen = false;

  let isGroupModalOpen = false;

  const [GroupName, setGroupName] = useState("");
  const [GroupDescription, setGroupDescription] = useState("");
  const [GroupImage, setGroupImage] = useState("");

  const back = () => {
    history.goBack();
  };

  useEffect(() => {
    getGroupInfo();
  }, []);

  const getGroupInfo = () => {
    apiService
      .get(`https://apidev.mynalu.com/v1/conversation/get/${groupId}`, token)
      .then((data: any) => {
        setGroupName(data.data.groupName);
        setGroupImage(data.data.groupImage);
        setUserList(data.data.participants);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const GetAllUsers = (keyword?: any) => {
    apiService
      .get(
        `https://app.mynalu.com/wp-json/wp/v2/users?per_page=20&page=1&search=`,
        wp_token
      )
      .then((data) => {
        const usersObjArr = [];
        data.map((user) => {
          const userObj: any = user;

          const idExists = UserList.some((item) => item.email === user.email);

          if (idExists) {
            userObj.checked = true;
          } else {
            userObj.checked = false;
            usersObjArr.push(userObj);
          }
        });
        setAllUsers(usersObjArr);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const AddUser = () => {
    isUserModalOpen = true;
    GetAllUsers();
  };

  const EditGroupInfo = () => {
    isGroupModalOpen = true;
  };

  const handleUserSelection = (e: any, user: any) => {
    const checked = e.target.checked;
    if (checked) {
      allUsers.map((userObj) => {
        if (userObj.email === user.email) {
          userObj.checked = true;
        }
      });
    } else {
      allUsers.map((userObj) => {
        if (userObj.email === user.email) {
          userObj.checked = false;
        }
      });
    }
  };

  const modalRefs = [
    useRef<HTMLIonModalElement>(null),
    useRef<HTMLIonModalElement>(null),
    // Add more refs for additional modals if needed
  ];
  const dismiss = () => {
    modalRefs.forEach((modalRef) => {
      modalRef.current?.dismiss();
    });
  };

  const submit = () => {
    const selectedUsers: any = [];

    allUsers.map((user) => {
      if (user.checked === true) {
        selectedUsers.push(user);
      }
    });

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

    const body = {
      action: "add",
      participants: [],
    };
    body.participants = usersArr;

    apiService
      .put(
        `https://apidev.mynalu.com/v1/conversation/participant/${groupId}`,
        body,
        token
      )
      .then(
        (data) => {
          // dispatch(createGroupAction(data.data));

          data.data.map((user) => {
            UserList.push(user);
          });

          setUserList(UserList);
          dismiss();

          // setGroupName("");
        },
        (err) => {
          console.log("err from creating group", err);
        }
      );
  };
  const updateGroup = () => {
    const formDataToSend = new FormData();
    formDataToSend.append("groupName", GroupName);
    formDataToSend.append("description", GroupDescription);

    apiService
      .put(
        `https://apidev.mynalu.com/v1/conversation/update/${groupId}`,
        formDataToSend,
        token
      )
      .then(
        (data) => {
          // dispatch(createGroupAction(data.data));
          dismiss();

          // setGroupName("");
        },
        (err) => {
          console.log("err from updating group", err);
        }
      );
  };
  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar className="ion-no-border">
          <IonButton slot="start" fill="clear" onClick={back}>
            <IonIcon icon={arrowBackOutline} className="backBtnIcon" />
          </IonButton>
          <IonButtons slot="end">
            <IonButton slot="end" fill="clear">
              <NotificationBell />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRow>
          <IonCol size="12">
            <div className="w-full flex align-middle items-center justify-center">
              <img src={GroupImage} className="group-icon2" />
            </div>
            <div className="w-full flex align-middle items-center justify-center">
              <span className="group-title2">{GroupName}</span>
              <IonIcon
                icon={createOutline}
                className="group-title2"
                onClick={EditGroupInfo}
                id="open-custom-dialog2"
              />
            </div>
            <hr className="under-line" />
          </IonCol>
        </IonRow>

        <div className="user-list-container">
          <IonHeader className="group-users-header">Group Members</IonHeader>
          <div className="user-list-wrapper">
            {UserList.map((user: any, index: any) => (
              <div key={index} className="users-list">
                <img src={user.userImage} className="profile-image my-auto" />

                <div className="flex align-middle justify-start items-start">
                  <h1 className="user-name2">{user.name}</h1>
                </div>
              </div>
            ))}
          </div>
          <div>
            <IonButton
              onClick={AddUser}
              id="open-custom-dialog"
              className="addBtn"
            >
              Add
              <IonIcon icon={add}></IonIcon>
            </IonButton>
          </div>
        </div>

        <IonModal
          id="example-modal"
          ref={modalRefs[0]}
          trigger="open-custom-dialog"
        >
          <div className="wrapper">
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <IonButton
                className="dismiss-btn"
                size="small"
                onClick={dismiss}
                fill="clear"
              >
                <IonIcon icon={closeOutline} />
              </IonButton>
            </div>

            <IonList lines="none" class="list-box">
              {allUsers.map((user: any, index: any) => (
                <IonItem button={true} detail={false} key={index}>
                  <img
                    src={user.avatar_urls["96"]}
                    className="profile-image my-auto"
                  />
                  <IonLabel className="ml-5px">{user.name}</IonLabel>

                  <IonCheckbox
                    mode="ios"
                    checked={user.checked}
                    onIonChange={(e) => handleUserSelection(e, user)}
                  ></IonCheckbox>
                </IonItem>
              ))}
            </IonList>

            <IonButton
              expand="full"
              onClick={submit}
              style={{ color: "white" }}
            >
              Add Users
            </IonButton>
          </div>
        </IonModal>

        <IonModal
          id="example-modal"
          ref={modalRefs[1]}
          trigger="open-custom-dialog2"
        >
          <div className="wrapper">
            <IonRow>
              <IonCol size="10"></IonCol>
              <IonCol size="2">
                <IonButton
                  className="close-icon"
                  onClick={dismiss}
                  fill="clear"
                  size="small"
                >
                  <IonIcon icon={closeOutline} size="small" />
                </IonButton>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="12">
                <div className="w-full flex align-middle items-center justify-center">
                  <img src={GroupImage} className="group-icon2" />
                </div>
              </IonCol>
              <IonCol size="12">
                <span>Group Name:</span>
                <input
                  className="group-title2"
                  type="text"
                  value={GroupName}
                  onChange={(e) => setGroupName(e.target.value)}
                />
              </IonCol>
              <IonCol size="12">
                <span>Group Description:</span>
                <textarea
                  className="group-title2 w-full h-300px text-left"
                  value={GroupDescription}
                  onChange={(e) => setGroupDescription(e.target.value)}
                ></textarea>
              </IonCol>
            </IonRow>

            <IonButton
              expand="full"
              className="updateGrp"
              onClick={updateGroup}
            >
              Update Group
            </IonButton>
          </div>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default GroupInfo;
