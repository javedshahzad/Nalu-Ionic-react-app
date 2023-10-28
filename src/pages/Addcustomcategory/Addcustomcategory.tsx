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
  IonList,
  IonModal,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonRange,
  IonRow,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { add, addOutline, filterOutline, optionsOutline } from "ionicons/icons";

import "./Addcustomcategory.scss";
import { useEffect, useRef, useState } from "react";
import CustomCategoryApiService from "../../CustomCategoryService";
import { OverlayEventDetail } from "@ionic/core";

const Addcustomcategory: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [types, setTypes] = useState([
    "group",
    "number",
    "range-5",
    "range-16",
    "text",
    "textarea",
  ]);
  const [icons, setIcons] = useState([]);
  const [customCategoryData, setCustomCategoryData] = useState([]);
  const [message, setMessage] = useState("");
  const [customName, setCustomName] = useState("");
  const [generalLabel, setGeneralLabel] = useState("");
  const [customNameError, setcustomNameError] = useState("");
  const [generalLabelError, setGeneralLabelError] = useState("");

  // //   const [selectedValue, setSelectedValue] = useState("");
  //   const [selectedValueError, setValueError] = useState("");

  const [selectedLogoValue, setSelectedLogoValue] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedLogoError, setSelectedLogoError] = useState("");
  const [allFields, setAllFields] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const getIcons = async () => {
    try {
      setIsLoading(true);
      const data = await CustomCategoryApiService.get(
        `https://app.mynalu.com/wp-json/nalu-app/v1/custom-field-icon`
      );
      setIcons(data);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    getIcons();
    console.log("icons", icons);
  }, []);

  const modal = useRef<HTMLIonModalElement>(null);
  const fieldModal = useRef<HTMLIonModalElement>(null);

  function confirm() {
    const newCategory = {
      generalLabel,
      customName,
      selectedType,
      selectedLogoValue,
    };

    setCustomCategoryData([...customCategoryData, newCategory]);
    setAllFields([...allFields, ...customCategoryData]);

    setCustomName("");
    // setSelectedValue("");
    setSelectedLogoValue("");
    setSelectedType("");
    setGeneralLabel("");

    modal.current?.dismiss();
  }

  const CategoryLabel = ({ label, data, onLabelClick }) => {
    return (
      <div className="Addcustomcategory">
        <IonItem lines="none" onClick={() => onLabelClick(data)}>
          {label}
        </IonItem>
      </div>
    );
  };
  const handleLabelClick = (data) => {
    setSelectedCategory(data);
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
    // !!selectedValue &&
    !!selectedLogoValue &&
    !customNameError &&
    // !selectedValueError &&
    !selectedLogoError;

  const handleCustomNameChange = (event) => {
    const value = event.target.value;
    setCustomName(value);
    setcustomNameError(value.trim() === "" ? "Please enter Custom name." : "");
  };
  const handleGeneralLabelChange = (event) => {
    const value = event.target.value;
    setGeneralLabel(value);
    setGeneralLabelError(
      value.trim() === "" ? "Please enter Custom name." : ""
    );
  };

  //   const handleRadioChange = (event) => {
  //     // setSelectedValue(event.detail.value);
  //     const value = event.target.value;
  //     // setValueError(value.trim() === "" ? "Please select a category." : "");
  //   };

  const handleLogoChange = (event: any) => {
    const value = event.target.value;
    setSelectedLogoValue(event.detail.value);
    setSelectedLogoError(value.trim() === "" ? "Please select a Logo." : "");
  };

  const handleTypeChange = (event: any, clickedType: any) => {
    const value = event.target.value;
    // setSelectedType(event.detail.value);
    setSelectedType(clickedType);
    setSelectedLogoError(value.trim() === "" ? "Please select a Logo." : "");
  };

  //   useEffect(() => {
  //     console.log("Selected Type changed:", selectedType);
  //   }, [selectedType]);

  return (
    <IonPage className="Addcustomcategory">
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="" color="dark" />
          </IonButtons>
          <IonTitle>Add Custom Category</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <div className="section">
          <div className="title flex al-center jc-between ion-padding-bottom">
            <h3>Add General Label</h3>
          </div>
          <div className="the-form up">
            <div className="input-item">
              <IonItem lines="none">
                <IonInput
                  placeholder="Input Text"
                  value={generalLabel}
                  onIonFocus={handleGeneralLabelChange}
                  onIonInput={handleGeneralLabelChange}
                />
              </IonItem>

              {customNameError && (
                <p className="error-message">{customNameError}</p>
              )}
            </div>
          </div>
        </div>

        <IonButtons>
          <IonButton id="open-modal" expand="block">
            <IonLabel>Add field</IonLabel>
            <IonIcon icon={addOutline} />
          </IonButton>
        </IonButtons>

        <div>
          {allFields.map((data, index) => (
            <CategoryLabel
              key={index}
              label={data.generalLabel}
              data={data}
              onLabelClick={handleLabelClick}
            />
          ))}

          <IonModal
            id="example-modal"
            ref={fieldModal}
            trigger="open-custom-dialog"
          >
            <div className="wrapper">
              {customCategoryData.map((data, index) => (
                <>
                  <h1>{data.customName}</h1>
                  <IonList lines="none">
                    <IonItem>
                      <IonLabel>{data.selectedType}</IonLabel>
                    </IonItem>
                  </IonList>
                </>
              ))}
            </div>
          </IonModal>
        </div>

        <IonModal
          ref={modal}
          trigger="open-modal"
          onWillDismiss={(ev) => onWillDismiss(ev)}
          className="Addcustomcategory"
        >
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => modal.current?.dismiss()}>
                  Cancel
                </IonButton>
              </IonButtons>
              <IonTitle>Add Field</IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={() => confirm()}>
                  Confirm
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <div className="section ion-padding-bottom">
              <div className="title flex al-center jc-between ion-padding-bottom">
                <h3 style={{ fontSize: "15px" }}>Add General Label</h3>
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
            <div className="section ion-padding-bottom">
              <div className="title flex al-center jc-between ion-padding-bottom">
                <h3 style={{ fontSize: "15px" }}>Choose Category Type</h3>
              </div>
              <IonRadioGroup
                value={selectedType}
                onIonChange={(event) =>
                  handleTypeChange(event, event.target.value)
                }
              >
                <IonRow>
                  {types.map((type) => (
                    <IonCol id="imgg" key={type}>
                      <IonItem lines="none">
                        <IonLabel className="ion-text-center">{type}</IonLabel>
                        <IonRadio value={type} mode="md"></IonRadio>
                      </IonItem>
                    </IonCol>
                  ))}
                </IonRow>
              </IonRadioGroup>
            </div>
            <div className="section">
              <div className="title flex al-center jc-between ion-padding-bottom">
                <h3 style={{ fontSize: "15px" }}>Choose a Logo</h3>
              </div>
              {isLoading ? (
                <IonRow>
                  <IonCol size="1">
                    <IonItem lines="none">
                      <IonSpinner name="crescent"></IonSpinner>
                    </IonItem>
                  </IonCol>
                </IonRow>
              ) : (
                <IonRadioGroup
                  value={selectedLogoValue}
                  onIonChange={handleLogoChange}
                >
                  <IonRow>
                    {icons.map((icon, index) => (
                      <IonCol id="imgg" key={index}>
                        <IonItem lines="none">
                          <IonLabel className="ion-text-center">
                            <img src={icon} alt={`Icon ${index}`} height={20} />
                          </IonLabel>
                          <IonRadio value={`logo${index}`} mode="md"></IonRadio>
                        </IonItem>
                      </IonCol>
                    ))}
                  </IonRow>
                </IonRadioGroup>
              )}
              {selectedLogoError && (
                <p className="error-message">{selectedLogoError}</p>
              )}
            </div>
          </IonContent>
        </IonModal>

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
