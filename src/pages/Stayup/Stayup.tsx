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
          <h3>Bleibe auf dem Laufenden</h3>
        </div>

        <div className="img-holder ion-text-center animate__animated animate__zoomIn">
          <img src="assets/imgs/lisa-filipe-profil-gold.png" alt="" />
        </div>

        <div className="desp ion-text-center">
          <p className="ion-text-wrap">
          Willst du per E-Mail Neuigkeiten von der NALU Gründerin Lisa über zyklisches Leben sowie Benachrichtigungen über Sonderangebote erhalten?
          </p>
        </div>

        <div className="btn-holder ion-text-center ion-padding-vertical">
          <IonButton expand="block" routerLink="/tabs/tab1" onClick={handleSubscribe}>Ja, gerne!</IonButton>
        </div>
        <div className="bottom-btn">
          <IonButton expand="block" routerLink="/tabs/tab1" fill="clear" color="dark">Nein, danke.</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Stayup;
