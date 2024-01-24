import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
  isPlatform,
} from "@ionic/react";

import "./Questioning.scss";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { HTTP } from "@awesome-cordova-plugins/http";

const Questioning: React.FC = () => {
  const { t } = useTranslation();

  const setUserGoal = (goal: string) => {
    localStorage.setItem("selectedGoal", goal);
  };

  return (
    <IonPage className="questioning">
      {/*<IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle className="ion-text-center">
            {t('questioning.description_1')}
          </IonTitle>
        </IonToolbar>
      </IonHeader>*/}
      <IonContent
        className={`ion-padding ${isPlatform("ios") ? "safe-padding" : ""}`}
        fullscreen
      >
        <div className="title-holder ion-text-center animate__animated animate__zoomIn">
          <h3> {t("questioning.description_1")}</h3>
        </div>
        <div className="sub-title ion-text-center animate__animated animate__zoomIn">
          <p className="ion-text-wrap">{t("questioning.description_2")}</p>
        </div>
        <div className="the-list animate__animated animate__slideInUp">
          <IonItem
            button
            detail={false}
            lines="none"
            routerLink="/registeration"
            onClick={() => setUserGoal("endometriosis")}
          >
            <div className="thumb" slot="start">
              <img src="assets/imgs/q1.png" alt="" />
            </div>
            <IonLabel>
              <h4 className="ion-text-wrap">
                {" "}
                {t("questioning.description_3")}
              </h4>
              <h6 className="ion-text-wrap">
                Lerne als Frau mit Endometriose oder Verdacht auf Endometriose
                wie du Schmerzen reduzieren und deine Lebensqualität verbessern
                kannst.
              </h6>
              {/*<img src="assets/imgs/ce.png"/>*/}
            </IonLabel>
          </IonItem>
          <IonItem
            button
            lines="none"
            detail={false}
            routerLink="/registeration"
            onClick={() => setUserGoal("amenorrhea")}
          >
            <div className="thumb" slot="start">
              <img src="assets/imgs/q2.png" alt="" />
            </div>
            <IonLabel>
              <h4 className="ion-text-wrap">
                {" "}
                {t("questioning.description_4")}
              </h4>
              <h6 className="ion-text-wrap">
                Lerne als Frau mit funktioneller Amenorrhoe, wie du deine
                Periode auf natürliche Weise regulieren kannst.
              </h6>
              {/*<img src="assets/imgs/ce.png"/>*/}
            </IonLabel>
          </IonItem>
          <IonItem
            button
            lines="none"
            detail={false}
            routerLink="/registeration"
            onClick={() => setUserGoal("harmony")}
          >
            <div className="thumb" slot="start">
              <img src="assets/imgs/q3.png" alt="" />
            </div>
            <IonLabel>
              <h4 className="ion-text-wrap">
                {" "}
                {t("questioning.description_5")}
              </h4>
              <h6 className="ion-text-wrap">
                Lerne, wie du unregelmässige Periode, PCOS oder starkes PMS auf
                natürliche Weise regulieren kannst.
              </h6>
              {/*<img src="assets/imgs/lotus.png"/>*/}
            </IonLabel>
          </IonItem>
        </div>
        <div className="bottom-btn">
          <IonButton
            expand="block"
            fill="clear"
            color="dark"
            routerLink="/registeration"
            onClick={() => setUserGoal("harmony")}
          >
            {t("questioning.description_6")}
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Questioning;
