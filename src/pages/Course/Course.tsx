import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import { checkmarkCircle } from "ionicons/icons";

import "./Course.scss";

const Course: React.FC = () => {
  return (
    <IonPage className="Course">
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding-horizontal" fullscreen>
       
      </IonContent>
    </IonPage>
  );
};

export default Course;
