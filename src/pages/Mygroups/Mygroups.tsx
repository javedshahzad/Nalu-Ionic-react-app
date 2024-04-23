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
  useIonViewWillEnter,
  isPlatform,
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
import { HTTP } from "@awesome-cordova-plugins/http";
import NotificationBell from "../../components/NotificationBell";
import { RootState } from "../../store/store";
import { createGroupAction } from "../../actions/groupsActions";
import apiService from "../../Services";
import tokenService from "../../token";
import { io } from "socket.io-client";
import { groupsListAction } from "../../actions/groupsListAction";
import authService from "../../authService";
import groupImg from "../../assets/images/groupImage.png";
import { fetchEventDetail } from "../../actions/eventsAction";

const Mygroups: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState(null);
  const eventsDetailData = useSelector(
    (state: any) => state.eventsReducer.eventDetails
  );

  const BASE_URL = process.env.BASE_URL;

  const history = useHistory();
  let axiosCancelToken;

  // useEffect(() => {
  //   getEvents();
  //   return () => {
  //     if (axiosCancelToken) {
  //       axiosCancelToken.cancel("Component unmounted");
  //     }
  //   };
  // }, []);

  useIonViewDidLeave(() => {
    if (!isPlatform("ios") && axiosCancelToken) {
      axiosCancelToken.cancel("Component unmounted");
    }
  });

  const token = tokenService.getToken();
  // const socket = io("https://apidev.mynalu.com/", {
  //   query: {
  //     token,
  //   },
  // });

  // useIonViewWillEnter(() => {
  //   if (localStorage.getItem("refreshToken")) {
  //     socket.emit("my-group-list", {
  //       search: "",
  //       page: 1,
  //       limit: 10,
  //       user: localStorage.getItem("chatApiUserId"),
  //     });
  //   }
  //   if (localStorage.getItem("refreshToken")) {
  //     socket.on("my-group-list", (data: any) => {
  //       if (data.results && data.results.length > 0) {
  //         dispatchFunction(data.results);
  //       }
  //     });
  //   }
  // });

  const dispatchFunction = (param: any) => {
    dispatch(groupsListAction(param));
  };

  const navigateToNextPage = (id) => {
    history.push("/tabs/tab2/eventdetail", {
      event_id: id,
    });
  };

  // const getEvents = async () => {
  //   setIsLoading(true);

  //   const headers = {
  //     Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
  //   };

  //   try {
  //     let response;
  //     if (isPlatform("ios")) {
  //       const cordovaResponse = await HTTP.get(
  //         `${BASE_URL}/wp-json/nalu-app/v1/events?lang=de`,
  //         {},
  //         headers
  //       );
  //       response = JSON.parse(cordovaResponse.data);
  //     } else {
  //       const source = axios.CancelToken.source();
  //       axiosCancelToken = source;

  //       const axiosResponse = await axios.get(
  //         `${BASE_URL}/wp-json/nalu-app/v1/events?lang=de`,
  //         {
  //           headers,
  //           cancelToken: source.token,
  //         }
  //       );
  //       response = axiosResponse.data;
  //     }
  //     setEvents(response);
  //   } catch (error) {
  //     if (isPlatform("ios")) {
  //       if (error) {
  //         const status = error.status;

  //         if (status === 401 || status === 403 || status === 404) {
  //           // Unauthorized, Forbidden, or Not Found
  //           authService.logout();
  //           history.push("/onboarding");
  //         }
  //       }
  //     } else {
  //       if (error.response) {
  //         const status = error.response.status;

  //         if (status === 401 || status === 403 || status === 404) {
  //           // Unauthorized, Forbidden, or Not Found
  //           authService.logout();
  //           history.push("/onboarding");
  //         }
  //       }
  //     }
  //     console.error("error", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const [showPopover, setShowPopover] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const fetchEvents = useSelector(
    (state: any) => state.eventsReducer.getEvents
  );

  const [groupsList, setGroupsList] = useState([]);

  const modal = useRef<HTMLIonModalElement>(null);
  const page = useRef(null);

  const [presentingElement, setPresentingElement] =
    useState<HTMLElement | null>(null);
  const [present] = useIonActionSheet();

  const groups = useSelector((state: RootState) => state.groups);

  const wp_token = tokenService.getWPToken();

  useEffect(() => {
    setTimeout(() => {
      setGroupsList(groups);
    }, 2000);
  }, [groups]);

  const back = () => {
    history.goBack();
  };

  useEffect(() => {
    setIsLoading(true);
    fetchEvents
      .then((result: any) => {
        const data = result;
        setEvents(data);
        setIsLoading(false);
      })

      .catch((error: any) => {
        console.error("Error fetching events", error);
      });
  }, [fetchEvents]);

  useEffect(() => {
    if (events && events.length > 0) {
      events.map((event) => {
        const { id } = event;
        dispatch<any>(fetchEventDetail(id));
      });
    }
  }, [events]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // eventsDetailData.then(async (res) => {
        // const data = await res;

        console.log("data", eventsDetailData);
        // });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [eventsDetailData]);

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
      .get(`${BASE_URL}/wp-json/wp/v2/users?per_page=20&page=1&search=`)
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        if (isPlatform("ios")) {
          if (error) {
            const status = error.status;

            if (status === 401 || status === 403 || status === 404) {
              // Unauthorized, Forbidden, or Not Found
              // authService.logout();
              // history.push("/onboarding");
            }
          }
        } else {
          if (error.response) {
            const status = error.response.status;

            if (status === 401 || status === 403 || status === 404) {
              // Unauthorized, Forbidden, or Not Found
              // authService.logout();
              // history.push("/onboarding");
            }
          }
        }

        console.error(error);
      });
  };

  const handleGroupClick = (groupId: any) => {
    history.push(`/groupchat/${groupId}`);
    // window.location.reload();
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

  const imgUrl = (params: string) => {
    let url = "";
    if (params.includes("//groupImages") || params.includes("public")) {
      if (params.includes("public")) {
        return url;
      } else {
        url = params.replace("//groupImages", "/public/groupImages");
      }
    } else {
      url = params;
    }
    return url;
  };

  return (
    <IonPage ref={page} className="Mygroups">
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#F8F5F2",
          }}
        >
          <IonSpinner name="crescent"></IonSpinner>
        </div>
      ) : (
        <>
          <IonHeader className="ion-no-border">
            <IonToolbar className="ion-no-border">
              {/* <IonButton slot="start" fill="clear" onClick={back}>
                <IonIcon icon={arrowBackOutline} className="backBtn" />
              </IonButton> */}
              <div className="top-row">
                <h1 className="group-title">Community</h1>
              </div>
              <IonButton slot="end" fill="clear">
                {/*<IonIcon icon={notificationsOutline} className="bell-icon" />*/}
              </IonButton>
            </IonToolbar>
          </IonHeader>
          <IonContent
            fullscreen
            className={`${isPlatform("ios") ? "safe-padding" : ""}`}
          >
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
            {/* socket commented out */}
            {/* <ul className="browsed-grps">
              {groups.map((group: any, index: any) => (
                <li
                  onClick={() => handleGroupClick(group._id)}
                  className="browse-grp-items"
                  key={index}
                >
                  <img
                    src={imgUrl(group.groupImage)}
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
              ))}
            </ul> */}
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
                        <h4
                          dangerouslySetInnerHTML={{ __html: event?.title }}
                        ></h4>
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
                          <span className="host-title">
                            {event?.event_host.title}
                          </span>
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
