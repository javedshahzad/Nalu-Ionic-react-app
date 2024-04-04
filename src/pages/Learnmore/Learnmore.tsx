import axios from "axios";
import { HTTP } from "@awesome-cordova-plugins/http";
import { useEffect, useState } from "react";
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
  isPlatform,
} from "@ionic/react";

import "./Learnmore.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import authService from "../../authService";
import { useHistory } from "react-router";

const Learnmore: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [dateError, setDateError] = useState("");
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedScheduleId, setSelectedScheduleId] = useState(null);
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    const selectedGoal = localStorage.getItem("selectedGoal");

    let url = "https://app.mynalu.com/wp-json/nalu-app/v1/everwebinar/2095";
    if (selectedGoal === "endometriosis") {
      url = "https://app.mynalu.com/wp-json/nalu-app/v1/everwebinar/7967";
    } else if (selectedGoal === "amenorrhea") {
      url = "https://app.mynalu.com/wp-json/nalu-app/v1/everwebinar/7966";
    } else if (selectedGoal === "harmony") {
      url = "https://app.mynalu.com/wp-json/nalu-app/v1/everwebinar/2095";
    }

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    };

    const fetchData = async () => {
      try {
        let response;
        if (isPlatform("ios")) {
          const cordovaResponse = await HTTP.get(url, {}, headers);
          response = JSON.parse(cordovaResponse.data);
        } else {
          const axiosResponse = await axios.get(url, { headers });
          response = axiosResponse.data;
        }
        setEvent(response);
      } catch (error) {
        if (isPlatform("ios")) {
          if (error) {
            const status = error.status;

            if (status === 401 || status === 403 || status === 404) {
              // Unauthorized, Forbidden, or Not Found
              authService.logout();
              history.push("/onboarding");
            }
          }
        } else {
          if (error.response) {
            const status = error.response.status;

            if (status === 401 || status === 403 || status === 404) {
              // Unauthorized, Forbidden, or Not Found
              authService.logout();
              history.push("/onboarding");
            }
          }
        }
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const isFormValid = !!selectedDate && !dateError;

  const handleDateChangeWebinar = (e) => {
    const selectedDateString = e.target.value;
    setSelectedDate(selectedDateString);

    // Find the corresponding date object in event.dates and set the schedule ID
    const selectedDateObj = event?.dates?.find(
      (dateObj) => dateObj.date === selectedDateString
    );
    if (selectedDateObj) {
      setSelectedScheduleId(selectedDateObj.schedule_id);
    } else {
      setSelectedScheduleId(null); // Reset schedule ID if no match is found
    }

    setDateError(
      selectedDateString.trim() === ""
        ? "Bitte wähle ein Datum aus, um fortzufahren."
        : ""
    );
  };

  const handleRegistration = async () => {
    if (isFormValid && selectedScheduleId) {
      const updatedRegistrationLink = event?.registration_link.replace(
        "{schedule_id}",
        selectedScheduleId
      );

      const headers = {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      };

      try {
        let response;
        if (isPlatform("ios")) {
          const cordovaResponse = await HTTP.post(
            updatedRegistrationLink,
            {},
            headers
          );
          response = JSON.parse(cordovaResponse.data);
        } else {
          const axiosResponse = await axios.post(
            updatedRegistrationLink,
            {},
            { headers }
          );
          response = axiosResponse.data;
        }

        // Handle successful registration (e.g., navigate to a success page or show a message)
      } catch (error) {
        if (isPlatform("ios")) {
          if (error) {
            const status = error.status;

            if (status === 401 || status === 403 || status === 404) {
              // Unauthorized, Forbidden, or Not Found
              authService.logout();
              history.push("/onboarding");
            }
          }
        } else {
          if (error.response) {
            const status = error.response.status;

            if (status === 401 || status === 403 || status === 404) {
              // Unauthorized, Forbidden, or Not Found
              authService.logout();
              history.push("/onboarding");
            }
          }
        }
        console.error(error);
        // Handle errors (e.g., show an error message)
      }
    } else {
      // Handle form invalid or no schedule_id selected (e.g., show a message to the user)
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // Takes full height of the viewport
          backgroundColor: "#F8F5F2",
        }}
      >
        <IonSpinner name="crescent"></IonSpinner>
      </div>
    );
  }

  return (
    <IonPage className="learnmore">
      <IonContent
        className={`ion-padding ${isPlatform("ios") ? "safe-padding" : ""}`}
        fullscreen
      >
        <div className="title-holder ion-text-center">
          <h3>{event?.title}</h3>
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
                  <h6 className="ion-text-wrap">{event?.slides?.slide1}</h6>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="quote-holder">
                <img src="assets/imgs/quote1.svg" alt="" />
                <div className="inside flex al-center ion-padding-horizontal">
                  <img className="quote2" src="assets/imgs/quote2.svg" alt="" />
                  <h6 className="ion-text-wrap">{event?.slides?.slide2}</h6>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="quote-holder">
                <img src="assets/imgs/quote1.svg" alt="" />
                <div className="inside flex al-center ion-padding-horizontal">
                  <img className="quote2" src="assets/imgs/quote2.svg" alt="" />
                  <h6 className="ion-text-wrap">{event?.slides?.slide3}</h6>
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
                <p>
                  NALU Co-Gründerin, zert. Coach für Zyklusgesundheit &
                  Medizinethnologin
                </p>
              </IonLabel>
            </IonItem>

            <h4 className="ion-text-wrap">{event?.excerpt}</h4>
          </div>

          <div>
            <IonItem lines="none" className="ion-text-left">
              <IonSelect
                className="ion-text-left "
                placeholder={"Datum wählen"}
                cancelText="Abbrechen"
                okText="Bestätigen"
                mode="md"
                value={selectedDate}
                onIonChange={handleDateChangeWebinar}
              >
                {event?.dates?.map((date, date_index) => (
                  <IonSelectOption key={date_index} value={date.date}>
                    {date.date}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
          </div>
        </div>

        <div className="btn-holder ion-text-center ion-padding-vertical">
          <IonButton
            expand="block"
            routerLink="/stayup"
            onClick={handleRegistration}
            disabled={!isFormValid}
          >
            Jetzt anmelden
          </IonButton>
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
