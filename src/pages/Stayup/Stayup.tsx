import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  isPlatform,
} from "@ionic/react";

import "./Stayup.scss";
import axios from "axios";
import { HTTP } from "@awesome-cordova-plugins/http";
import authService from "../../authService";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCourses } from "../../actions/courseActions";

const handleSubscribe = async () => {
  const token = localStorage.getItem("jwtToken");
  const history = useHistory();
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const url =
    "https://app.mynalu.com/wp-json/nalu-app/v1/mailster-subscribe?status=1&lists=34,27";

  try {
    let response;
    if (isPlatform("ios")) {
      const cordovaResponse = await HTTP.post(url, {}, headers);
      response = JSON.parse(cordovaResponse.data);
    } else {
      const axiosResponse = await axios.post(url, {}, { headers });
      response = axiosResponse.data;
    }

    console.log("Subscription successful:", response);
  } catch (error) {
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
    console.error("error", error);
  }
};

const Stayup: React.FC = () => {
  const dispatch = useDispatch();

  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    if (token) {
      dispatch<any>(fetchCourses());
    }
  }, []);
  return (
    <IonPage className="Stayup">
      <IonContent
        className={`ion-padding ${isPlatform("ios") ? "safe-padding" : ""}`}
        fullscreen
      >
        <div className="title-holder ion-text-center ion-padding-top">
          <h3>Bleibe auf dem Laufenden</h3>
        </div>

        <div className="img-holder ion-text-center animate__animated animate__zoomIn">
          <img src="assets/imgs/lisa-filipe-profil-gold.png" alt="" />
        </div>

        <div className="desp ion-text-center">
          <p className="ion-text-wrap">
            Willst du per E-Mail Neuigkeiten von der NALU Gründerin Lisa über
            zyklisches Leben sowie Benachrichtigungen über Sonderangebote
            erhalten?
          </p>
        </div>

        <div className="btn-holder ion-text-center ion-padding-vertical">
          <IonButton
            expand="block"
            routerLink="/membershiponboarding"
            onClick={handleSubscribe}
          >
            Ja, gerne!
          </IonButton>
        </div>
        <div className="bottom-btn">
          <IonButton
            expand="block"
            routerLink="/membershiponboarding"
            fill="clear"
            color="dark"
          >
            Nein, danke.
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Stayup;
