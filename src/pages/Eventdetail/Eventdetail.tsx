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
import { useLocation } from "react-router-dom";
import axios from "axios";

const Eventdetail: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [event, setEvent] = useState(null);
  const [dateError, setDateError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const data: any = location?.state;
  let axiosCancelToken;

  useEffect(() => {
    getEventByID(data?.event_id);
    return () => {
      if (axiosCancelToken) {
        axiosCancelToken.cancel("Component unmounted");
      }
    };
  }, []);

  const getEventByID = (event_id) => {
    setIsLoading(true);
    const source = axios.CancelToken.source();
    axiosCancelToken = source;

    axios
      .get(
        `https://app.mynalu.com/wp-json/nalu-app/v1/event/${event_id}?lang=en`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
          cancelToken: source.token,

        }
      )
      .then((response) => {
        console.log(response.data);
        setEvent(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        if (axios.isCancel(error)) {
          console.log("Request was canceled:", error.message);
        } else {
          console.log(error);
        }
      });
  };

  const handleDateChange = (event, event_id,type) => {
    const value = event.target.value;
    if(type === 'series'){
      axios
      .get(`https://app.mynalu.com/wp-json/nalu-app/v1/event/${event_id}?lang=en`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        
      });
    }

    setSelectedDate(value);
    setDateError(
      value.trim() === "" ? "Please select a date to continue." : ""
    );
  };

  return (
    <>
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
          <div className="Eventdetail">
            <IonHeader className="ion-no-border">
              <IonToolbar>
                <IonButtons slot="start">
                  <IonBackButton
                    color="dark"
                    text={""}
                    defaultHref="/tabs/tab3"
                  />
                </IonButtons>
                <IonTitle>{event?.title}</IonTitle>
                <IonButtons slot="end">
                  <IonButton color="dark">
                    <IonIcon icon={heartOutline} />
                  </IonButton>
                </IonButtons>
                <IonButtons slot="end">
                  <IonButton slot="end" fill="clear">
                    <NotificationBell />
                  </IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
              <div className="top-img-holder ion-text-center">
                <img src={event?.image_url} alt="" />
              </div>

              <div className="content ion-padding">
                <div className="category-tag">
                  <IonItem lines="none">
                    <IonLabel>Monthly</IonLabel>
                  </IonItem>
                </div>

                <div className="rec">
                  <div className="details">
                    <h2>{event?.title}</h2>

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
                        <p>Hosted by</p>
                        <h6 className="ion-text-wrap">
                          <span>{event?.event_host?.title}, </span>{" "}
                          {event?.event_host?.description}
                        </h6>
                      </IonLabel>
                    </IonItem>

                    <div className="desc">
                      <p
                        className="ion-text-wrap"
                        dangerouslySetInnerHTML={{ __html: event?.content }}
                      ></p>
                    </div>
                  </div>
                  <div className="signup-form">
                    <div className="date-selector">
                      <IonItem lines="none" className="ion-text-left">
                        <IonSelect
                          className="ion-text-left "
                          placeholder={event?.type === "single" ? "" : "Select Date"}
                          mode="md"
                          disabled={event?.type === "single"}
                          value={selectedDate}
                          label={event?.type === "single" ? event?.schedule : ''}
                          onIonChange={(e) => handleDateChange(e, event?.dates?.find(date => date.date === e.target.value)?.event_id, event?.type)}
                          >
                          {event?.dates?.map((date, date_index) => (
                            <IonSelectOption
                             key={date_index} value={date.date}>
                              {date.date}
                            </IonSelectOption>
                          ))}
                        </IonSelect>
                      </IonItem>

                      {dateError && (
                        <p className="error-message">{dateError}</p>
                      )}
                    </div>

                    <div className="btns-holder">
                      <IonRow>
                        <IonCol size="4" id="register">
                          <IonButton fill="clear">
                            <p>
                              <IonIcon icon={checkmarkCircleOutline} /> <br />
                              Register
                            </p>
                          </IonButton>
                        </IonCol>
                        <IonCol size="4">
                          <IonButton fill="clear" color="dark">
                            <p>
                              <IonIcon icon={bookmarkOutline} /> <br />
                              Bookmark
                            </p>
                          </IonButton>
                        </IonCol>
                        <IonCol size="4">
                          <IonButton fill="clear" color="dark">
                            <p>
                              <IonIcon icon={closeCircleOutline} /> <br />
                              Cancel
                            </p>
                          </IonButton>
                        </IonCol>
                      </IonRow>
                    </div>
                  </div>
                </div>
              </div>
            </IonContent>
          </div>
        </>
      )}
    </>
  );
};

export default Eventdetail;
