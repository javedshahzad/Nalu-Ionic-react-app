import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonIcon,
  IonPage,
  IonToolbar,
  isPlatform,
} from "@ionic/react";

import "./Journalcalender.scss";
import {
  menuOutline,
  searchOutline,
  notificationsOutline,
  optionsOutline,
} from "ionicons/icons";
import { useEffect, useRef } from "react";
import NotificationBell from "../../components/NotificationBell";

const Journalcalender: React.FC = () => {
  const datetime = useRef<null | HTMLIonDatetimeElement>(null);

  useEffect(() => {
    // if (!datetime.current) return;
    // datetime.current.value = ['2023-08-23', '2023-08-24', '2023-08-25'];
  }, []);

  return (
    <IonPage className="Journalcalender">
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton color="dark">
            <IonIcon icon={menuOutline} />
          </IonButton>
        </IonButtons>

        <IonButtons slot="end">
          <IonButton color="dark">
            <IonIcon icon={searchOutline} />
          </IonButton>
        </IonButtons>
        <IonButtons slot="end">
          <IonButton slot="end" fill="clear">
            <NotificationBell />
          </IonButton>
        </IonButtons>
      </IonToolbar>
      <IonContent
        className={`ion-padding-horizontal ${
          isPlatform("ios") ? "safe-padding" : ""
        }`}
        fullscreen
      >
        <div className="calender-holder">
          <IonDatetime
            ref={datetime}
            presentation="date"
            multiple={true}
            id="daettime"
            highlightedDates={(isoString) => {
              const date = new Date(isoString);
              const utcDay = date.getUTCDate();

              if (utcDay <= 10 && utcDay > 6) {
                return {
                  textColor: "#ffff",
                  backgroundColor: "#3684B3",
                };
              }

              if (utcDay <= 23 && utcDay > 19) {
                return {
                  textColor: "#ffff",
                  backgroundColor: "#F0A6A9",
                };
              }

              // if (utcDay % 3 === 0) {
              //   return {
              //     textColor: 'var(--ion-color-secondary-contrast)',
              //     backgroundColor: 'var(--ion-color-secondary)',
              //   };
              // }

              return undefined;
            }}
          ></IonDatetime>
        </div>

        <div className="title flex al-center jc-between ion-padding-bottom">
          <h3>
            Intention: <span>Gratitude</span>
          </h3>
          <IonButton fill="clear">
            <IonIcon slot="start" src="assets/imgs/Pen.svg" />
          </IonButton>
        </div>

        <div className="section flex al-center jc-between">
          <div>
            <h4>Cycle Day 6</h4>
            <p>Wednesday, 07.08.23</p>
          </div>

          <IonButton fill="clear">
            <IonIcon icon={optionsOutline} />
          </IonButton>
        </div>

        <div className="btn-holder ion-text-center ion-padding-vertical">
          <IonButton expand="block">End of Period</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Journalcalender;
