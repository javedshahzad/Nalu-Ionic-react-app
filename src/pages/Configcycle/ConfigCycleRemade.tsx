import {
  IonButton,
  IonContent,
  IonPage,
  IonPopover,
  useIonRouter,
  IonIcon,
} from "@ionic/react";
import "./configcycleremade.scss";
import { useState, useRef, useEffect } from "react";
import newMoon from "../../assets/images/new moon.svg";
import fullMoon from "../../assets/images/full moon.svg";
import { chevronDownOutline } from "ionicons/icons";
import CustomCategoryApiService from "../../CustomCategoryService";
import tokenService from "../../token";
import MoonPhasesServce from "../../MoonPhasesService";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
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

  const navigation = useIonRouter();
  const toLogin = () => {
    CustomCategoryApiService.put_2(
      `https://app.mynalu.com/wp-json/nalu-app/v1/no-period`,
      tokenService.getWPToken()
    ).then(
      (data) => {
        navigation.push("/onboarding");
      },
      (err) => {
        console.log("err sending data", err);
      }
    );
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

  const handleOnClick = (dateIndex, monthIndex) => {
    setActiveIndex(dateIndex);
    setActiveMonthIndex(monthIndex);

    const tempMonthIndex = monthIndex + 1 + "";
    const tempDateIndex = dateIndex + "";

    const dateParam = `${year}-${
      +tempMonthIndex < 10 ? "0" + tempMonthIndex : tempMonthIndex
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

  function isSectionVisible(sectionRef) {
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
  };

  function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  const calendarMonths = [];

  for (let m = 0; m < 12; m++) {
    const monthData = [];
    const firstDayOfMonth = new Date(year, m, 1).getDay();
    let lastDateOfMonth = new Date(year, m + 1, 0).getDate();
    const lastDateOfPrevMonth = new Date(year, m, 0).getDate();

    if (m === 1 && isLeapYear(year)) {
      lastDateOfMonth = 29;
    }

    for (const day of days) {
      monthData.push(
        <li key={`day-${day}`} className="calendar-day day-of-week">
          {day}
        </li>
      );
    }

    for (let i = 0; i < firstDayOfMonth; i++) {
      const prevMonthDate = lastDateOfPrevMonth - firstDayOfMonth + i + 1;
      monthData.push(
        <li key={`inactive-${i}`} className="inactive calendar-day">
          {prevMonthDate}
        </li>
      );
    }

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

    for (let i = 1; i <= lastDateOfMonth; i++) {
      const isToday =
        i === new Date().getDate() &&
        m === new Date().getMonth() &&
        year === new Date().getFullYear()
          ? "currentDay"
          : "";
      const moonPhase = moonPhaseIcon.find((item) => {
        return (
          item.date ===
          year +
            "-" +
            (m + 1).toString().padStart(2, "0") +
            "-" +
            i.toString().padStart(2, "0")
        );
      });

      monthData.push(
        <li
          key={`currentDay-${i}`}
          className={`calendar-day ${isToday} ${
            activeIndex === i && activeMonthIndex === m ? "dayActive" : ""
          }`}
          onClick={() => handleOnClick(i, m)}
          id={`${i}/${m + 1}/${year}`}
        >
          {moonPhase ? (
            <>
              <div className="moonPhases">
                {moonPhase.phase_name === "Full Moon" ? (
                  <img src={fullMoon} />
                ) : moonPhase.phase_name === "New Moon" ? (
                  <img src={newMoon} />
                ) : null}
              </div>
              {/* Added "null" for the empty condition */}
              <p>{i}</p>
            </>
          ) : (
            <>{i}</>
          )}
        </li>
      );
    }
    calendarMonths.push(
      <div className="calendar-month" key={`month-${m}`}>
        <div className="cur-month-year">
          <span className="cur-month-year-text">{months[m]}</span>
          <span className="cur-month-year-text">{year}</span>
          <span id="cur-month-year-icon">
            <IonButton fill="clear" onClick={handleClick}>
              <IonIcon icon={chevronDownOutline}></IonIcon>
            </IonButton>
          </span>
          <IonPopover
            isOpen={isOpen}
            onDidDismiss={() => setIsOpen(false)}
            ref={popoverRef}
          >
            <div className="popover-content">
              <h5 className="popoverHeading"> Select Month:</h5>
              <label>
                <select
                  value={currentMonth}
                  onChange={handleMonthChange}
                  className="month-select"
                >
                  {months.map((monthName, optionIndex) => (
                    <option value={monthName} key={optionIndex}>
                      {monthName}
                    </option>
                  ))}
                </select>
              </label>
              <button onClick={handleGo} className="go-button">
                Go
              </button>
            </div>
          </IonPopover>
        </div>
        <ul className="calendar-data">{monthData}</ul>
      </div>
    );
  }

  const goToLearnMore = () => {
    const tempMonthIndex = activeMonthIndex + 1 + "";
    const tempDateIndex = activeIndex + "";

    const dateParam = `${year}-${
      +tempMonthIndex < 10 ? "0" + tempMonthIndex : tempMonthIndex
    }-${+tempDateIndex < 10 ? "0" + tempDateIndex : tempDateIndex}`;

    CustomCategoryApiService.postCall_3(
      `https://app.mynalu.com/wp-json/nalu-app/v1/journal/${dateParam}`,

      tokenService.getToken()
    ).then(
      (data) => {
        console.log("data from custom category api", data);
        navigation.push("/learnmore");
      },
      (err) => {
        console.log("err sending data", err);
      }
    );
  };

  return (
    <IonPage>
      <IonContent>
        <div className="configcycleMain">
          <h1 className="configTextMain">
            Configure your Cycle <br />
            Journal
          </h1>
          <h3 className="configTextSub">
            When was the last of your <br />
            last period?
          </h3>

          <div className="calendar-container" onScroll={() => handleScroll()}>
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
          </div>

          <div className="moon-phases">
            <div className="new-moon">
              <img src={newMoon} alt="" />
              <p className="moon-text">New Moon</p>
            </div>
            <div className="full-moon">
              <img src={fullMoon} alt="" />
              <p className="moon-text">Full Moon</p>
            </div>
          </div>
          <div className="bottom-text">
            <IonButton
              className="configTextBottom"
              onClick={() => toLogin()}
              style={{ cursor: "pointer" }}
              fill="clear"
            >
              I don’t Know/ I never had one
            </IonButton>

            <h3 className="configTextSubBottom">
              If you don’t know or never had a period your cycle will be set to
              the moon phases to introduce you to the cyclical lifestyle.
            </h3>
          </div>
          <IonButton
            className="continue-btn"
            disabled={!activeIndex}
            onClick={goToLearnMore}
          >
            Continue
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default ConfigCycleRemade;
