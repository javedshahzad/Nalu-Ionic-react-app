import {
  IonButton,
  IonContent,
  IonPage,
  IonPopover,
  useIonRouter,
  IonIcon,
  IonSpinner,
  IonDatetime,
  isPlatform,
} from "@ionic/react";
import axios from 'axios';
import { HTTP } from "@awesome-cordova-plugins/http";
import "./configcycleremade.scss";
import { useState, useRef, useEffect } from "react";
import newMoon from "../../assets/images/new moon.svg";
import fullMoon from "../../assets/images/full moon.svg";
import { chevronDownOutline } from "ionicons/icons";
import CustomCategoryApiService from "../../CustomCategoryService";
import MoonPhasesServce from "../../MoonPhasesService";
import { ca } from "@vidstack/react/dist/types/vidstack-react";
import moment from "moment";
import authService from "../../authService";
import { useHistory } from "react-router";

const months = [
  "Januar",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember",
];

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

let url = "";

function ConfigCycleRemade() {
  const [isOpen, setIsOpen] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState();
  const popoverRef = useRef(null);
  const [currentdivInView, setCurrentDivInView] = useState("January");
  const [activeIndex, setActiveIndex] = useState(0);
  const [moonPhaseIcon, setMoonPhaseIcon] = useState([]);
  const [activeMonthIndex, setActiveMonthIndex] = useState(null);
  const [calendarDate, setCalendarDate] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittingToLogin, setIsSubmittingToLogin] = useState(false);
  const history = useHistory()

  const navigation = useIonRouter();

  if (isPlatform("ios")) {
    useEffect(() => {
      HTTP.setDataSerializer('json');
      HTTP.setHeader('*', 'Content-Type', 'application/json');
    }, []);
  }

  const toLogin = async () => {
    setIsSubmittingToLogin(true);

    const jwtToken = localStorage.getItem("jwtToken");
    const headers = {
      Authorization: `Bearer ${jwtToken}`,
    };

    try {
      if (isPlatform("ios")) {
        // Use Cordova HTTP plugin for iOS
        await HTTP.put(
          'https://app.mynalu.com/wp-json/nalu-app/v1/no-period',
          {},
          headers
        );
      } else {
        // Use Axios for other platforms
        await axios.put(
          'https://app.mynalu.com/wp-json/nalu-app/v1/no-period',
          {},
          {
            headers: headers,
          }
        );
      }

      navigation.push("/learnmore");
    } catch (error) {
      if (error) {
        const status = error.status;

        if (status === 401 || status === 403 || status === 404) {
          // Unauthorized, Forbidden, or Not Found
          authService.logout();
          navigation.push("/onboarding");
        }
      }

      console.error(error);
    } finally {
      setIsSubmittingToLogin(false);
    }
  };

  const daysIcon = (dateIndex: any, mIndex: any): string => {
    if (dateIndex === 12 && mIndex === 7) {
      return newMoon;
    } else if (dateIndex === 6 && mIndex === 7) {
      return fullMoon;
    } else {
      return "";
    }
  };

  const handleDateSelect = (event: CustomEvent) => {
    const selectedDate = event.detail.value;
    const formattedDate = moment(selectedDate).format("YYYY-MM-DD");
    setCalendarDate(formattedDate);
    // console.log("selected", calendarDate);
  };

  const handleOnClick = (dateIndex, monthIndex) => {
    setActiveIndex(dateIndex);
    setActiveMonthIndex(monthIndex);

    const tempMonthIndex = monthIndex + 1 + "";
    const tempDateIndex = dateIndex + "";

    const dateParam = `${year}-${+tempMonthIndex < 10 ? "0" + tempMonthIndex : tempMonthIndex
      }-${+tempDateIndex < 10 ? "0" + tempDateIndex : tempDateIndex}`;

    // url = `/journaladditionremade/${dateParam}`;
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleMonthChange = (event) => {
    setCurrentMonth(event.target.value);
  };

  const handleGo = async () => {
    if (popoverRef.current) {
      await popoverRef.current.dismiss();
      let element = document.getElementById(currentMonth);

      if (element !== null) {
        if (currentMonth) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
          }, 500);
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    }
  };

  {/*function isSectionVisible(sectionRef) {
    const section = document.getElementById(sectionRef);

    if (section) {
      const rect = section.getBoundingClientRect();

      if (
        rect.top <= window.innerHeight * 0.4 &&
        rect.bottom >= 0.2 * window.innerHeight
      ) {
        setCurrentDivInView(sectionRef);
        return true;
      }
    }
    return false;
  }

  const handleScroll = () => {
    for (const month of months) {
      isSectionVisible(month);
    }
  };*/}

  function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  const calendarMonths = [];

  for (let m = 0; m < 12; m++) {
    const monthData = [];
    const firstDayOfMonth = new Date(year, m, 1).getDay();
    let lastDateOfMonth = new Date(year, m + 1, 0).getDate();
    const lastDateOfPrevMonth = new Date(year, m, 0).getDate();

    const getIcons = async () => {
      try {
        const data = await MoonPhasesServce.get(
          `https://app.mynalu.com/wp-json/nalu-app/v1/moon/${year}`
        );

        const newArray = [];

        for (const date in data.moonphase) {
          const dateObjects = data.moonphase[date];
          for (const dateObject of dateObjects) {
            const transformedObject = {
              date: date,
              phase_id: dateObject.phase_id,
              phase_name: dateObject.phase_name,
            };
            newArray.push(transformedObject);
          }
        }

        setMoonPhaseIcon(newArray);
      } catch (error) {
        console.error(error);
      }
    };

    useEffect(() => {
      getIcons();
    }, []);

    useEffect(() => {
      const day = new Date().getDate();
      const month = new Date().getMonth();
      const year = new Date().getFullYear();

      const full_date = day + "/" + (month + 1) + "/" + year;

      const isItToday = document.getElementById(full_date);

      if (isItToday) {
        setTimeout(() => {
          isItToday.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 1000);
      }
    }, []);
  }

  const goToLearnMore = async () => {
    const tempMonthIndex = activeMonthIndex + 1 + "";
    const tempDateIndex = activeIndex + "";

    const data = {
      entries: [
        {
          key: "period_bleeding",
          value: "3",
        },
      ],
    };

    const dateParam = `${year}-${+tempMonthIndex < 10 ? "0" + tempMonthIndex : tempMonthIndex
      }-${+tempDateIndex < 10 ? "0" + tempDateIndex : tempDateIndex}`;

    console.log("dateParam", dateParam);
    setIsSubmitting(true);

    try {
      const jwtToken = localStorage.getItem("jwtToken");
      const headers = {
        'Authorization': `Bearer ${jwtToken}`,
      };

      let response;
      if (isPlatform("ios")) {
        // Use Cordova HTTP plugin for iOS
        response = await HTTP.post(
          `https://app.mynalu.com/wp-json/nalu-app/v1/journal/${calendarDate}`,
          data,
          headers
        );
        response.data = JSON.parse(response.data); // Parsing the response data
      } else {
        // Use Axios for other platforms
        response = await axios.post(
          `https://app.mynalu.com/wp-json/nalu-app/v1/journal/${calendarDate}`,
          data,
          {
            headers: headers,
          }
        );
      }

      console.log("data from custom category api", response);
      navigation.push("/learnmore");
    } catch (error) {
      if (error) {
        const status = error.status;

        if (status === 401 || status === 403 || status === 404) {
          // Unauthorized, Forbidden, or Not Found
          authService.logout();
          navigation.push("/onboarding");
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <IonPage className="ConfigCycleRemade">
      <IonContent>
        <div className="configcycleMain">
          <h1 className="configTextMain">
            Konfiguriere dein Zyklusjournal
          </h1>
          <h3 className="configTextSub">
            Wann war der letzte Tag deiner letzten Periode?
          </h3>

          {/* <div className="calendar-container" onScroll={() => handleScroll()}>
            <div className="calendar-scrollable">
              {calendarMonths.map((monthData, mIndex) => (
                <div
                  id={`${months[mIndex]}`}
                  key={monthData.key}
                  className={`calendar-month ${
                    currentdivInView === months[mIndex] ? "fadeIn" : "fadeOut"
                  }`}
                >
                  {monthData}
                </div>
              ))}
            </div>
          </div> */}
          <form>
            <IonDatetime
              presentation="date"
              firstDayOfWeek={1}
              onIonChange={handleDateSelect}
            ></IonDatetime>
          </form>
          {/*<div className="moon-phases">
            <div className="new-moon">
              <img src={newMoon} alt="" />
              <p className="moon-text">Neumond</p>
            </div>
            <div className="full-moon">
              <img src={fullMoon} alt="" />
              <p className="moon-text">Vollmond</p>
            </div>
          </div>*/}
          <div className="bottom-text">
            <IonButton
              className="configTextBottom"
              onClick={toLogin}
              style={{ cursor: "pointer" }}
              fill="clear"
              disabled={isSubmittingToLogin}
            >
              {isSubmittingToLogin ? <IonSpinner name="crescent" /> : "Ich weiss es nicht / Ich hatte nie eine"}
            </IonButton>

            <h3 className="configTextSubBottom">
              Wenn du das Datum deiner letzten Periode nicht kennst oder nie eine hattest, wird dein Zyklus auf die Mondphasen abgestimmt, um dich mit dem zyklischen Lebensstil vertraut zu machen.
            </h3>
          </div>
          <IonButton
            className="continue-btn"
            disabled={!calendarDate || isSubmitting}
            onClick={goToLearnMore}
          >
            {isSubmitting ? <IonSpinner name="crescent" /> : "Weiter"}
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default ConfigCycleRemade;
