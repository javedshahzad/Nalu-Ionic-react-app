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
  useIonViewWillEnter,
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
import authService from "../../authService";

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

const days = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

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
  const [icons2, setIcons2] = useState<any>([]);
  const [svg, setSvg] = useState("");
  const history = useHistory(); // Use useHistory for navigation

  // const navigation = useIonRouter();
  // const toJounralAddition = () => {};

  const date: Date = new Date();

  const moonColorData = icons2;

  const curDate: string = date.toLocaleDateString();

  const curDay: string = [
    "Sonntag",
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
  ][date.getDay()];

  const handleOnClick = (dateIndex, monthIndex) => {
    setActiveIndex(dateIndex);
    setActiveMonthIndex(monthIndex);

    const tempMonthIndex = monthIndex + 1 + "";
    const tempDateIndex = dateIndex + "";

    const dateParam = `${year}-${+tempMonthIndex < 10 ? "0" + tempMonthIndex : tempMonthIndex
      }-${+tempDateIndex < 10 ? "0" + tempDateIndex : tempDateIndex}`;

    url = `/journaladditionremade/${dateParam}`;

    history.push(url);
  };

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
      if (error.response) {
        const status = error.response.status;

        if (status === 401 || status === 403 || status === 404) {
          // Unauthorized, Forbidden, or Not Found
          authService.logout();
          history.push("/login");
        }
      }
      console.error(error);
    }
  };
  const getIcons2 = async () => {
    let month: any = new Date().getMonth() + 1;

    if (parseInt(month) < 10) {
      month = "0" + month;
    }

    let year = new Date().getFullYear();

    let yearMonth = `${year}-${month}`;

    try {
      const data = await MoonPhasesServce.get(
        `https://app.mynalu.com/wp-json/nalu-app/v1/journal-overview/${yearMonth}?lang=de`
      );

      const todayData = data["today"];

      if (todayData) {
        setTodayPeriod(todayData.active_period.toString());
      } else {
        console.log("No data found for today");
      }

      setIcons2(data);
    } catch (error) {
      if (error.response) {
        const status = error.response.status;

        if (status === 401 || status === 403 || status === 404) {
          // Unauthorized, Forbidden, or Not Found
          authService.logout();
          history.push("/login");
        }
      }
      console.error(error);
    }
  };

  const getColors: any = (year, month, date) => {
    if (month < 10) {
      month = "0" + month;
    }
    if (date < 10) {
      date = "0" + date;
    }

    let x = `${year}-${month}-${date}`;

    const data = icons2;

    let style: any = {};

    let _day: any = new Date().getDate();
    let _month: any = new Date().getMonth() + 1;

    let _year = new Date().getFullYear();

    if (_month < 10) {
      _month = "0" + _month;
    }
    if (_day < 10) {
      _day = "0" + _day;
    }

    let _x = `${_year}-${_month}-${_day}`;

    if (_month) {
      Object.keys(moonColorData).map((obj) => {
        if (obj === x && obj !== _x) {
          moonColorData[obj].entries.map((phase) => {
            if (phase.key === "period_bleeding" && parseInt(phase.value) > 0) {
              style.backgroundColor = "#F0A6A9";
              style.color = "white";
            }
            if (phase.key === "cervical_mucus" && parseInt(phase.value) > 0) {
              style.backgroundColor = "#3684B3";
              style.color = "white";
            }
          });
        }
      });
    }
    return style;
  };

  const formatTodaysDate = () => {
    const daysOfWeek = [
      "Sonntag",
      "Montag",
      "Dienstag",
      "Mittwoch",
      "Donnerstag",
      "Freitag",
      "Samstag",
    ];
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

    const today = new Date();
    const dayOfWeek = daysOfWeek[today.getDay()];
    const dayOfMonth = today.getDate();
    const month = months[today.getMonth()];

    return `${dayOfWeek}, ${dayOfMonth}. ${month}`;
  };

  useIonViewWillEnter(() => {
    getIcons();
    getIcons2();
  });

  const handleStartStop = () => {
    let body = {};

    let date: any = new Date().getDate();

    if (parseInt(date) < 10) {
      date = "0" + date;
    }

    let month: any = new Date().getMonth() + 1;

    if (parseInt(month) < 10) {
      month = "0" + month;
    }

    let year = new Date().getFullYear();

    let curDate = `${year}-${month}-${date}`;

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
          setTodayPeriod("true");
        },
        (error) => {
          if (error.response) {
            const status = error.response.status;

            if (status === 401 || status === 403 || status === 404) {
              // Unauthorized, Forbidden, or Not Found
              authService.logout();
              history.push("/login");
            }
          }
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
          setTodayPeriod("false");
        },
        (error) => {
          if (error.response) {
            const status = error.response.status;

            if (status === 401 || status === 403 || status === 404) {
              // Unauthorized, Forbidden, or Not Found
              authService.logout();
              history.push("/login");
            }
          }

          console.error(error);
        }
      );
    }
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
    const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
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

    for (let i = 0; i < adjustedFirstDay; i++) {
      const prevMonthDate = lastDateOfPrevMonth - adjustedFirstDay + i + 1;
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
          id={`${i}/${m + 1}/${year}`}
          className={`calendar-day ${isToday} ${activeIndex === i && activeMonthIndex === m ? "dayActive" : ""
            }`}
          onClick={() => handleOnClick(i, m)}
          style={getColors(year, m + 1, i)}
        >
          {moonPhase ? (
            <>
              <div>
                {moonPhase.phase_name === "Full Moon" ? (
                  <img src={fullMoon} />
                ) : moonPhase.phase_name === "New Moon" ? (
                  <img src={newMoon} />
                ) : null}
              </div>
              {/* Added "null" for the empty condition */}
              <div className="dayToday">
                {isToday ? (
                  <span style={{ fontSize: "9px" }}>Heute</span>
                ) : null}
                <p className={isToday ? "isToday" : ""}>{i}</p>
              </div>
            </>
          ) : (
            <div className="dayToday">
              {isToday ? <span style={{ fontSize: "9px" }}>Heute</span> : null}
              <p className={isToday ? "isToday" : ""}>{i}</p>
            </div>
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
              <h5 className="popoverHeading"> Monat wählen:</h5>
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
                Bestätigen
              </button>
            </div>
          </IonPopover>
        </div>
        <ul className="calendar-data">{monthData}</ul>
      </div>
    );
  }

  useEffect(() => {
    const fetchSvg = async () => {
      try {
        const response = await fetch(cervicalMucus);
        const svgText = await response.text();
        setSvg(svgText);
      } catch (error) {
        console.error("Error loading SVG:", error);
      }
    };

    fetchSvg();
  }, [svg]);

  return (
    <IonPage className="JournalCalendarRemade">
      <IonContent>
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton color="dark" onClick={() => history.push("/menu")}>
              <IonIcon icon={menuOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <h2>[Das Zyklus Journal ist zur Zeit in Überarbeitung]</h2>
        <p>Du erhältst eine E-Mail von uns, wenn das Journal wieder vollumfänglich verfügbar ist.</p>
        <div className="journalcalendar-main">
          <div className="calendar-container" onScroll={() => handleScroll()}>
            <div className="calendar-scrollable">
              {calendarMonths.map((monthData, mIndex) => (
                <div
                  id={`${months[mIndex]}`}
                  key={monthData.key}
                  className={`calendar-month ${currentdivInView === months[mIndex] ? "fadeIn" : "fadeOut"
                    }`}
                >
                  {monthData}
                </div>
              ))}
            </div>
          </div>

          <div className="moon-phases">
            <div className="period-group">
              <div className="full-moon">
                <img src={menstruation} alt="" />
                <p className="moon-text">Menstruation</p>
              </div>
              <div className="new-moon bottom">
                <img src={newMoon} alt="" />
                <p className="moon-text">Neumond</p>
              </div>
            </div>
            <div className="moon-group">
              <div className="full-moon">
                <div
                  className="svgIconss"
                  dangerouslySetInnerHTML={{ __html: svg }}
                  id="cervical"
                />
                <p className="moon-text">Zervixschleim</p>
              </div>
              <div className="full-moon bottom">
                <img src={fullMoon} alt="" />
                <p className="moon-text">Vollmond</p>
              </div>
            </div>
          </div>

          <div className="journal-cycle-wrapper">
            <div className="journal-cycle">
              <h3>{icons2?.today?.label}</h3>
              <div className="day-time">
                <span>{formatTodaysDate()}</span>
              </div>
            </div>
          </div>

          {/*<IonButton className="period-btn" onClick={handleStartStop}>
            {todayPeriod == "false" ? (
              <IonLabel>Beginn der Periode</IonLabel>
            ) : (
              <IonLabel>Ende der Periode</IonLabel>
            )}
            </IonButton>*/}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default JournalCalendarRemade;
