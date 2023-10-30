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
} from "@ionic/react";
import { useParams } from "react-router-dom";
import newMoon from "../../assets/images/new moon.svg";
import fullMoon from "../../assets/images/full moon.svg";
import { add, filterOutline, optionsOutline } from "ionicons/icons";
import Additionfilter from "../modals/Additionfilter/Additionfilter";
import JournalAdditionApiService from "../../JournalService";
import { useHistory } from "react-router-dom";
import menstruation from "../../assets/images/Menstruation.svg";
import cervicalMucus from "../../assets/images/Cervical Mucus.svg";
import CustomCategoryApiService from "../../CustomCategoryService";
import tokenService from "../../token";
import MoonPhasesServce from "../../MoonPhasesService";

function JournalAdditionRemade() {
  const { dateParam } = useParams<{ dateParam: string }>();

  const [typeState, setTypeState] = useState({});
  const [year, setYear] = useState(new Date().getFullYear());
  const [isLoading, setIsLoading] = useState(false);
  const [icons2, setIcons2] = useState([]);

  const getJournalEntries = async () => {
    try {
      setIsLoading(true);

      const data = await JournalAdditionApiService.get(
        `https://app.mynalu.com/wp-json/nalu-app/v1/journal/${dateParam}`
      );

      let journalEntryObj = JSON.parse(localStorage.getItem(dateParam));

      console.log("jou obj", journalEntryObj);

      if (data === journalEntryObj) {
        if (journalEntryObj === null || journalEntryObj === undefined) {
          const data = await JournalAdditionApiService.get(
            `https://app.mynalu.com/wp-json/nalu-app/v1/journal/${dateParam}`
          );

          if (data.entries.length > 0) {
            const types = [
              ...new Set(data.entries.map((item: any) => item.type)),
            ];

            const dynamicStates = {};

            types.forEach((type: any) => {
              dynamicStates[type] = data.entries.filter(
                (item: any) => item.type === type
              );
            });

            console.log("dynamic state", dynamicStates);
            localStorage.setItem(dateParam, JSON.stringify(dynamicStates));
            // setTypeState(dynamicStates);
            setIsLoading(false);
          }
        } else {
          // setTypeState(JSON.parse(journalEntryObj));
          setIsLoading(false);
        }
      } else {
        console.log("data++", data);

        if (data.entries.length > 0) {
          const types = [
            ...new Set(data.entries.map((item: any) => item.type)),
          ];

          const dynamicStates = {};

          types.forEach((type: any) => {
            dynamicStates[type] = data.entries.filter(
              (item: any) => item.type === type
            );
          });

          console.log("dynamic state", dynamicStates);
          // localStorage.setItem(dateParam, JSON.stringify(dynamicStates));
          setTypeState(dynamicStates);
          setIsLoading(false);
        }
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

    return () => console.log("destroyed");
  }, []);

  const showClickDate = (date) => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
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

    const inputDate = new Date(date);
    const dayOfWeek = daysOfWeek[inputDate.getDay()];
    const dayOfMonth = inputDate.getDate();
    const month = months[inputDate.getMonth()];

    return `${dayOfWeek}, ${dayOfMonth} ${month}`;
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
    setClickedDate(formatDates(new Date(date.actualDate)));

    setActiveDate(date.dayNo);
    setActiveMonth(date.month);
    setActiveYear(date.year);
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
        console.log("data from custom category api", data);
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

  useEffect(() => {
    getIcons();
  }, []);

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" text="" color="dark" />
          </IonButtons>

          <IonButtons slot="end">
            <IonButton color="dark" onClick={() => setModalOpen(true)}>
              <IonIcon icon={optionsOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="journal-addition-main">
          <div className="today-clicked-date">
            <h4>{showClickDate(clickedDate)}</h4>
            <h4>Cycle Day 5</h4>
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
                <div key={index + "_" + day.dayNo} className="day ">
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
                          ) : day.icon === "First Quarter" ? (
                            <img src={cervicalMucus} alt="First Quarter" />
                          ) : day.icon === "Last Quarter" ? (
                            <img src={menstruation} alt="Last Quarter" />
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
        <div className="search-holder">
          <IonItem lines="none">
            <IonSearchbar></IonSearchbar>
            <IonButton slot="end" fill="clear" color="dark">
              <IonIcon icon={filterOutline} />
            </IonButton>
          </IonItem>
        </div>
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
            {Object.keys(typeState).map((type: any, typeIndex: any) => (
              <div key={typeIndex}>
                {typeState[type].map((entry: any, entryIndex: any) => (
                  <div key={entryIndex}>
                    <div className="section">
                      {entry.type === "group" && (
                        <div>
                          {entry.key === "symptoms" && (
                            <>
                              <div className="title flex al-center jc-between">
                                <h3>{entry.label}</h3>
                                <IonButton fill="clear">
                                  <IonIcon src="assets/imgs/Pen.svg" />
                                </IonButton>
                              </div>
                              <div className="tags-holder">
                                <IonRow>
                                  {entry.fields.map((fields: any) => (
                                    <IonCol size="4" key={fields.key}>
                                      <IonItem lines="none">
                                        <img
                                          style={{
                                            marginRight: "5px",
                                          }}
                                          src={
                                            fields.value
                                              ? fields.svg
                                              : fields.icon
                                          }
                                          height={10}
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
                                <IonButton fill="clear">
                                  <IonIcon src="assets/imgs/Pen.svg" />
                                </IonButton>
                              </div>
                              <div className="range-holder">
                                <IonRow>
                                  {entry.fields.map((field: any) => (
                                    <>
                                      <IonCol size="3.5" class="flex al-center">
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
                                      <IonCol size="8.5">
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
                                <IonButton fill="clear">
                                  <IonIcon src="assets/imgs/Pen.svg" />
                                </IonButton>
                              </div>
                              <div className="tags-holder">
                                <IonRow>
                                  {entry.fields.map((fields: any) => (
                                    <IonCol size="4" key={fields.key}>
                                      <IonItem lines="none">
                                        <img
                                          style={{ marginRight: "5px" }}
                                          src={fields.icon}
                                          height={10}
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
                                <IonButton fill="clear">
                                  <IonIcon src="assets/imgs/Pen.svg" />
                                </IonButton>
                              </div>
                              <div className="tags-holder">
                                <IonRow>
                                  {entry.fields.map((fields: any) => (
                                    <IonCol size="4" key={fields.key}>
                                      <IonItem lines="none">
                                        <img
                                          style={{ marginRight: "5px" }}
                                          src={fields.icon}
                                          height={10}
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
                                <IonButton fill="clear">
                                  <IonIcon src="assets/imgs/Pen.svg" />
                                </IonButton>
                              </div>
                              <div className="tags-holder">
                                <IonRow>
                                  {entry.fields.map((fields: any) => (
                                    <IonCol size="4" key={fields.key}>
                                      <IonItem lines="none">
                                        <img
                                          style={{ marginRight: "5px" }}
                                          src={fields.icon}
                                          height={10}
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
                                <IonButton fill="clear">
                                  <IonIcon src="assets/imgs/Pen.svg" />
                                </IonButton>
                              </div>
                              <div className="tags-holder">
                                <IonRow>
                                  {entry.fields.map((fields: any) => (
                                    <IonCol size="4" key={fields.key}>
                                      <IonItem lines="none">
                                        <img
                                          style={{ marginRight: "5px" }}
                                          src={fields.icon}
                                          height={10}
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
                                <IonButton fill="clear">
                                  <IonIcon src="assets/imgs/Pen.svg" />
                                </IonButton>
                              </div>
                              <div className="tags-holder">
                                <IonRow>
                                  {entry.fields.map((fields: any) => (
                                    <IonCol size="4" key={fields.key}>
                                      <IonItem lines="none">
                                        <img
                                          style={{ marginRight: "5px" }}
                                          src={fields.icon}
                                          height={10}
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
                            <IonButton fill="clear">
                              <IonIcon src="assets/imgs/Pen.svg" />
                            </IonButton>
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
                                          placeholder="Input Text"
                                          value={inputValues[entry.key]}
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
                  </div>
                ))}
              </div>
            ))}
            <div className="add-custom-category ion-text-center ion-padding-top">
              <IonButton onClick={addCustomCategory}>
                <IonIcon icon={add} />
              </IonButton>
              <h4>Add Custom Category</h4>
            </div>
          </>
        )}
      </IonContent>
    </IonPage>
  );
}

export default JournalAdditionRemade;
