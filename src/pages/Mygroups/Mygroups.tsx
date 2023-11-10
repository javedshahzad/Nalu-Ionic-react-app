import {
  IonAvatar,
  IonBackButton,
  IonBadge,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
  useIonViewDidLeave,
  useIonViewWillLeave,
  IonCheckbox,
  IonList,
  IonModal,
  IonPopover,
  IonText,
  useIonActionSheet,
} from "@ionic/react";
import {
  checkmarkCircle,
  chevronForward,
  mailOutline,
  notificationsOutline,
  addOutline,
  arrowBackOutline,
  cameraOutline,
  chevronForwardOutline,
} from "ionicons/icons";

import "./Mygroups.scss";
import { useHistory } from "react-router";
import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import NotificationBell from "../../components/NotificationBell";
import { RootState } from "../../store/store";
import { createGroupAction } from "../../actions/groupsActions";
import apiService from "../../Services";
import tokenService from "../../token";

const Mygroups: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState(null);

  const history = useHistory();
  let axiosCancelToken;

  useEffect(() => {
    getEvents();
    return () => {
      if (axiosCancelToken) {
        axiosCancelToken.cancel("Component unmounted");
      }
    };
  },[]);

  useIonViewDidLeave(() => {
    axiosCancelToken.cancel("Component unmounted");
  });
 
  
  const navigateToNextPage = (id) => {
    console.log(id);
    history.push("/tabs/tab3/eventdetail", {
      event_id: id,
    });
  };

  const getEvents = () => {
    setIsLoading(true);
    const source = axios.CancelToken.source();
    axiosCancelToken = source;

    axios
      .get(`https://app.mynalu.com/wp-json/nalu-app/v1/events?lang=de`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
        cancelToken: source.token,

      })
      .then((response) => {
        console.log(response.data);
        setEvents(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        if (axios.isCancel(error)) {
          console.log("Request was canceled:", error.message);
        } else {
          console.log(error);
        }
      });
  };
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
      .post(
        "https://apidev.mynalu.com/v1/conversation/create",
        formDataToSend
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
        `https://app.mynalu.com/wp-json/wp/v2/users?per_page=20&page=1&search=`
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
    <IonPage ref={page} className="Mygroups">
      {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <IonSpinner name="crescent"></IonSpinner>
          </div>
        ) : (
          <>
      <IonHeader className="ion-no-border">
        <IonToolbar className="ion-no-border">
          <IonButton slot="start" fill="clear" onClick={back}>
            <IonIcon icon={arrowBackOutline} className="backBtn" />
          </IonButton>
          <div className="top-row">
            <h1 className="group-title">Community</h1>
          </div>
          <IonButton slot="end" fill="clear">
            {/*<IonIcon icon={notificationsOutline} className="bell-icon" />*/}
            </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {/*<IonButtons style={{ display: "flex", justifyContent: "end" }}>
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
          </IonContent>
          <IonButton
            expand="full"
            onClick={createGroup}
            disabled={groupName === ""}
            className="createGrpBtn"
          >
            Create Group
          </IonButton>
        </IonModal>*/}

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

        {/*<IonButton
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
        </IonButton>*/}
            <div className="next">
              <div className="title">
                <h3>Nächste Calls</h3>
              </div>

              <div className="next-list">
                {events?.map((event, event_index) => (
                  <div
                    className="next-card"
                    key={event_index}
                    onClick={() => navigateToNextPage(event?.id)}
                  >
                    <div className="img-holder">
                      <img src={event?.thumbnail_url} alt="" />
                    </div>
                    <div className="dates flex al-center jc-between">
                      <div>
                        <p>{event?.schedule}</p>
                        <h4 dangerouslySetInnerHTML={{ __html: event?.title }}></h4>

                      </div>
                      <IonIcon
                        slot="start"
                        src={
                          event?.is_bookmarked
                            ? "assets/imgs/bookmark-blue.svg"
                            : event?.is_cancelled
                            ? "assets/imgs/cross-icon.svg"
                            : event?.is_registered
                            ? checkmarkCircle
                            : "assets/imgs/closed-letterr.svg"
                        }
                      />
                    </div>
                    <IonItem lines="none">
                      <div className="start-slot flex al-start " slot="start">
                        <IonAvatar>
                          <img src={event?.event_host.image} alt="" />
                        </IonAvatar>
                      </div>
                      <IonLabel>
                        <p>Geleitet von</p>
                        <h6 className="ion-text-wrap">
                          <span className="host-title">{event?.event_host.title}</span>
                          {event?.event_host.description && <>,&nbsp;</>}
                          {event?.event_host.description}
                        </h6>
                      </IonLabel>
                    </IonItem>
                  </div>
                ))}

                {/* <div className="next-card closed">
            
              <div className="img-holder">
                <div className="overlay flex al-center jc-center">
                  <img src="assets/imgs/lockw.svg" alt="" />
                </div>
                <img src="assets/imgs/next.png" alt="" />
              </div>
              <div className="dates flex al-center jc-between">
                <div>
                  <p>Tuesday, 26th of July 2023, 8 PM</p>
                  <h4>Live Women’s Cicle</h4>
                </div>
                <IonIcon icon={mailOutline} />
              </div>
              <IonItem lines="none">
                <div className="start-slot flex al-start " slot="start">
                  <IonAvatar>
                    <img src="assets/imgs/user.png" alt="" />
                  </IonAvatar>
                </div>
                <IonLabel>
                  <p>Hosted by</p>
                  <h6 className="ion-text-wrap">
                    <span>Sonia Sarina</span>, Certified Health Coach in Private
                    Practice
                  </h6>
                </IonLabel>
              </IonItem>
            </div> */}
              </div>
            </div>
          </IonContent>
          </>
        )}
    </IonPage>
  );
};

export default Mygroups;
