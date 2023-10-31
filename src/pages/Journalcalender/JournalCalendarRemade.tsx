import {
  IonPage,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonPopover,
  useIonRouter,
  IonToolbar,
  IonLabel,
} from "@ionic/react";
import { menuOutline, notificationsOutline } from "ionicons/icons";
import { useState, useRef, useEffect } from "react";
import newMoon from "../../assets/images/new moon.svg";
import fullMoon from "../../assets/images/full moon.svg";
import menstruation from "../../assets/images/Menstruation.svg";
import cervicalMucus from "../../assets/images/Cervical Mucus.svg";
import pen from "../../assets/images/Pen.svg";
import setting from "../../assets/images/setting.svg";
import { chevronDownOutline, searchOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import NotificationBell from "../../components/NotificationBell";
import { useParams } from "react-router-dom";
import "./journalcalendarremade.scss";
import MoonPhasesServce from "../../MoonPhasesService";
import CustomCategoryApiService from "../../CustomCategoryService";

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

const JournalCalendarRemade = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState();
  const popoverRef = useRef(null);
  const [currentdivInView, setCurrentDivInView] = useState("January");
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeMonthIndex, setActiveMonthIndex] = useState(null);
  const [moonPhaseIcon, setMoonPhaseIcon] = useState([]);
  const [todayPeriod, setTodayPeriod] = useState("false");

  const history = useHistory(); // Use useHistory for navigation

  // const navigation = useIonRouter();
  // const toJounralAddition = () => {};

  const date: Date = new Date();

  const curMonth = new Date().getMonth();
  const isCurDate = new Date().getDate();

  const curDate: string = date.toLocaleDateString();

  console.log("currdate", curDate);
  const curDay: string = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ][date.getDay()];

  const handleOnClick = (dateIndex, monthIndex) => {
    setActiveIndex(dateIndex);
    setActiveMonthIndex(monthIndex);

    const tempMonthIndex = monthIndex + 1 + "";
    const tempDateIndex = dateIndex + "";

    const dateParam = `${year}-${
      +tempMonthIndex < 10 ? "0" + tempMonthIndex : tempMonthIndex
    }-${+tempDateIndex < 10 ? "0" + tempDateIndex : tempDateIndex}`;

    url = `/journaladditionremade/${dateParam}`;

    history.push(url);
  };

  useEffect(() => {
    const isItToday = document.getElementById(curDate);
    if (isItToday) {
      console.log("first");
      setTimeout(() => {
        isItToday.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 1000);
    }
  }, []);

  const getBackgroundColor = (date) => {
    // console.log("date", date);
  };

  const getIcons = async () => {
    try {
      const data = await MoonPhasesServce.get(
        `https://app.mynalu.com/wp-json/nalu-app/v1/moon/${year}`
      );

      console.log("moon data", data);

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
      console.log("moon phases", newArray);
    } catch (error) {
      console.error(error);
    }
  };
  const getIcons2 = async () => {
    let lang = "en";
    let month: any = new Date().getMonth();
    if (parseInt(month) < 10) {
      month = "0" + month;
    }
    let year = new Date().getFullYear();

    let yearMonth = `${year}-${month}`;
    try {
      const data = await MoonPhasesServce.get(
        `https://app.mynalu.com/wp-json/nalu-app/v1/journal-overview/${yearMonth}?lang=${lang}`
      );

      const todayData = data["today"];

      if (todayData) {
        setTodayPeriod(todayData.active_period.toString());

        console.log("Today's data:", todayData);
      } else {
        console.log("No data found for today");
      }

      // setIcons2(data);
      console.log("getIcons 2", data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getIcons();
    getIcons2();
  }, []);

  const handleStartStop = () => {
    let body = {};

    let date: any = new Date().getDate();

    if (parseInt(date) < 10) {
      date = "0" + date;
    }

    let month: any = new Date().getMonth();

    if (parseInt(month) < 10) {
      month = "0" + month;
    }

    let year = new Date().getFullYear();

    let curDate = `${year}-${month}-${date}`;

    console.log("today period", todayPeriod);
    if (todayPeriod == "false") {
      body = {
        entries: [
          {
            key: "period_bleeding",
            value: "3",
          },
        ],
      };
      CustomCategoryApiService.post(
        `https://app.mynalu.com/wp-json/nalu-app/v1/journal/${curDate}`,
        body
      ).then(
        (data) => {
          console.log("data from custom category api", data);
          setTodayPeriod("true");
        },
        (err) => {
          console.log("err sending data", err);
        }
      );
    }
    if (todayPeriod == "true") {
      body = {
        entries: [
          {
            key: "period_bleeding",
            value: "0",
          },
        ],
      };

      CustomCategoryApiService.post(
        `https://app.mynalu.com/wp-json/nalu-app/v1/journal/${curDate}`,
        body
      ).then(
        (data) => {
          console.log("data from custom category api", data);
          setTodayPeriod("false");
        },
        (err) => {
          console.log("err sending data", err);
        }
      );
    }

    // history.push(url);
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleMonthChange = (event: any) => {
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

      // Find the corresponding moon phase name for the current date
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
          id={`${m + 1}/${i}/${year}`}
          className={`calendar-day ${isToday} ${
            activeIndex === i && activeMonthIndex === m ? "dayActive" : ""
          }`}
          onClick={() => handleOnClick(i, m)}
        >
          {moonPhase ? (
            <>
              <div className="moonPhases">
                {moonPhase.phase_name === "Full Moon" ? (
                  <img src={fullMoon} />
                ) : moonPhase.phase_name === "New Moon" ? (
                  <img src={newMoon} />
                ) : // : moonPhase.phase_name === "First Quarter" ? (
                //   <img src={cervicalMucus} />
                // ) : moonPhase.phase_name === "Last Quarter" ? (
                //   <img src={menstruation} />
                // )

                null}
              </div>
              {/* Added "null" for the empty condition */}
              <p>{i}</p>
            </>
          ) : (
            <div>{i}</div>
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

  return (
    <IonPage>
      <IonContent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton color="dark">
              <IonIcon icon={menuOutline} />
            </IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton color="dark">
              <IonIcon icon={searchOutline} />
            </IonButton>
            <IonButton color="dark">
              <NotificationBell />
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <div className="journalcalendar-main">
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
          <IonButton className="period-btn" onClick={handleStartStop}>
            {todayPeriod == "false" ? (
              <IonLabel>Start of Period</IonLabel>
            ) : (
              <IonLabel>Stop of Period</IonLabel>
            )}
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default JournalCalendarRemade;
