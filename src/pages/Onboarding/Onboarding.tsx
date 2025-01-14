import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  isPlatform,
} from "@ionic/react";

import "./Onboarding.scss";
import { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import i18next from "i18next";
import UserAuthentication from "./../../auth/UserAuthentication";

const Onboarding: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const auth = UserAuthentication();

  const [date, setDate] = useState<string>(new Date().toISOString());

  const handleDateChange = (event: CustomEvent<any>) => {
    setDate(event.detail.value);
  };

  const handleEnglishLanguageChange = () => {
    i18next.changeLanguage("en");
    localStorage.setItem("language", "en");
  };

  const handleGermanLanguageChange = () => {
    i18next.changeLanguage("de");
    localStorage.setItem("language", "de");
  };

  return (
    <IonPage>
      <IonContent
        className={`onborading ion-padding ${
          isPlatform("ios") ? "safe-padding" : ""
        }`}
        fullscreen
      >
        <div className="logo-holder ion-text-center">
          <img src="assets/imgs/nalu.svg" alt="" />
        </div>
        <div className="img-holder ion-text-center">
          <img src="assets/imgs/nalu-key.png" alt="" />
        </div>
        <div className="content-holder ion-text-center">
          <h3 className="ion-text-wrap">{t("onboarding.description_1")}</h3>
          <p className="ion-text-wrap">{t("onboarding.description_2")}</p>
        </div>

        <div className="btn-holder ion-text-center ion-padding-vertical">
          <IonButton expand="block" routerLink="/questioning">
            {t("onboarding.get_started")}
          </IonButton>
        </div>
        <div className="bottom-btn">
          <IonButton
            expand="block"
            routerLink="/login"
            fill="clear"
            color="dark"
          >
            {t("onboarding.account")}
          </IonButton>
        </div>
        {/*<div className="btn-holder ion-text-center ion-padding-vertical">
          <IonButton
            expand="block"
            onClick={() => handleEnglishLanguageChange()}
          >
            Set English
          </IonButton>
        </div>
        <div className="btn-holder ion-text-center ion-padding-vertical">
          <IonButton
            expand="block"
            onClick={() => handleGermanLanguageChange()}
          >
            Set German
          </IonButton>
      </div>*/}
      </IonContent>
    </IonPage>
  );
};

export default Onboarding;
