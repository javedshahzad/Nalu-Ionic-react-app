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
import NotificationBell from "../../components/NotificationBell";

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
      .get(`https://app.mynalu.com/wp-json/nalu-app/v1/events?lang=en`, {
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

  return (
    <>
      {isLoading? (
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
        <div className="Mygroups">
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
              {/*<IonButtons slot="end">
                <IonButton slot="end" fill="clear">
                  <NotificationBell />
                </IonButton>
              </IonButtons>*/}
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
                        <p>Hosted by</p>
                        <h6 className="ion-text-wrap">
                          <span>{event?.event_host.title}</span>,
                          {event?.event_host.description}
                        </h6>
                        <p>Coach for Cycle Health</p>
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
        </div>
      )}
    </>
  );
};

export default Mygroups;
