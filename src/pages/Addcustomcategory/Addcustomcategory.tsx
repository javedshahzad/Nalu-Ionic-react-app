import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCheckbox,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonRange,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { add, filterOutline, optionsOutline } from "ionicons/icons";

import "./Addcustomcategory.scss";
import { useEffect, useState } from "react";

const Addcustomcategory: React.FC = () => {
  const [customName, setCustomName] = useState("");
  const [customNameError, setcustomNameError] = useState("");

  const [selectedValue, setSelectedValue] = useState("");
  const [selectedValueError, setValueError] = useState("");

  const [selectedLogoValue, setSelectedLogoValue] = useState("");
  const [selectedLogoError, setSelectedLogoError] = useState("");

  const isFormValid =
    !!customName &&
    !!selectedValue &&
    !!selectedLogoValue &&
    !customNameError &&
    !selectedValueError &&
    !selectedLogoError;

  const handleCustomNameChange = (event) => {
    const value = event.target.value;
    setCustomName(value);
    setcustomNameError(value.trim() === "" ? "Please enter Custom name." : "");
  };

  const handleRadioChange = (event) => {
    setSelectedValue(event.detail.value);
    const value = event.target.value;
    setValueError(value.trim() === "" ? "Please select a category." : "");
  };

  const handleLogoChange = (event) => {
    const value = event.target.value;
    setSelectedLogoValue(event.detail.value);
    setSelectedLogoError(value.trim() === "" ? "Please select a Logo." : "");
  };

  return (
    <IonPage className="Addcustomcategory">
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              defaultHref="/journaladdition"
              text=""
              color="dark"
            />
          </IonButtons>
          <IonTitle>Add Custom Category</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <div className="section">
          <div className="title flex al-center jc-between">
            <h3>Add Custom Category Name</h3>
          </div>
          <div className="the-form up">
            <div className="input-item">
              <IonItem lines="none">
                <IonInput
                  placeholder="Add Preferred Custom Name"
                  value={customName}
                  onIonFocus={handleCustomNameChange}
                  onIonInput={handleCustomNameChange}
                />
              </IonItem>

              {customNameError && (
                <p className="error-message">{customNameError}</p>
              )}
            </div>
          </div>
        </div>

        <div className="section">
          <div className="title flex al-center jc-between ion-padding-bottom">
            <h3>Choose Category Type</h3>
          </div>
          <div>
            <IonRadioGroup
              value={selectedValue}
              onIonChange={handleRadioChange}
            >
              <IonRow>
                <IonCol size="6" id="tagss">
                  <IonItem lines="none">
                    <IonIcon
                      slot="start"
                      src={
                        selectedValue === "type1"
                          ? "assets/imgs/sm1active.svg"
                          : "assets/imgs/sm1.svg"
                      }
                    />
                    <IonLabel>Custom Category</IonLabel>
                    <IonRadio value="type1"></IonRadio>
                  </IonItem>
                </IonCol>
                <IonCol size="6" id="checks">
                  <IonItem lines="none">
                    <IonIcon
                      slot="start"
                      src={
                        selectedValue === "type2"
                          ? "assets/imgs/sm1active.svg"
                          : "assets/imgs/sm1.svg"
                      }
                    />
                    <IonLabel>Custom Category</IonLabel>
                    <IonRadio value="type2" mode="md"></IonRadio>
                    {selectedValue === "type2" ? (
                      <IonCheckbox slot="end" checked mode="md"></IonCheckbox>
                    ) : (
                      <IonCheckbox slot="end" mode="md"></IonCheckbox>
                    )}
                    
                  </IonItem>
                </IonCol>
                <IonCol size="6" id="imgg">
                  <IonItem lines="none">
                    <IonLabel>
                      <img
                        src={
                          selectedValue === "type3"
                            ? "assets/imgs/type3active.svg"
                            : "assets/imgs/type3.svg"
                        }
                        alt=""
                      />
                    </IonLabel>
                    <IonRadio value="type3" mode="md"></IonRadio>
                  </IonItem>
                </IonCol>
                <IonCol size="6" id="imgg">
                  <IonItem lines="none">
                    <IonLabel>
                      <img
                        src={
                          selectedValue === "type4"
                            ? "assets/imgs/type4active.svg"
                            : "assets/imgs/type4.svg"
                        }
                        alt=""
                      />
                    </IonLabel>
                    <IonRadio value="type4" mode="md"></IonRadio>
                  </IonItem>
                </IonCol>
              </IonRow>
            </IonRadioGroup>
          </div>

          {selectedValueError && (
            <p className="error-message">{selectedValueError}</p>
          )}
        </div>

        <div className="section">
          <div className="title flex al-center jc-between ion-padding-bottom">
            <h3>Choose a Logo</h3>
          </div>
          <div>
            <IonRadioGroup
              value={selectedLogoValue}
              onIonChange={handleLogoChange}
            >
              <IonRow>
                <IonCol size="2.4" id="imgg">
                  <IonItem lines="none">
                    <IonLabel className="ion-text-center">
                      <img
                        src={
                          selectedLogoValue === "logo1"
                            ? "assets/imgs/logo1a.svg"
                            : "assets/imgs/logo1.svg"
                        }
                        alt=""
                      />
                    </IonLabel>
                    <IonRadio value="logo1" mode="md"></IonRadio>
                  </IonItem>
                </IonCol>
                <IonCol size="2.4" id="imgg">
                  <IonItem lines="none">
                    <IonLabel className="ion-text-center">
                      <img
                        src={
                          selectedLogoValue === "logo2"
                            ? "assets/imgs/logo2a.svg"
                            : "assets/imgs/logo2.svg"
                        }
                        alt=""
                      />
                    </IonLabel>
                    <IonRadio value="logo2" mode="md"></IonRadio>
                  </IonItem>
                </IonCol>
                <IonCol size="2.4" id="imgg">
                  <IonItem lines="none">
                    <IonLabel className="ion-text-center">
                      <img
                        src={
                          selectedLogoValue === "logo3"
                            ? "assets/imgs/logo3a.svg"
                            : "assets/imgs/logo3.svg"
                        }
                        alt=""
                      />
                    </IonLabel>
                    <IonRadio value="logo3" mode="md"></IonRadio>
                  </IonItem>
                </IonCol>
                <IonCol size="2.4" id="imgg">
                  <IonItem lines="none">
                    <IonLabel className="ion-text-center">
                      <img
                        src={
                          selectedLogoValue === "logo4"
                            ? "assets/imgs/logo4a.svg"
                            : "assets/imgs/logo4.svg"
                        }
                        alt=""
                      />
                    </IonLabel>
                    <IonRadio value="logo4" mode="md"></IonRadio>
                  </IonItem>
                </IonCol>
                <IonCol size="2.4" id="imgg">
                  <IonItem lines="none">
                    <IonLabel className="ion-text-center">
                      <img
                        src={
                          selectedLogoValue === "logo5"
                            ? "assets/imgs/logo5a.svg"
                            : "assets/imgs/logo5.svg"
                        }
                        alt=""
                      />
                    </IonLabel>
                    <IonRadio value="logo5" mode="md"></IonRadio>
                  </IonItem>
                </IonCol>
                <IonCol size="2.4" id="imgg">
                  <IonItem lines="none">
                    <IonLabel className="ion-text-center">
                      <img
                        src={
                          selectedLogoValue === "logo6"
                            ? "assets/imgs/logo6a.svg"
                            : "assets/imgs/logo6.svg"
                        }
                        alt=""
                      />
                    </IonLabel>
                    <IonRadio value="logo6" mode="md"></IonRadio>
                  </IonItem>
                </IonCol>
                <IonCol size="2.4" id="imgg">
                  <IonItem lines="none">
                    <IonLabel className="ion-text-center">
                      <img
                        src={
                          selectedLogoValue === "logo7"
                            ? "assets/imgs/logo7a.svg"
                            : "assets/imgs/logo7.svg"
                        }
                        alt=""
                      />
                    </IonLabel>
                    <IonRadio value="logo7" mode="md"></IonRadio>
                  </IonItem>
                </IonCol>
                <IonCol size="2.4" id="imgg">
                  <IonItem lines="none">
                    <IonLabel className="ion-text-center">
                      <img
                        src={
                          selectedLogoValue === "logo8"
                            ? "assets/imgs/logo8a.svg"
                            : "assets/imgs/logo8.svg"
                        }
                        alt=""
                      />
                    </IonLabel>
                    <IonRadio value="logo8" mode="md"></IonRadio>
                  </IonItem>
                </IonCol>
                <IonCol size="2.4" id="imgg">
                  <IonItem lines="none">
                    <IonLabel className="ion-text-center">
                      <img
                        src={
                          selectedLogoValue === "logo9"
                            ? "assets/imgs/logo9a.svg"
                            : "assets/imgs/logo9.svg"
                        }
                        alt=""
                      />
                    </IonLabel>
                    <IonRadio value="logo9" mode="md"></IonRadio>
                  </IonItem>
                </IonCol>
                <IonCol size="2.4" id="imgg">
                  <IonItem lines="none">
                    <IonLabel className="ion-text-center">
                      <img
                        src={
                          selectedLogoValue === "logo10"
                            ? "assets/imgs/logo10a.svg"
                            : "assets/imgs/logo10.svg"
                        }
                        alt=""
                      />
                    </IonLabel>
                    <IonRadio value="logo10" mode="md"></IonRadio>
                  </IonItem>
                </IonCol>
              </IonRow>
            </IonRadioGroup>
          </div>
          {selectedLogoError && (
            <p className="error-message">{selectedLogoError}</p>
          )}
        </div>

        <div className="btn-holder ion-text-center ion-padding-vertical">
          <IonButton expand="block" disabled={!isFormValid}>
            Save
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Addcustomcategory;
