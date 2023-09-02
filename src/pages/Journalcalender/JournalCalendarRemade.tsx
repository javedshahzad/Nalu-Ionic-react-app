import {
  IonPage,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonPopover,
  useIonRouter,
} from "@ionic/react";
import { menuOutline, notificationsOutline } from "ionicons/icons";
import { useState, useRef, useEffect } from "react";
import newMoon from "../../assets/images/new moon.svg";
import fullMoon from "../../assets/images/full moon.svg";
import menstruation from "../../assets/images/Menstruation.svg";
import cervicalMucus from "../../assets/images/Cervical Mucus.svg";
import pen from "../../assets/images/Pen.svg";
import setting from "../../assets/images/setting.svg";
import { chevronDownOutline } from "ionicons/icons";

import "./journalcalendarremade.scss";

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

const JournalCalendarRemade = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState();
  const popoverRef = useRef(null);
  const [currentdivInView, setCurrentDivInView] = useState("January");
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeMonthIndex, setActiveMonthIndex] = useState(null);

  const navigation = useIonRouter();
  const toJournalAddition = () => {
    navigation.push("/journaladdition");
  };

  const date: Date = new Date();
  const curDate: string = date.toLocaleDateString();
  const curDay: string = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ][date.getDay()];

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
    toJournalAddition();
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
        <div className="journalcalendar-main">
          <div className="journal-div">
            <IonButtons slot="start">
              <IonButton color="dark">
                <IonIcon icon={menuOutline} />
              </IonButton>
            </IonButtons>
            <IonButtons slot="end">
              <IonButton color="dark">
                <IonIcon icon={notificationsOutline} />
              </IonButton>
            </IonButtons>
          </div>

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
            <div className="full-moon">
              <img src={menstruation} alt="" />
              <p className="moon-text">Menstruation</p>
            </div>
            <div className="full-moon">
              <img src={cervicalMucus} alt="" />
              <p className="moon-text">Cervical Mucus</p>
            </div>
            <div className="new-moon">
              <img src={newMoon} alt="" />
              <p className="moon-text">New Moon</p>
            </div>
            <div className="full-moon">
              <img src={fullMoon} alt="" />
              <p className="moon-text">Full Moon</p>
            </div>
          </div>
          <div className="gratitude-edit">
            <div className="journal-gratitude">
              <h3>
                Intention: <span>Gratitude</span>
              </h3>
            </div>
            <div className="edit-btn">
              <IonButton fill="clear">
                <IonIcon src={pen} />
              </IonButton>
            </div>
          </div>
          <div className="journal-cycle-wrapper">
            <div className="journal-cycle">
              <h3>Cycle Day 5</h3>
              <div className="day-time">
                <span>{curDay},</span>
                <span>{curDate}</span>
              </div>
            </div>
            <IonButton fill="clear">
              <img src={setting} alt="" />
            </IonButton>
          </div>
          <IonButton className="period-btn">End of Period</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default JournalCalendarRemade;
