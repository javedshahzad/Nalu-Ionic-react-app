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

  useEffect(() => {
    axios.get("https://app.mynalu.com/wp-json/nalu-app/v1/everwebinar/2133", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    })
    .then((response) => {
      setEvent(response.data);
    })
    .catch((error) => {
      console.error("Error fetching event data:", error);
    });
  }, []);

  const isFormValid = !!selectedDate && !dateError;
  
  const handleDateChangeWebinar = (event, date_event) => {
    const value = event.target.value;
    setSelectedDate(value);
    setDateError(value.trim() === "" ? "Please select a date to continue." : "");
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
  return (
    <IonPage className="learnmore">
      <IonContent className="ion-padding" fullscreen>
        <div className="title-holder ion-text-center">
          <h3>
            Learn more about <br /> the NALU method
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
                    I have worked on myself a lot with your <br /> program so that
                    after 3.5 years I finally ovulated again and got my cycle
                    back.
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
                    I have worked on myself a lot with your <br /> program so that
                    after 3.5 years I finally ovulated again and got my cycle
                    back.
                  </h6>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
          </Swiper>
        </div>

        <div className="webinar">
          <div className="title">
            <h3>Free Webinar:</h3>
            <h6>{event?.title}</h6>
          </div>

          <div className="webinar-card">
            <IonItem lines="none">
              <IonAvatar slot="start">
                <img src={event?.event_host?.image} alt="" />
              </IonAvatar>
              <IonLabel>
                <p>Hosted by</p>
                <h6>
                  <span>{event?.event_host?.title}</span>{event?.event_host?.description}
                </h6>
              </IonLabel>
            </IonItem>

            <h5 className="ion-text-wrap">
              {event?.excerpt}
            </h5>
          </div>

          <div>
            <IonItem lines="none" className="ion-text-left">
              <IonSelect
                className="ion-text-left "
                placeholder={"Select Date"}
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
          <IonButton expand="block" routerLink="/stayup" onClick={handleRegistration} disabled={!isFormValid}>Register</IonButton>
        </div>

        <div className="bottom-holder flex al-center jc-center ion-activatable ripple-parent">
        
        <IonRouterLink routerLink="/stayup">
        <h6>I'm not interesetd,&nbsp;&nbsp;</h6>
        <IonRippleEffect></IonRippleEffect>
        <h5>Continue the app</h5>
        </IonRouterLink>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default Learnmore;
