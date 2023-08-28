import {
  IonAccordion,
  IonAccordionGroup,
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
import {
  lockClosedOutline,
  menuOutline,
  notificationsOutline,
} from "ionicons/icons";

import "./Courseoverviewfree.scss";

const Courseoverviewfree: React.FC = () => {
  return (
    <IonPage className="Courseoverviewfree">
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButton color={"dark"} fill="clear">
            <IonIcon icon={menuOutline} />
          </IonButton>
         
          <IonButtons slot="end">
            <IonButton color="dark">
              <IonIcon icon={notificationsOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding-horizontal" fullscreen>
      <div className="the-title ion-text-center">
          <h3>Nalu Endo Flow</h3>
        </div>

        <div className="btn-holder ion-text-center ion-padding-vertical">
          <IonButton expand="block">Join NALU Endo Flow</IonButton>
        </div>
        <div className="sub ion-text-center">
          <p className="ion-text-wrap">Harmonize Endometrosis</p>
        </div>
        <div className="the-list">
          <IonAccordionGroup multiple={true}>
            <IonAccordion value="first">
              <IonItem slot="header">
                <IonLabel>Introduction</IonLabel>
              </IonItem>
              <div className="ion-padding" slot="content">
                First Content
              </div>
            </IonAccordion>
            <IonAccordion value="second">
              <IonItem slot="header">
                <IonLabel>Module 1 : Understanding</IonLabel>
              </IonItem>
              <div className="ion-padding" slot="content">
                First Content
              </div>
            </IonAccordion>
            <IonAccordion value="third">
              <IonItem slot="header">
                <IonLabel>Module 2 : Diet</IonLabel>
              </IonItem>
              <div className="ion-padding" slot="content">
                First Content
              </div>
            </IonAccordion>
            <IonAccordion value="fourth">
              <IonItem slot="header">
                <IonLabel>Module 3 : Lifestyle</IonLabel>
              </IonItem>
              <div className="sublist" slot="content">
                <IonItem detail>
                  <IonLabel>
                    Chapter 1 Introduction <span>Preview</span>
                  </IonLabel>
                </IonItem>
                <IonAccordion value="sixthpointone">
                  <IonItem slot="header" lines="none">
                    <IonLabel>Chapter 2 Movement</IonLabel>
                  </IonItem>
                  <div className="third-list ion-padding-start" slot="content">
                  <IonItem detail={false}>
                  <IonLabel>Chapter 2.1 Cycle Based Movement</IonLabel>
                  <IonIcon src="assets/imgs/icn-lock.svg" slot="end" />
                </IonItem>
                <IonItem detail={false}>
                  <IonLabel>Chapter 2.2 Happiness Hormones</IonLabel>
                  <IonIcon src="assets/imgs/icn-lock.svg" slot="end" />
                </IonItem>
                <IonItem detail={false}>
                  <IonLabel>Chapter 2.3 Pelvic Floor Exercisees</IonLabel>
                  <IonIcon src="assets/imgs/icn-lock.svg" slot="end" />
                </IonItem>
                  </div>
                </IonAccordion>
              
              
                <IonAccordion value="sixthpointone">
                  <IonItem slot="header" lines="none">
                    <IonLabel> Chapter 3 Relaxation</IonLabel>
                  </IonItem>
                  <div className="third-list ion-padding" slot="content">
                    3rd level Content
                  </div>
                </IonAccordion>
               
              </div>
            </IonAccordion>
            <IonAccordion value="fifth">
              <IonItem slot="header">
                <IonLabel>Module 4 : Mindset</IonLabel>
              </IonItem>
              <div className="ion-padding" slot="content">
                First Content
              </div>
            </IonAccordion>
            <IonAccordion value="sixth">
              <IonItem slot="header">
                <IonLabel>Conclusion</IonLabel>
              </IonItem>
              <div className="ion-padding" slot="content">
                First Content
              </div>
            </IonAccordion>
          </IonAccordionGroup>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Courseoverviewfree;
