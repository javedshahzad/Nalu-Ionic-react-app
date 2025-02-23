import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonRadio,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonTitle,
  IonToolbar,
  isPlatform,
  useIonToast,
} from "@ionic/react";
import {
  bookmarkOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
  heartOutline,
  notificationsOutline,
} from "ionicons/icons";

import "./Eventdetail.scss";
import { useState, useEffect } from "react";
import NotificationBell from "../../components/NotificationBell";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { HTTP } from "@awesome-cordova-plugins/http";
import authService from "../../authService";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventDateData } from "../../actions/eventsAction";

const Eventdetail: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [event, setEvent] = useState(null);
  const [dateError, setDateError] = useState("");
  const BASE_URL = process.env.BASE_URL;
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaderLoading, setIsLoaderLoading] = useState(false);
  const [flag, setFlag] = useState(true);
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [present] = useIonToast();
  const location = useLocation();
  const history = useHistory();
  const data: any = location?.state;
  const [event_Id, setEventId] = useState(data?.event_id);

  const dispatch = useDispatch();
  const controller = new AbortController();
  const eventsDetailData = useSelector(
    (state: any) => state.eventsReducer.eventDetails
  );
  const eventsDateData = useSelector(
    (state: any) => state.eventsReducer.eventDateData
  );

  console.log("eventsDateData", eventsDateData);
  // const getEventDateDate = useSelector(
  //   (state: any) => state.eventsReducer.getEventDateDate
  // );

  // useEffect(() => {
  //   console.log("getEventDateDate", getEventDateDate);
  // }, [getEventDateDate]);

  let axiosCancelToken;

  useEffect(() => {
    // getEventByID(event_Id);

    return () => {
      if (axiosCancelToken) {
        axiosCancelToken.cancel("Component unmounted");
      }
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clickedEvent = eventsDetailData[event_Id];
        clickedEvent?.then((res) => {
          setEvent(res);
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [eventsDetailData, event_Id]);

  useEffect(() => {
    const fetchDateData = async () => {
      try {
        const clickedDate = eventsDateData[event_Id];
        clickedDate?.then((res) => {
          setEvent(res);
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchDateData();
  }, [eventsDateData, event_Id]);

  useEffect(() => {
    if (event) {
      console.log(">>>", event);
      const datesDate = event?.dates?.map((date) => {
        dispatch<any>(fetchEventDateData(date?.event_id));
      });
    }

    // Cleanup function to cancel requests
    return () => {
      controller.abort();
    };
  }, [event]);

  // useEffect(() => {
  //   const clickedEventDate = eventsDetailData[event_Id];

  //   return () => {
  //     second;
  //   };
  // }, [third]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // setIsLoading(true);
  //       if (getEventDateDate) {
  //         const result = await getEventDateDate;
  //         console.log("result", result);
  //       }
  //       // setCourseData(result);

  //       // setIsLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [getEventDateDate]);
  const getEventByID = (event_id) => {
    setIsLoading(true);

    const jwtToken = localStorage.getItem("jwtToken");
    const headers = {
      Authorization: `Bearer ${jwtToken}`,
    };

    if (isPlatform("ios")) {
      // Use Cordova HTTP plugin for iOS
      // HTTP.get(
      //   `${BASE_URL}/wp-json/nalu-app/v1/event/${event_id}?lang=de`,
      //   {},
      //   headers
      // )
      //   .then((response) => {
      //     const data = JSON.parse(response.data);
      //     setEvent(data);
      //     setIsLoading(false);
      //   })
      // .catch((error) => {
      //   if (error) {
      //     const status = error.status;
      //     if (status === 401 || status === 403 || status === 404) {
      //       // Unauthorized, Forbidden, or Not Found
      //       authService.logout();
      //       history.push("/onboarding");
      //     }
      //   }
      // console.error(error);
      // setIsLoading(false);
      // });
    } else {
      // Use Axios for other platforms
      // const source = axios.CancelToken.source();
      // axiosCancelToken = source;
      // axios
      //   .get(`${BASE_URL}/wp-json/nalu-app/v1/event/${event_id}?lang=de`, {
      //     headers: headers,
      //     cancelToken: source.token,
      //   })
      //   .then((response) => {
      //     setEvent(response.data);
      //     setIsLoading(false);
      //   })
      //   .catch((error) => {
      //     setIsLoading(false);
      //     if (axios.isCancel(error)) {
      //       console.log("Request was canceled:", error.message);
      //     } else {
      //       console.log(error);
      //     }
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
      //     console.error(error);
      //   });
    }
  };

  useEffect(() => {
    const fetchDateData = async () => {
      try {
        const clickedDate = eventsDateData[event_Id];
        clickedDate?.then((res) => {
          setEvent(res);
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchDateData();
  }, [eventsDateData, event_Id]);

  const handleDateChange = async (event, date_event, registration_link) => {
    console.log("date_event", date_event);

    const clickedDate = await eventsDateData[date_event?.event_id];
    // await clickedDate?.then((res) => {
    setEvent(clickedDate);

    console.log("setEvent", clickedDate);
    // });
    // setIsLoaderLoading(true);
    // const value = event.target.value;

    // if (isPlatform("ios")) {
    //   const jwtToken = localStorage.getItem("jwtToken");
    //   const headers = {
    //     Authorization: `Bearer ${jwtToken}`,
    //   };
    //   // Use Cordova HTTP plugin for iOS
    //   try {
    //     const response = await HTTP.get(
    //       `${BASE_URL}/wp-json/nalu-app/v1/event/${date_event.event_id}`,
    //       {},
    //       headers
    //     );
    //     const data = JSON.parse(response.data);

    //     setEvent(data);
    //     setIsDateSelected(true);
    //     setIsLoaderLoading(false);
    //   } catch (error) {
    //     if (error) {
    //       const status = error.status;

    //       if (status === 401 || status === 403 || status === 404) {
    //         // Unauthorized, Forbidden, or Not Found
    //         authService.logout();
    //         history.push("/onboarding");
    //       }
    //     }
    //     console.error(error);
    //     setIsLoaderLoading(false);
    //   } finally {
    //     setIsLoaderLoading(false);
    //   }
    // } else {
    //   axios
    //     .get(`${BASE_URL}/wp-json/nalu-app/v1/event/${date_event.event_id}`, {
    //       headers: {
    //         Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    //       },
    //     })
    //     .then((response) => {
    //       setEvent(response.data);
    //       setIsDateSelected(true);
    //       setIsLoaderLoading(false);
    //     })
    //     .catch((error) => {
    //       if (isPlatform("ios")) {
    //         if (error) {
    //           const status = error.status;

    //           if (status === 401 || status === 403 || status === 404) {
    //             // Unauthorized, Forbidden, or Not Found
    //             authService.logout();
    //             history.push("/onboarding");
    //           }
    //         }
    //       } else {
    //         if (error.response) {
    //           const status = error.response.status;

    //           if (status === 401 || status === 403 || status === 404) {
    //             // Unauthorized, Forbidden, or Not Found
    //             authService.logout();
    //             history.push("/onboarding");
    //           }
    //         }
    //       }

    //       console.error(error);
    //       setIsLoaderLoading(false);
    //     });
    // }

    // setSelectedDate(value);
    // setDateError(
    //   value.trim() === "" ? "Bitte wähle ein Datum, um fortzufahren." : ""
    // );
  };
  const handleDateChangeWebinar = async (
    event,
    date_event,
    registration_link
  ) => {
    setIsLoaderLoading(true);

    const value = event.target.value;

    const updatedRegistrationLink = registration_link.replace(
      "{schedule_id}",
      date_event.schedule_id
    );

    if (isPlatform("ios")) {
      const jwtToken = localStorage.getItem("jwtToken");
      const headers = {
        Authorization: `Bearer ${jwtToken}`,
      };
      // Use Cordova HTTP plugin for iOS
      try {
        const response = await HTTP.get(updatedRegistrationLink, {}, headers);
        const data = JSON.parse(response.data);

        if (data === "Accepted") {
          setIsDateSelected(true);
        }
        setIsLoaderLoading(false);
      } catch (error) {
        if (error) {
          const status = error.status;

          if (status === 401 || status === 403 || status === 404) {
            // Unauthorized, Forbidden, or Not Found
            authService.logout();
            history.push("/onboarding");
          }
        }
        console.error(error);
        setIsLoaderLoading(false);
      } finally {
        setIsLoaderLoading(false);
      }
    } else {
      axios
        .get(updatedRegistrationLink, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        })
        .then((response) => {
          if (response.data === "Accepted") {
            setIsDateSelected(true);
          }
          setIsLoaderLoading(false);
        })
        .catch((error) => {
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

          console.error(error);
          setIsLoaderLoading(false);
        });
    }
    setSelectedDate(value);
    setDateError(
      value.trim() === "" ? "Bitte wähle ein Datum, um fortzufahren." : ""
    );
  };

  const handleIcons = async (URL) => {
    setIsLoading(true);
    let apiResponse;

    if (isPlatform("ios")) {
      const jwtToken = localStorage.getItem("jwtToken");
      const headers = {
        Authorization: `Bearer ${jwtToken}`,
      };
      // Use Cordova HTTP plugin for iOS
      try {
        const response = await HTTP.post(URL, {}, headers);
        apiResponse = JSON.parse(response.data);
        if (apiResponse.message === "Updated successfully") {
          getEventByID(event_Id);
        }
        setIsLoading(false);
      } catch (error) {
        if (error) {
          const status = error.status;

          if (status === 401 || status === 403 || status === 404) {
            // Unauthorized, Forbidden, or Not Found
            authService.logout();
            history.push("/onboarding");
          }
        }
        console.error(error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
        if (apiResponse && apiResponse) {
          present({
            message: `${apiResponse.message}`,
            color: "success",
            duration: 3000,
            position: "top",
          });
        } else {
          // Handle the case where there is no response
          present({
            message: "An error occurred",
            color: "danger",
            duration: 3000,
            position: "top",
          });
        }
      }
    } else {
      axios
        .post(URL, null, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        })
        .then((response) => {
          apiResponse = response;
          if (response.data.message === "Updated successfully") {
            getEventByID(event_Id);
          }
        })
        .catch((error) => {
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

          console.error(error);
        })
        .finally(() => {
          setIsLoading(false);
          if (apiResponse && apiResponse.data) {
            present({
              message: `${apiResponse.data.message}`,
              color: "success",
              duration: 2000,
              position: "top",
            });
          } else {
            // Handle the case where there is no response
            present({
              message: "An error occurred",
              color: "danger",
              duration: 2000,
              position: "top",
            });
          }
        });
    }
  };

  return (
    <>
      <IonPage className="Eventdetail">
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
              <IonToolbar>
                <IonButtons slot="start">
                  <IonBackButton
                    color="dark"
                    text={""}
                    defaultHref="/tabs/tab2"
                  />
                </IonButtons>
                <IonTitle dangerouslySetInnerHTML={event?.title} />
                {/*<IonButtons slot="end">
                  <IonButton color="dark">
                    <IonIcon icon={heartOutline} />
                  </IonButton>
                </IonButtons>
                <IonButtons slot="end">
                  <IonButton slot="end" fill="clear">
                    <NotificationBell />
                  </IonButton>
                 </IonButtons>*/}
              </IonToolbar>
            </IonHeader>
            <IonContent
              fullscreen
              className={`${isPlatform("ios") ? "safe-padding" : ""}`}
            >
              <div className="top-img-holder ion-text-center">
                <img src={event?.image_url} alt="" />
              </div>

              <div className="content ion-padding">
                <div className="category-tag">
                  <IonItem lines="none">
                    <IonLabel>{event?.schedule}</IonLabel>
                  </IonItem>
                </div>

                <div className="rec">
                  <div className="details">
                    <h2 dangerouslySetInnerHTML={{ __html: event?.title }}></h2>

                    <IonItem lines="none">
                      <div className="start-slot flex al-start " slot="start">
                        <IonAvatar>
                          <img src={event?.event_host?.image} alt="" />
                        </IonAvatar>

                        <IonIcon
                          className="verify"
                          src="assets/imgs/icn-verify.svg"
                        />
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

                    <div className="desc">
                      {event?.content?.trim() === "" ? (
                        <span />
                      ) : (
                        <p
                          className="ion-text-wrap"
                          dangerouslySetInnerHTML={{ __html: event?.content }}
                        ></p>
                      )}
                    </div>
                  </div>
                  <div className="signup-form">
                    <div className="date-selector">
                      <IonItem lines="none" className="ion-text-left">
                        {event?.type === "single" ? (
                          <p>{event?.schedule}</p>
                        ) : (
                          <>
                            <IonSelect
                              className="ion-text-left "
                              placeholder={"Datum wählen"}
                              cancelText="Abbrechen"
                              okText="Bestätigen"
                              mode="md"
                              value={selectedDate}
                              onIonChange={(e) => {
                                if (event?.type === "series") {
                                  handleDateChange(
                                    e,
                                    event?.dates?.find(
                                      (date) => date.date === e.target.value
                                    ),
                                    event?.registration_link
                                  );
                                } else {
                                  handleDateChangeWebinar(
                                    e,
                                    event?.dates?.find(
                                      (date) => date.date === e.target.value
                                    ),
                                    event?.registration_link
                                  );
                                }
                              }}
                            >
                              {event?.dates?.map((date, date_index) => (
                                <IonSelectOption
                                  key={date_index}
                                  value={date.date}
                                >
                                  {date.date}
                                </IonSelectOption>
                              ))}
                            </IonSelect>
                            {isLoaderLoading ? (
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  height: "10vh",
                                  width: "30px",
                                }}
                              >
                                <IonSpinner name="crescent"></IonSpinner>
                              </div>
                            ) : null}
                          </>
                        )}
                      </IonItem>

                      {dateError && (
                        <p className="error-message">{dateError}</p>
                      )}
                    </div>

                    {isDateSelected === true || event?.type === "single" ? (
                      <div className="btns-holder">
                        <IonRow>
                          {event?.type === "everwebinar" && isDateSelected && (
                            <IonCol size="12" id={"register"}>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <IonButton fill="clear">
                                  <p>
                                    <IonIcon icon={checkmarkCircleOutline} />{" "}
                                    <br />
                                    Anmelden
                                  </p>
                                </IonButton>
                              </div>
                            </IonCol>
                          )}
                          {event?.type === "series" ||
                            (event?.type === "single" && (
                              <>
                                <IonCol
                                  size="4"
                                  id={
                                    event?.is_registered === true
                                      ? "register"
                                      : ""
                                  }
                                >
                                  <IonButton
                                    onClick={() =>
                                      handleIcons(event?.registration_link)
                                    }
                                    fill="clear"
                                    color={
                                      event?.is_registered === false ||
                                      event?.is_registered === null
                                        ? "dark"
                                        : ""
                                    }
                                  >
                                    <p>
                                      <IonIcon icon={checkmarkCircleOutline} />{" "}
                                      <br />
                                      Register
                                    </p>
                                  </IonButton>
                                </IonCol>
                                <IonCol
                                  size="4"
                                  id={
                                    event?.is_bookmarked === true
                                      ? "register"
                                      : ""
                                  }
                                >
                                  <IonButton
                                    onClick={() =>
                                      handleIcons(event?.bookmark_link)
                                    }
                                    fill="clear"
                                    color={
                                      event?.is_bookmarked === false ||
                                      event?.is_bookmarked === null
                                        ? "dark"
                                        : ""
                                    }
                                  >
                                    <p>
                                      <IonIcon icon={bookmarkOutline} /> <br />
                                      Vormerken
                                    </p>
                                  </IonButton>
                                </IonCol>
                                <IonCol
                                  size="4"
                                  id={
                                    event?.is_cancelled === true
                                      ? "register"
                                      : ""
                                  }
                                >
                                  <IonButton
                                    onClick={() =>
                                      handleIcons(event?.cancel_link)
                                    }
                                    fill="clear"
                                    color={
                                      event?.is_cancelled === false ||
                                      event?.is_cancelled === null
                                        ? "dark"
                                        : ""
                                    }
                                  >
                                    <p>
                                      <IonIcon icon={closeCircleOutline} />{" "}
                                      <br />
                                      Absagen
                                    </p>
                                  </IonButton>
                                </IonCol>
                              </>
                            ))}
                        </IonRow>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </IonContent>
          </>
        )}
      </IonPage>
    </>
  );
};

export default Eventdetail;
