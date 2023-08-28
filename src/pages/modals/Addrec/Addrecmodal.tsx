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
import { useState } from "react";

const Addrecmodal: React.FC<{onClose?: any }> = ({onClose}) => {
  const [selectedCategory, setselectedCategory] = useState('');
  const [categoryError, setcategoryError] = useState('');

  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');

  const [note, setNote] = useState('');

  const isFormValid = !!selectedCategory && !!title && !categoryError && !titleError;

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setselectedCategory(value);
    setcategoryError(value.trim() === '' ? 'Please select a category.' : '');
  };

  const handleTitleChange = (event) => {
    const value = event.target.value;
    setTitle(value);
    setTitleError(value.trim() === '' ? 'Please enter a title.' : '');
  };

  const handleSubmit = () => {
    if (!selectedCategory) {
      setcategoryError('Please select a category.');
    }
    if (!title) {
      setTitleError('Please enter a title.');
    }

    if (isFormValid) {
      // Proceed with sharing recommendation or whatever action you want
      console.log('Recommendation shared successfully!');
    }
  };

  return (
    <IonPage className="Addrecmodal">
      <IonContent className="ion-padding-horizontal" fullscreen>
        <div className="back" onClick={() => {onClose()}}>
          
        </div>
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
                      <IonSelect mode="md"
                        className="ion-text-left"
                        placeholder="Category"
                        value={selectedCategory}
            onIonChange={handleCategoryChange}
                      >
                        <IonSelectOption value="apple">Apple</IonSelectOption>
                        <IonSelectOption value="banana">Banana</IonSelectOption>
                        <IonSelectOption value="orange">Orange</IonSelectOption>
                      </IonSelect>
                    </IonItem>
                    {categoryError && <p className="error-message">{categoryError}</p>}
                  </div>
                  <div className="input-item">
                    <IonItem>
                      <IonInput placeholder="Title" type="text"  value={title} onIonChange={handleTitleChange} />
                    </IonItem>
                    {titleError && <p className="error-message">{titleError}</p>}

                  
                  </div>
                  <div className="input-item">
                    <IonItem>
                      <IonTextarea placeholder="Note" rows={5} value={note} onIonChange={(e) => setNote(e.target.value)}  />
                    </IonItem>
                  </div>

                  <div className="btn-holder ion-text-center ion-padding-vertical">
          <IonButton expand="block" disabled={!isFormValid} >Share Recommendation</IonButton>
        </div>
                </div>
              </div>
            </div>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Addrecmodal;
