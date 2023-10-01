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
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import i18next from "i18next";
import { useState } from "react";

const Configcycle: React.FC = () => {
  const { t} = useTranslation();  

  useEffect(()=>{
    i18next.changeLanguage(localStorage.getItem("language"));
  },[0])

  const [isDateSelected, setDateSelected] = useState(false);

  const handleDateSelect = (event: CustomEvent<any>) => {
    // Handle date selection here
    // You can set the selected date and update isDateSelected to true
    setDateSelected(true);
  };

  return (
    <IonPage className="Configcycle">
      <IonContent className="ion-padding" fullscreen>
        <div className="title-holder ion-text-center">
          <h3>
            {/* Configure your Cycle <br /> Journal */}
            {t('config_cycle.config_title')}
          </h3>
          <h6 className="ion-text-wrap">
          {t('config_cycle.description_1')}
          </h6>
        </div>

        <div className="calender-holder">
          <IonDatetime presentation="date" onIonChange={handleDateSelect}
></IonDatetime>
        </div>

        <div className="bottom-holder ion-text-center">
          <h3 className="ion-text-wrap">
            {t('config_cycle.description_2')}
            </h3>
          <h6 className="ion-text-wrap">
          If you don't know or never had a period your cycle will be set to the moon phases to introduce you to the cyclical lifestyle.
          </h6>
          {t('config_cycle.description_3')}          </h6>
        </div>

        <div className="btn-holder ion-text-center ion-padding-vertical">
          <IonButton expand="block" routerLink="/learnmore" disabled={!isDateSelected}>{t('config_cycle.continue_button')} </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Configcycle;
