import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonToolbar,
} from "@ionic/react";
import {
  addCircle,
  checkmarkCircle,
  close,
  closeOutline,
} from "ionicons/icons";

import "./Additionfilter.scss";

const Additionfilter: React.FC<{ onClose?: any }> = ({ onClose }) => {
  return (
    <IonPage className="Additionfilter">
      <IonContent
        className={`ion-padding-horizontal ${
          isPlatform("ios") ? "safe-padding" : ""
        }`}
        fullscreen
      >
        <div className="back"></div>
        <IonGrid style={{ height: "100%" }}>
          <IonRow
            className="ion-justify-content-center ion-align-items-center"
            style={{ height: "100%" }}
          >
            <div className="holder ion-text-center">
              <div className="card">
                <div className="close-holder ion-text-right">
                  <IonButton
                    fill="clear"
                    color={"dark"}
                    onClick={() => {
                      onClose();
                    }}
                  >
                    <IonIcon slot="icon-only" icon={closeOutline} />
                  </IonButton>
                </div>
                <div className="check-list">
                  <IonItem lines="none">
                    <IonCheckbox checked slot="start" mode="md" />
                    <IonLabel>Intention</IonLabel>
                  </IonItem>
                  <IonItem lines="none">
                    <IonCheckbox checked slot="start" mode="md" />
                    <IonLabel>Symptoms</IonLabel>
                  </IonItem>
                  <IonItem lines="none">
                    <IonCheckbox slot="start" mode="md" />
                    <IonLabel>Pain</IonLabel>
                  </IonItem>
                  <IonItem lines="none">
                    <IonCheckbox checked slot="start" mode="md" />
                    <IonLabel>Custom</IonLabel>
                  </IonItem>
                  <IonItem lines="none">
                    <IonCheckbox slot="start" mode="md" />
                    <IonLabel>How I feel today</IonLabel>
                  </IonItem>
                </div>
              </div>
            </div>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Additionfilter;
