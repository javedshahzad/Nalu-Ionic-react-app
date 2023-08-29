import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
} from "@ionic/react";

import "./Onboarding.scss";
import { useState } from "react";

const Onboarding: React.FC = () => {

  const [date, setDate] = useState<string>(new Date().toISOString());

  const handleDateChange = (event: CustomEvent<any>) => {
    setDate(event.detail.value);
  };
  return (
    <IonPage>
      <IonContent className="onborading ion-padding" fullscreen>
        <div className="logo-holder ion-text-center">
          <img src="assets/imgs/logo.svg" alt="" />
        </div>
        <div className="img-holder ion-text-center">
          <img src="assets/imgs/Menstrual calendar.gif" alt="" />
        </div>
        <div className="content-holder ion-text-center animate__animated animate__zoomIn">
          <h3 className="ion-text-wrap">Harmonize Your <br /> Menstual Cycle</h3>
          <p className="ion-text-wrap">
          Learn to regulate your cycle naturally and feel more balanced and energetic.
          </p>
        </div>

        <div className="btn-holder ion-text-center ion-padding-vertical animate__animated animate__slideInUp">
          <IonButton expand="block" routerLink="/questioning">Get Started</IonButton>
        </div>
        <div className="bottom-btn animate__animated animate__slideInUp">
        <IonButton expand="block" fill="clear" color="dark">I have an account</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Onboarding;
