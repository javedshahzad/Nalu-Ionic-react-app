import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonPopover,
  IonRippleEffect,
  IonRouterLink,
  IonSelect,
  IonSelectOption,
  IonToolbar,
  IonSpinner,
} from "@ionic/react";

import "./Learnmore.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Learnmore: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [dateError, setDateError] = useState('');
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true); // Enable loading when the component mounts or when the effect is triggered again
    axios.get("https://app.mynalu.com/wp-json/nalu-app/v1/everwebinar/2133", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    })
    .then((response) => {
      setEvent(response.data);
      setLoading(false); // Disable loading after the data is fetched
    })
    .catch((error) => {
      console.error("Error fetching event data:", error);
      setLoading(false); // Disable loading if there is an error
    });
  }, []);

  const isFormValid = !!selectedDate && !dateError;
  
  const handleDateChangeWebinar = (event, date_event) => {
    const value = event.target.value;
    setSelectedDate(value);
    setDateError(value.trim() === "" ? "Bitte wähle ein Datum aus, um fortzufahren." : "");
}

  const handleRegistration = () => {
    if (isFormValid) {
        const updatedRegistrationLink = event?.registration_link.replace('{webinar_id}', selectedDate);
        axios.post(updatedRegistrationLink, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
        })
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }
  }

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // Takes full height of the viewport
        }}
      >
        <IonSpinner name="crescent"></IonSpinner>
      </div>
    );
  }

  return (
    <IonPage className="learnmore">
      <IonContent className="ion-padding" fullscreen>
        <div className="title-holder ion-text-center">
          <h3>
          {event?.title}
          </h3>
        </div>
        
        <div className="slider">
          <Swiper
            modules={[Pagination]}
            pagination={true}
            spaceBetween={50}
            slidesPerView={1}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            <SwiperSlide>
              <div className="quote-holder">
                <img src="assets/imgs/quote1.svg" alt="" />
                <div className="inside flex al-center ion-padding-horizontal">
                  <img className="quote2" src="assets/imgs/quote2.svg" alt="" />
                  <h6 className="ion-text-wrap">
                  {event?.slides?.slide1}
                  </h6>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="quote-holder">
                <img src="assets/imgs/quote1.svg" alt="" />
                <div className="inside flex al-center ion-padding-horizontal">
                  <img className="quote2" src="assets/imgs/quote2.svg" alt="" />
                  <h6 className="ion-text-wrap">
                  {event?.slides?.slide2}
                  </h6>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="quote-holder">
                <img src="assets/imgs/quote1.svg" alt="" />
                <div className="inside flex al-center ion-padding-horizontal">
                  <img className="quote2" src="assets/imgs/quote2.svg" alt="" />
                  <h6 className="ion-text-wrap">
                  {event?.slides?.slide3}
                  </h6>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        <div className="webinar">
          <div className="title ion-text-center">
            <h3>Gratis Webinar</h3>
            <h6>Erfahre mehr über die NALU Methode</h6>
          </div>

          <div className="webinar-card">
            <IonItem lines="none">
              <IonAvatar slot="start">
                <img src={event?.event_host?.image} alt="" />
              </IonAvatar>
              <IonLabel>
                <p>Kursleiterin</p>
                <h6>
                  <span>{event?.event_host?.title}</span>
                </h6>
                <p>NALU Co-Gründerin, zert. Coach für Zyklusgesundheit & Medizinethnologin</p>
              </IonLabel>
            </IonItem>

            <h4 className="ion-text-wrap">
              {event?.excerpt}
            </h4>
          </div>

          <div>
            <IonItem lines="none" className="ion-text-left">
              <IonSelect
                className="ion-text-left "
                placeholder={"Datum wählen"}
                cancelText="Abbrechen" // Übersetzung für "Cancel"
                okText="Bestätigen"
                mode="md"
                value={selectedDate}
                onIonChange={(e) => {
                  handleDateChangeWebinar(e, event?.dates?.find(date => date.date === e.target.value))
                }}
              >
                {event?.dates?.map((date, date_index) => (
                  <IonSelectOption
                    key={date_index} value={date.date}>
                    {date.date}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
          </div>
        </div>

        <div className="btn-holder ion-text-center ion-padding-vertical">
          <IonButton expand="block" routerLink="/stayup" onClick={handleRegistration} disabled={!isFormValid}>Jetzt anmelden</IonButton>
        </div>

        <div className="bottom-holder flex al-center jc-center ion-activatable ripple-parent ion-text-center">
        
        <IonRouterLink routerLink="/stayup">
        <h6>Ich habe kein Interesse,</h6>
        <IonRippleEffect></IonRippleEffect>
        <h5>weiter zur App</h5>
        </IonRouterLink>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default Learnmore;
