import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCheckbox,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonModal,
  IonPage,
  IonRange,
  IonRow,
  IonSearchbar,
  IonTextarea,
  IonToolbar,
  isPlatform,
} from "@ionic/react";
import { add, filterOutline, optionsOutline } from "ionicons/icons";

import "./Journaladdition.scss";
import { useState } from "react";
import Additionfilter from "../modals/Additionfilter/Additionfilter";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Journaladdition: React.FC = () => {
  const tickValues = [1, 2, 3, 4, 5]; // Custom tick values
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const [intentionItems, setIntentionItems] = useState([
    { label: "Gratitude", icon: "it1.svg", active: false },
    { label: "Self love", icon: "it2.svg", active: false },
    { label: "Creativity", icon: "it3.svg", active: false },
    { label: "Letting go", icon: "it4.svg", active: false },
    { label: "Intuition", icon: "it5.svg", active: false },
    { label: "Forgive", icon: "it6.svg", active: false },
    { label: "Rest", icon: "it7.svg", active: false },
    { label: "Emotions", icon: "it8.svg", active: false },
    { label: "Trust", icon: "it9.svg", active: false },
    { label: "Recieve", icon: "it10.svg", active: false },
    { label: "Add", icon: "it11.svg", active: false },
  ]);

  const [symptomItems, setSymptomItems] = useState([
    { label: "Happy", icon: "sm1.svg", active: false },
    { label: "Sad", icon: "sm2.svg", active: false },
    { label: "Angry", icon: "sm3.svg", active: false },
    { label: "Pain", icon: "sm4.svg", active: false },
    { label: "Cry", icon: "sm5.svg", active: false },
    { label: "Disturb", icon: "sm6.svg", active: false },
    { label: "Restless", icon: "sm7.svg", active: false },
  ]);
  const [exerciseItems, setexerciseItems] = useState([
    { label: "Happy", icon: "sm1.svg", active: false, colSize: "4" },
    { label: "Sad", icon: "sm2.svg", active: false, colSize: "4" },
    { label: "Angry", icon: "sm3.svg", active: false, colSize: "4" },
    { label: "Pain", icon: "sm4.svg", active: false, colSize: "4" },
    { label: "Cry", icon: "sm5.svg", active: false, colSize: "4" },
    { label: "Disturb", icon: "sm6.svg", active: false, colSize: "4" },
    { label: "Restless", icon: "sm7.svg", active: false, colSize: "5" },
  ]);

  const toggleIntentionItemsActive = (index) => {
    const updatedItems = intentionItems.map((item, i) => {
      if (i === index) {
        return { ...item, active: !item.active };
      }
      return item;
    });
    setIntentionItems(updatedItems);
  };

  const togglesymptomItemsActive = (index) => {
    const updatedItems = symptomItems.map((item, i) => {
      if (i === index) {
        return { ...item, active: !item.active };
      }
      return item;
    });
    setSymptomItems(updatedItems);
  };
  const toggleexerciseItemsActive = (index) => {
    const updatedItems = exerciseItems.map((item, i) => {
      if (i === index) {
        return { ...item, active: !item.active };
      }
      return item;
    });
    setexerciseItems(updatedItems);
  };

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date();
  const startingDate = 20; // Starting date of the month
  const [weekOffset, setWeekOffset] = useState(0); // Week offset state

  return (
    <IonPage className="Journaladdition">
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" text="" color="dark" />
          </IonButtons>

          <IonButtons slot="end">
            <IonButton color="dark" onClick={() => setModalOpen(true)}>
              <IonIcon icon={optionsOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent
        className={`ion-padding-horizontal ${
          isPlatform("ios") ? "safe-padding" : ""
        }`}
        fullscreen
      >
        <div>
          <Swiper
            freeMode={true}
            pagination={true}
            centeredSlides={false}
            slidesPerView={7}
            onSlideChange={(swiper) => {
              setWeekOffset(swiper.activeIndex); // Update week offset based on active slide
            }}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {daysOfWeek.map((day, index) => {
              const currentDate = new Date(
                today.getFullYear(),
                today.getMonth(),
                startingDate + index + weekOffset * 7
              );
              const numericDate = currentDate.getDate();

              return (
                <SwiperSlide key={index}>
                  <div className="date ion-text-center">
                    <h4>{day}</h4>
                    <h2>{numericDate}</h2>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        <IonModal
          isOpen={modalOpen}
          className="modaaal"
          onDidDismiss={handleModalClose}
        >
          <Additionfilter onClose={() => setModalOpen(false)} />
        </IonModal>
        <div className="search-holder">
          <IonItem lines="none">
            <IonSearchbar></IonSearchbar>
            <IonButton slot="end" fill="clear" color="dark">
              <IonIcon icon={filterOutline} />
            </IonButton>
          </IonItem>
        </div>

        <div className="section">
          <div className="title flex al-center jc-between">
            <h3>Intention</h3>
            <IonButton fill="clear">
              <IonIcon src="assets/imgs/Pen.svg" />
            </IonButton>
          </div>
          <div className="tags-holder">
            <IonRow>
              {intentionItems.map((item, index) => (
                <IonCol size="4" key={index}>
                  <IonItem lines="none">
                    <IonIcon
                      slot="start"
                      src={
                        item.active
                          ? `assets/imgs/${item.icon.replace(
                              ".svg",
                              "active.svg"
                            )}`
                          : `assets/imgs/${item.icon}`
                      }
                    />
                    <IonLabel>{item.label}</IonLabel>
                    <IonCheckbox
                      checked={item.active}
                      onIonChange={() => toggleIntentionItemsActive(index)}
                    />
                  </IonItem>
                </IonCol>
              ))}
            </IonRow>
          </div>
        </div>

        <div className="section">
          <div className="title flex al-center jc-between">
            <h3>Symptoms</h3>
            <IonButton fill="clear">
              <IonIcon src="assets/imgs/Pen.svg" />
            </IonButton>
          </div>
          <div className="tags-holder">
            <IonRow>
              {symptomItems.map((item, index) => (
                <IonCol size="4" key={index}>
                  <IonItem lines="none">
                    <IonIcon
                      slot="start"
                      src={
                        item.active
                          ? `assets/imgs/${item.icon.replace(
                              ".svg",
                              "active.svg"
                            )}`
                          : `assets/imgs/${item.icon}`
                      }
                    />
                    <IonLabel>{item.label}</IonLabel>
                    <IonCheckbox
                      checked={item.active}
                      onIonChange={() => togglesymptomItemsActive(index)}
                    />
                  </IonItem>
                </IonCol>
              ))}
            </IonRow>
          </div>
        </div>

        <div className="section">
          <div className="title flex al-center jc-between">
            <h3>Pain</h3>
            <IonButton fill="clear">
              <IonIcon src="assets/imgs/Pen.svg" />
            </IonButton>
          </div>

          <div className="range-holder">
            <IonRow>
              <IonCol size="3.5" class="flex al-center">
                <div className="start-slot flex al-center">
                  <img src="assets/imgs/p1.svg" alt="" />
                  <h3>Head</h3>
                </div>
              </IonCol>
              <IonCol size="8.5">
                <IonRange
                  className="custom-tick"
                  aria-label="Dual Knobs Range"
                  dualKnobs={false}
                  ticks={true}
                  snaps={true}
                  min={1}
                  max={5}
                  value={3}
                  pin={true}
                  pinFormatter={(value: number) => `${value}`}
                ></IonRange>
                <div className="tick-labels">
                  {tickValues.map((tickValue) => (
                    <div key={tickValue} className="tick-label">
                      {tickValue}
                    </div>
                  ))}
                </div>
              </IonCol>
            </IonRow>
          </div>
          <div className="range-holder">
            <IonRow>
              <IonCol size="3.5" class="flex al-center">
                <div className="start-slot flex al-center">
                  <img src="assets/imgs/p2.svg" alt="" />
                  <h3>Hand</h3>
                </div>
              </IonCol>
              <IonCol size="8.5">
                <IonRange
                  className="custom-tick"
                  aria-label="Dual Knobs Range"
                  dualKnobs={false}
                  ticks={true}
                  snaps={true}
                  min={1}
                  max={5}
                  value={4}
                  pin={true}
                  pinFormatter={(value: number) => `${value}`}
                ></IonRange>
                <div className="tick-labels">
                  {tickValues.map((tickValue) => (
                    <div key={tickValue} className="tick-label">
                      {tickValue}
                    </div>
                  ))}
                </div>
              </IonCol>
            </IonRow>
          </div>
          <div className="range-holder">
            <IonRow>
              <IonCol size="3.5" class="flex al-center">
                <div className="start-slot flex al-center">
                  <img src="assets/imgs/p3.svg" alt="" />
                  <h3>Abdomen</h3>
                </div>
              </IonCol>
              <IonCol size="8.5">
                <IonRange
                  className="custom-tick"
                  aria-label="Dual Knobs Range"
                  dualKnobs={false}
                  ticks={true}
                  snaps={true}
                  min={1}
                  max={5}
                  value={3}
                  pin={true}
                  pinFormatter={(value: number) => `${value}`}
                ></IonRange>
                <div className="tick-labels">
                  {tickValues.map((tickValue) => (
                    <div key={tickValue} className="tick-label">
                      {tickValue}
                    </div>
                  ))}
                </div>
              </IonCol>
            </IonRow>
          </div>
          <div className="range-holder">
            <IonRow>
              <IonCol size="3.5" class="flex al-center">
                <div className="start-slot flex al-center">
                  <img src="assets/imgs/p4.svg" alt="" />
                  <h3>Knee</h3>
                </div>
              </IonCol>
              <IonCol size="8.5">
                <IonRange
                  className="custom-tick"
                  aria-label="Dual Knobs Range"
                  dualKnobs={false}
                  ticks={true}
                  snaps={true}
                  min={1}
                  max={5}
                  value={2}
                  pin={true}
                  pinFormatter={(value: number) => `${value}`}
                ></IonRange>
                <div className="tick-labels">
                  {tickValues.map((tickValue) => (
                    <div key={tickValue} className="tick-label">
                      {tickValue}
                    </div>
                  ))}
                </div>
              </IonCol>
            </IonRow>
          </div>
        </div>

        <div className="section">
          <div className="title flex al-center jc-between">
            <h3>Exercise</h3>
            <IonButton fill="clear">
              <IonIcon src="assets/imgs/Pen.svg" />
            </IonButton>
          </div>
          <div className="ex-tags-holder">
            <IonRow>
              {exerciseItems.map((item, index) => (
                <IonCol size={item.colSize} key={index}>
                  <IonItem lines="none">
                    <IonIcon
                      slot="start"
                      src={
                        item.active
                          ? `assets/imgs/${item.icon.replace(
                              ".svg",
                              "active.svg"
                            )}`
                          : `assets/imgs/${item.icon}`
                      }
                    />
                    <IonLabel>{item.label}</IonLabel>
                    <IonCheckbox
                      mode="md"
                      checked={item.active}
                      onIonChange={() => toggleexerciseItemsActive(index)}
                    />
                  </IonItem>
                </IonCol>
              ))}
            </IonRow>
          </div>
        </div>

        <div className="section">
          <div className="title flex al-center jc-between">
            <h3>Custom</h3>
            <IonButton fill="clear">
              <IonIcon src="assets/imgs/Pen.svg" />
            </IonButton>
          </div>
          <div className="tags-holder">
            <IonRow>
              <IonCol size="4">
                <IonItem lines="none">
                  <IonIcon slot="start" src="assets/imgs/sm1.svg" />
                  <IonLabel>Happy</IonLabel>
                  <IonCheckbox></IonCheckbox>
                </IonItem>
              </IonCol>
              <IonCol size="4.5">
                <IonItem lines="none">
                  <IonIcon slot="start" src="assets/imgs/sm2.svg" />
                  <IonLabel>Nervousness</IonLabel>
                  <IonCheckbox></IonCheckbox>
                </IonItem>
              </IonCol>
            </IonRow>
          </div>
          <div className="range-holder">
            <IonRow>
              <IonCol size="3.5" class="flex al-center">
                <div className="start-slot flex al-center">
                  <img src="assets/imgs/p3.svg" alt="" />
                  <h3>Abdomen</h3>
                </div>
              </IonCol>
              <IonCol size="8.5">
                <IonRange
                  className="custom-tick"
                  aria-label="Dual Knobs Range"
                  dualKnobs={false}
                  ticks={true}
                  snaps={true}
                  min={1}
                  max={5}
                  value={3}
                  pin={true}
                  pinFormatter={(value: number) => `${value}`}
                ></IonRange>
                <div className="tick-labels">
                  {tickValues.map((tickValue) => (
                    <div key={tickValue} className="tick-label">
                      {tickValue}
                    </div>
                  ))}
                </div>
              </IonCol>
            </IonRow>
          </div>
        </div>

        <div className="add-custom-category ion-text-center ion-padding-top">
          <IonButton>
            <IonIcon icon={add} />
          </IonButton>
          <h4>Add Custom Category</h4>
        </div>
        <div className="section last">
          <div className="title">
            <h3>How I feel today</h3>
          </div>

          <div className="the-form">
            <div className="input-item">
              <IonItem lines="none">
                <IonTextarea placeholder="Input Text" />
              </IonItem>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Journaladdition;
