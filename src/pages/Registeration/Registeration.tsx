import {
  IonButton,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonPage,
  IonRippleEffect,
} from "@ionic/react";

import "./Registeration.scss";
import { useState } from "react";

const Registeration: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleFirstNameChange = (event) => {
    const value = event.target.value;
    setFirstName(value);
    setFirstNameError(value.trim() === '' ? 'Please enter your first name.' : '');
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(value.trim() === '' ? 'Please enter your email address.' : !emailRegex.test(value) ? 'Please enter a valid email address.' : '');
  };

    const isFormValid = firstName && email && !firstNameError && !emailError;

  
  return (
    <IonPage className="Registeration">
      <IonContent className="ion-padding" fullscreen>
        <div className="title-holder ion-text-center">
          <h3>Registration</h3>
          <h6>Create a free Account</h6>
        </div>
        <div className="the-form">
          <div className="input-item">
            <IonItem lines="none">
              <IonIcon src="assets/imgs/icn-user.svg" slot="start"/>
              <IonInput placeholder="First Name" autocomplete="given-name" type="text" value={firstName}
            onIonInput={handleFirstNameChange} onIonFocus={handleFirstNameChange} />
            </IonItem>

            {firstNameError && <p className="error-message">{firstNameError}</p>}
          </div>
          <div className="input-item">
          <IonItem lines="none">
              <IonIcon src="assets/imgs/icn-email.svg" slot="start"/>
              <IonInput placeholder="Email" autocomplete="given-name" type="email"  value={email} onIonInput={handleEmailChange} />
            </IonItem>

            {emailError && <p className="error-message">{emailError}</p>}

          </div>

         
        </div>
        <div className="btn-holder ion-text-center ion-padding-vertical">
          <IonButton expand="block" routerLink="/yourdata" disabled={!isFormValid}>Continue</IonButton>
        </div>
        <div className="or ion-text-center">
          <p>or</p>
        </div>

        <div className="social-holder ion-text-center">
        <IonButton expand="block" routerLink="/questioning">
          <IonIcon slot="start" src="assets/imgs/icn-google.svg" />
          Continue With Google
        </IonButton>

        <IonButton expand="block" routerLink="/questioning">
          <IonIcon slot="start" src="assets/imgs/icn-fb.svg" />
          Continue With Facebook
        </IonButton>
        </div>

        <div className="bottom-holder flex al-center jc-center">
        <h6>Already Have an Account?&nbsp;&nbsp;</h6>
        <div className="btn ion-activatable ripple-parent rectangle">
        <IonRippleEffect></IonRippleEffect>
        <h5>Sign In</h5>
      </div>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default Registeration;
