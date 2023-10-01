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
} from "@ionic/react";

import "./Questioning.scss";
import { useTranslation } from 'react-i18next';

const Questioning: React.FC = () => {

  const { t} = useTranslation();  

  return (
    <IonPage className="questioning">
     
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle className="ion-text-center">
            {t('questioning.description_1')}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className=" ion-padding" fullscreen>
      <div className="title-holder ion-text-center animate__animated animate__zoomIn">
          <h3>How can we Support you?</h3>
        </div>
        <div className="sub-title ion-text-center animate__animated animate__zoomIn">
          <p className="ion-text-wrap">
          {t('questioning.description_2')}
          </p>
        </div>
        <div className="the-list animate__animated animate__slideInUp">
          <IonItem button detail={false} lines="none" routerLink="/registeration">
            <div className="thumb" slot="start">
              <img src="assets/imgs/q1.png" alt="" />
            </div>
            <IonLabel>
              <h4 className="ion-text-wrap"> {t('questioning.description_3')}</h4>
              <h6 className="ion-text-wrap">
              Qui laboris qui do quis enim sunt nostrud.
              </h6>
              <img src="assets/imgs/ce.png"/>
            </IonLabel>
          </IonItem>
          <IonItem button lines="none" detail={false} routerLink="/registeration">
            <div className="thumb" slot="start">
              <img src="assets/imgs/q2.png" alt="" />
            </div>
            <IonLabel>
              <h4 className="ion-text-wrap"> {t('questioning.description_4')}</h4>
              <h6 className="ion-text-wrap">
              Qui laboris qui do quis enim sunt nostrud. 
              </h6>
              <img src="assets/imgs/ce.png"/>
            </IonLabel>
          </IonItem>
          <IonItem button lines="none" detail={false} routerLink="/registeration">
            <div className="thumb" slot="start">
              <img src="assets/imgs/q3.png" alt="" />
            </div>
            <IonLabel>
              <h4 className="ion-text-wrap"> {t('questioning.description_5')}</h4>
              <h6 className="ion-text-wrap">
              Qui laboris qui do quis enim sunt nostrud. 
              </h6>
              <img src="assets/imgs/lotus.png"/>
            </IonLabel>
          </IonItem>
        </div>
        <div className="bottom-btn">
        <IonButton routerLink="/registeration" expand="block" fill="clear" color="dark">{t('questioning.description_6')}</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Questioning;
