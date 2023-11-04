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
import axios from 'axios';

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

  const handleSubmit = async () => {
    if (!acceptPrivacyPolicy) {
      setPrivacyPolicyError('Please accept our Privacy Policy to continue.');
      return;  // Exit the function early if validation fails
    }
    
    if (!acceptTermsConditions) {
      setTermsConditionsError('Please accept our Terms & Conditions to continue.');
      return;  // Exit the function early if validation fails
    }
  
    try {
      const token = localStorage.getItem('jwtToken');
      
      const response = await axios.put('https://app.mynalu.com/wp-json/nalu-app/v1/consent?type=privacy_policy,terms_conditions&set=true', {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    
      console.log('Consent updated successfully!', response.data);
    } catch (error) {
      console.error('Error updating consent:', error);
    }
  };
  

  
  return (
    <IonPage className="Yourdata">
      <IonContent className="ion-padding" fullscreen>
      <div className="title-holder ion-text-center">
          <h3>
          Deine Daten gehören dir
          </h3>
          <h6 className="ion-text-wrap">
          Wir behandeln deine Daten vertraulich und verkaufen sie nicht an Dritte. Akzeptiere unsere Bedingungen, um Fortzufahren und erhalte eine E-Mail, um dein Passwort festzulegen.
          </h6>
        </div>
        <div className="list">
          <IonItem lines="none">
            <IonLabel>
            Ich akzeptiere die <a href="https://app.mynalu.com/datenschutzerklaerung/">Datenschutzbestimmungen</a>
            </IonLabel>
            <IonToggle checked={acceptPrivacyPolicy} onIonChange={handlePrivacyPolicyToggle}></IonToggle>
          </IonItem>

          {privacyPolicyError && <p className="error-message">{privacyPolicyError}</p>}


          <IonItem lines="none">
            <IonLabel className="ion-text-wrap">
            Ich akzeptiere die <a href="https://app.mynalu.com/datenschutzerklaerung/">Allgemeinen Geschäftsbedingungen</a>
            </IonLabel>
            <IonToggle checked={acceptTermsConditions} onIonChange={handleTermsConditionsToggle}></IonToggle>
          </IonItem>

          {termsConditionsError && <p className="error-message">{termsConditionsError}</p>}
        </div>

        <div className="btn-holder ion-text-center ion-padding-vertical">
          <IonButton expand="block" routerLink="/configcycle" disabled={!isFormValid} onClick={handleSubmit}>Registrieren</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Yourdata;
