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

const Questioning: React.FC = () => {
  return (
    <IonPage className="questioning">
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle className="ion-text-center">
            How can we Support you?
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className=" ion-padding" fullscreen>
        <div className="sub-title ion-text-center">
          <p className="ion-text-wrap">
            We'll configure your experience according to your goals.
          </p>
        </div>
        <div className="the-list">
          <IonItem button detail={false} lines="none" routerLink="/registeration">
            <div className="thumb" slot="start">
              <img src="assets/imgs/q1.png" alt="" />
            </div>
            <IonLabel>
              <h4 className="ion-text-wrap">Improve Life with Endometriosis</h4>
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
              <h4 className="ion-text-wrap">Get regular periods</h4>
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
              <h4 className="ion-text-wrap">Harmonize your Cycle</h4>
              <h6 className="ion-text-wrap">
              Qui laboris qui do quis enim sunt nostrud. 
              </h6>
              <img src="assets/imgs/lotus.png"/>
            </IonLabel>
          </IonItem>
        </div>
        <div className="bottom-btn">
        <IonButton routerLink="/registeration" expand="block" fill="clear" color="dark">I don't Know</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Questioning;
