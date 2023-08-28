import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonRadio,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { bookmarkOutline, checkmarkCircleOutline, closeCircleOutline, heartOutline, notificationsOutline } from "ionicons/icons";

import "./Eventdetail.scss";
import { useState } from "react";

const Eventdetail: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [dateError, setDateError] = useState("");

  const handleDateChange = (event) => {
    const value = event.target.value;
    setSelectedDate(value);
    setDateError(
      value.trim() === "" ? "Please select a date to continue." : ""
    );
  };

  return (
    <IonPage className="Eventdetail">
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton color="dark" text={""} defaultHref="/tabs/tab5" />
          </IonButtons>
          <IonTitle>Live Women’s Circle</IonTitle>
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
              <IonLabel>Monthly</IonLabel>
            </IonItem>
          </div>

          <div className="rec">
            <div className="details">
              <h2>Live Women’s Circle</h2>

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
                  <p>Hosted by</p>
                  <h6 className="ion-text-wrap">
                    <span>Dr. Ilca Wilhelm, MD,</span>Specialist for gynecology
                    and obstetrics
                  </h6>
                </IonLabel>
              </IonItem>

              <div className="desc">
                <p className="ion-text-wrap">
                  The women’s circles are a very special vessel in which you can
                  authentically exchange and connect with other women. This
                  helps you to step into your feminine energy. ayaou awill see
                  how inspiring, beneficial and magical this is. The women’s
                  circles are led by me and are each dedicated to differernt
                  topics.
                </p>
              </div>
            </div>
            <div className="signup-form">
              <div className="date-selector">
                <IonItem lines="none" className="ion-text-left">
                  <IonSelect
                    className="ion-text-left "
                    placeholder="Select Date"
                    mode="md"
                    value={selectedDate}
                    onIonChange={handleDateChange}
                  >
                    <IonSelectOption value="Tuesday, 22.08.2023, 3 PM">
                      Tuesday, 22.08.2023, 3 PM
                    </IonSelectOption>
                    <IonSelectOption value="Wednesday, 24.08.2023, 6 PM">
                      Wednesday, 24.08.2023, 6 PM
                    </IonSelectOption>
                    <IonSelectOption value="orange">
                      Friday, 25.08.2023, 8 PM
                    </IonSelectOption>
                  </IonSelect>
                </IonItem>

                {dateError && <p className="error-message">{dateError}</p>}
              </div>

              <div className="btns-holder">
                <IonRow>
                  <IonCol size="4" id="register">
                    <IonButton fill="clear">
                      <p><IonIcon icon={checkmarkCircleOutline} /> <br />Register</p>
                    </IonButton>
                  </IonCol>
                  <IonCol size="4">
                    <IonButton fill="clear" color="dark">
                      <p><IonIcon icon={bookmarkOutline} /> <br />Bookmark</p>
                    </IonButton>
                  </IonCol>
                  <IonCol size="4">
                    <IonButton fill="clear" color="dark" >
                      <p><IonIcon icon={closeCircleOutline} /> <br />Cancel</p>
                    </IonButton>
                  </IonCol>
                </IonRow>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Eventdetail;
