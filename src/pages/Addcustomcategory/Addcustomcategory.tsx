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
import {
  add,
  addOutline,
  closeOutline,
  filterOutline,
  optionsOutline,
  pencilOutline,
  trashBin,
  trashBinOutline,
} from "ionicons/icons";
import pen from "../../assets/images/Pen.svg";
import "./Addcustomcategory.scss";
import { useEffect, useRef, useState } from "react";
import CustomCategoryApiService from "../../CustomCategoryService";
import { OverlayEventDetail } from "@ionic/core";
import tokenService from "../../token";

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
  const [categoryIcon, setCategoryIcon] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedLogoError, setSelectedLogoError] = useState("");
  const [allFields, setAllFields] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editCategory, setEditCategory] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [fieldId, setFieldId] = useState(null);

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
  }, []);

  const modal = useRef<HTMLIonModalElement>(null);
  const fieldModal = useRef<HTMLIonModalElement>(null);

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
  const handleCategoryIcon = (event: any) => {
    const value = event.target.value;
    setCategoryIcon(event.detail.value);
  };

  const handleTypeChange = (event: any, clickedType: any) => {
    const value = event.target.value;
    setSelectedType(clickedType);
  };

  const saveCustomCategoryData = () => {
    const body = {
      key: "custom_user_fields",
      label: generalLabel,
      type: "group",
      fields: customCategoryData,
    };

    CustomCategoryApiService.post(
      `https://app.mynalu.com/wp-json/nalu-app/v1/add-custom-field?category\_name=${generalLabel}&category_icon=${categoryIcon}&type="group"`,
      body,
      tokenService.getWPToken()
    ).then(
      (data) => {
        console.log("data from custom category api", data);
      },
      (err) => {
        console.log("err sending data", err);
      }
    );
  };

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
        <div className="section ion-padding-bottom">
          <div className="title flex al-center jc-between ion-padding-bottom">
            <h3 style={{ fontSize: "15px" }}>Category Icon</h3>
          </div>
          <IonRadioGroup value={categoryIcon} onIonChange={handleCategoryIcon}>
            <IonRow>
              {icons.map((icon, index) => (
                <IonCol id="imgg" key={index}>
                  <IonItem lines="none">
                    <IonLabel className="ion-text-center">
                      <img src={icon} alt={`Icon ${index}`} height={20} />
                    </IonLabel>
                    <IonRadio value={icon} mode="md"></IonRadio>
                  </IonItem>
                </IonCol>
              ))}
            </IonRow>
          </IonRadioGroup>
        </div>
        <IonButtons>
          <IonButton id="open-modal" expand="block" onClick={addNewField}>
            <IonLabel>Add field</IonLabel>
            <IonIcon icon={addOutline} />
          </IonButton>
        </IonButtons>

        <div>
          {customCategoryData.map((data, index) => (
            <>
              <ul style={{ padding: "0px" }}>
                <li className="custom-category">
                  <span style={{ width: "70%" }}>{data.label}</span>
                  <div
                    style={{
                      width: "30%",
                      display: "flex",
                      justifyContent: "end",
                    }}
                  >
                    <button
                      style={{
                        backgroundColor: "transparent",
                        marginRight: "5px",
                      }}
                      id="open-modal"
                      onClick={() => handleLabelClick(data)}
                      type="button"
                    >
                      <img src={pen} />
                    </button>
                    <button
                      style={{
                        backgroundColor: "transparent",
                      }}
                      onClick={() => handleDeleteField(data.key)}
                      type="button"
                    >
                      <IonIcon icon={trashBin} style={{ color: "#f06f74" }} />
                    </button>
                  </div>
                </li>
              </ul>
            </>
          ))}
        </div>

        <IonModal
          ref={modal}
          className="Addcustomcategory"
          isOpen={modalOpen}
          backdropDismiss={false}
        >
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton
                  onClick={() => {
                    setModalOpen(false);
                    setFieldId(null);
                  }}
                >
                  Cancel
                </IonButton>
              </IonButtons>
              <IonTitle>Add Field</IonTitle>

              <IonButtons slot="end">
                {fieldId == null ? (
                  <>
                    <IonButton strong={true} onClick={() => confirm()}>
                      Confirm
                    </IonButton>
                  </>
                ) : (
                  <>
                    <IonButton
                      strong={true}
                      onClick={() => handleUpdateField(fieldId)}
                    >
                      Save
                    </IonButton>
                  </>
                )}
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
                          <IonRadio value={icon} mode="md"></IonRadio>
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
          <IonButton
            expand="block"
            disabled={!isFormValid && customCategoryData.length === 0}
            onClick={saveCustomCategoryData}
          >
            Save
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Addcustomcategory;
