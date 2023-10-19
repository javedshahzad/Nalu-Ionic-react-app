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
} from "@ionic/react";
import {
  checkmarkCircle,
  chevronForward,
  mailOutline,
  notificationsOutline,
} from "ionicons/icons";

import "./Mygroups.scss";
import { useHistory } from "react-router";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const Mygroups: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [event, setEvents] = useState(null);

  const history = useHistory();

  useEffect(() => {
    getEvents();
  }, []);

  const navigateToNextPage = () => {
    history.push("/Eventdetail"); // Navigate to the "/next" route
  };

  const getEvents = () => {
    setIsLoading(true);

    axios
      .get(`https://app.mynalu.com/wp-json/nalu-app/v1/event/2146?lang=en`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setEvents(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  return (
    <>
      {isLoading ? (
        <>
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
        </>
      ) : (
        <IonPage className="Mygroups">
          <IonHeader className="ion-no-border">
            <IonToolbar>
              <IonButtons slot="start">
                <IonBackButton
                  color="dark"
                  text={""}
                  defaultHref="/tabs/tab2"
                />
              </IonButtons>
              <IonTitle>My Groups</IonTitle>
              <IonButtons slot="end">
                <IonButton color="dark">
                  <IonIcon icon={notificationsOutline} />
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding" fullscreen>
            <div className="list">
              <div className="title ion-text-right">
                <IonButton fill="clear">
                  Edit
                  <IonIcon slot="start" src="assets/imgs/Pen.svg" />
                </IonButton>
              </div>
              <IonItem lines="none" detail={false}>
                <IonAvatar className="flex al-center jc-center" slot="start">
                  <h3>A</h3>
                </IonAvatar>
                <IonLabel>
                  <h4>NALU Endo Flow - English</h4>
                  <h6 className="ion-text-wrap">
                    Nisi Quis voluptate esse pariatela
                  </h6>
                </IonLabel>
                <div className="end-slot ion-text-right" slot="end">
                  <p>6:27 PM</p>
                </div>
              </IonItem>
              <IonItem lines="none" detail={false}>
                <IonAvatar className="flex al-center jc-center" slot="start">
                  <h3>A</h3>
                </IonAvatar>
                <IonLabel>
                  <h4>NALU Endo Flow - English</h4>
                  <h6 className="ion-text-wrap">
                    Nisi Quis voluptate esse pariatela
                  </h6>
                </IonLabel>
                <div className="end-slot ion-text-right" slot="end">
                  <p>12.07.2023</p>
                  <IonBadge className="flex al-center jc-center">2</IonBadge>
                </div>
              </IonItem>
            </div>
            <div className="browse-group">
              <IonButton fill="clear">
                Browse Group
                <IonIcon slot="end" icon={chevronForward} />
              </IonButton>
            </div>
            <div className="next">
              <div className="title">
                <h3>Next Calls</h3>
              </div>

              <div className="next-list">
                <div className="next-card" onClick={() => navigateToNextPage()}>
                  <div className="img-holder">
                    <img src={event?.image_url} alt="" />
                  </div>
                  <div className="dates flex al-center jc-between">
                    <div>
                      <p>{event?.schedule}</p>
                      <h4>{event?.title}</h4>
                    </div>
                    {/* <IonIcon icon={checkmarkCircle} /> */}
                    <IonIcon slot="start" src="assets/imgs/bookmark-blue.svg" />
                    {/* <IonIcon slot="start" src="assets/imgs/cross-icon.svg" /> */}


                  </div>
                  <IonItem lines="none">
                    <div className="start-slot flex al-start " slot="start">
                      <IonAvatar>
                        <img src={event?.event_host.image} alt="" />

                      </IonAvatar>
                    </div>
                    <IonLabel>
                      <p>Hosted by</p>
                      <h6 className="ion-text-wrap">
                        <span>{event?.event_host.title}</span>,
                        {event?.event_host.description}
                      </h6>
                      <p>Coach for Cycle Health</p>
                    </IonLabel>
                  </IonItem>
                </div>

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
                <IonAvatar >
                  <img src="assets/imgs/user.png" alt="" />
                </IonAvatar>
                </div>
                <IonLabel>
                  <p>Hosted by</p>
                  <h6 className="ion-text-wrap">
                    <span>Sonia Sarina</span>, Certified Health Coach in Private Practice
                  </h6>
                </IonLabel>
              </IonItem>
            </div> */}
              </div>
            </div>
          </IonContent>
        </IonPage>
      )}
    </>
  );
};

export default Mygroups;
