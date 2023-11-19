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
import axios from "axios";
import { navigate } from "ionicons/icons";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";

const Login: React.FC = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [token, setToken] = useState("");
  const history = useHistory();
  const { t } = useTranslation();

  const apiHost = "https://app.mynalu.com/wp-json";

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
    setPasswordError(
      value.trim() === ""
        ? "Please enter your password."
        : value.length < 6
        ? "Password must be at least 6 characters long."
        : ""
    );
    setErrorMessage(value.trim() === "" ? "" : "");
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(
      value.trim() === ""
        ? "Please enter your email address."
        : !emailRegex.test(value)
        ? "Please enter a valid email address."
        : ""
    );
    setErrorMessage(value.trim() === "" ? "" : "");
  };

  const isFormValid = password && email && !passwordError && !emailError;

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${apiHost}/jwt-auth/v1/token`, {
        username: email,
        password: password,
      });
      console.log("Response:", response);
      if (response.status === 200) {
        const { token: receivedToken } = response.data;
        console.log("res data", response.data);
        setToken(response.data.token);
        localStorage.setItem("jwtToken", response.data.token);
        localStorage.setItem("roles", response.data.roles);

        // config code
        axios.interceptors.request.use((config) => {
          const storedToken = localStorage.getItem("jwtToken");
          if (storedToken) {
            config.headers.Authorization = `Bearer ${storedToken}`;
            return config;
          }
        });

        // naviagtion
        history.push("/tabs/tab1");
      }
    } catch (error) {
      console.log("Error", error.response.data.message);
      setErrorMessage("Invalid credentials");
    }
  };

  return (
    <IonPage className="Login">
      <IonContent className="ion-padding" fullscreen>
        <div className="title-holder ion-text-center">
          <h3> {t("login.login")}</h3>
        </div>
        <div className="the-form">
          <div className="input-item">
            <IonItem lines="none">
              <IonIcon src="assets/imgs/icn-email.svg" slot="start" />
              <IonInput
                placeholder={t("login.email")}
                autocomplete="email"
                type="email"
                value={email}
                onIonInput={handleEmailChange}
              />
            </IonItem>

            {emailError && <p className="error-message">{emailError}</p>}
          </div>

          <div className="input-item">
            <IonItem lines="none">
              <IonIcon src="assets/imgs/icn-lock.svg" slot="start" />
              <IonInput
                placeholder={t("login.password")}
                type="password"
                value={password}
                onIonInput={handlePasswordChange}
              />
            </IonItem>
            {passwordError && <p className="error-message">{passwordError}</p>}
          </div>
        </div>
        <div className="btn-holder ion-text-center ion-padding-vertical">
          <IonButton
            expand="block"
            disabled={!isFormValid}
            onClick={() => handleLogin()}
          >
            {t("login.continue_button")}
          </IonButton>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="or ion-text-center">
          <p>{t("login.or")}</p>
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
            <h6>{t("login.no_account")} &nbsp;&nbsp;</h6>
            <div className="btn ion-activatable ripple-parent rectangle">
              <IonRippleEffect></IonRippleEffect>
              <h5>{t("login.sign_up")}</h5>
            </div>
          </div>
        </IonRouterLink>
      </IonContent>
    </IonPage>
  );
};

export default Login;
