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
  IonItem,
  IonLabel,
  IonModal,
  IonPage,
  IonRange,
  IonRow,
  IonSearchbar,
  IonTextarea,
  IonToolbar,
} from "@ionic/react";
import { useParams } from "react-router-dom";
import newMoon from "../../assets/images/new moon.svg";
import fullMoon from "../../assets/images/full moon.svg";
import { add, filterOutline, optionsOutline } from "ionicons/icons";
import Additionfilter from "../modals/Additionfilter/Additionfilter";

function JournalAdditionRemade() {
  const { dateParam } = useParams<{ dateParam: string }>();

  const tickValues = [1, 2, 3, 4, 5]; // Custom tick values
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const [intentionItems, setIntentionItems] = useState([
    { label: "Gratitude", icon: "it1.svg", active: false },
    { label: "Self love", icon: "it2.svg", active: false },
    { label: "Creativity", icon: "it3.svg", active: false },
    { label: "Letting go", icon: "it4.svg", active: false },
    { label: "Intuition", icon: "it5.svg", active: false },
    { label: "Forgive", icon: "it6.svg", active: false },
    { label: "Rest", icon: "it7.svg", active: false },
    { label: "Emotions", icon: "it8.svg", active: false },
    { label: "Trust", icon: "it9.svg", active: false },
    { label: "Recieve", icon: "it10.svg", active: false },
    { label: "Add", icon: "it11.svg", active: false },
  ]);

  const [symptomItems, setSymptomItems] = useState([
    { label: "Happy", icon: "sm1.svg", active: false },
    { label: "Sad", icon: "sm2.svg", active: false },
    { label: "Angry", icon: "sm3.svg", active: false },
    { label: "Pain", icon: "sm4.svg", active: false },
    { label: "Cry", icon: "sm5.svg", active: false },
    { label: "Disturb", icon: "sm6.svg", active: false },
    { label: "Restless", icon: "sm7.svg", active: false },
  ]);
  const [exerciseItems, setexerciseItems] = useState([
    { label: "Happy", icon: "sm1.svg", active: false, colSize: "4" },
    { label: "Sad", icon: "sm2.svg", active: false, colSize: "4" },
    { label: "Angry", icon: "sm3.svg", active: false, colSize: "4" },
    { label: "Pain", icon: "sm4.svg", active: false, colSize: "4" },
    { label: "Cry", icon: "sm5.svg", active: false, colSize: "4" },
    { label: "Disturb", icon: "sm6.svg", active: false, colSize: "4" },
    { label: "Restless", icon: "sm7.svg", active: false, colSize: "5" },
  ]);

  useEffect(() => {
    console.log("first", dateParam);

    let date = new Date(dateParam);

    const monthName = date.toLocaleDateString("en-US", { month: "long" });

    setJournalDate(monthName);

    setActiveDate(new Date(dateParam).getDate());
    setActiveMonth(new Date(dateParam).getMonth());
    setActiveYear(new Date(dateParam).getFullYear());

    const goTo = document.getElementById(dateParam);
    console.log(goTo);
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

  function formatDates(inputDate) {
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
    console.log("Clicked date:", date);
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

  const toggleIntentionItemsActive = (index) => {
    const updatedItems = intentionItems.map((item, i) => {
      if (i === index) {
        return { ...item, active: !item.active };
      }
      return item;
    });
    setIntentionItems(updatedItems);
  };

  const togglesymptomItemsActive = (index) => {
    const updatedItems = symptomItems.map((item, i) => {
      if (i === index) {
        return { ...item, active: !item.active };
      }
      return item;
    });
    setSymptomItems(updatedItems);
  };
  const toggleexerciseItemsActive = (index) => {
    const updatedItems = exerciseItems.map((item, i) => {
      if (i === index) {
        return { ...item, active: !item.active };
      }
      return item;
    });
    setexerciseItems(updatedItems);
  };

  const [journalDate, setJournalDate] = useState(null);

  const daysIcon = (dateIndex, mIndex): string => {
    if (dateIndex === 5 && mIndex === 8) {
      return newMoon;
    } else if (dateIndex === 9 && mIndex === 8) {
      return fullMoon;
    } else {
      return "";
    }
  };

  function weekdays(loopDate, loopEndDate) {
    const today = formatDates(new Date());
    // console.log("today", today);
    let newWeekDays = [];
    while (loopDate <= loopEndDate) {
      // console.log("toffy", today);
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
      });

      let newDate = loopDate.setDate(loopDate.getDate() + 1);
      loopDate = new Date(newDate);
    }

    return newWeekDays;
  }

  let days = weekdays(new Date(dateRange[0]), new Date(dateRange[1]));

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const handleHorizontalScroll = () => {
    let e = document.getElementById("day-heading");

    if (Math.ceil(e.scrollLeft) + e.clientWidth >= e.scrollWidth) {
      console.log("reached Right");

      let date = new Date(dateRange[1]);
      let y = date.getFullYear(),
        m = date.getMonth();

      let lastDay = formatDates(new Date(y, m + 2, 0));
      console.log("lastDay", dateRange[1], lastDay, m, [dateRange[0], lastDay]);
      setDateRange([dateRange[0], lastDay]);
    } else if (e.scrollLeft <= 0) {
      console.log("reached Left");
      let date = new Date(dateRange[0]);
      date.setMonth(date.getMonth() - 1);
      let y = date.getFullYear(),
        m = date.getMonth();

      let firstDay = formatDates(new Date(y, m, 1));
      console.log("firstDay", firstDay);
      console.log("scrollWidth", e.scrollWidth, e.clientWidth);
      setDateRange([firstDay, dateRange[1]]);
    }
  };

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
                    {daysIcon(day.dayNo, day.month) && (
                      <img
                        className="daysIcon"
                        src={daysIcon(day.dayNo, day.month)}
                        alt=""
                      />
                    )}
                    {day.dayNo}
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
          <div className="search-holder">
            <IonItem lines="none">
              <IonSearchbar></IonSearchbar>
              <IonButton slot="end" fill="clear" color="dark">
                <IonIcon icon={filterOutline} />
              </IonButton>
            </IonItem>
          </div>
          <div className="section">
            <div className="title flex al-center jc-between">
              <h3>Intention</h3>
              <IonButton fill="clear">
                <IonIcon src="assets/imgs/Pen.svg" />
              </IonButton>
            </div>
            <div className="tags-holder">
              <IonRow>
                {intentionItems.map((item, index) => (
                  <IonCol size="4" key={index}>
                    <IonItem lines="none">
                      <IonIcon
                        slot="start"
                        src={
                          item.active
                            ? `assets/imgs/${item.icon.replace(
                                ".svg",
                                "active.svg"
                              )}`
                            : `assets/imgs/${item.icon}`
                        }
                      />
                      <IonLabel>{item.label}</IonLabel>
                      <IonCheckbox
                        checked={item.active}
                        onIonChange={() => toggleIntentionItemsActive(index)}
                      />
                    </IonItem>
                  </IonCol>
                ))}
              </IonRow>
            </div>
          </div>
          <div className="section">
            <div className="title flex al-center jc-between">
              <h3>Symptoms</h3>
              <IonButton fill="clear">
                <IonIcon src="assets/imgs/Pen.svg" />
              </IonButton>
            </div>
            <div className="tags-holder">
              <IonRow>
                {symptomItems.map((item, index) => (
                  <IonCol size="4" key={index}>
                    <IonItem lines="none">
                      <IonIcon
                        slot="start"
                        src={
                          item.active
                            ? `assets/imgs/${item.icon.replace(
                                ".svg",
                                "active.svg"
                              )}`
                            : `assets/imgs/${item.icon}`
                        }
                      />
                      <IonLabel>{item.label}</IonLabel>
                      <IonCheckbox
                        checked={item.active}
                        onIonChange={() => togglesymptomItemsActive(index)}
                      />
                    </IonItem>
                  </IonCol>
                ))}
              </IonRow>
            </div>
          </div>
          <div className="section">
            <div className="title flex al-center jc-between">
              <h3>Pain</h3>
              <IonButton fill="clear">
                <IonIcon src="assets/imgs/Pen.svg" />
              </IonButton>
            </div>

            <div className="range-holder">
              <IonRow>
                <IonCol size="3.5" class="flex al-center">
                  <div className="start-slot flex al-center">
                    <img src="assets/imgs/p1.svg" alt="" />
                    <h3>Head</h3>
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
                    value={3}
                    pin={true}
                    pinFormatter={(value: number) => `${value}`}
                  ></IonRange>
                  <div className="tick-labels">
                    {tickValues.map((tickValue) => (
                      <div key={tickValue} className="tick-label">
                        {tickValue}
                      </div>
                    ))}
                  </div>
                </IonCol>
              </IonRow>
            </div>
            <div className="range-holder">
              <IonRow>
                <IonCol size="3.5" class="flex al-center">
                  <div className="start-slot flex al-center">
                    <img src="assets/imgs/p2.svg" alt="" />
                    <h3>Hand</h3>
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
                    value={4}
                    pin={true}
                    pinFormatter={(value: number) => `${value}`}
                  ></IonRange>
                  <div className="tick-labels">
                    {tickValues.map((tickValue) => (
                      <div key={tickValue} className="tick-label">
                        {tickValue}
                      </div>
                    ))}
                  </div>
                </IonCol>
              </IonRow>
            </div>
            <div className="range-holder">
              <IonRow>
                <IonCol size="3.5" class="flex al-center">
                  <div className="start-slot flex al-center">
                    <img src="assets/imgs/p3.svg" alt="" />
                    <h3>Abdomen</h3>
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
                    value={3}
                    pin={true}
                    pinFormatter={(value: number) => `${value}`}
                  ></IonRange>
                  <div className="tick-labels">
                    {tickValues.map((tickValue) => (
                      <div key={tickValue} className="tick-label">
                        {tickValue}
                      </div>
                    ))}
                  </div>
                </IonCol>
              </IonRow>
            </div>
            <div className="range-holder">
              <IonRow>
                <IonCol size="3.5" class="flex al-center">
                  <div className="start-slot flex al-center">
                    <img src="assets/imgs/p4.svg" alt="" />
                    <h3>Knee</h3>
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
                    value={2}
                    pin={true}
                    pinFormatter={(value: number) => `${value}`}
                  ></IonRange>
                  <div className="tick-labels">
                    {tickValues.map((tickValue) => (
                      <div key={tickValue} className="tick-label">
                        {tickValue}
                      </div>
                    ))}
                  </div>
                </IonCol>
              </IonRow>
            </div>
          </div>
          <div className="section">
            <div className="title flex al-center jc-between">
              <h3>Exercise</h3>
              <IonButton fill="clear">
                <IonIcon src="assets/imgs/Pen.svg" />
              </IonButton>
            </div>
            <div className="ex-tags-holder">
              <IonRow>
                {exerciseItems.map((item, index) => (
                  <IonCol size={item.colSize} key={index}>
                    <IonItem lines="none">
                      <IonIcon
                        slot="start"
                        src={
                          item.active
                            ? `assets/imgs/${item.icon.replace(
                                ".svg",
                                "active.svg"
                              )}`
                            : `assets/imgs/${item.icon}`
                        }
                      />
                      <IonLabel>{item.label}</IonLabel>
                      <IonCheckbox
                        mode="md"
                        checked={item.active}
                        onIonChange={() => toggleexerciseItemsActive(index)}
                      />
                    </IonItem>
                  </IonCol>
                ))}
              </IonRow>
            </div>
          </div>
          <div className="section">
            <div className="title flex al-center jc-between">
              <h3>Custom</h3>
              <IonButton fill="clear">
                <IonIcon src="assets/imgs/Pen.svg" />
              </IonButton>
            </div>
            <div className="tags-holder">
              <IonRow>
                <IonCol size="4">
                  <IonItem lines="none">
                    <IonIcon slot="start" src="assets/imgs/sm1.svg" />
                    <IonLabel>Happy</IonLabel>
                    <IonCheckbox></IonCheckbox>
                  </IonItem>
                </IonCol>
                <IonCol size="4.5">
                  <IonItem lines="none">
                    <IonIcon slot="start" src="assets/imgs/sm2.svg" />
                    <IonLabel>Nervousness</IonLabel>
                    <IonCheckbox></IonCheckbox>
                  </IonItem>
                </IonCol>
              </IonRow>
            </div>
            <div className="range-holder">
              <IonRow>
                <IonCol size="3.5" class="flex al-center">
                  <div className="start-slot flex al-center">
                    <img src="assets/imgs/p3.svg" alt="" />
                    <h3>Abdomen</h3>
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
                    value={3}
                    pin={true}
                    pinFormatter={(value: number) => `${value}`}
                  ></IonRange>
                  <div className="tick-labels">
                    {tickValues.map((tickValue) => (
                      <div key={tickValue} className="tick-label">
                        {tickValue}
                      </div>
                    ))}
                  </div>
                </IonCol>
              </IonRow>
            </div>
          </div>
          <div className="add-custom-category ion-text-center ion-padding-top">
            <IonButton>
              <IonIcon icon={add} />
            </IonButton>
            <h4>Add Custom Category</h4>
          </div>
          <div className="section last">
            <div className="title">
              <h3>How I feel today</h3>
            </div>

            <div className="the-form">
              <div className="input-item">
                <IonItem lines="none">
                  <IonTextarea placeholder="Input Text" />
                </IonItem>
              </div>
            </div>
          </div>{" "}
        </div>
      </IonContent>
    </IonPage>
  );
}

export default JournalAdditionRemade;
