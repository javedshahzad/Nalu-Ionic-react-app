import {
  IonButton,
  IonContent,
  IonPage,
  IonPopover,
  useIonRouter,
} from "@ionic/react";
import "./configcycleremade.scss";
import { ChevronDownOutline } from "react-ionicons";
import { useState, useRef, useEffect } from "react";
import newMoon from "../../assets/images/new moon.svg";
import fullMoon from "../../assets/images/full moon.svg";
import classNames from "classnames";
// import routerLink from "@ionic/react-router";

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

function ConfigCycleRemade() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [isCurrentDate, setIsCurrentDate] = useState(new Date().getDate());
  const [currentMonth, setCurrentMonth] = useState();
  const popoverRef = useRef(null);
  const [currentdivInView, setCurrentDivInView] = useState("January");
  const calendarContainer = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeMonthIndex, setActiveMonthIndex] = useState(null);

  // const date = new Date();
  // const month = date.toLocaleString("default", { month: "long" });
  // console.log(month);

  // useEffect(() => {
  //   setCurrentDivInView(month);
  //   let element = document.getElementById(month);

  //   if (element !== null) {
  //     if (month) {
  //       element.scrollIntoView({ behavior: "smooth", block: "center" });
  //     } else {
  //       window.scrollTo({ top: 0, behavior: "smooth" });
  //     }
  //   }
  // });

  const navigation = useIonRouter();
  const toLogin = () => {
    navigation.push("/learnmore");
  };

  const customIconFunc = (dateIndex, mIndex): string => {
    if (dateIndex === 12 && mIndex === 7) {
      return newMoon;
    } else if (dateIndex === 6 && mIndex === 7) {
      return fullMoon;
    } else {
      return "";
    }
  };
  // const addIcons = () => {
  //   const spans = document.querySelectorAll(".day");

  //   console.log("helloooooo: ", spans)
  //   for (const span of spans) {
  //     const fifthSpan = span;
  //     fifthSpan.innerHTML += "sjsj";

  //   }

  //   return spans;
  // };

  const handleOnClick = (dateIndex, monthIndex) => {
    // const newDate = new Date(selectedYear, selectedMonth, date);
    // console.log("date is: ", newDate);
    setActiveIndex(dateIndex);
    setActiveMonthIndex(monthIndex);
    console.log("Clicked:", dateIndex);
    // setActiveIndex(dateIndex);
  };

  const curMonth = new Date(selectedYear, selectedMonth, 0);
  const numberOfDaysInCurMonth = curMonth.getDate();

  const daysInCurMonth = Array.from(
    {
      length: numberOfDaysInCurMonth,
    },
    (_, dateIndex) => dateIndex + 1
  );
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
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    }
  };

  function isSectionVisible(sectionRef) {
    console.log(sectionRef);
    const section = document.getElementById(sectionRef);
    console.log(section);
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
          <div className="calendar" onScroll={() => handleScroll()}>
            <div className="calender-div" ref={calendarContainer}>
              {months.map((month, mIndex) => (
                <div
                  className={`month ${
                    currentdivInView == month ? "fadeIn" : "fadeOut"
                  }`}
                  id={month}
                  key={mIndex}
                >
                  <div className="dateMonth">
                    <p>{month}</p>
                    <p>{selectedYear}</p>
                    <IonButton fill="clear">
                      <ChevronDownOutline
                        color={"#ee5f64;"}
                        height="12px"
                        width="12px"
                        onClick={handleClick}
                      />
                    </IonButton>
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
                  <div className="days">
                    {days.map((day, dayIndex) => (
                      <span key={dayIndex} className="days">
                        {day}
                      </span>
                    ))}
                  </div>
                  <div className="dates">
                    {daysInCurMonth.map((date, dateIndex) => (
                      <span
                        key={dateIndex}
                        className={classNames("day", {
                          active:
                            activeIndex === dateIndex &&
                            activeMonthIndex === mIndex,
                          currentDay:
                            isCurrentDate === date && selectedMonth === mIndex,
                        })}
                        onClick={() => handleOnClick(dateIndex, mIndex)}
                      >
                        {customIconFunc(dateIndex, mIndex) && (
                          <img
                            className="customIcons" // Apply custom styles to control image display
                            src={customIconFunc(dateIndex, mIndex)}
                            alt=""
                          />
                        )}
                        {date}
                      </span>
                    ))}
                  </div>
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
          <IonButton className="continue-btn" disabled={!activeIndex}>
            Continue
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default ConfigCycleRemade;
import {
  IonButton,
  IonContent,
  IonPage,
  IonPopover,
  useIonRouter,
  IonIcon,
} from "@ionic/react";
import "./configcycleremade.scss";
import { useState, useRef } from "react";
import newMoon from "../../assets/images/new moon.svg";
import fullMoon from "../../assets/images/full moon.svg";
import { chevronDownOutline } from "ionicons/icons";

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

function ConfigCycleRemade() {
  const [isOpen, setIsOpen] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState();
  const popoverRef = useRef(null);
  const [currentdivInView, setCurrentDivInView] = useState("January");
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeMonthIndex, setActiveMonthIndex] = useState(null);

  const navigation = useIonRouter();
  const toLogin = () => {
    navigation.push("/learnmore");
  };

  const daysIcon = (dateIndex, mIndex): string => {
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

    for (let i = 1; i <= lastDateOfMonth; i++) {
      const isToday =
        i === new Date().getDate() &&
        m === new Date().getMonth() &&
        year === new Date().getFullYear()
          ? "currentDay"
          : "";
      monthData.push(
        <li
          key={`currentDay-${i}`}
          className={`calendar-day ${isToday} ${
            activeIndex === i && activeMonthIndex === m ? "dayActive" : ""
          }`}
          onClick={() => handleOnClick(i, m)}
        >
          {daysIcon(i, m) && (
            <img
              className="daysIcon" // Apply custom styles to control image display
              src={daysIcon(i, m)}
              alt=""
            />
          )}
          {i}
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
          <IonButton className="continue-btn" disabled={!activeIndex}>
            Continue
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default ConfigCycleRemade;
