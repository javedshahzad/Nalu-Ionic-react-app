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
import axios from 'axios';

const handleSubscribe = async () => {
  // Get the token from localStorage
  const token = localStorage.getItem('jwtToken');

  try {
    const response = await axios.post('https://app.mynalu.com/wp-json/nalu-app/v1/mailster-subscribe?status=1&lists=34,27', {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    // Handle the response here. For instance:
    console.log('Subscription successful:', response.data);
  } catch (error) {
    // Handle the error here
    console.error('Error during subscription:', error);
  }
};

const Stayup: React.FC = () => {
  return (
    <IonPage className="Stayup">
      <IonContent className="ion-padding" fullscreen>
        <div className="title-holder ion-text-center ion-padding-top">
          <h3>Stay Up To Date</h3>
        </div>

        <div className="img-holder ion-text-center animate__animated animate__zoomIn">
          <img src="assets/imgs/lisa-filipe-profil-gold.png" alt="" />
        </div>

        <div className="desp ion-text-center">
          <p className="ion-text-wrap">
            Would you like to recieve email news from our founder Lisa about
            cyclical living as well as notifications about promotions?
          </p>
        </div>

        <div className="btn-holder ion-text-center ion-padding-vertical">
          <IonButton expand="block" routerLink="/tabs/tab1" onClick={handleSubscribe}>Yes, please</IonButton>
        </div>
        <div className="bottom-btn">
          <IonButton expand="block" routerLink="/tabs/tab1" fill="clear" color="dark">No, thank you</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Stayup;
