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
import { useState } from "react";

const Learnmore: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [dateError, setDateError] = useState('');

  // const handleDateChange = (event: CustomEvent<any>) => {
  //   setDate(event.detail.value);
  // };
  const isFormValid = !!selectedDate && !dateError;

  const [date, setDate] = useState<string | null>(null);

  const handleDateChange = (event) => {
    const value = event.target.value;
    setSelectedDate(value);
    setDateError(value.trim() === '' ? 'Please select a date to continue.' : '');
  };
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
            <h6>3 Steps to a harmonious cycle</h6>
          </div>

          <div className="webinar-card">
            <IonItem lines="none">
              <IonAvatar slot="start">
                <img src="assets/imgs/user.png" alt="" />
              </IonAvatar>
              <IonLabel>
                <p>Hosted by</p>
                <h6>
                  <span>Lisa Filipe</span>, NALU Co- Founder and Certified.
                </h6>
                <p>Hosted by</p>
              </IonLabel>
            </IonItem>

            <h5 className="ion-text-wrap">
              Der naturliche Weg der NALU Method ohne Kunstliche Hormone oder
              Medikamente - auch wenn deine Menstruation uber lange Zeit
              ausbleibt, Unregelmassig ist oder zu Beschwerden fuhrt.
            </h5>
          </div>

   
        </div>

        {/* <div>
            <IonItem lines="none">
              <IonLabel id="date">
                {date ? (
                  new Date(date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })
                ) : (
                  <span style={{ color: "gray" }}>Select Date</span>
                )}
              </IonLabel >
            
              <IonPopover
                event="date"
                mode="ios"
                translucent={true}
                showBackdrop={true}
                trigger="date"
              >
                <IonContent className="date-popup">
                  <IonDatetime
                    value={date}
                    onIonChange={handleDateChange}
                    presentation="date"
                  ></IonDatetime>
                </IonContent>
              </IonPopover>
            </IonItem>
          </div> */}



        <div className="date-selector">
        <IonItem lines="none" className="ion-text-left">
        <IonSelect className="ion-text-left "  placeholder="Select Date" mode="md"  value={selectedDate}
            onIonChange={handleDateChange}>
          <IonSelectOption value="Tuesday, 22.08.2023, 3 PM">Tuesday, 22.08.2023, 3 PM</IonSelectOption>
          <IonSelectOption value="Wednesday, 24.08.2023, 6 PM">Wednesday, 24.08.2023, 6 PM</IonSelectOption>
          <IonSelectOption value="orange">Friday, 25.08.2023, 8 PM</IonSelectOption>
        </IonSelect>
      </IonItem>

      {dateError && <p className="error-message">{dateError}</p>}
        </div>

        <div className="btn-holder ion-text-center ion-padding-vertical">
          <IonButton expand="block" routerLink="/stayup"  disabled={!isFormValid}>Register</IonButton>
        </div>

        <div className="bottom-holder flex al-center jc-center ion-activatable ripple-parent">
        
        <h6>I'm not interesetd,&nbsp;&nbsp;</h6>
        <IonRippleEffect></IonRippleEffect>
        <h5>Continue the app</h5>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default Learnmore;
