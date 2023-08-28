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
  IonProgressBar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  checkmarkCircle,
  lockClosedOutline,
  menuOutline,
  notificationsOutline,
} from "ionicons/icons";

import "./Courseoverviewpaid.scss";

const Courseoverviewpaid: React.FC = () => {
  return (
    <IonPage className="Courseoverviewpaid">
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
        <div className="the-title">
          <h3>Nalu Endo Flow</h3>
        </div>
        <div className="progress-holder">
          <p>Course Progress</p>
          <div className="flex al-center jc-between">
            <IonProgressBar value={0.5}></IonProgressBar>
            <h6>12%</h6>
          </div>
        </div>
        <div className="resume-holder">
          <h3>Resume Course</h3>
          <IonItem button detail lines="none">
            <IonLabel>Capter 8 : Stretching & Looseing</IonLabel>
          </IonItem>
        </div>

        <div className="the-list">
          <IonAccordionGroup multiple={true}>
            <IonAccordion value="first">
              <IonItem slot="header" lines="none">
                <IonLabel>Introduction</IonLabel>
              </IonItem>
              <div className="ion-padding" slot="content">
                Chapter 1
              </div>
            </IonAccordion>
            <IonAccordion value="second">
              <IonItem slot="header" lines="none">
                <IonLabel>Module 1 : Understanding</IonLabel>
              </IonItem>
              <div className="ion-padding" slot="content">
                Chapter 1
              </div>
            </IonAccordion>
            <IonAccordion value="third">
              <IonItem slot="header" lines="none">
                <IonLabel>Module 2 : Diet</IonLabel>
              </IonItem>
              <div className="ion-padding" slot="content">
                Chapter 1
              </div>
            </IonAccordion>
            <IonAccordion value="fourth">
              <IonItem slot="header" lines="none">
                <IonLabel>Module 3 : Lifestyle</IonLabel>
              </IonItem>
              <div className="sublist" slot="content">
                <IonItem detail>
                  <IonLabel>Chapter 1 Introduction</IonLabel>
                </IonItem>

                <IonAccordion value="sixthpointone">
                  <IonItem slot="header" lines="none">
                    <IonLabel>Chapter 2 Movement</IonLabel>
                  </IonItem>
                  <div className="third-list ion-padding" slot="content">
                    3rd level Content
                  </div>
                </IonAccordion>
                <IonItem detail>
                  <IonLabel>Chapter 2.1 Cycle Based Movement</IonLabel>
                </IonItem>
                <IonItem detail>
                  <IonLabel>Chapter 2.2 Happiness Hormones</IonLabel>
                </IonItem>
                <IonItem detail>
                  <IonLabel>Chapter 2.3 Pelvic Floor Exercisees</IonLabel>
                </IonItem>
                <IonItem detail>
                  <IonLabel>Chapter 3 Relaxation</IonLabel>
                </IonItem>
              </div>
            </IonAccordion>
            <IonAccordion value="fifth">
              <IonItem slot="header" lines="none">
                <IonLabel>Module 4 : Mindset</IonLabel>
              </IonItem>
              <div className="ion-padding" slot="content">
                Chapter 1
              </div>
            </IonAccordion>
            <IonAccordion value="sixth">
              <IonItem slot="header" lines="none">
                <IonLabel>Conclusion</IonLabel>
              </IonItem>
              <div className="ion-padding" slot="content">
                Chapter 1
              </div>
            </IonAccordion>
          </IonAccordionGroup>
        </div>

        <div className="resume-holder">
          <h3>NALU Stress Relief</h3>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Courseoverviewpaid;
