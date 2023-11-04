import {
  IonButton,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonPage,
  IonRippleEffect,
  IonRouterLink,
} from "@ionic/react";

import "./Login.scss";
import { useState } from "react";
import axios from 'axios';
import { navigate } from "ionicons/icons";
import { useHistory } from "react-router";
import { useTranslation } from 'react-i18next';

const Login: React.FC = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [token, setToken] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [emailRegexx, setEmailRegex] = useState(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);





  const history = useHistory();
  const { t} = useTranslation();  



  const apiHost = 'https://app.mynalu.com/wp-json';


  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
    setPasswordError(value.trim() === '' ? '' : value.length < 6 ? '' : '');
    setErrorMessage(value.trim() === '' ? '': '')

  };


  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
     setEmailError(value.trim() === '' ? '' : !emailRegexx.test(value) ? '' : '');
     setErrorMessage(value.trim() === '' ? '': '')
  };

    const handleEmailInputBlur = (e) => {
    setEmailTouched(true);
    if(emailTouched) {
      setEmailError(e.target.focusedValue.trim() === '' ? 'Please enter your email address.' : !emailRegexx.test(e.target.focusedValue) ? 'Please enter a valid email address.' : '');
      setErrorMessage(e.target.focusedValue.trim() === '' ? '': '')
    }

  };
  const handlePasswprdInputBlur = (e) => {
    setPasswordTouched(true);
    if(passwordTouched) {
      setPasswordError(e.target.focusedValue.trim() === '' ? 'Please enter your password.' : e.target.focusedValue.length < 6 ? 'Password must be at least 6 characters long.' : '');
      setErrorMessage(e.target.focusedValue.trim() === '' ? '': '')
    }

  };
 

    const isFormValid = password && email && emailRegexx.test(email) && password.length >= 6 && !passwordError && !emailError;

    const handleLogin = async () => {
      try {
        const response = await axios.post(`${apiHost}/jwt-auth/v1/token`, {
          username: email,
          password: password,
        });
        console.log("Response:",response);
        if(response.status === 200){
          const { token: receivedToken } = response.data;
          setToken(response.data.token);
          localStorage.setItem('jwtToken', response.data.token);
          localStorage.setItem('roles', response.data.roles);

        // config code
          axios.interceptors.request.use(config => {
            const storedToken = localStorage.getItem('jwtToken');
            if (storedToken) {
              config.headers.Authorization = `Bearer ${storedToken}`;
              return config;
            }
          });

          // naviagtion
          history.push("/tabs/tab1")


        }
      } catch (error) {
        console.log('Error', error.response.data.message);
        setErrorMessage("Invalid credentials")
      }
    };
  
  return (
    <IonPage className="Login">
      <IonContent className="ion-padding" fullscreen>
        <div className="title-holder ion-text-center">
          <h3> {t('login.login')}</h3>
        </div>
        <div className="the-form">
    
          <div className="input-item">
          <IonItem lines="none">
              <IonIcon src="assets/imgs/icn-email.svg" slot="start"/>
              <IonInput placeholder={t('login.email')} autocomplete="email" type="email"
                value={email} 
                onIonChange={() => setEmailTouched(false)} // Reset emailTouched when input changes
                onIonBlur={handleEmailInputBlur}

                onIonInput={handleEmailChange} />
            </IonItem>

            {emailTouched && emailError && <p className="error-message">{emailError}</p>}

          </div>

          <div className="input-item">
            <IonItem lines="none">
              <IonIcon src="assets/imgs/icn-lock.svg" slot="start" />
              <IonInput
                placeholder={t('login.password')}
                type="password"
                value={password}
                onIonBlur={handlePasswprdInputBlur}
                onIonInput={handlePasswordChange}
              />
            </IonItem>
            {passwordError && <p className="error-message">{passwordError}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}

          </div>

         
        </div>
        <div className="btn-holder ion-text-center ion-padding-vertical">
          <IonButton expand="block" disabled={!isFormValid} onClick={() => handleLogin()}>{t('login.continue_button')}</IonButton>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="or ion-text-center">
          <p>{t('login.or')}</p>
        </div>
      

        {/*<div className="social-holder ion-text-center">
        <IonButton expand="block" routerLink="/questioning">
          <IonIcon slot="start" src="assets/imgs/icn-google.svg" />
          {t('login.google')}
        </IonButton>

        <IonButton expand="block" routerLink="/questioning">
          <IonIcon slot="start" src="assets/imgs/icn-fb.svg" />
          {t('login.facebook')}
        </IonButton>
        </div>*/}

      <IonRouterLink routerLink="/registeration">
        <div className="bottom-holder flex al-center jc-center">
        <h6>{t('login.no_account')} &nbsp;&nbsp;</h6>
        <div className="btn ion-activatable ripple-parent rectangle">
        <IonRippleEffect></IonRippleEffect>
        <h5>{t('login.sign_up')}</h5>
      </div>
      </div>
      </IonRouterLink>

      </IonContent>
    </IonPage>
  );
};

export default Login;
