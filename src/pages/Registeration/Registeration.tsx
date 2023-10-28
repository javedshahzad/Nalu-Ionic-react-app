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
import axios from 'axios'; // Import Axios
import "./Registeration.scss";
import { useState } from "react";
import { useHistory } from 'react-router-dom';

const Registeration: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [token, setToken] = useState('');

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

  const [apiError, setApiError] = useState('');

  const history = useHistory();

  const onSubmit = async () => {
    if (isFormValid) {
      try {
        const response = await axios.post(`https://app.mynalu.com/wp-json/nalu-app/v1/add-freemium-user?email=${email}&first_name=${firstName}`);

        console.log("Response:", response);
        if (response.status === 200) {
            const { token: receivedToken, roles } = response.data;
            setToken(receivedToken); // Assuming you have a state called token
            localStorage.setItem('jwtToken', receivedToken);
            localStorage.setItem('roles', roles);

            // Clear any previous API errors when request succeeds
            setApiError('');

            // Check if there's a saved goal in local storage
            const savedGoal = localStorage.getItem('selectedGoal');
            if (savedGoal) {
                // Make the API call for the saved goal
                await axios.put(`https://app.mynalu.com/wp-json/nalu-app/v1/user-goal?goal=${savedGoal}`, {}, {
                    headers: {
                        "Authorization": `Bearer ${receivedToken}`,
                        "Content-Type": "application/json"
                    }
                });
                // Remove the saved goal from local storage
                localStorage.removeItem('selectedGoal');
            }

            history.push('/yourdata');
        }
        
      } catch (error) {
        console.error("There was a problem with the Axios operation:", error);

        if (error.response && error.response.data && error.response.data.code) {
          switch (error.response.data.code) {
            case "existing_user": 
              setApiError("A user with this email is already registered. Please login or use another email.");
              break;
            case "too_many_attempts":
              setApiError("Too many registration attempts. Please try again later.");
              break;
            case "junk_domain":
              setApiError("Disposable emails are not accepted. Please use an email address that you regularly check.");
              break;
            case "invalid_email":
              setApiError("Invalid email address. It appears there might be a typo. Please double-check your email address and try again.");
              break;
            case "catch_all_email":
              setApiError("General email addresses like info@ or support@ are not permitted. Please use your personal email address instead.");
              break;
            default:
              setApiError('An error occurred. Please try again or use another email.');
          }
        } else {
          setApiError('An error occurred. Please try again or use another email.');
        }
      }
    }
}

  
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
              <IonInput placeholder="Email" type="email" autocomplete="email"  value={email} onIonInput={handleEmailChange} />
            </IonItem>

            {emailError && <p className="error-message">{emailError}</p>}

          </div>
        </div>
        {apiError && <p className="error-message">{apiError}</p>}
        <div className="btn-holder ion-text-center ion-padding-vertical">
          <IonButton expand="block" disabled={!isFormValid} onClick={onSubmit}>Continue</IonButton>
        </div>
        <div className="or ion-text-center">
          <p>or</p>
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
        <h6>Already Have an Account?&nbsp;&nbsp;</h6>
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
