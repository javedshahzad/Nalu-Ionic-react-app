import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonToolbar,
} from "@ionic/react";
import { addCircle, checkmarkCircle } from "ionicons/icons";

import "./Addrecmodal.scss";
import axios from "axios";
import { HTTP } from "@awesome-cordova-plugins/http";

import { useState } from "react";
import authService from "../../../authService";
import { useHistory } from "react-router";

const Addrecmodal: React.FC<{ onClose?: any }> = ({ onClose }) => {
  const [selectedCategory, setselectedCategory] = useState("");
  const [categoryError, setcategoryError] = useState("");

  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");

  const [note, setNote] = useState("");
  const history = useHistory();

  const isFormValid =
    !!selectedCategory && !!title && !categoryError && !titleError;

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setselectedCategory(value);
    setcategoryError(value.trim() === "" ? "Please select a category." : "");
  };

  const handleTitleChange = (event) => {
    const value = event.target.value;
    setTitle(value);
    setTitleError(value.trim() === "" ? "Please enter a title." : "");
  };

  const handleSubmit = () => {
    if (!selectedCategory) {
      setcategoryError("Please select a category.");
    }
    if (!title) {
      setTitleError("Please enter a title.");
    }

    if (isFormValid) {
      console.log("Recommendation shared successfully!");
    }

    try {
      axios
        .post(
          "https://app.mynalu.com/wp-json/nalu-app/v1/recommendation",
          {
            category: selectedCategory,
            name: title,
            description: note,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          if (response.data.message === "Email sent successfully") {
            onClose(
              "Your recommendation was successfully shared. A representative from the NALU team will carefully check your recommendation before publishing it within the app"
            );
          }
        })
        .catch((error) => {
          if (error.response) {
            const status = error.response.status;

            if (status === 401 || status === 403 || status === 404) {
              // Unauthorized, Forbidden, or Not Found
              authService.logout();
              history.push("/onboarding");
            }
          }

          console.error(error);
        });
    } catch (error) {
      if (error.response) {
        const status = error.response.status;

        if (status === 401 || status === 403 || status === 404) {
          // Unauthorized, Forbidden, or Not Found
          authService.logout();
          history.push("/onboarding");
        }
      }
      console.error("error", error);
    }
  };

  return (
    <IonPage className="Addrecmodal">
      <div className="model_content">
        <div
          className="back"
          onClick={() => {
            onClose();
          }}
        ></div>
        <IonGrid style={{ height: "100%" }}>
          <IonRow
            className="ion-justify-content-center ion-align-items-center"
            style={{ height: "100%" }}
          >
            <div className="holder ion-text-center">
              <div className="card">
                <div className="header flex al-center jc-center">
                  <IonIcon icon={addCircle} />
                </div>
                <div className="the-form">
                  <div className="input-item">
                    <IonItem>
                      <IonSelect
                        mode="md"
                        className="ion-text-left"
                        placeholder="Kategorie"
                        cancelText="Abbrechen"
                        okText="Bestätigen"
                        value={selectedCategory}
                        onIonChange={handleCategoryChange}
                      >
                        <IonSelectOption value="apple">
                          Anlaufstellen
                        </IonSelectOption>
                        <IonSelectOption value="banana">Medien</IonSelectOption>
                        <IonSelectOption value="orange">
                          Rezepte
                        </IonSelectOption>
                        <IonSelectOption value="orange">
                          Gesundheitskosten
                        </IonSelectOption>
                      </IonSelect>
                    </IonItem>
                    {categoryError && (
                      <p className="error-message">{categoryError}</p>
                    )}
                  </div>
                  <div className="input-item">
                    <IonItem>
                      <IonInput
                        placeholder="Bezeichnung"
                        type="text"
                        value={title}
                        onIonChange={handleTitleChange}
                      />
                    </IonItem>
                    {titleError && (
                      <p className="error-message">{titleError}</p>
                    )}
                  </div>
                  <div className="input-item">
                    <IonItem>
                      <IonTextarea
                        placeholder="Beschreibung"
                        rows={5}
                        value={note}
                        onIonChange={(e) => setNote(e.target.value)}
                      />
                    </IonItem>

                    {/* {noteError && (
                      <p className="error-message">{noteError}</p>
                    )} */}
                  </div>

                  <div className="btn-holder ion-text-center ion-padding-vertical">
                    <IonButton
                      expand="block"
                      disabled={!isFormValid}
                      onClick={() => handleSubmit()}
                    >
                      Empfehlung mit NALU teilen
                    </IonButton>
                  </div>
                </div>
              </div>
            </div>
          </IonRow>
        </IonGrid>
      </div>
    </IonPage>
  );
};

export default Addrecmodal;
