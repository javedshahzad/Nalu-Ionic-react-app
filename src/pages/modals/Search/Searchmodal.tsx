import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { close, refresh } from "ionicons/icons";
import "./Searchmodal.scss";

const Searchmodal: React.FC = () => {
  return (
    <IonPage className="Searchmodal">
      <IonHeader className="ion-no-border">
        <IonToolbar>
        <IonButtons slot="start">
          <IonButton color={"medium"}>
            <IonIcon icon={close} />
          </IonButton>
        </IonButtons>
        <IonTitle>
        <div className="search-holder">
        <IonSearchbar></IonSearchbar>
       </div>
        </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="the-list">
          <IonItem>
            <IonIcon icon={refresh} slot="start"/>
            <IonLabel>
            Chili
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonIcon icon={refresh} slot="start"/>
            <IonLabel>
            Bern
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonIcon icon={refresh} slot="start"/>
            <IonLabel>
            Switzerland
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonIcon icon={refresh} slot="start"/>
            <IonLabel>
            Yoga
            </IonLabel>
          </IonItem>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Searchmodal;
