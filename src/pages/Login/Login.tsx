import {
  IonButton,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonPage,
  IonRippleEffect,
  IonRouterLink,
  IonSpinner,
  isPlatform,
} from "@ionic/react";

import "./Login.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { navigate } from "ionicons/icons";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";
import { HTTP } from "@awesome-cordova-plugins/http";
import apiService from "../../Services";
const Login: React.FC = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [token, setToken] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [emailRegexx, setEmailRegex] = useState(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const nullEntry: any[] = [];
  const [notifications, setnotifications] = useState(nullEntry);
  const BASE_URL = process.env.BASE_URL;
  const history = useHistory();
  const { t } = useTranslation();

  const apiHost = `${BASE_URL}/wp-json`;

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
    setPasswordError(value.trim() === "" ? "" : value.length < 6 ? "" : "");
    setErrorMessage(value.trim() === "" ? "" : "");
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    setEmailError(
      value.trim() === "" ? "" : !emailRegexx.test(value) ? "" : ""
    );
    setErrorMessage(value.trim() === "" ? "" : "");
  };

  const handleEmailInputBlur = (e) => {
    setEmailTouched(true);
    if (emailTouched) {
      setEmailError(
        e.target.focusedValue.trim() === ""
          ? "Bitte gebe deine E-Mail-Adresse ein."
          : !emailRegexx.test(e.target.focusedValue)
            ? "Bitte gebe eine gültige E-Mail-Adresse ein."
            : ""
      );
      setErrorMessage(e.target.focusedValue.trim() === "" ? "" : "");
    }
  };
  const handlePasswprdInputBlur = (e) => {
    setPasswordTouched(true);
    if (passwordTouched) {
      setPasswordError(
        e.target.focusedValue.trim() === ""
          ? "Bitte gebe dein Passwort ein."
          : e.target.focusedValue.length < 6
            ? "Das Passwort muss mindestens 6 Zeichen lang sein."
            : ""
      );
      setErrorMessage(e.target.focusedValue.trim() === "" ? "" : "");
    }
  };

  const isFormValid =
    password &&
    email &&
    emailRegexx.test(email) &&
    password.length >= 6 &&
    !passwordError &&
    !emailError;

  const handleLogin = async () => {
    setIsSubmitting(true);

    try {
      if (isPlatform("ios")) {
        const response = await HTTP.post(
          `${BASE_URL}/wp-json/jwt-auth/v1/token`,
          {
            username: email,
            password: password,
          },
          {}
        );

        if (response.status === 200) {
          var responseData = JSON.parse(response.data);
          setToken(responseData.token);
          localStorage.setItem("jwtToken", responseData.token);
          sessionStorage.setItem("jwtToken", responseData.token);

          localStorage.setItem("roles", JSON.stringify(responseData.roles));
          localStorage.setItem("userId", responseData.user_id);
        } else {
          setErrorMessage("WordPress API login failed");
          setIsSubmitting(false);
          return;
        }

        // Chat API login
        let url = "https://apidev.mynalu.com";
        //  let url = 'http://localhost:7001'
        try {
          const naluApiResponse = await apiService.post(
            `https://apidev.mynalu.com/v1/user/login`,
            {
              email: email,
              password: password,
            },
          );
          const naluApiResponseData = naluApiResponse; //JSON.parse(naluApiResponse.data);

          console.log("uper",naluApiResponseData)
          if (naluApiResponseData.success) {
            console.log("Hereee",naluApiResponseData)
            const { access, refresh } = naluApiResponseData.data.tokens;
            const wsToken = naluApiResponse.data.wsToken;
            let chatUser = naluApiResponse.data.user;

            // Chat Backend Tokens
            localStorage.setItem("accessToken", access.token);
            localStorage.setItem("refreshToken", refresh.token);
            localStorage.setItem("chatApiUserId", chatUser?._id);

            // Chat iFrame Tokens
            localStorage.setItem("chatToken", access.token); // This is the same as accessToken, stored under a new key
            localStorage.setItem("chatWsToken", wsToken);

            // Chat iFrame User Information
            const chatUserString = JSON.stringify(chatUser);
            localStorage.setItem("chatUser", chatUserString);

            // let fcmtoken = localStorage.getItem("fcmtoken");
            // if (naluApiResponseData.data.user._id) {
            //   update_fcm_token(naluApiResponseData.data.user._id, fcmtoken);
            // }
          } else {
            // Do not show an error message for Chat API login failure
            console.log("Chat API login failed");
          }
        } catch (chatApiError) {
          // Handle any errors with the Chat API login here
          console.error("Chat API login error:", chatApiError);
        }

        // Navigation
        setTimeout(() => {
          history.push("/tabs/tab1");
          window.location.reload();
         }, 200);
      } else {
        // WordPress API login
        const response = await axios.post(
          `${BASE_URL}/wp-json/jwt-auth/v1/token`,
          {
            username: email,
            password: password,
          }
        );

        if (response.status === 200) {
          setToken(response.data.token);
          localStorage.setItem("jwtToken", response.data.token);
          sessionStorage.setItem("jwtToken", response.data.token);

          localStorage.setItem("roles", JSON.stringify(response.data.roles));
          localStorage.setItem("userId", response.data.user_id);
        } else {
          setErrorMessage("WordPress API login failed");
          setIsSubmitting(false);
          return;
        }

        // Chat API login
        try {
          const naluApiResponse = await axios.post(
            "https://apidev.mynalu.com/v1/user/login",
            {
              email: email,
              password: password,
            }
          );

          if (naluApiResponse.status === 200 && naluApiResponse.data.success) {
            const { access, refresh } = naluApiResponse.data.data.tokens;
            const wsToken = naluApiResponse.data.data.wsToken;
            const chatUser = naluApiResponse.data.data.user;

            // Chat Backend Tokens
            localStorage.setItem("accessToken", access.token);
            localStorage.setItem("refreshToken", refresh.token);
            localStorage.setItem("chatApiUserId", chatUser._id);

            // Chat iFrame Tokens
            localStorage.setItem("chatToken", access.token); // This is the same as accessToken, stored under a new key
            localStorage.setItem("chatWsToken", wsToken);

            // Chat iFrame User Information
            const chatUserString = JSON.stringify(chatUser);
            localStorage.setItem("chatUser", chatUserString);

            // let fcmtoken = localStorage.getItem("fcmtoken");
            // if (naluApiResponse.data.data.user._id) {
            //   update_fcm_token(naluApiResponse.data.data.user._id, fcmtoken);
            // }
          } else {
            // Do not show an error message for Chat API login failure
            console.log("Chat API login failed");
          }
        } catch (chatApiError) {
          // Handle any errors with the Chat API login here
          console.error("Chat API login error:", chatApiError);
        }

        // Navigation
       setTimeout(() => {
        history.push("/tabs/tab1");
        window.location.reload();
       }, 200);
      }
    } catch (error) {
      console.log("Error", error.response?.data?.message || error.message);
      setErrorMessage("E-Mail-Adresse oder Kennwort ungültig");
    }

    setIsSubmitting(false);
  };

  // const update_fcm_token = async (data: any, token) => {
  //   let obj = {
  //     newToken: token,
  //   };
  //   let url = "https://apidev.mynalu.com/v1";
  //   //let url = 'http://localhost:7001/v1'
  //   try {
  //     apiService.put2(`${url}/user/update-token/${data}`, obj);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  return (
    <IonPage className="Login">
      <IonContent
        className={`ion-padding ${isPlatform("ios") ? "safe-padding" : ""}`}
        fullscreen
      >
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
                onIonChange={() => setEmailTouched(false)} // Reset emailTouched when input changes
                onIonBlur={handleEmailInputBlur}
                onIonInput={handleEmailChange}
              />
            </IonItem>

            {emailTouched && emailError && (
              <p className="error-message">{emailError}</p>
            )}
          </div>

          <div className="input-item">
            <IonItem lines="none">
              <IonIcon src="assets/imgs/icn-lock.svg" slot="start" />
              <IonInput
                placeholder={t("login.password")}
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
          <IonButton
            expand="block"
            disabled={!isFormValid || isSubmitting}
            onClick={handleLogin}
          >
            {isSubmitting ? (
              <IonSpinner name="crescent" />
            ) : (
              t("login.continue_button")
            )}
          </IonButton>
        </div>

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

        <IonRouterLink routerLink="/questioning">
          <div className="bottom-holder flex al-center jc-center">
            <h6>{t("login.no_account")} &nbsp;&nbsp;</h6>
            <div className="btn ion-activatable ripple-parent rectangle">
              <IonRippleEffect></IonRippleEffect>
              <h5>{t("login.sign_up")}</h5>
            </div>
          </div>
        </IonRouterLink>

        <div className="btn forgot-password rectangle al-center jc-center">
          <a
            href={`${BASE_URL}/login/?action=forgot_password`}
            target="_system"
          >
            <h5>Passwort vergessen</h5>
          </a>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
