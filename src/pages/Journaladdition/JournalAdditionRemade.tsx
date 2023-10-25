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
import JournalAdditionApiService from "../../JournalService";

function JournalAdditionRemade() {
  const { dateParam } = useParams<{ dateParam: string }>();

  const [typeState, setTypeState] = useState({});

  const getJournalEntries = async () => {
    try {
      const data = await JournalAdditionApiService.get(
        `https://app.mynalu.com/wp-json/nalu-app/v1/journal/${dateParam}`
      );

      if (data.entries.length > 0) {
        const types = [...new Set(data.entries.map((item) => item.type))];
        const dynamicStates = {};

        types.forEach((type: any) => {
          dynamicStates[type] = data.entries.filter(
            (item: any) => item.type === type
          );
        });

        console.log("dynamic state", dynamicStates);
        setTypeState(dynamicStates);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getJournalEntries();
  }, []);

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

    let newWeekDays = [];
    while (loopDate <= loopEndDate) {
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
        </div>

        {/* {Object.keys(typeState).map((type: any, index) => (
          <div key={index}>
          

            {type.map((a: any) => (
              <h2>{a.label}</h2>

              if(a.type === "group"){
                {
                  a.fields.map((x)=>(
                    <>
                    
                    </>
                  ))
                }

              }

            ))}

            <ul>
              {typeState[type].map((item) => (
                <li key={item.name}>
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        ))} */}
      </IonContent>
    </IonPage>
  );
}

export default JournalAdditionRemade;
