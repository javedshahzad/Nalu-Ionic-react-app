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
  happyOutline,
  optionsOutline,
  pencilOutline,
  sadOutline,
  trashBin,
  trashBinOutline,
} from "ionicons/icons";
import pen from "../../assets/images/Pen.svg";
import "./Addcustomcategory.scss";
import { useEffect, useRef, useState } from "react";
import CustomCategoryApiService from "../../CustomCategoryService";
import { OverlayEventDetail } from "@ionic/core";
import tokenService from "../../token";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { journalAction } from "../../actions/journalAction";

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
  const [selectedType, setSelectedType] = useState(null);
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

      const filteredItems = [];
      const encounteredNames = new Set();

      for (const item of data) {
        if (!encounteredNames.has(item.name)) {
          encounteredNames.add(item.name);
          filteredItems.push(item);
        }
      }
      setIcons(filteredItems);

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
    !!selectedLogoValue &&
    !customNameError &&
    !selectedLogoError;

  const handleCustomNameChange = (event) => {
    const value = event.target.value;
    setCustomName(value);
    setcustomNameError(value.trim() === "" ? "Please enter Custom name." : "");
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
    const newCategory: any = {
      label: customName,
      type: selectedType,
      svg: selectedLogoValue,
      icon: selectedLogoValue,
      value: null,
    };

    // get redux state and set in a local array

    newCategory.key = Date.now().toString(32) + Math.random().toString(16);

    typeObj[0].group.map((obj) => {
      if (obj.key === "custom_user_fields") {
        obj.fields.push(newCategory);
      }
    });
    console.log("type ibj", typeObj);
    dispatch(journalAction(typeObj[0]));

    // typeObj.group.custom_user_fields;

    // setCustomCategoryData([...customCategoryData, newCategory]);

    setCustomName("");
    setSelectedLogoValue("");
    setSelectedType("");
    history.back();
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

        <div className="section ion-padding-bottom">
          <div className="title flex al-center jc-between ion-padding-bottom">
            <h3 style={{ fontSize: "15px" }}>Choose Category Type</h3>
          </div>
          <IonRadioGroup
            value={selectedType}
            onIonChange={(event) => handleTypeChange(event, event.target.value)}
          >
            <IonRow>
              <IonCol id="imgg" size="6">
                <IonItem lines="none" className="customType">
                  <IonLabel className="ion-text-center">
                    <IonIcon icon={sadOutline} />
                  </IonLabel>
                  <IonRadio mode="md" value="true_false"></IonRadio>
                </IonItem>
              </IonCol>
              <IonCol id="imgg" size="6">
                <IonItem>
                  <IonLabel className="ion-text-center">
                    <IonRange
                      className="custom-tick ion-no-padding"
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
                      className="custom-tick ion-no-padding"
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
              <div className="tags-holders">
                <IonRow>
                  {icons.map((icon, index) => (
                    <IonCol id="imgg" key={index} size="6">
                      <IonItem lines="none">
                        <IonLabel className="ion-text-center">
                          <IonIcon icon={happyOutline} />
                        </IonLabel>
                        <IonRadio value={icon} mode="md"></IonRadio>
                      </IonItem>
                    </IonCol>
                  ))}
                </IonRow>
              </div>
            </IonRadioGroup>
          )}
          {selectedLogoError && (
            <p className="error-message">{selectedLogoError}</p>
          )}
        </div>

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
