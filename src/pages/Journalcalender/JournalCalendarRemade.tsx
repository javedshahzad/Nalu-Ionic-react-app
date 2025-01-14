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
  IonHeader,
  IonSpinner,
} from "@ionic/react";
import {
  chevronBackOutline,
  chevronForwardOutline,
  chevronUpOutline,
  menuOutline,
  notificationsOutline,
} from "ionicons/icons";
import { useState, useRef, useEffect } from "react";
import newMoon from "../../assets/images/new moon.svg";
import fullMoon from "../../assets/images/full moon.svg";
import menstruation from "../../assets/images/Menstruation.svg";
import cervicalMucus from "../../assets/images/Cervical Mucus.svg";
import pen from "../../assets/images/Pen.svg";
import setting from "../../assets/images/setting.svg";
import { chevronDownOutline, searchOutline } from "ionicons/icons";
import { useHistory, useLocation } from "react-router-dom";
import NotificationBell from "../../components/NotificationBell";
import { useParams } from "react-router-dom";
import "./journalcalendarremade.scss";
import MoonPhasesServce from "../../MoonPhasesService";
import CustomCategoryApiService from "../../CustomCategoryService";
import authService from "../../authService";
import { isPlatform } from "@ionic/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { fetchColors, fetchMoonIcons } from "../../actions/apiActions";

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
  const [currentdivInView, setCurrentDivInView] = useState(
    new Date().getMonth().toString()
  );
  const BASE_URL = process.env.BASE_URL;
  const [activeIndex, setActiveIndex] = useState(new Date().getDate());
  const [activeMonthIndex, setActiveMonthIndex] = useState(
    new Date().getMonth()
  );
  const [moonPhaseIcon, setMoonPhaseIcon] = useState([]);
  const [todayPeriod, setTodayPeriod] = useState("false");
  const [icons2, setIcons2] = useState<any>([]);
  const [svg, setSvg] = useState("");
  const [newMoonSvg, setNewMoonSvg] = useState("");
  const [colorsData, setColorsData] = useState([]);
  const [iconsData, setIconsData] = useState<any>([]);
  const [fullMoonSvg, setFullMoonSvg] = useState("");
  const [currentMonthIndex, setCurrentMonthIndex] = useState(
    new Date().getMonth()
  );

  const dispatch = useDispatch();
  const [currentDisplayedMonthIndex, setCurrentDisplayedMonthIndex] =
    useState(0);

  const history = useHistory(); // Use useHistory for navigation
  //const history = useHistory<any>(); // Use useHistory for navigation

  // const location = useLocation();

  // useEffect(() => {
  //   // Access the query parameters from location.search
  //   const queryParams = new URLSearchParams(location.search);

  //   // Get a specific query parameter value
  //   const paramValue = queryParams.get("loading");

  //   if (paramValue) {
  //     setIsLoading(true);

  //     setTimeout(() => {
  //       setIsLoading(false);
  //       scrollingToView();
  //     }, 3000);
  //   } else {
  //     scrollingToView();
  //   }

  //   // Log or use the query parameter value as needed
  //   console.log("Your query parameter value:", paramValue);
  // }, [location.search]);

  const phases = useSelector((state: RootState) => state.phasesReducer);

  const moonColors = useSelector(
    (state: any) => state.phasesReducer.moonColors
  );

  useEffect(() => {
    const fetchMoonColors = async () => {
      try {
        const result = await moonColors;
        setColorsData(result);
      } catch (error) {
        console.error("Error fetching moonColors", error);
      }
    };

    fetchMoonColors();
  }, [moonColors]);

  const moonIcons = useSelector((state: any) => state.phasesReducer.moonIcons);

  useEffect(() => {
    const fetchMoonIcons = async () => {
      try {
        const result = await moonIcons;
        const moonPhase = result;

        const newArray = [];

        for (const date in moonPhase.moonphase) {
          const dateObjects = moonPhase.moonphase[date];
          for (const dateObject of dateObjects) {
            const transformedObject = {
              date: date,
              phase_id: dateObject.phase_id,
              phase_name: dateObject.phase_name,
            };
            newArray.push(transformedObject);
          }
        }

        setIconsData(newArray);
      } catch (error) {
        console.error("Error fetching moonIcons", error);
      }
    };

    fetchMoonIcons();
  }, [moonIcons]);

  useEffect(() => {
    let month: any = new Date().getMonth() + 1;

    if (parseInt(month) < 10) {
      month = "0" + month;
    }

    let year = new Date().getFullYear();

    // let yearMonth = `${year}-${month}`;
    dispatch<any>(fetchMoonIcons(year));
    dispatch<any>(fetchColors(year));
  }, []);

  const navigation = useIonRouter();
  const toJounralAddition = () => {};

  const date: Date = new Date();

  const moonColorData = colorsData?.entries || [];

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

    const dateParam = `${year}-${
      +tempMonthIndex < 10 ? "0" + tempMonthIndex : tempMonthIndex
    }-${+tempDateIndex < 10 ? "0" + tempDateIndex : tempDateIndex}`;

    // const dateParam = `${year}-${+tempMonthIndex < 10 ? "0" + tempMonthIndex : tempMonthIndex
    //   }-${+tempDateIndex < 10 ? "0" + tempDateIndex : tempDateIndex}`;

    url = `/journaladditionremade/${dateParam}`;

    history.push(url);
  };

  useEffect(() => {
    //const scrollingToView = () => {
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

  const [isLoading, setIsLoading] = useState(false);

  // const getIcons = async () => {
  //   try {
  //     const data = await MoonPhasesServce.get(
  //       `${BASE_URL}/wp-json/nalu-app/v1/moon/${year}`
  //     );

  //     const newArray = [];

  //     for (const date in data.moonphase) {
  //       const dateObjects = data.moonphase[date];
  //       for (const dateObject of dateObjects) {
  //         const transformedObject = {
  //           date: date,
  //           phase_id: dateObject.phase_id,
  //           phase_name: dateObject.phase_name,
  //         };
  //         newArray.push(transformedObject);
  //       }
  //     }

  //     setMoonPhaseIcon(newArray);
  //   } catch (error) {
  //     if (isPlatform("ios")) {
  //       if (error) {
  //         const status = error.status;

  //         if (status === 401 || status === 403 || status === 404) {
  //           // Unauthorized, Forbidden, or Not Found
  //           authService.logout();
  //           history.push("/onboarding");
  //         }
  //       }
  //     } else {
  //       if (error.response) {
  //         const status = error.response.status;

  //         if (status === 401 || status === 403 || status === 404) {
  //           // Unauthorized, Forbidden, or Not Found
  //           authService.logout();
  //           history.push("/onboarding");
  //         }
  //       }
  //     }
  //     console.error(error);
  //   }
  // };
  // const getIcons2 = async () => {
  //   let month: any = new Date().getMonth() + 1;

  //   if (parseInt(month) < 10) {
  //     month = "0" + month;
  //   }

  //   let year = new Date().getFullYear();

  //   let yearMonth = `${year}-${month}`;

  //   try {
  //     const data = await MoonPhasesServce.get(
  //       `${BASE_URL}/wp-json/nalu-app/v1/journal-overview/${yearMonth}?lang=de`
  //     );

  //     const todayData = data["today"];

  //     if (todayData) {
  //       setTodayPeriod(todayData.active_period.toString());
  //     } else {
  //       console.log("No data found for today");
  //     }
  //     setIcons2(data);
  //   } catch (error) {
  //     if (isPlatform("ios")) {
  //       if (error) {
  //         const status = error.status;

  //         if (status === 401 || status === 403 || status === 404) {
  //           // Unauthorized, Forbidden, or Not Found
  //           authService.logout();
  //           history.push("/onboarding");
  //         }
  //       }
  //     } else {
  //       if (error.response) {
  //         const status = error.response.status;

  //         if (status === 401 || status === 403 || status === 404) {
  //           // Unauthorized, Forbidden, or Not Found
  //           authService.logout();
  //           history.push("/onboarding");
  //         }
  //       }
  //     }
  //     console.error(error);
  //   }
  // };

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
      let foundDate = null;

      if (moonColorData) {
        foundDate = Object.keys(moonColorData).find((obj) => obj === x);
      }
      if (foundDate) {
        moonColorData[foundDate].entries.forEach((phase, index) => {
          if (
            moonColorData[foundDate].entries[index].key === "period_bleeding" &&
            parseInt(phase.value) > 0
          ) {
            style.backgroundColor = "#ee5f64";
            style.color = "white";
          } else if (
            moonColorData[foundDate].entries[index].key === "cervical_mucus" &&
            parseInt(phase.value) > 0
          ) {
            style.backgroundColor = "#89bcdc";
            style.color = "white";
          } else if (
            moonColorData[foundDate].entries[0].value &&
            parseInt(moonColorData[foundDate].entries[0].value) > 0 &&
            moonColorData[foundDate].entries[1].value &&
            parseInt(moonColorData[foundDate].entries[1].value) > 0
          ) {
            style.backgroundColor = "#ee5f64";
            style.color = "white";
          } else if (
            moonColorData[foundDate].entries[0].value === null &&
            moonColorData[foundDate].entries[1].value === null
          ) {
            // style.stroke = "#EE5F64"; // Default color for days without color information
          } else {
            // style.stroke = "#f8f5f2";
          }
        });
      } else {
        style.stroke = "#EE5F64"; // Default color for days in the current month without color information
      }
    }
    return style;
  };

  const getStroke: any = (year, month, date) => {
    if (month < 10) {
      month = "0" + month;
    }
    if (date < 10) {
      date = "0" + date;
    }

    let x = `${year}-${month}-${date}`;

    let style: any = {};

    if (month) {
      const foundDate = Object.keys(moonColorData).find((obj) => obj === x);

      if (foundDate) {
        moonColorData[foundDate].entries.forEach((phase, index) => {
          if (
            moonColorData[foundDate].entries[index].key === "period_bleeding" &&
            parseInt(phase.value) > 0
          ) {
            style.stroke = "#f8f5f2";
          } else if (
            moonColorData[foundDate].entries[index].key === "cervical_mucus" &&
            parseInt(phase.value) > 0
          ) {
            style.stroke = "#f8f5f2";
          } else if (
            moonColorData[foundDate].entries[0].value &&
            parseInt(moonColorData[foundDate].entries[0].value) > 0 &&
            moonColorData[foundDate].entries[1].value &&
            parseInt(moonColorData[foundDate].entries[1].value) > 0
          ) {
            style.stroke = "#f8f5f2";
          } else if (
            moonColorData[foundDate].entries[0].value === null &&
            moonColorData[foundDate].entries[1].value === null
          ) {
            style.stroke = "#EE5F64"; // Default color for days without color information
          } else {
            style.stroke = "#f8f5f2";
          }
        });
      } else {
        style.stroke = "#EE5F64"; // Default color for days in the current month without color information
      }
    }

    return style;
  };

  const getFill: any = (year, month, date) => {
    if (month < 10) {
      month = "0" + month;
    }
    if (date < 10) {
      date = "0" + date;
    }

    let x = `${year}-${month}-${date}`;

    let style: any = {};

    if (month) {
      const foundDate = Object.keys(moonColorData).find((obj) => obj === x);

      if (foundDate) {
        moonColorData[foundDate].entries.forEach((phase, index) => {
          if (
            moonColorData[foundDate].entries[index].key === "period_bleeding" &&
            parseInt(phase.value) > 0
          ) {
            style.fill = "#f8f5f2";
          } else if (
            moonColorData[foundDate].entries[index].key === "cervical_mucus" &&
            parseInt(phase.value) > 0
          ) {
            style.fill = "#f8f5f2";
          } else if (
            moonColorData[foundDate].entries[0].value &&
            parseInt(moonColorData[foundDate].entries[0].value) > 0 &&
            moonColorData[foundDate].entries[1].value &&
            parseInt(moonColorData[foundDate].entries[1].value) > 0
          ) {
            style.fill = "#f8f5f2";
          } else if (
            moonColorData[foundDate].entries[0].value === null &&
            moonColorData[foundDate].entries[1].value === null
          ) {
            style.fill = "#EE5F64"; // Default color for days without color information
          } else {
            style.fill = "#f8f5f2";
          }
        });
      } else {
        style.fill = "#EE5F64"; // Default color for days in the current month without color information
      }
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

  // useIonViewWillEnter(() => {
  //   getIcons();
  //   getIcons2();
  // });

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
        `${BASE_URL}/wp-json/nalu-app/v1/journal/${curDate}`,
        body
      ).then(
        (data) => {
          setTodayPeriod("true");
        },
        (error) => {
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
        `${BASE_URL}/wp-json/nalu-app/v1/journal/${curDate}`,
        body
      ).then(
        (data) => {
          setTodayPeriod("false");
        },
        (error) => {
          if (isPlatform("ios")) {
            if (error) {
              const status = error.status;

              if (status === 401 || status === 403 || status === 404) {
                authService.logout();
                history.push("/onboarding");
              }
            }
          } else {
            if (error.response) {
              const status = error.response.status;

              if (status === 401 || status === 403 || status === 404) {
                authService.logout();
                history.push("/onboarding");
              }
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

  const handleGo = async (direction) => {
    // if (popoverRef.current) {
    // await popoverRef.current.dismiss();

    const currentIndex = currentMonthIndex;

    let newIndex: any;
    if (direction === "next" && currentMonthIndex < 11) {
      newIndex = (currentIndex + 1) % months.length;
      setCurrentMonthIndex(newIndex);
      setCurrentDisplayedMonthIndex(newIndex);

      const targetMonth = months[newIndex];
      const element = document.getElementById(targetMonth);

      if (element !== null) {
        setTimeout(() => {
          element.scrollIntoView({
            inline: "center",
            block: "center",
            behavior: "smooth",
          });
        }, 500);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else if (direction === "prev" && currentMonthIndex > 0) {
      newIndex = (currentIndex - 1 + months.length) % months.length;
      setCurrentMonthIndex(newIndex);
      setCurrentDisplayedMonthIndex(newIndex);

      const targetMonth = months[newIndex];
      const element = document.getElementById(targetMonth);

      if (element !== null) {
        setTimeout(() => {
          element.scrollIntoView({
            inline: "center",
            block: "center",
            behavior: "smooth",
          });
        }, 500);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }

    // }
  };

  function isSectionVisible(sectionRef, index) {
    const section = document.getElementById(sectionRef);

    if (section) {
      const rect = section.getBoundingClientRect();

      if (
        rect.top <= window.innerHeight * 0.4 &&
        rect.bottom >= 0.2 * window.innerHeight
      ) {
        setCurrentDivInView(sectionRef);
        setCurrentMonthIndex(index);
        setCurrentDisplayedMonthIndex(index);
        return true;
      }
    }
    return false;
  }

  const handleScroll = () => {
    for (let i = 0; i <= months.length - 1; i++) {
      isSectionVisible(months[i], i);
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
      let moonPhase: any = [];
      // console.log("iconsData", iconsData);
      if (iconsData && Array.isArray(iconsData) && iconsData.length > 0) {
        moonPhase = iconsData.find((item) => {
          return (
            item.date ===
            year +
              "-" +
              (m + 1).toString().padStart(2, "0") +
              "-" +
              i.toString().padStart(2, "0")
          );
        });
      }

      monthData.push(
        <li
          key={`currentDay-${i}`}
          id={`${i}/${m + 1}/${year}`}
          className={`calendar-day ${isToday} ${
            activeIndex === i + 1 && activeMonthIndex === m ? "dayActive" : ""
          }`}
          onClick={() => handleOnClick(i, m)}
          style={getColors(year, m + 1, i)}
        >
          {moonPhase ? (
            <>
              {moonPhase.phase_name === "Full Moon" ? (
                <>
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="phases"
                  >
                    <circle
                      cx="5"
                      cy="5"
                      r="4.5"
                      style={getStroke(year, m + 1, i)}
                    />
                    <circle
                      cx="5"
                      cy="5"
                      r="3"
                      style={getFill(year, m + 1, i)}
                    />
                  </svg>
                </>
              ) : moonPhase.phase_name === "New Moon" ? (
                <div
                  style={getStroke(year, m + 1, i)}
                  className="phases"
                  dangerouslySetInnerHTML={{ __html: newMoonSvg }}
                ></div>
              ) : null}

              <div className="dayToday">
                {isToday ? (
                  <span style={{ fontSize: "9px" }}>Heute</span>
                ) : null}
                <p>{i}</p>
              </div>
            </>
          ) : (
            <div className="dayToday">
              {isToday ? <span style={{ fontSize: "9px" }}>Heute</span> : null}
              <p>{i}</p>
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
          {/* <span id="cur-month-year-icon">
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
              <button onClick={handleGo} className="goBtn">
                Bestätigen
              </button>
            </div>
          </IonPopover> */}
          <IonButton onClick={() => handleGo("prev")} fill="clear">
            <IonIcon icon={chevronUpOutline} />
          </IonButton>
          <IonButton onClick={() => handleGo("next")} fill="clear">
            <IonIcon icon={chevronDownOutline} />
          </IonButton>
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
  useEffect(() => {
    const newMoonIcon = async () => {
      try {
        const response = await fetch(newMoon);
        const svgText = await response.text();
        setNewMoonSvg(svgText);
      } catch (error) {
        console.error("Error loading SVG:", error);
      }
    };

    newMoonIcon();
  }, [newMoonSvg]);
  useEffect(() => {
    const fullMoonIcon = async () => {
      try {
        const response = await fetch(fullMoon);
        const svgText = await response.text();
        setFullMoonSvg(svgText);
      } catch (error) {
        console.error("Error loading SVG:", error);
      }
    };

    fullMoonIcon();
  }, [fullMoonSvg]);

  return (
    <IonPage className="JournalCalendarRemade">
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton color="dark" onClick={() => history.push("/menu")}>
              <IonIcon icon={menuOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className={`${isPlatform("ios") ? "safe-padding" : ""}`}>
        <div className="journalcalendar-main">
          <div className="calendar-container" onScroll={() => handleScroll()}>
            {/* <div className="calendar-controls"></div> */}
            <div className="calendar-scrollable">
              {calendarMonths.map((monthData, mIndex) => (
                <>
                  <div
                    id={`${months[mIndex]}`}
                    key={monthData.key}
                    className={`calendar-month ${
                      currentdivInView == months[mIndex] ? "fadeIn" : "fadeOut"
                    }`}
                  >
                    {monthData} {months[mIndex]}
                  </div>
                </>
              ))}
            </div>
          </div>
          <div className="moon-phases">
            <div className="period-group">
              <div className="full-moon">
                <img src={menstruation} alt="" />
                <p className="moon-text">Menstruation</p>
              </div>
              <div
                className="new-moon bottom"
                style={{ display: "flex", alignItems: "center" }}
              >
                <div
                  style={{ stroke: "#EE5F64" }}
                  dangerouslySetInnerHTML={{ __html: newMoonSvg }}
                ></div>
                <p className="moon-text">Neumond</p>
                {/* {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              backgroundColor: "#F8F5F2",
            }}
          >
            <IonSpinner name="crescent"></IonSpinner>
          </div>
        ) : (
          <div className="journalcalendar-main">
            <div className="calendar-container" onScroll={() => handleScroll()}>
           
              <div className="calendar-scrollable">
                {calendarMonths.map((monthData, mIndex) => (
                  <>
                    <div
                      id={`${months[mIndex]}`}
                      key={monthData.key}
                      className={`calendar-month ${currentdivInView == months[mIndex]
                        ? "fadeIn"
                        : "fadeOut"
                        }`}
                    >
                      {monthData}
                    </div>
                  </>
                ))}*/}
              </div>
            </div>

            <div className="moon-group">
              <div className="full-moon">
                {/* <div className="moon-phases">
            <div className="period-group">
              <div className="full-moon">
                <img src={menstruation} alt="" />
                <p className="moon-text">Menstruation</p>
              </div> */}

                <div
                  className="svgIconss"
                  dangerouslySetInnerHTML={{ __html: svg }}
                  id="cervical"
                />
                <p className="moon-text">Zervixschleim</p>
                {/* <div
                className="new-moon bottom"
                style={{ display: "flex", alignItems: "center" }}
              >
                <div
                  style={{ stroke: "#EE5F64" }}
                  dangerouslySetInnerHTML={{ __html: newMoonSvg }}
                ></div>
                <p className="moon-text">Neumond</p>
              </div> */}
              </div>
              <div
                className="full-moon bottom"
                style={{ display: "flex", alignItems: "center" }}
              ></div>

              {/* <div className="moon-group">
              <div className="full-moon">
                <div
                  className="svgIconss"
                  dangerouslySetInnerHTML={{ __html: svg }}
                  id="cervical"
                />
                <p className="moon-text">Zervixschleim</p>
              </div> */}
              <div className="fullmoonOutter">
                <div
                  style={{ stroke: "#EE5F64", fill: "#EE5F64" }}
                  dangerouslySetInnerHTML={{ __html: fullMoonSvg }}
                ></div>
                <p className="moon-text" style={{ fontSize: 14 }}>
                  Vollmond
                </p>
              </div>
              {/*   className="full-moon bottom"
                style={{ display: "flex", alignItems: "center" }}
              >
                <div
                  style={{ stroke: "#EE5F64", fill: "#EE5F64" }}
                  dangerouslySetInnerHTML={{ __html: fullMoonSvg }}
                ></div>
                <p className="moon-text">Vollmond</p>
              </div>  */}
            </div>
          </div>
        </div>

        <div className="journal-cycle-wrapper">
          <div className="journal-cycle">
            <div className="day-time">
              <span>{formatTodaysDate()}</span>
              {/* <div className="journal-cycle-wrapper">
            <div className="journal-cycle">
             
              <div className="day-time">
                <span>{formatTodaysDate()}</span>
              </div> */}
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
