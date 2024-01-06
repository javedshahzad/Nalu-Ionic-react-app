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
  isPlatform,
} from "@ionic/react";

import "./Yourdata.scss";
import { useState } from "react";
import axios from 'axios';
import { HTTP } from "@awesome-cordova-plugins/http";
import authService from "../../authService";
import { useHistory } from "react-router-dom";

const Yourdata: React.FC = () => {
  const [acceptPrivacyPolicy, setAcceptPrivacyPolicy] = useState(false);
  const [acceptTermsConditions, setAcceptTermsConditions] = useState(false);
  const [privacyPolicyError, setPrivacyPolicyError] = useState('');
  const [termsConditionsError, setTermsConditionsError] = useState('');

  const history = useHistory()

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
      return;
    }

    if (!acceptTermsConditions) {
      setTermsConditionsError('Please accept our Terms & Conditions to continue.');
      return;
    }

    const token = localStorage.getItem('jwtToken');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    const url = 'https://app.mynalu.com/wp-json/nalu-app/v1/consent?type=privacy_policy,terms_conditions&set=true';

    try {
      let response;
      if (isPlatform("ios")) {
        const cordovaResponse = await HTTP.put(url, {}, headers);
        response = JSON.parse(cordovaResponse.data);
      } else {
        const axiosResponse = await axios.put(url, {}, { headers });
        response = axiosResponse.data;
      }

      console.log('Consent updated successfully!', response);
    } catch (error) {
      if (isPlatform("ios")) {
        if (error) {
          const status = error.status;

          if (status === 401 || status === 403 || status === 404) {
            // Unauthorized, Forbidden, or Not Found
            authService.logout();
            history.push("/login");
          }
        }
      }
      else {
        if (error.response) {
          const status = error.response.status;

          if (status === 401 || status === 403 || status === 404) {
            // Unauthorized, Forbidden, or Not Found
            authService.logout();
            history.push("/login");
          }
        }
      }
      console.error('error', error);
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
          <IonButton expand="block" routerLink="/configcycleremade" disabled={!isFormValid} onClick={handleSubmit}>Registrieren</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Yourdata;
