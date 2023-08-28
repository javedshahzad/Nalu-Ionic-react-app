import {
  IonButton,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonPage,
  IonRippleEffect,
} from "@ionic/react";

import "./Login.scss";
import { useState } from "react";

const Login: React.FC = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [emailError, setEmailError] = useState('');

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
    setPasswordError(value.trim() === '' ? 'Please enter your password.' : value.length < 6 ? 'Password must be at least 6 characters long.' : '');
  };


  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(value.trim() === '' ? 'Please enter your email address.' : !emailRegex.test(value) ? 'Please enter a valid email address.' : '');
  };

    const isFormValid = password && email && !password && !emailError;

  
  return (
    <IonPage className="Login">
      <IonContent className="ion-padding" fullscreen>
        <div className="title-holder ion-text-center">
          <h3>Login</h3>
          <h6>Create a free Account</h6>
        </div>
        <div className="the-form">
    
          <div className="input-item">
          <IonItem lines="none">
              <IonIcon src="assets/imgs/icn-email.svg" slot="start"/>
              <IonInput placeholder="Email" autocomplete="given-name" type="email"  value={email} onIonInput={handleEmailChange} />
            </IonItem>

            {emailError && <p className="error-message">{emailError}</p>}

          </div>

          <div className="input-item">
            <IonItem lines="none">
              <IonIcon src="assets/imgs/icn-lock.svg" slot="start" />
              <IonInput
                placeholder="Password"
                type="password"
                value={password}
                onIonInput={handlePasswordChange}
              />
            </IonItem>
            {passwordError && <p className="error-message">{passwordError}</p>}
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
        <h6>Don't you have an Account?&nbsp;&nbsp;</h6>
        <div className="btn ion-activatable ripple-parent rectangle">
        <IonRippleEffect></IonRippleEffect>
        <h5>Sign Up</h5>
      </div>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
