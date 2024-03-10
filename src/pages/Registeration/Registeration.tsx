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
import axios from "axios";
import "./Registeration.scss";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { HTTP } from "@awesome-cordova-plugins/http";
import { useDispatch } from "react-redux";
import { fetchCourses } from "../../actions/courseActions";
const Registeration: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");

  const handleFirstNameChange = (event) => {
    const value = event.target.value;
    setFirstName(value);
    setFirstNameError(
      value.trim() === "" ? "Bitte gebe deinen Vornamen ein." : ""
    );
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(
      value.trim() === ""
        ? "Bitte gebe deine E-Mail-Adresse ein."
        : !emailRegex.test(value)
        ? "Bitte gebe eine gültige E-Mail-Adresse ein."
        : ""
    );
  };

  const dispatch = useDispatch();

  const isFormValid = firstName && email && !firstNameError && !emailError;

  const userGoal = localStorage.getItem("selectedGoal") || "harmony";

  const [apiError, setApiError] = useState("");

  const history = useHistory();

  const onSubmit = async () => {
    if (isFormValid) {
      setIsLoading(true);

      try {
        if (isPlatform("ios")) {
          const response = await HTTP.post(
            `https://staging.app.mynalu.com/wp-json/nalu-app/v1/add-freemium-user?email=${email}&first_name=${firstName}&goal=${userGoal}`,
            {},
            {}
          );
          const responseData = JSON.parse(response.data);
          console.log("Response:", response);
          console.log(responseData);
          if (response.status === 200) {
            const {
              token: receivedToken,
              role,
              tempname: receivedPassword,
            } = responseData;

            // Save WordPress API login data
            setToken(receivedToken);
            setPassword(receivedPassword); // Set the password here
            localStorage.setItem("jwtToken", receivedToken);
            localStorage.setItem("roles", JSON.stringify(role));

            // Clear any previous API errors when request succeeds
            setApiError("");

            // Chat API login
            try {
              const naluApiResponse = await HTTP.post(
                "https://apidev.mynalu.com/v1/user/login",
                {
                  email: email,
                  password: receivedPassword,
                },
                {}
              );
              console.log(naluApiResponse);
              var naluApiResponseData = JSON.parse(naluApiResponse.data);
              if (
                naluApiResponse.status === 200 &&
                naluApiResponseData.success
              ) {
                const tokens = naluApiResponseData.data.tokens;

                // Make sure that the tokens property exists in the response
                if (tokens && tokens.access && tokens.refresh) {
                  const { access, refresh } = tokens;

                  // Save additional data, including _id, in localStorage
                  localStorage.setItem("accessToken", access.token);
                  localStorage.setItem("refreshToken", refresh.token);
                  localStorage.setItem(
                    "chatApiUserId",
                    naluApiResponseData.data.user._id
                  );
                } else {
                  console.log("Invalid tokens structure in Chat API response");
                }
              } else {
                console.log("Chat API login failed");
              }
            } catch (chatApiError) {
              console.error("Chat API login error:", chatApiError);
            }

            // Navigation
            history.push("/yourdata");
          }
          setIsLoading(false);
        } else {
          // WordPress API Registration
          const response = await axios.post(
            `https://staging.app.mynalu.com/wp-json/nalu-app/v1/add-freemium-user?email=${email}&first_name=${firstName}&goal=${userGoal}`
          );

          console.log("Response:", response);

          if (response.status === 200) {
            const {
              token: receivedToken,
              role,
              tempname: receivedPassword,
            } = response.data;

            // Save WordPress API login data
            setToken(receivedToken);
            setPassword(receivedPassword); // Set the password here
            localStorage.setItem("jwtToken", receivedToken);
            localStorage.setItem("roles", JSON.stringify(role));

            // Clear any previous API errors when request succeeds
            setApiError("");

            // Chat API login
            try {
              const naluApiResponse = await axios.post(
                "https://apidev.mynalu.com/v1/user/login",
                {
                  email: email,
                  password: receivedPassword,
                }
              );

              if (
                naluApiResponse.status === 200 &&
                naluApiResponse.data.success
              ) {
                const tokens = naluApiResponse.data.data.tokens;

                // Make sure that the tokens property exists in the response
                if (tokens && tokens.access && tokens.refresh) {
                  const { access, refresh } = tokens;

                  // Save additional data, including _id, in localStorage
                  localStorage.setItem("accessToken", access.token);
                  localStorage.setItem("refreshToken", refresh.token);
                  localStorage.setItem(
                    "chatApiUserId",
                    naluApiResponse.data.data.user._id
                  );
                } else {
                  console.log("Invalid tokens structure in Chat API response");
                }
              } else {
                console.log("Chat API login failed");
              }
            } catch (chatApiError) {
              console.error("Chat API login error:", chatApiError);
            }

            // Navigation
            history.push("/yourdata");
          }

          setIsLoading(false);
        }
      } catch (error) {
        console.error("There was a problem with the Axios operation:", error);

        if (error.response && error.response.data && error.response.data.code) {
          switch (error.response.data.code) {
            case "existing_user":
              setApiError(
                "Ein Benutzer mit dieser E-Mail-Adresse ist bereits registriert. Bitte logge dich ein oder verwende eine andere E-Mail."
              );
              break;
            case "too_many_attempts":
              setApiError(
                "Zu viele Registrierungsversuche. Bitte versuche es später noch einmal"
              );
              break;
            case "junk_domain":
              setApiError(
                "Wegwerf-E-Mails werden nicht akzeptiert. Bitte verwende eine E-Mail-Adresse, die du regelmässig überprüfst."
              );
              break;
            case "invalid_email":
              setApiError(
                "Es scheint ein Tippfehler vorzuliegen. Bitte überprüfe deine E-Mail-Adresse und versuche es noch einmal."
              );
              break;
            case "server_error":
              setApiError(
                " Deine Registrierung hat leiderwegen eines internen Fehlers nicht geklappt . Bitte versuch es später erneut und kontaktiere uns unter support@mynalu.com, falls das Problem bestehen bleibt."
              );
              break;
            case "catch_all_email":
              setApiError(
                "Allgemeine E-Mail-Adressen wie info@ oder support@ sind nicht zulässig. Bitte verwende stattdessen deine persönliche E-Mail-Adresse."
              );
              break;
            default:
              setApiError(
                "Es ist ein Fehler aufgetreten, bitte versuche es erneut oder verwende eine andere E-Mail-Adresse."
              );
          }
          setIsLoading(false);
        } else {
          setApiError(
            "Es ist ein Fehler aufgetreten, bitte versuche es erneut oder verwende eine andere E-Mail-Adresse."
          );
          setIsLoading(false);
        }
      }
    }
  };

  useEffect(() => {
    if (token.length > 0) {
      dispatch<any>(fetchCourses());
    }
  }, [token.length > 0]);

  return (
    <IonPage className="Registeration">
      <IonContent
        className={`ion-padding ${isPlatform("ios") ? "safe-padding" : ""}`}
        fullscreen
      >
        <div className="title-holder ion-text-center">
          <h3>Registrieren</h3>
          <h6>
            Erstelle ein kostenloses Konto und personalisiere die App nach
            deinen Bedürfnissen
          </h6>
        </div>
        <div className="the-form">
          <div className="input-item">
            <IonItem lines="none">
              <IonIcon src="assets/imgs/icn-user.svg" slot="start" />
              <IonInput
                placeholder="Vorname"
                autocomplete="given-name"
                type="text"
                value={firstName}
                onIonInput={handleFirstNameChange}
                onIonFocus={handleFirstNameChange}
              />
            </IonItem>

            {firstNameError && (
              <p className="error-message">{firstNameError}</p>
            )}
          </div>
          <div className="input-item">
            <IonItem lines="none">
              <IonIcon src="assets/imgs/icn-email.svg" slot="start" />
              <IonInput
                placeholder="E-Mail-Adresse"
                type="email"
                autocomplete="email"
                value={email}
                onIonInput={handleEmailChange}
              />
            </IonItem>

            {emailError && <p className="error-message">{emailError}</p>}
          </div>
        </div>
        {apiError && <p className="error-message">{apiError}</p>}
        <div className="btn-holder ion-text-center ion-padding-vertical">
          <IonButton
            expand="block"
            disabled={!isFormValid || isLoading}
            onClick={onSubmit}
          >
            {isLoading ? <IonSpinner name="crescent" /> : "Weiter"}
          </IonButton>
        </div>
        <div className="or ion-text-center">
          <p>oder</p>
        </div>

        {/*<div className="social-holder ion-text-center">
        <IonButton expand="block" routerLink="/questioning">
          <IonIcon slot="start" src="assets/imgs/icn-google.svg" />
          Continue With Google
        </IonButton>
        <video>
          <source />
        </video>

        <IonButton expand="block" routerLink="/questioning">
          <IonIcon slot="start" src="assets/imgs/icn-fb.svg" />
          Continue With Facebook
        </IonButton>
        </div>*/}

        <IonRouterLink routerLink="/login">
          <div className="bottom-holder flex al-center jc-center">
            <h6>Hast du bereits ein Konto?&nbsp;&nbsp;</h6>
            <IonRippleEffect></IonRippleEffect>
            <div className="btn ion-activatable ripple-parent rectangle">
              <h5>Login</h5>
            </div>
          </div>
        </IonRouterLink>
      </IonContent>
    </IonPage>
  );
};

export default Registeration;
