import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonToggle,
  IonToolbar,
} from "@ionic/react";

import "./Yourdata.scss";
import { useState } from "react";

const Yourdata: React.FC = () => {
  const [acceptPrivacyPolicy, setAcceptPrivacyPolicy] = useState(false);
  const [acceptTermsConditions, setAcceptTermsConditions] = useState(false);
  const [privacyPolicyError, setPrivacyPolicyError] = useState('');
  const [termsConditionsError, setTermsConditionsError] = useState('');

  const handlePrivacyPolicyToggle = () => {
    setAcceptPrivacyPolicy(!acceptPrivacyPolicy);
    setPrivacyPolicyError('');
  };

  const handleTermsConditionsToggle = () => {
    setAcceptTermsConditions(!acceptTermsConditions);
    setTermsConditionsError('');
  };

  const isFormValid = acceptPrivacyPolicy && acceptTermsConditions;

  const handleSubmit = () => {
    if (!acceptPrivacyPolicy) {
      setPrivacyPolicyError('Please accept our Privacy Policy to continue.');
    }
    if (!acceptTermsConditions) {
      setTermsConditionsError('Please accept our Terms & Conditions to continue.');
    }

    if (isFormValid) {
      // Proceed with registration or whatever action you want
      console.log('Form submitted successfully!');
    }
  };

  
  return (
    <IonPage className="Yourdata">
      <IonContent className="ion-padding" fullscreen>
      <div className="title-holder ion-text-center">
          <h3>
          Your Data is Yours
          </h3>
          <h6 className="ion-text-wrap">
          We keep your data confidential and dod not sell it to third parties. Accept our terms to create your account and get an email to set your password.
          </h6>
        </div>
        <div className="list">
          <IonItem lines="none">
            <IonLabel>
            I accept your Privacy Policy
            </IonLabel>
            <IonToggle checked={acceptPrivacyPolicy} onIonChange={handlePrivacyPolicyToggle}></IonToggle>
          </IonItem>

          {privacyPolicyError && <p className="error-message">{privacyPolicyError}</p>}


          <IonItem lines="none">
            <IonLabel className="ion-text-wrap">
            I accept your Terms & Conditions
            </IonLabel>
            <IonToggle checked={acceptTermsConditions} onIonChange={handleTermsConditionsToggle}></IonToggle>
          </IonItem>

          {termsConditionsError && <p className="error-message">{termsConditionsError}</p>}
        </div>

        <div className="btn-holder ion-text-center ion-padding-vertical">
          <IonButton expand="block" routerLink="/configcycle" disabled={!isFormValid} onClick={handleSubmit}>Register</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Yourdata;
