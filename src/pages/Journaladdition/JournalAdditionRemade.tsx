import { useState, useRef, useEffect } from "react";
import "./journaladditionremade.scss";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCheckbox,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonPage,
  IonRange,
  IonRow,
  IonSearchbar,
  IonSpinner,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { useParams } from "react-router-dom";
import newMoon from "../../assets/images/new moon.svg";
import fullMoon from "../../assets/images/full moon.svg";
import {
  add,
  filterOutline,
  happyOutline,
  optionsOutline,
  arrowBackOutline,
} from "ionicons/icons";
import Additionfilter from "../modals/Additionfilter/Additionfilter";
import JournalAdditionApiService from "../../JournalService";
import { useHistory } from "react-router-dom";
import menstruation from "../../assets/images/Menstruation.svg";
import cervicalMucus from "../../assets/images/Cervical Mucus.svg";
import CustomCategoryApiService from "../../CustomCategoryService";
import tokenService from "../../token";
import MoonPhasesServce from "../../MoonPhasesService";
import { useDispatch } from "react-redux";
import journalReducer from "../../reducers/journalReducer";

import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import React from "react";
import authService from "../../authService";
import { clearJournal, journalAction } from "../../actions/journalAction";
import { isPlatform } from "@ionic/react";
import { fetchColors, fetchMoonIcons } from "../../actions/apiActions";

function JournalAdditionRemade() {
  const { dateParam } = useParams<{ dateParam: string }>();
  const dispatch = useDispatch();
  const [year, setYear] = useState(new Date().getFullYear());
  const [isLoading, setIsLoading] = useState(false);
  const [icons2, setIcons2] = useState([]);
  const [todayPeriod, setTodayPeriod] = useState("false");
  const [isPremiumUser, setIsPremiumUser] = useState(false);

  const moonColorData = icons2;

  const typeObj: any = useSelector((state: RootState) => state.journalReducer);
  const roles = JSON.parse(localStorage.getItem("roles")) || {};

  const resultArray = Object.values(roles);

  useEffect(() => {
    if (resultArray.includes("premium")) {
      setIsPremiumUser(true);
    } else {
      setIsPremiumUser(false);
    }
  }, [isPremiumUser]);

  let isPremium = false; // Default to false
  try {
    const roles = JSON.parse(localStorage.getItem("roles") || "{}"); // Parse the roles or default to an empty object
    isPremium = Object.values(roles).includes("premium"); // Check if 'premium' is one of the roles
  } catch (e) {
    console.error("Error parsing roles from localStorage:", e);
  }

  const getJournalEntries = async () => {
    try {
      setIsLoading(true);

      const data = await JournalAdditionApiService.get(
        `https://app.mynalu.com/wp-json/nalu-app/v1/journal/${dateParam}?lang=de`
      );

      if (data.entries.length > 0) {
        const types = [...new Set(data.entries.map((item: any) => item.type))];

        let dynamicStates: any = [];

        dynamicStates = data.entries;

        // console.log("dynamic", dynamicStates);
        dispatch(clearJournal());
        dispatch(journalAction(dynamicStates));

        setTimeout(() => {
          setIsLoading(false);
        }, 10000);
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
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
    }
  };

  useEffect(() => {
    getJournalEntries();
  }, []);

  // const [inputValues, setInputValues] = useState({});

  const history = useHistory();

  const addCustomCategory = () => {
    history.push(`/addcustomcategory/${dateParam}`);
  };

  const rangeValues10 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const rangeValues16 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const rangeValues = [0, 1, 2, 3, 4, 5];

  const [modalOpen, setModalOpen] = useState(false);

  const handleModalClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    let date = new Date(dateParam);

    const monthName = date.toLocaleDateString("en-US", { month: "long" });

    setJournalDate(monthName);

    setActiveDate(new Date(dateParam).getDate());
    setActiveMonth(new Date(dateParam).getMonth());
    setActiveYear(new Date(dateParam).getFullYear());

    const goTo = document.getElementById(dateParam);

    setTimeout(() => {
      if (goTo !== null) {
        goTo.scrollIntoView({ behavior: "smooth", inline: "center" });
      }
    }, 500);
  }, []);

  const showClickDate = (date) => {
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

    const inputDate = new Date(date);
    const dayOfWeek = daysOfWeek[inputDate.getDay()];
    const dayOfMonth = inputDate.getDate();
    const month = months[inputDate.getMonth()];

    return `${dayOfWeek}, ${dayOfMonth}. ${month}`;
  };

  function formatDates(inputDate: any) {
    let month =
      +inputDate.getMonth() + 1 < 10
        ? "0" + (+inputDate.getMonth() + 1)
        : +inputDate.getMonth() + 1;
    let date =
      +inputDate.getDate() < 10
        ? "0" + inputDate.getDate()
        : inputDate.getDate();
    return inputDate.getFullYear() + "-" + month + "-" + date;
  }

  // const handleDateClick = (date) => {
  //   const selectedDate = new Date(date.actualDate);
  //   setClickedDate(formatDates(selectedDate));
  //   setActiveDate(date.dayNo);
  //   setActiveMonth(date.month);
  //   setActiveYear(date.year);

  //   const selectedDateFormatted = formatDates(selectedDate);
  //   const newUrl = `/journaladditionremade/${selectedDateFormatted}`;
  //   window.location.href = newUrl;

  //   // history.push(newUrl)
  // };

  // const parentRef = useRef(null);

  let date = new Date(dateParam),
    y = date.getFullYear(),
    m = date.getMonth();

  // let firstDay = formatDates(new Date(y, m, 1));
  // let lastDay = formatDates(new Date(y, m + 1, 0));

  // const [dateRange, setDateRange] = useState([firstDay, lastDay]);
  const [activeDate, setActiveDate] = useState(null);
  const [activeMonth, setActiveMonth] = useState(null);
  const [activeYear, setActiveYear] = useState(null);
  const [clickedDate, setClickedDate] = useState(
    formatDates(new Date(dateParam))
  );
  // const [moonPhaseIcon, setMoonPhaseIcon] = useState([]);

  const [journalDate, setJournalDate] = useState(null);

  // function weekdays(loopDate: any, loopEndDate: any, moonPhaseIcon: any) {
  //   const today = formatDates(new Date());

  //   let newWeekDays = [];

  //   while (loopDate <= loopEndDate) {
  //     const matchingIcon = moonPhaseIcon.find(
  //       (icon) => icon.date === formatDates(loopDate)
  //     );

  //     newWeekDays.push({
  //       fullDate: loopDate.toLocaleString("default", {
  //         weekday: "short",
  //       }),
  //       dayNo: loopDate.getDate(),
  //       actualDate: formatDates(loopDate),
  //       isToday: formatDates(loopDate) === today,
  //       isActive: false,
  //       month: loopDate.getMonth(),
  //       year: loopDate.getFullYear(),
  //       icon: matchingIcon ? matchingIcon.phase_name : null, // Store the associated icon
  //     });

  //     let newDate = loopDate.setDate(loopDate.getDate() + 1);
  //     loopDate = new Date(newDate);
  //   }

  //   return newWeekDays;
  // }

  // let days = weekdays(
  //   new Date(dateRange[0]),
  //   new Date(dateRange[1]),
  //   moonPhaseIcon
  // );

  // const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // const handleHorizontalScroll = () => {
  //   let e = document.getElementById("day-heading");

  //   if (Math.ceil(e.scrollLeft) + e.clientWidth >= e.scrollWidth) {
  //     let date = new Date(dateRange[1]);
  //     let y = date.getFullYear(),
  //       m = date.getMonth();

  //     let lastDay = formatDates(new Date(y, m + 2, 0));

  //     setDateRange([dateRange[0], lastDay]);
  //   } else if (e.scrollLeft <= 0) {
  //     let date = new Date(dateRange[0]);
  //     date.setMonth(date.getMonth() - 1);
  //     let y = date.getFullYear(),
  //       m = date.getMonth();

  //     let firstDay = formatDates(new Date(y, m, 1));

  //     setDateRange([firstDay, dateRange[1]]);
  //   }
  // };

  const updateField = (val: any, fields: any, isCheckbox = false) => {
    const updatedValue = isCheckbox ? (val ? 1 : 0) : val;
    fields.value = updatedValue;

    CustomCategoryApiService.post(
      `https://app.mynalu.com/wp-json/nalu-app/v1/journal/${dateParam}?lang=de`,
      {
        entries: [
          {
            key: fields.key,
            value: updatedValue,
          },
        ],
      }
    ).then(
      () => {
        let month: any = new Date().getMonth() + 1;
        if (parseInt(month) < 10) {
          month = "0" + month;
        }
        let year = new Date().getFullYear();
        let yearMonth = `${year}-${month}`;
        dispatch<any>(fetchMoonIcons(year));
        dispatch<any>(fetchColors(yearMonth));
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

        console.error(error);
      }
    );
  };

  // const getIcons = async () => {
  //   try {
  //     const data = await MoonPhasesServce.get(
  //       `https://app.mynalu.com/wp-json/nalu-app/v1/moon/${year}`
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
  //   let lang = "en";
  //   let month: any = new Date(dateParam).getMonth() + 1;

  //   if (parseInt(month) < 10) {
  //     month = "0" + month;
  //   }

  //   let year = new Date().getFullYear();

  //   let yearMonth = `${year}-${month}`;
  //   try {
  //     const data = await MoonPhasesServce.get(
  //       `https://app.mynalu.com/wp-json/nalu-app/v1/journal-overview/${yearMonth}?lang=de`
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

  useEffect(() => {
    const reloadFlag = localStorage.getItem("reloadPage");

    if (reloadFlag === "true") {
      window.location.reload();
      localStorage.removeItem("reloadPage");
    } else {
      console.log("Reload flag not found. No reload needed.");
    }
  }, []);

  // const getColors: any = (year, month, date) => {
  //   month = parseInt(month + 1);

  //   if (month < 10) {
  //     month = "0" + month;
  //   }
  //   if (date < 10) {
  //     date = "0" + date;
  //   }

  //   let x = `${year}-${month}-${date}`;

  //   const data = icons2;

  //   let style: any = {};

  //   let _day: any = new Date().getDate();
  //   let _month: any = new Date().getMonth() + 1;
  //   let _year = new Date().getFullYear();

  //   if (_month < 10) {
  //     _month = "0" + _month;
  //   }
  //   if (_day < 10) {
  //     _day = "0" + _day;
  //   }

  //   let _x = `${_year}-${_month}-${_day}`;

  //   Object.keys(moonColorData).map((obj) => {
  //     if (obj === x && obj !== _x) {
  //       moonColorData[obj].entries.map((phase) => {
  //         if (phase.key === "period_bleeding" && parseInt(phase.value) > 0) {
  //           style.backgroundColor = "#F0A6A9";
  //           style.color = "white";
  //         }
  //         if (phase.key === "cervical_mucus" && parseInt(phase.value) > 0) {
  //           style.backgroundColor = "#3684B3";
  //           style.color = "white";
  //         }
  //       });
  //     }
  //   });

  //   return style;
  // };

  useEffect(() => {
    // getIcons();
    // getIcons2();
    // getColors();
  }, []);

  const [disableInput, setDisableInput] = useState(false);

  const handleScrollStart = (event: CustomEvent) => {
    // Access scroll event properties from `event.detail`

    setDisableInput(true);
  };

  const handleScrollEnd = (event: CustomEvent) => {
    // Access scroll event properties from `event.detail`

    setDisableInput(false);
  };

  return (
    <IonPage className="JournalAdditionRemade">
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent
        className={`${isPlatform("ios") ? "safe-padding" : ""}`}
        onIonScrollStart={handleScrollStart}
        onIonScrollEnd={handleScrollEnd}
        scrollEvents={true}
      >
        <div className="journal-addition-main">
          <div className="today-clicked-date">
            <h4>{showClickDate(clickedDate)}</h4>
            {/*<h4>Cycle Day 5</h4>*/}
          </div>
          {/*<div
            className="leave-calendar-content slide"
            id="week-view-wrapper"
            ref={parentRef}
          >
            <div
              className="day-heading"
              id="day-heading"
              onScroll={handleHorizontalScroll}
              ref={scrollContainerRef}
            >
              {days.map((day, index) => (
                <div key={index + "_" + day.dayNo} className="day">
                  <div className="weekday">{day.fullDate}</div>
                  <div
                    className={
                      "date " +
                      `${day.isToday === true ? "isToday" : ""}` +
                      `${
                        activeYear === day.year &&
                        activeDate === day.dayNo &&
                        activeMonth === day.month
                          ? "active"
                          : ""
                      }`
                    }
                    style={getColors(day.year, day.month, day.dayNo)}
                    onClick={() => handleDateClick(day)}
                    id={day.actualDate}
                  >
                    <div>
                      {day.icon && (
                        <div className="moonPhases">
                          {day.icon === "Full Moon" ? (
                            <img src={fullMoon} alt="Full Moon" />
                          ) : day.icon === "New Moon" ? (
                            <img src={newMoon} alt="New Moon" />
                          ) : null}
                        </div>
                      )}
                    </div>
                    <div className="dayToday">
                      {day.isToday === true ? (
                        <span style={{ fontSize: "9px" }}>Heute</span>
                      ) : null}
                      <p className={day.isToday === true ? "isToday" : ""}>
                        {day.dayNo}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
                      </div>*/}
          <IonModal
            isOpen={modalOpen}
            className="modaaal"
            onDidDismiss={handleModalClose}
          >
            <Additionfilter onClose={() => setModalOpen(false)} />
          </IonModal>
        </div>

        {isLoading ? (
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
          <>
            {typeObj && typeObj.length > 0 ? (
              typeObj[0].map((entry: any, typeIndex: any) => (
                <div key={typeIndex}>
                  <div className="section">
                    {entry.type === "group" && (
                      <div>
                        {entry.key === "symptoms" && (
                          <>
                            <div className="title flex al-center jc-between">
                              <h3>{entry.label}</h3>
                              {/*<IonButton fill="clear">
                                    <IonIcon src="assets/imgs/Pen.svg" />
                                  </IonButton>*/}
                            </div>
                            <div className="tags-holder">
                              <IonRow>
                                {entry.fields.map((fields: any) => (
                                  <IonCol size="6" key={fields.key}>
                                    <IonItem
                                      lines="none"
                                      onClick={() => (fields.value = true)}
                                    >
                                      <div
                                        className="svgIconss"
                                        dangerouslySetInnerHTML={{
                                          __html: fields.svg,
                                        }}
                                        id={fields.key}
                                      />

                                      <IonLabel
                                        style={{ whiteSpace: "pre-wrap" }}
                                      >
                                        {fields.label}
                                      </IonLabel>
                                      <IonCheckbox
                                        checked={!!fields.value}
                                        onIonChange={(event) =>
                                          updateField(
                                            event.detail.checked,
                                            fields,
                                            true
                                          )
                                        }
                                      />
                                    </IonItem>
                                  </IonCol>
                                ))}
                              </IonRow>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="section">
                    {entry.type === "group" && (
                      <div>
                        {entry.key === "pain" && (
                          <>
                            <div className="title flex al-center jc-between">
                              <h3>{entry.label}</h3>
                              {/*<IonButton fill="clear">
                                    <IonIcon src="assets/imgs/Pen.svg" />
                                  </IonButton>*/}
                            </div>
                            <div className="range-holder">
                              {entry.fields.map((field: any) => (
                                <IonRow key={field.key}>
                                  <IonCol size="2" className="flex al-center">
                                    <img
                                      src={field.icon}
                                      height={20}
                                      alt=""
                                      style={{}}
                                    />
                                  </IonCol>
                                  <IonCol size="9">
                                    <h3>{field.label}</h3>
                                    <div>
                                      <IonRange
                                        className="custom-tick custom-slider"
                                        aria-label="Dual Knobs Range"
                                        dualKnobs={false}
                                        ticks={true}
                                        snaps={true}
                                        min={0}
                                        max={10}
                                        value={field.value ? field.value : 0}
                                        pin={true}
                                        pinFormatter={(value: number) => {
                                          switch (value) {
                                            case 1:
                                              return "Kein Schmerz";
                                            case 2:
                                            case 3:
                                              return "Leichter Schmerz";
                                            case 4:
                                            case 5:
                                              return "Mittlerer Schmerz";
                                            case 6:
                                            case 7:
                                              return "Starker Schmerz";
                                            case 8:
                                            case 9:
                                              return "Sehr starker Schmerz";
                                            case 10:
                                              return "Stärkster vorstellbarer Schmerz";
                                            default:
                                              return "Kein Schmerz";
                                          }
                                        }}
                                        onIonChange={(event) =>
                                          updateField(event.target.value, field)
                                        }
                                      ></IonRange>
                                      <div className="tick-labels">
                                        {rangeValues10.map((values) => (
                                          <div
                                            key={values}
                                            className="tick-label2"
                                          >
                                            {values}
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </IonCol>
                                </IonRow>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="section">
                    {entry.type === "group" && (
                      <div>
                        {entry.key === "mood" && (
                          <>
                            <div className="title flex al-center jc-between">
                              <h3>{entry.label}</h3>
                              {/*<IonButton fill="clear">
                                    <IonIcon src="assets/imgs/Pen.svg" />
                                  </IonButton>*/}
                            </div>
                            <div className="tags-holder">
                              <IonRow>
                                {entry.fields.map((fields: any) => (
                                  <IonCol size="6" key={fields.key}>
                                    <IonItem lines="none">
                                      <div
                                        className="svgIconss"
                                        dangerouslySetInnerHTML={{
                                          __html: fields.svg,
                                        }}
                                        id={fields.key}
                                      />
                                      <IonLabel
                                        style={{ whiteSpace: "pre-wrap" }}
                                      >
                                        {fields.label}
                                      </IonLabel>
                                      <IonCheckbox
                                        checked={!!fields.value}
                                        onIonChange={(event) =>
                                          updateField(
                                            event.detail.checked,
                                            fields,
                                            true
                                          )
                                        }
                                      />
                                    </IonItem>
                                  </IonCol>
                                ))}
                              </IonRow>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="section">
                    {entry.type === "group" && (
                      <div>
                        {entry.key === "sexual_activity" && (
                          <>
                            <div className="title flex al-center jc-between">
                              <h3>{entry.label}</h3>
                              {/*<IonButton fill="clear">
                                    <IonIcon src="assets/imgs/Pen.svg" />
                                  </IonButton>*/}
                            </div>
                            <div className="tags-holder">
                              <IonRow>
                                {entry.fields.map((fields: any) => (
                                  <IonCol size="6" key={fields.key}>
                                    <IonItem lines="none">
                                      <div
                                        className="svgIconss"
                                        dangerouslySetInnerHTML={{
                                          __html: fields.svg,
                                        }}
                                        id={fields.key}
                                      />
                                      <IonLabel
                                        style={{ whiteSpace: "pre-wrap" }}
                                      >
                                        {fields.label}
                                      </IonLabel>
                                      <IonCheckbox
                                        checked={!!fields.value}
                                        onIonChange={(event) =>
                                          updateField(
                                            event.detail.checked,
                                            fields,
                                            true
                                          )
                                        }
                                      />
                                    </IonItem>
                                  </IonCol>
                                ))}
                              </IonRow>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="section">
                    {entry.type === "group" && (
                      <div>
                        {entry.key === "outflows" && (
                          <>
                            <div className="title flex al-center jc-between">
                              <h3>{entry.label}</h3>
                              {/*<IonButton fill="clear">
                                    <IonIcon src="assets/imgs/Pen.svg" />
                                  </IonButton>*/}
                            </div>
                            <div className="tags-holder">
                              <IonRow>
                                {entry.fields.map((fields: any) => (
                                  <IonCol size="6" key={fields.key}>
                                    <IonItem lines="none">
                                      <div
                                        className="svgIconss"
                                        dangerouslySetInnerHTML={{
                                          __html: fields.svg,
                                        }}
                                        id={fields.key}
                                      />
                                      <IonLabel
                                        style={{ whiteSpace: "pre-wrap" }}
                                      >
                                        {fields.label}
                                      </IonLabel>
                                      <IonCheckbox
                                        checked={!!fields.value}
                                        onIonChange={(event) =>
                                          updateField(
                                            event.detail.checked,
                                            fields,
                                            true
                                          )
                                        }
                                      />
                                    </IonItem>
                                  </IonCol>
                                ))}
                              </IonRow>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="section">
                    {entry.type === "group" && (
                      <div>
                        {entry.key === "medication" && (
                          <>
                            <div className="title flex al-center jc-between">
                              <h3>{entry.label}</h3>
                              {/*<IonButton fill="clear">
                                    <IonIcon src="assets/imgs/Pen.svg" />
                                  </IonButton>*/}
                            </div>
                            <div className="tags-holder">
                              <IonRow>
                                {entry.fields.map((fields: any) => (
                                  <IonCol size="6" key={fields.key}>
                                    <IonItem lines="none">
                                      <div
                                        className="svgIconss"
                                        dangerouslySetInnerHTML={{
                                          __html: fields.svg,
                                        }}
                                        id={fields.key}
                                      />
                                      <IonLabel
                                        style={{ whiteSpace: "pre-wrap" }}
                                      >
                                        {fields.label}
                                      </IonLabel>
                                      <IonCheckbox
                                        checked={!!fields.value}
                                        onIonChange={(event) =>
                                          updateField(
                                            event.detail.checked,
                                            fields,
                                            true
                                          )
                                        }
                                      />
                                    </IonItem>
                                  </IonCol>
                                ))}
                              </IonRow>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="section">
                    {entry.type === "group" && (
                      <div>
                        {entry.key === "activities" && (
                          <>
                            <div className="title flex al-center jc-between">
                              <h3>{entry.label}</h3>
                              {/*<IonButton fill="clear">
                                    <IonIcon src="assets/imgs/Pen.svg" />
                                  </IonButton>*/}
                            </div>
                            <div className="tags-holder">
                              <IonRow>
                                {entry.fields.map((fields: any) => (
                                  <IonCol size="6" key={fields.key}>
                                    <IonItem lines="none">
                                      <div
                                        className="svgIconss"
                                        dangerouslySetInnerHTML={{
                                          __html: fields.svg,
                                        }}
                                        id={fields.key}
                                      />
                                      <IonLabel
                                        style={{ whiteSpace: "pre-wrap" }}
                                      >
                                        {fields.label}
                                      </IonLabel>
                                      <IonCheckbox
                                        checked={!!fields.value}
                                        onIonChange={(event) =>
                                          updateField(
                                            event.detail.checked,
                                            fields,
                                            true
                                          )
                                        }
                                      />
                                    </IonItem>
                                  </IonCol>
                                ))}
                              </IonRow>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  {isPremiumUser ? (
                    <div className="section">
                      {entry.type === "textarea" && (
                        <div>
                          <div className="title flex al-center jc-between">
                            <h3>{entry.label}</h3>
                          </div>
                          <div className="tags-holder">
                            <div>
                              {
                                <div className="section last">
                                  <div className="the-form">
                                    <div className="input-item">
                                      <IonItem lines="none">
                                        <IonInput
                                          id={entry.key}
                                          placeholder="Text eingeben"
                                          value={entry.value || ""}
                                          onIonChange={(event) =>
                                            updateField(
                                              event.target.value,
                                              entry
                                            )
                                          }
                                        />
                                      </IonItem>
                                    </div>
                                  </div>
                                </div>
                              }
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="section">
                      {entry.type === "textarea" &&
                        entry.key !== "how_i_live" && (
                          <div>
                            <div className="title flex al-center jc-between">
                              <h3>{entry.label}</h3>
                            </div>
                            <div className="tags-holder">
                              <div>
                                {
                                  <div className="section last">
                                    <div className="the-form">
                                      <div className="input-item">
                                        <IonItem lines="none">
                                          <IonInput
                                            id={entry.key}
                                            placeholder="Text eingeben"
                                            value={entry.value || ""}
                                            onIonChange={(event) =>
                                              updateField(
                                                event.target.value,
                                                entry
                                              )
                                            }
                                          />
                                        </IonItem>
                                      </div>
                                    </div>
                                  </div>
                                }
                              </div>
                            </div>
                          </div>
                        )}
                    </div>
                  )}
                  <div className="section">
                    {entry.type === "text" && (
                      <div>
                        <div className="title flex al-center jc-between">
                          <h3>{entry.label}</h3>
                        </div>
                        <div className="tags-holder">
                          <div>
                            {
                              <div className="section last">
                                <div className="the-form">
                                  <div className="input-item">
                                    <IonItem lines="none">
                                      <IonInput
                                        id={entry.key}
                                        placeholder="Text eingeben"
                                        value={entry.value || ""}
                                        onIonChange={(event) =>
                                          updateField(event.target.value, entry)
                                        }
                                      />
                                    </IonItem>
                                  </div>
                                </div>
                              </div>
                            }
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="section">
                    {entry.type === "range-5" && (
                      <div id={entry.key}>
                        <div
                          className="title flex al-center jc-between "
                          style={{ marginBottom: "20px" }}
                        >
                          <h3>{entry.label}</h3>
                        </div>
                        <div className="range-holder">
                          <IonRow>
                            <IonCol size="2" class="flex al-center">
                              <div className="start-slot flex al-center">
                                <img
                                  src={entry.icon}
                                  height={20}
                                  alt=""
                                  style={{}}
                                />
                              </div>
                            </IonCol>
                            <IonCol size="9">
                              <IonRange
                                className="custom-tick custom-slider"
                                aria-label="Dual Knobs Range"
                                dualKnobs={false}
                                ticks={true}
                                snaps={true}
                                min={0}
                                max={5}
                                value={entry.value ? entry.value : 0}
                                pin={true}
                                pinFormatter={(value: number) => `${value}`}
                                onIonChange={(event) =>
                                  updateField(event.target.value, entry)
                                }
                              ></IonRange>
                              <div className="tick-labels">
                                {rangeValues.map((values) => (
                                  <div key={values} className="tick-label">
                                    {values}
                                  </div>
                                ))}
                              </div>
                            </IonCol>
                          </IonRow>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="section">
                    {entry.type === "range-16" && (
                      <div>
                        <div
                          className="title flex al-center jc-between"
                          style={{ marginBottom: "20px" }}
                        >
                          <h3>{entry.label}</h3>
                        </div>
                        <div className="range-holder">
                          <IonRow>
                            <IonCol size="2" class="flex al-center">
                              <img
                                src={entry.icon}
                                height={20}
                                alt=""
                                style={{}}
                              />
                            </IonCol>
                            <IonCol size="9">
                              <IonRange
                                className="custom-tick custom-slider"
                                aria-label="Dual Knobs Range"
                                dualKnobs={false}
                                ticks={true}
                                snaps={true}
                                min={0}
                                max={12}
                                value={entry.value ? entry.value : 0}
                                pin={true}
                                pinFormatter={(value: number) => `${value}`}
                                onIonChange={(event) =>
                                  updateField(event.target.value, entry)
                                }
                              ></IonRange>
                              <div className="tick-labels">
                                {rangeValues16.map((values) => (
                                  <div key={values} className="tick-label3">
                                    {values}
                                  </div>
                                ))}
                              </div>
                            </IonCol>
                          </IonRow>
                        </div>
                      </div>
                    )}
                  </div>
                  {isPremiumUser ? (
                    <div className="section">
                      {entry.key === "custom_user_fields" && (
                        <>
                          <div className="title flex al-center jc-between custom-user-fields">
                            <h3>{entry.label}</h3>
                          </div>

                          {entry.fields.map((field: any) => (
                            <React.Fragment key={field.key}>
                              {field.type === "range-5" && (
                                <React.Fragment>
                                  <div className="range-holder">
                                    <IonRow>
                                      <IonCol size="2" className="flex">
                                        <div className="start-slot flex al-center">
                                          <img
                                            src={field.icon}
                                            height={20}
                                            alt=""
                                          />
                                          {/* <h3>{field.label}</h3> */}
                                        </div>
                                      </IonCol>
                                      <IonCol size="9">
                                        <h3 className="custom-title">
                                          {field.label}
                                        </h3>
                                        <IonRange
                                          className="custom-tick custom-slider"
                                          aria-label="Dual Knobs Range"
                                          dualKnobs={false}
                                          ticks={true}
                                          snaps={true}
                                          min={0}
                                          max={5}
                                          value={field.value ? field.value : 0}
                                          pin={true}
                                          pinFormatter={(value: number) =>
                                            `${value}`
                                          }
                                          onIonChange={(event) =>
                                            updateField(
                                              event.target.value,
                                              field
                                            )
                                          }
                                        ></IonRange>
                                        <div className="tick-labels">
                                          {rangeValues.map((values) => (
                                            <div
                                              key={values}
                                              className="tick-label"
                                            >
                                              {values}
                                            </div>
                                          ))}
                                        </div>
                                      </IonCol>
                                    </IonRow>
                                  </div>
                                </React.Fragment>
                              )}
                              {field.type === "range-10" && (
                                <React.Fragment>
                                  <div className="range-holder">
                                    <IonRow>
                                      <IonCol size="2" className="flex">
                                        <div className="start-slot flex al-center">
                                          <img
                                            src={field.icon}
                                            height={20}
                                            alt=""
                                          />
                                        </div>
                                      </IonCol>
                                      <IonCol size="9">
                                        <h3 className="custom-title">
                                          {field.label}
                                        </h3>

                                        <IonRange
                                          className="custom-tick custom-slider"
                                          aria-label="Dual Knobs Range"
                                          dualKnobs={false}
                                          ticks={true}
                                          snaps={true}
                                          min={0}
                                          max={10}
                                          value={field.value ? field.value : 0}
                                          pin={true}
                                          pinFormatter={(value: number) =>
                                            `${value}`
                                          }
                                          onIonChange={(event) =>
                                            updateField(
                                              event.target.value,
                                              field
                                            )
                                          }
                                        ></IonRange>
                                        <div className="tick-labels">
                                          {rangeValues10.map((values) => (
                                            <div
                                              key={values}
                                              className="tick-label2"
                                            >
                                              {values}
                                            </div>
                                          ))}
                                        </div>
                                      </IonCol>
                                    </IonRow>
                                  </div>
                                </React.Fragment>
                              )}
                              {field.type === "true_false" && (
                                <div className="tags-holder">
                                  <IonRow>
                                    <IonCol size="2" className="flex">
                                      <div className="start-slot flex al-center">
                                        <img
                                          src={field.icon}
                                          height={20}
                                          alt=""
                                        />
                                      </div>
                                    </IonCol>
                                    <IonCol
                                      size="4"
                                      style={{
                                        marginBottom: "10px",
                                        marginTop: "10px",
                                      }}
                                    >
                                      <IonItem
                                        key={field.key}
                                        lines="none"
                                        className="customIcon"
                                      >
                                        <IonLabel
                                          style={{ whiteSpace: "pre-wrap" }}
                                        >
                                          {field.label}
                                        </IonLabel>
                                        <IonCheckbox
                                          checked={!!field.value}
                                          onIonChange={(event) =>
                                            updateField(
                                              event.detail.checked,
                                              field,
                                              true
                                            )
                                          }
                                        />
                                      </IonItem>
                                    </IonCol>
                                  </IonRow>
                                </div>
                              )}
                            </React.Fragment>
                          ))}
                        </>
                      )}
                    </div>
                  ) : null}
                </div>
              ))
            ) : (
              <></>
            )}
            {isPremiumUser ? (
              <div className="add-custom-category ion-text-center ion-padding-top">
                <IonButton onClick={addCustomCategory}>
                  <IonIcon icon={add} />
                </IonButton>
                <h4>Eigene Kategorie hinzufügen</h4>
              </div>
            ) : null}
          </>
        )}
      </IonContent>
    </IonPage>
  );
}

export default JournalAdditionRemade;
