import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonRange,
  IonRow,
  IonSpinner,
  IonTitle,
  IonToolbar,
  isPlatform,
} from "@ionic/react";
import {
  add,
  addOutline,
  closeOutline,
  filterOutline,
  happyOutline,
  optionsOutline,
  pencilOutline,
  sadOutline,
  trashBin,
  trashBinOutline,
} from "ionicons/icons";
import "./Addcustomcategory.scss";
import { useEffect, useRef, useState } from "react";
import CustomCategoryApiService from "../../CustomCategoryService";
import { OverlayEventDetail } from "@ionic/core";
import tokenService from "../../token";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { journalAction } from "../../actions/journalAction";
import axios from "axios";
import { HTTP } from "@awesome-cordova-plugins/http";

const Addcustomcategory: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [journalData, setJournalData] = useState({});

  const typeObj: any = useSelector((state: RootState) => state.journalReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    setJournalData(typeObj);
  }, []);

  const [types, setTypes] = useState([
    "group",
    "number",
    "range-5",
    "range-16",
    "text",
    "textarea",
  ]);
  const [customCategoryData, setCustomCategoryData] = useState([]);
  const [message, setMessage] = useState("");
  const [customName, setCustomName] = useState("");
  const [generalLabel, setGeneralLabel] = useState("");
  const [customNameError, setcustomNameError] = useState("");
  const [generalLabelError, setGeneralLabelError] = useState("");

  const [selectedLogoValue, setSelectedLogoValue] = useState("");
  const [selectedType, setSelectedType] = useState(null);
  const [selectedLogoError, setSelectedLogoError] = useState("");
  const [allFields, setAllFields] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editCategory, setEditCategory] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [fieldId, setFieldId] = useState(null);

  const modal = useRef<HTMLIonModalElement>(null);
  const fieldModal = useRef<HTMLIonModalElement>(null);
  const BASE_URL = process.env.BASE_URL;
  function confirm() {
    const newCategory: any = {
      label: customName,
      type: selectedType,
      icon: selectedLogoValue,
      value: null,
    };

    newCategory.key = Date.now().toString(32) + Math.random().toString(16);

    setCustomCategoryData([...customCategoryData, newCategory]);

    setCustomName("");
    setSelectedLogoValue("");
    setSelectedType("");
    setModalOpen(false);

    modal.current?.dismiss();
  }

  useEffect(() => {}, [customCategoryData]);

  const handleLabelClick = (data) => {
    setSelectedCategory(data);
    setCustomName(data.customName);
    setSelectedLogoValue(data.selectedLogoValue);
    setSelectedType(data.selectedType);
    setModalOpen(true);
    setFieldId(data.key);

    fieldModal.current?.present(); // Open the field modal
  };
  const addNewField = () => {
    setCustomName("");
    setSelectedLogoValue("");
    setSelectedType("");
    setFieldId(null);
    setModalOpen(true);

    fieldModal.current?.present(); // Open the field modal
  };

  function dismissFieldModal() {
    setSelectedCategory(null);
    fieldModal.current?.dismiss();
  }

  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === "confirm") {
      setMessage(`Hello, ${ev.detail.data}!`);
    }
  }

  const isFormValid =
    !!customName &&
    !!selectedLogoValue &&
    !customNameError &&
    !selectedLogoError;

  const handleCustomNameChange = (event) => {
    const value = event.target.value;
    setCustomName(value);
    setcustomNameError(
      value.trim() === ""
        ? "Bitte definiere einen Namen für deine Kategorie."
        : ""
    );
  };

  const handleDeleteField = (id: any) => {
    const updatedCustomCategoryData = customCategoryData.filter(
      (obj) => obj.key !== id
    );
    setCustomCategoryData(updatedCustomCategoryData);
    setFieldId(null);
  };

  const handleUpdateField = (id: any) => {
    const editCategory: any = {
      label: customName,
      type: selectedType,
      icon: selectedLogoValue,
      value: null,
      key: id,
    };

    setFieldId(id);

    // const newArray = [];

    const updatedItems = [...customCategoryData];

    // Find the index of the item you want to replace
    const index = updatedItems.findIndex((item) => item.key === id);

    if (index !== -1) {
      updatedItems[index] = editCategory;
      0;

      setCustomCategoryData(updatedItems);
    }

    setCustomName("");
    setSelectedLogoValue("");
    setSelectedType("");
    setModalOpen(false);

    modal.current?.dismiss();
  };

  const handleLogoChange = (event: any) => {
    const value = event.target.value;

    setSelectedLogoValue(event.detail.value);
  };

  const handleTypeChange = (event: any, clickedType: any) => {
    const value = event.target.value;

    setSelectedType(clickedType);
  };

  const saveCustomCategoryData = async () => {
    setIsSubmitting(true);
    setApiErrorMessage("");

    const jwtToken = localStorage.getItem("jwtToken");
    const data = {
      category_name: customName,
      category_icon: selectedLogoValue,
      type: selectedType,
    };

    try {
      let response;
      if (isPlatform("ios")) {
        // Use Cordova HTTP plugin for iOS
        response = await HTTP.post(
          `BASE_URL/wp-json/nalu-app/v1/add-custom-field`,
          data,
          { Authorization: `Bearer ${jwtToken}` }
        );
        response.data = JSON.parse(response.data);
      } else {
        // Use Axios for other platforms
        response = await axios.post(
          `BASE_URL/wp-json/nalu-app/v1/add-custom-field`,
          data,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
      }

      // If the API call is successful, handle the rest of the logic, such as updating the Redux store
      const newCategory = {
        label: customName,
        type: selectedType,
        svg: selectedLogoValue,
        icon: selectedLogoValue,
        value: null,
        key: Date.now().toString(32) + Math.random().toString(16),
      };

      typeObj[0].map((obj) => {
        if (obj.key === "custom_user_fields") {
          obj.fields.push(newCategory);
        }
      });

      dispatch(journalAction(typeObj[0]));
      setCustomName("");
      setSelectedLogoValue("");
      setSelectedType("");

      setIsSubmitting(false);
      history.back();
      localStorage.setItem("reloadPage", "true");
    } catch (error) {
      setIsSubmitting(false);
      if (error.response?.status === 400) {
        // Specific error message for 400 status
        setApiErrorMessage(
          "Du kannst nur bis zu 5 benutzerdefinierte Kategorien erstellen. Bitte kontaktieren den Support, um Kategorien, die du nicht mehr benötigst, zu löschen."
        );
      } else {
        // Generic error message for other errors
        const errorMessage =
          error.response?.data?.message ||
          "Es ist ein Fehler aufgetreten. Bitte versuche es in einigen Minuten erneut oder kontaktiere den Support.";
        setApiErrorMessage(errorMessage);
      }
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState("");

  return (
    <IonPage className="Addcustomcategory">
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="" color="dark" />
          </IonButtons>
          <IonTitle>Kategorie hinzufügen</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent
        className={`ion-padding ${isPlatform("ios") ? "safe-padding" : ""}`}
        fullscreen
      >
        <div className="section">
          <div className="title flex al-center jc-between ion-padding-bottom">
            <h3>Name</h3>
          </div>
          <div className="the-form up">
            <div className="input-item">
              <IonItem lines="none">
                <IonInput
                  placeholder="Bevorzugter Name eingeben"
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

        <div className="section ion-padding-bottom">
          <div className="title flex al-center jc-between ion-padding-bottom">
            <h3 style={{ fontSize: "15px" }}>Typ</h3>
          </div>
          <IonRadioGroup
            value={selectedType}
            onIonChange={(event) => handleTypeChange(event, event.target.value)}
          >
            <IonRow>
              <IonCol id="imgg" size="6">
                <IonItem>
                  <IonLabel className="ion-text-center">
                    <IonRange
                      className="custom-tick ion-no-padding custom-slider"
                      dualKnobs={false}
                      ticks={true}
                      snaps={true}
                      min={1}
                      max={5}
                    />
                    <IonLabel>1-5</IonLabel>
                  </IonLabel>

                  <IonRadio mode="md" value="range-5"></IonRadio>
                </IonItem>
              </IonCol>

              <IonCol id="imgg" size="6">
                <IonItem>
                  <IonLabel className="ion-text-center">
                    <IonRange
                      className="custom-tick ion-no-padding custom-slider"
                      dualKnobs={false}
                      ticks={true}
                      snaps={true}
                      min={1}
                      max={10}
                    />
                    <IonLabel>1-10</IonLabel>
                  </IonLabel>

                  <IonRadio mode="md" value="range-10"></IonRadio>
                </IonItem>
              </IonCol>
              <IonCol id="imgg" size="6">
                <IonItem lines="none" className="customType">
                  <img
                    src={`${BASE_URL}/wp-content/uploads/2023/10/sample-journal-icon.svg`}
                  />
                  <IonLabel className="ion-text-center">
                    Deine Kategorie
                  </IonLabel>
                  <IonRadio mode="md" value="true_false"></IonRadio>
                </IonItem>
              </IonCol>
            </IonRow>
          </IonRadioGroup>
        </div>
        <div className="section">
          <div className="title flex al-center jc-between ion-padding-bottom">
            <h3 style={{ fontSize: "15px" }}>Icon</h3>
          </div>
          <IonRadioGroup
            value={selectedLogoValue}
            onIonChange={handleLogoChange}
          >
            <div className="tags-holders">
              <IonRow>
                <IonCol id="imgg" size="6">
                  <IonItem lines="none">
                    <IonLabel className="ion-text-center">
                      <img
                        src={`${BASE_URL}/wp-content/uploads/2023/10/sample-journal-icon.svg`}
                      />
                    </IonLabel>
                    <IonRadio
                      value={`${BASE_URL}/wp-content/uploads/2023/10/sample-journal-icon.svg`}
                      mode="md"
                    ></IonRadio>
                  </IonItem>
                </IonCol>

                <IonCol id="imgg" size="6">
                  <IonItem lines="none">
                    <IonLabel className="ion-text-center">
                      <img
                        src={`${BASE_URL}/wp-content/uploads/2023/10/sad.svg`}
                      />
                    </IonLabel>
                    <IonRadio
                      value={`${BASE_URL}/wp-content/uploads/2023/10/sad.svg`}
                      mode="md"
                    ></IonRadio>
                  </IonItem>
                </IonCol>

                <IonCol id="imgg" size="6">
                  <IonItem lines="none">
                    <IonLabel className="ion-text-center">
                      <img
                        src={`${BASE_URL}/wp-content/uploads/oral_contraceptives.svg`}
                      />
                    </IonLabel>
                    <IonRadio
                      value={`${BASE_URL}/wp-content/uploads/oral_contraceptives.svg`}
                      mode="md"
                    ></IonRadio>
                  </IonItem>
                </IonCol>

                <IonCol id="imgg" size="6">
                  <IonItem lines="none">
                    <IonLabel className="ion-text-center">
                      <img
                        src={`${BASE_URL}/wp-content/uploads/perdiod_bleeding.svg`}
                      />
                    </IonLabel>
                    <IonRadio
                      value={`${BASE_URL}/wp-content/uploads/perdiod_bleeding.svg`}
                      mode="md"
                    ></IonRadio>
                  </IonItem>
                </IonCol>
              </IonRow>
            </div>
          </IonRadioGroup>
          {selectedLogoError && (
            <p className="error-message">{selectedLogoError}</p>
          )}
        </div>

        {apiErrorMessage && <p className="error-message">{apiErrorMessage}</p>}

        <div className="btn-holder ion-text-center ion-padding-vertical">
          <IonButton
            expand="block"
            disabled={!isFormValid && customCategoryData.length === 0}
            onClick={saveCustomCategoryData}
          >
            {isSubmitting ? <IonSpinner name="crescent" /> : "Hinzufügen"}
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Addcustomcategory;
