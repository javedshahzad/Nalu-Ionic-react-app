import {
  IonPage,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonPopover,
  useIonRouter,
} from "@ionic/react";
import { menuOutline, notificationsOutline } from "ionicons/icons";
import { ChevronDownOutline } from "react-ionicons";
import { useState, useRef, useEffect } from "react";
import newMoon from "../../assets/images/new moon.svg";
import fullMoon from "../../assets/images/full moon.svg";
import menstruation from "../../assets/images/Menstruation.svg";
import cervicalMucus from "../../assets/images/Cervical Mucus.svg";
import pen from "../../assets/images/Pen.svg";
import setting from "../../assets/images/setting.svg";

import classNames from "classnames";
import "./journalcalendarremade.scss";
import MainTabs from "../Tabs/MainTabs";

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
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [isCurrentDate, setIsCurrentDate] = useState(new Date().getDate());
  const [currentMonth, setCurrentMonth] = useState();
  const popoverRef = useRef(null);
  const [currentdivInView, setCurrentDivInView] = useState("January");
  const calendarContainer = useRef(null);
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

  const customIconFunc = (dateIndex, mIndex): string => {
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
    console.log("Clicked:", dateIndex);
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
