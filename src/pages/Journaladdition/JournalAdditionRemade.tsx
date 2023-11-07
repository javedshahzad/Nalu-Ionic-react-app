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
import { journalAction } from "../../actions/journalAction";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import React from "react";

function JournalAdditionRemade() {
  const { dateParam } = useParams<{ dateParam: string }>();

  const [year, setYear] = useState(new Date().getFullYear());
  const [isLoading, setIsLoading] = useState(false);
  const [icons2, setIcons2] = useState([]);
  const [todayPeriod, setTodayPeriod] = useState("false");

  const moonColorData = icons2;

  const typeObj: any = useSelector((state: RootState) => state.journalReducer);

  // console.log("Journal Data", typeObj);

  const dispatch = useDispatch();

  const getJournalEntries = async () => {
    try {
      setIsLoading(true);

      const data = await JournalAdditionApiService.get(
        `https://app.mynalu.com/wp-json/nalu-app/v1/journal/${dateParam}`
      );

      if (data.entries.length > 0) {
        const types = [...new Set(data.entries.map((item: any) => item.type))];

        const dynamicStates = {};

        types.forEach((type: any) => {
          dynamicStates[type] = data.entries.filter(
            (item: any) => item.type === type
          );
        });

        // console.log("dynamic state", dynamicStates);
        dispatch(journalAction(dynamicStates));

        setTimeout(() => {
          setIsLoading(false);
        }, 10000);
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    getJournalEntries();
  }, []);

  const [inputValues, setInputValues] = useState({});

  const history = useHistory();

  const addCustomCategory = () => {
    history.push(`/addcustomcategory/${dateParam}`);
  };

  const rangeValues10 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const rangeValues16 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

  const rangeValues = [1, 2, 3, 4, 5];

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

  const handleDateClick = (date) => {
    const selectedDate = new Date(date.actualDate);
    setClickedDate(formatDates(selectedDate));
    setActiveDate(date.dayNo);
    setActiveMonth(date.month);
    setActiveYear(date.year);

    const selectedDateFormatted = formatDates(selectedDate);
    const newUrl = `/journaladditionremade/${selectedDateFormatted}`;
    window.location.href = newUrl;

    // history.push(newUrl)
  };

  const parentRef = useRef(null);

  let date = new Date(dateParam),
    y = date.getFullYear(),
    m = date.getMonth();

  let firstDay = formatDates(new Date(y, m, 1));
  let lastDay = formatDates(new Date(y, m + 1, 0));

  const [dateRange, setDateRange] = useState([firstDay, lastDay]);
  const [activeDate, setActiveDate] = useState(null);
  const [activeMonth, setActiveMonth] = useState(null);
  const [activeYear, setActiveYear] = useState(null);
  const [clickedDate, setClickedDate] = useState(
    formatDates(new Date(dateParam))
  );
  const [moonPhaseIcon, setMoonPhaseIcon] = useState([]);

  const [journalDate, setJournalDate] = useState(null);

  function weekdays(loopDate: any, loopEndDate: any, moonPhaseIcon: any) {
    const today = formatDates(new Date());
    let newWeekDays = [];

    while (loopDate <= loopEndDate) {
      const matchingIcon = moonPhaseIcon.find(
        (icon) => icon.date === formatDates(loopDate)
      );

      newWeekDays.push({
        fullDate: loopDate.toLocaleString("default", {
          weekday: "short",
        }),
        dayNo: loopDate.getDate(),
        actualDate: formatDates(loopDate),
        isToday: formatDates(loopDate) === today,
        isActive: false,
        month: loopDate.getMonth(),
        year: loopDate.getFullYear(),
        icon: matchingIcon ? matchingIcon.phase_name : null, // Store the associated icon
      });

      let newDate = loopDate.setDate(loopDate.getDate() + 1);
      loopDate = new Date(newDate);
    }

    return newWeekDays;
  }

  let days = weekdays(
    new Date(dateRange[0]),
    new Date(dateRange[1]),
    moonPhaseIcon
  );

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const handleHorizontalScroll = () => {
    let e = document.getElementById("day-heading");

    if (Math.ceil(e.scrollLeft) + e.clientWidth >= e.scrollWidth) {
      let date = new Date(dateRange[1]);
      let y = date.getFullYear(),
        m = date.getMonth();

      let lastDay = formatDates(new Date(y, m + 2, 0));

      setDateRange([dateRange[0], lastDay]);
    } else if (e.scrollLeft <= 0) {
      let date = new Date(dateRange[0]);
      date.setMonth(date.getMonth() - 1);
      let y = date.getFullYear(),
        m = date.getMonth();

      let firstDay = formatDates(new Date(y, m, 1));

      setDateRange([firstDay, dateRange[1]]);
    }
  };

  const updateField = (val: any, fields: any) => {
    fields.value = val;

    CustomCategoryApiService.post(
      `https://app.mynalu.com/wp-json/nalu-app/v1/journal/${dateParam}`,
      {
        entries: [
          {
            key: fields.key,
            value: val,
          },
        ],
      }
    ).then(
      (data) => {
        // console.log("data from custom category api", data);
      },
      (err) => {
        console.log("err sending data", err);
      }
    );
  };

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

  const getIcons2 = async () => {
    let lang = "en";
    let month: any = new Date(dateParam).getMonth() + 1;

    if (parseInt(month) < 10) {
      month = "0" + month;
    }
    // console.log("month", month);

    let year = new Date().getFullYear();

    let yearMonth = `${year}-${month}`;
    try {
      const data = await MoonPhasesServce.get(
        `https://app.mynalu.com/wp-json/nalu-app/v1/journal-overview/${yearMonth}?lang=${lang}`
      );

      const todayData = data["today"];

      if (todayData) {
        setTodayPeriod(todayData.active_period.toString());
      } else {
        console.log("No data found for today");
      }

      setIcons2(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getColors: any = (year, month, date) => {
    month = parseInt(month + 1);

    if (month < 10) {
      month = "0" + month;
    }
    if (date < 10) {
      date = "0" + date;
    }

    let x = `${year}-${month}-${date}`;

    const data = icons2;

    let style: any = {};
    // console.log("data in function", data);

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

    Object.keys(moonColorData).map((obj) => {
      if (obj === x && obj !== "2023-10-02") {
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

    return style;
  };

  useEffect(() => {
    getIcons();
    getIcons2();
    getColors();
  }, []);

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" text="" color="dark" />
          </IonButtons>

          {/*<IonButtons slot="end">
            <IonButton color="dark" onClick={() => setModalOpen(true)}>
              <IonIcon icon={optionsOutline} />
            </IonButton>
           </IonButtons>*/}
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="journal-addition-main">
          <div className="today-clicked-date">
            <h4>{showClickDate(clickedDate)}</h4>
            {/*<h4>Cycle Day 5</h4>*/}
          </div>
          <div
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
                      `${day.isToday === true ? " isToday" : ""}` +
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
                    <p> {day.dayNo}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <IonModal
            isOpen={modalOpen}
            className="modaaal"
            onDidDismiss={handleModalClose}
          >
            <Additionfilter onClose={() => setModalOpen(false)} />
          </IonModal>
        </div>
        {/*<div className="search-holder">
          <IonItem lines="none">
            <IonSearchbar></IonSearchbar>
            <IonButton slot="end" fill="clear" color="dark">
              <IonIcon icon={filterOutline} />
            </IonButton>
          </IonItem>
        </div>*/}
        {/* Journal Entries */}
        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <IonSpinner name="crescent"></IonSpinner>
          </div>
        ) : (
          <>
            {typeObj && typeObj.length > 0 ? (
              Object.keys(typeObj[0]).map((type: any, typeIndex: any) => (
                <div key={typeIndex}>
                  {typeObj[0][type].map((entry: any, entryIndex: any) => (
                    <div key={entryIndex}>
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
                                      <IonCol size="4" key={fields.key}>
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

                                          <IonLabel>{fields.label}</IonLabel>
                                          <IonCheckbox
                                            checked={fields.value}
                                            onIonChange={(event) =>
                                              updateField(
                                                event.target.value,
                                                fields
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
                                  <IonRow>
                                    {entry.fields.map((field: any) => (
                                      <>
                                        <IonCol size="3" class="flex al-center">
                                          <div className="start-slot flex al-center">
                                            <img
                                              src={field.icon}
                                              height={20}
                                              alt=""
                                              style={{}}
                                            />
                                            <h3>{field.label}</h3>
                                          </div>
                                        </IonCol>
                                        <IonCol size="8">
                                          <IonRange
                                            className="custom-tick"
                                            aria-label="Dual Knobs Range"
                                            dualKnobs={false}
                                            ticks={true}
                                            snaps={true}
                                            min={1}
                                            max={5}
                                            value={
                                              field.value ? field.value : 1
                                            }
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
                                      </>
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
                                      <IonCol size="4" key={fields.key}>
                                        <IonItem lines="none">
                                          <div
                                            className="svgIconss"
                                            dangerouslySetInnerHTML={{
                                              __html: fields.svg,
                                            }}
                                            id={fields.key}
                                          />
                                          <IonLabel>{fields.label}</IonLabel>
                                          <IonCheckbox
                                            checked={fields.true_false}
                                            onIonChange={(event) =>
                                              updateField(
                                                event.target.value,
                                                fields
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
                                      <IonCol size="4" key={fields.key}>
                                        <IonItem lines="none">
                                          <div
                                            className="svgIconss"
                                            dangerouslySetInnerHTML={{
                                              __html: fields.svg,
                                            }}
                                            id={fields.key}
                                          />
                                          <IonLabel>{fields.label}</IonLabel>
                                          <IonCheckbox
                                            checked={fields.true_false}
                                            onIonChange={(event) =>
                                              updateField(
                                                event.target.value,
                                                fields
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
                                      <IonCol size="4" key={fields.key}>
                                        <IonItem lines="none">
                                          <div
                                            className="svgIconss"
                                            dangerouslySetInnerHTML={{
                                              __html: fields.svg,
                                            }}
                                            id={fields.key}
                                          />
                                          <IonLabel>{fields.label}</IonLabel>
                                          <IonCheckbox
                                            checked={fields.true_false}
                                            onIonChange={(event) =>
                                              updateField(
                                                event.target.value,
                                                fields
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
                                      <IonCol size="4" key={fields.key}>
                                        <IonItem lines="none">
                                          <div
                                            className="svgIconss"
                                            dangerouslySetInnerHTML={{
                                              __html: fields.svg,
                                            }}
                                            id={fields.key}
                                          />
                                          <IonLabel>{fields.label}</IonLabel>
                                          <IonCheckbox
                                            checked={fields.true_false}
                                            onIonChange={(event) =>
                                              updateField(
                                                event.target.value,
                                                fields
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
                                      <IonCol size="4" key={fields.key}>
                                        <IonItem lines="none">
                                          <div
                                            className="svgIconss"
                                            dangerouslySetInnerHTML={{
                                              __html: fields.svg,
                                            }}
                                            id={fields.key}
                                          />
                                          <IonLabel>{fields.label}</IonLabel>
                                          <IonCheckbox
                                            checked={fields.true_false}
                                            onIonChange={(event) =>
                                              updateField(
                                                event.target.value,
                                                fields
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
                        {entry.type === "textarea" && (
                          <div>
                            <div className="title flex al-center jc-between">
                              <h3>{entry.label}</h3>
                              {/*<IonButton fill="clear">
                                <IonIcon src="assets/imgs/Pen.svg" />
                              </IonButton>*/}
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
                                            value={entry.value || ''}
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
                      <div className="section">
                        {entry.type === "text" && (
                          <div>
                            <div className="title flex al-center jc-between">
                              <h3>{entry.label}</h3>
                              {/*<IonButton fill="clear">
                                <IonIcon src="assets/imgs/Pen.svg" />
                              </IonButton>*/}
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
                                            value={entry.value || ''}
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

                      <div className="section">
                        {entry.type === "range-5" && (
                          <div>
                            <div className="title flex al-center jc-between">
                              <h3>{entry.label}</h3>
                              {/*<IonButton fill="clear">
                                <IonIcon src="assets/imgs/Pen.svg" />
                              </IonButton>*/}
                            </div>
                            <div className="range-holder">
                              <IonRow>
                                <IonCol size="3" class="flex al-center">
                                  <div className="start-slot flex al-center">
                                    <img
                                      src={entry.icon}
                                      height={20}
                                      alt=""
                                      style={{}}
                                    />
                                    <h3>{entry.label}</h3>
                                  </div>
                                </IonCol>
                                <IonCol size="8">
                                  <IonRange
                                    className="custom-tick"
                                    aria-label="Dual Knobs Range"
                                    dualKnobs={false}
                                    ticks={true}
                                    snaps={true}
                                    min={1}
                                    max={5}
                                    value={entry.value ? entry.value : 1}
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
                            <div className="title flex al-center jc-between">
                              <h3>{entry.label}</h3>
                              {/*<IonButton fill="clear">
                                <IonIcon src="assets/imgs/Pen.svg" />
                              </IonButton>*/}
                            </div>
                            <div className="range-holder">
                              <IonRow>
                                <IonCol size="3" class="flex al-center">
                                  <div className="start-slot flex al-center">
                                    <img
                                      src={entry.icon}
                                      height={20}
                                      alt=""
                                      style={{}}
                                    />
                                    <h3>{entry.label}</h3>
                                  </div>
                                </IonCol>
                                <IonCol size="8">
                                  <IonRange
                                    className="custom-tick"
                                    aria-label="Dual Knobs Range"
                                    dualKnobs={false}
                                    ticks={true}
                                    snaps={true}
                                    min={1}
                                    max={16}
                                    value={entry.value ? entry.value : 1}
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

                      <div className="section">
                        {entry.key === "custom_user_fields" && (
                          <>
                            <div className="title flex al-center jc-between custom-user-fields">
                              <h3>{entry.label}</h3>
                              {/*<IonButton fill="clear">
                                <IonIcon src="assets/imgs/Pen.svg" />
                              </IonButton>*/}
                            </div>
                            
                                {entry.fields.map((field: any) => (
                                  <React.Fragment key={field.key}>
                                    {field.type === "range-5" && (
                                      <React.Fragment>
                                        <div className="range-holder">
                                        <IonRow>
                                        <IonCol size="3" className="flex">
                                          <div className="start-slot flex al-center">
                                            <img src={field.icon} height={20} alt="" />
                                            <h3>{field.label}</h3>
                                          </div>
                                        </IonCol>
                                        <IonCol size="8">
                                          <IonRange
                                            className="custom-tick"
                                            aria-label="Dual Knobs Range"
                                            dualKnobs={false}
                                            ticks={true}
                                            snaps={true}
                                            min={1}
                                            max={5}
                                            value={field.value ? field.value : 1}
                                            pin={true}
                                            pinFormatter={(value: number) => `${value}`}
                                            onIonChange={(event) =>
                                              updateField(event.target.value, field)
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
                                      </React.Fragment>
                                    )}
                                    {field.type === "range-10" && (
                                      <React.Fragment>
                                      <div className="range-holder">
                                      <IonRow>
                                        <IonCol size="3" className="flex">
                                          <div className="start-slot flex al-center">
                                            <img src={field.icon} height={20} alt="" />
                                            <h3>{field.label}</h3>
                                          </div>
                                        </IonCol>
                                        <IonCol size="8">
                                          <IonRange
                                            className="custom-tick"
                                            aria-label="Dual Knobs Range"
                                            dualKnobs={false}
                                            ticks={true}
                                            snaps={true}
                                            min={1}
                                            max={10}
                                            value={field.value ? field.value : 1}
                                            pin={true}
                                            pinFormatter={(value: number) => `${value}`}
                                            onIonChange={(event) =>
                                              updateField(event.target.value, field)
                                            }
                                          ></IonRange>
                                          <div className="tick-labels">
                                            {rangeValues10.map((values) => (
                                              <div key={values} className="tick-label2">
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
                                        <IonCol size="4">
                                          <IonItem
                                            key={field.key}
                                            lines="none"
                                            className="customIcon"
                                          >
                                            {field.svg && (
                                              <div
                                                className="svgIconss"
                                                dangerouslySetInnerHTML={{ __html: field.svg }}
                                                id={field.key}
                                              />
                                            )}
                                            <IonLabel>{field.label}</IonLabel>
                                            <IonCheckbox
                                              checked={field.value}
                                              onIonChange={(event) =>
                                                updateField(event.target.value, field)
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
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <></>
            )}
           {localStorage.getItem('roles') && JSON.parse(localStorage.getItem('roles')).includes('premium') ? (
              <div className="add-custom-category ion-text-center ion-padding-top">
                <IonButton onClick={addCustomCategory}>
                  <IonIcon icon={add} />
                </IonButton>
                <h4>Eigene Kategorie hinzufügen</h4>
              </div>
            ) : null
          }
          </>
        )}
      </IonContent>
    </IonPage>
  );
}

export default JournalAdditionRemade;
