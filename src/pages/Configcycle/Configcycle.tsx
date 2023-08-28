import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonPage,
  IonToolbar,
} from "@ionic/react";

import "./Configcycle.scss";

const Configcycle: React.FC = () => {
  return (
    <IonPage className="Configcycle">
      <IonContent className="ion-padding" fullscreen>
        <div className="title-holder ion-text-center">
          <h3>
            Configure your Cycle <br /> Journal
          </h3>
          <h6 className="ion-text-wrap">
            When was the last of your last period?
          </h6>
        </div>

        <div className="calender-holder">
          <IonDatetime presentation="date"></IonDatetime>
        </div>

        <div className="bottom-holder ion-text-center">
          <h3 className="ion-text-wrap">I don't Know / I never had one</h3>
          <h6 className="ion-text-wrap">
          If you don’t know or never had a period your cycle will be set to the moon phases to introduce you to the cyclical lifestyle.
          </h6>
        </div>

        <div className="btn-holder ion-text-center ion-padding-vertical">
          <IonButton expand="block" routerLink="/learnmore">Continue</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Configcycle;
