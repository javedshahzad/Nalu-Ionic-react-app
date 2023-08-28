import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
} from "@ionic/react";

import "./Stayup.scss";

const Stayup: React.FC = () => {
  return (
    <IonPage className="Stayup">
      <IonContent className="ion-padding" fullscreen>
        <div className="title-holder ion-text-center ion-padding-top">
          <h3>Stay Up To Date</h3>
        </div>

        <div className="img-holder ion-text-center">
          <img src="assets/imgs/stayup.png" alt="" />
        </div>

        <div className="desp ion-text-center">
          <p className="ion-text-wrap">
            Would you like to recieve email news from our founder Lisa about
            cyclical living as well as notifications about promotions?
          </p>
        </div>

        <div className="btn-holder ion-text-center ion-padding-vertical">
          <IonButton expand="block" routerLink="/tabs/tab1">Yes, please</IonButton>
        </div>
        <div className="bottom-btn">
        <IonButton expand="block" fill="clear" color="dark">No, thank you</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Stayup;
