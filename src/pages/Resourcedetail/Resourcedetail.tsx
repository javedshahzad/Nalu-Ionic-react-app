import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  checkmarkCircle,
  heartOutline,
  informationCircleOutline,
  menuOutline,
  notificationsOutline,
  searchOutline,
} from "ionicons/icons";

import "./Resourcedetail.scss";

const Resourcedetail: React.FC = () => {
  return (
    <IonPage className="Resourcedetail">
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton color="dark" text={""} defaultHref="/tabs/tab5" />
          </IonButtons>
          <IonTitle>Nicht die Regel</IonTitle>
          <IonButtons slot="end">
            <IonButton color="dark">
              <IonIcon icon={heartOutline} />
            </IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton color="dark">
              <IonIcon icon={notificationsOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="top-img-holder ion-text-center">
          <img src="assets/imgs/r2.png" alt="" />
        </div>

        <div className="content ion-padding">
          <div className="category-tag">
            <IonItem lines="none">
              <IonIcon slot="start" src="assets/imgs/f2.svg" />
              <IonLabel>Movies</IonLabel>
              <IonRadio value="Movies"></IonRadio>
            </IonItem>
          </div>
        
          <div className="rec">
          <div className="details">
              <h2>Nicht die Regel</h2>

              <IonItem lines="none">
                <div className="start-slot flex al-start " slot="start">
                  <IonAvatar>
                    <img src="assets/imgs/user.png" alt="" />
                  </IonAvatar>

                  <IonIcon
                    className="verify"
                    src="assets/imgs/icn-verify.svg"
                  />
                </div>
                <IonLabel>
                  <p>Recommended by</p>
                  <h6 className="ion-text-wrap">
                    <span>Dr. Ilca Wilhelm, MD,</span>Specialist for gynecology and obstetrics
                  </h6>
                </IonLabel>
              </IonItem>

              <div className="desc">
                <p className="ion-text-wrap">
                nicht die regel is an independently produced documentary film. It is about three different women who talk about their lives with endometriosis. They report on symptoms, long diagnostic paths, therapies and operations.
                </p>
                <p>It quickly becomes clear that despite the large number of people affected, there ia s lack of knowledge about this chronic disease - not only in society, but also among doctors. The film deals with widespread by giving numerous experts from various fields a chance sneak.</p>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Resourcedetail;
