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
import axios from 'axios';
import { useHistory } from "react-router";

const Registeration: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [token, setToken] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const history = useHistory();

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

    // const testapicall = () => {
    //   axios
    //     .get("https://localhost:44367/api/Employee/employees")
    //     .then((response) => {
    //       console.log(response.data.value);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // };

      const handleRegister = async () => {
        try {
          const response = await axios.post('https://app.mynalu.com/wp-json/nalu-app/v1/add-freemium-user', {
            email: email,
            first_name: firstName,
          },{
            // headers: {
            //   'X-WP-Nonce': 'rbkanB3yTlxu9PFb3PYcbKRgAJ9vujt2',
            // },
            //withCredentials: true,
          });
          console.log("Response::",response);
          if(response.status === 200){
            setToken(response.data.token);
            setErrorMessage("Email has been sent")
            localStorage.setItem('jwtToken', response.data.token);

          // naviagtion
          history.push("/yourdata")
          }
        } catch (error) {
          console.log('Error', error);
          if(error.response.data.message = "A user with this email already exists."){
            setEmailError(error.response.data.message);
          }
          else if(error.response.data.message = "Too many registration attempts. Please try again later."){
            setEmailError(error.response.data.message);
          }
        }
      };

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
            {errorMessage && <p className="success-message">{errorMessage}</p>}

          </div>
        </div>
        <div className="btn-holder ion-text-center ion-padding-vertical">
          <IonButton expand="block"  disabled={!isFormValid} onClick={() => handleRegister()}>Continue</IonButton>
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
