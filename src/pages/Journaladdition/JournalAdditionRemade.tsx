import { useState, useRef, useEffect } from "react";
import "./journaladditionremade.scss";
import { IonContent, IonPage } from "@ionic/react";
import { useParams } from "react-router-dom";
import newMoon from "../../assets/images/new moon.svg";
import fullMoon from "../../assets/images/full moon.svg";

function JournalAdditionRemade() {
  const { dateParam } = useParams<{ dateParam: string }>();

  useEffect(() => {
    console.log("first", dateParam);

    let date = new Date(dateParam);

    const monthName = date.toLocaleDateString("en-US", { month: "long" });

    setJournalDate(monthName);

    setActiveDate(new Date(dateParam).getDate());
    setActiveMonth(new Date(dateParam).getMonth());
    setActiveYear(new Date(dateParam).getFullYear());

    setTimeout(() => {
      const el = document.getElementById(dateParam);
      console.log("newELParam", el);
      if (el !== null) {
        el.scrollIntoView({ behavior: "smooth", inline: "center" });
      }
    }, 500);
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
  const divRef = useRef<HTMLDivElement>(null);

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
    console.log("today", today);
    let newWeekDays = [];
    while (loopDate <= loopEndDate) {
      console.log("toffy", today);
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

  // function getMonthName(monthNumber) {
  //   const months = [
  //     "January",
  //     "February",
  //     "March",
  //     "April",
  //     "May",
  //     "June",
  //     "July",
  //     "August",
  //     "September",
  //     "October",
  //     "November",
  //     "December",
  //   ];

  //   if (monthNumber >= 1 && monthNumber <= 12) {
  //     return months[monthNumber - 1];
  //   } else {
  //     return "Invalid Month";
  //   }
  // }
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   const scrollContainer = scrollContainerRef.current;
  //   console.log("scrollContainer", scrollContainer);
  //   if (scrollContainer) {
  //     const handleScroll = () => {
  //       const dayDivs = scrollContainer.querySelectorAll(".day"); // Change the selector as needed
  //       const scrollPosition = scrollContainer.scrollLeft;

  //       let currentDivId = "";

  //       for (const dayDiv of dayDivs) {
  //         const dateDiv = dayDiv.querySelector(".date") as HTMLElement;
  //         const divLeft =
  //           dateDiv.getBoundingClientRect().left -
  //           scrollContainer.getBoundingClientRect().left;
  //         const divWidth = dateDiv.clientWidth;

  //         if (
  //           scrollPosition >= divLeft &&
  //           scrollPosition < divLeft + divWidth
  //         ) {
  //           currentDivId = dateDiv.id;
  //           break;
  //         }
  //       }

  //       console.log("Currently at div with ID:", currentDivId);
  //       if (currentDivId) {
  //         let month = new Date(currentDivId).getMonth();

  //         const monthName = getMonthName(month + 1);

  //         setJournalDate(monthName);
  //       }
  //     };

  //     scrollContainer.addEventListener("scroll", handleScroll);

  //     return () => {
  //       scrollContainer.removeEventListener("scroll", handleScroll);
  //     };
  //   }
  // }, []);

  const handleHorizontalScroll = () => {
    let e = document.getElementById("day-heading");

    if (Math.ceil(e.scrollLeft) + e.clientWidth >= e.scrollWidth) {
      console.log("reached Right");

      let date = new Date(dateRange[1]);
      let y = date.getFullYear(),
        m = date.getMonth();

      // const monthNumber = m + 1;
      // const monthName = getMonthName(monthNumber);

      // setJournalDate(monthName);

      let lastDay = formatDates(new Date(y, m + 2, 0));
      console.log("lastDay", dateRange[1], lastDay, m, [dateRange[0], lastDay]);
      setDateRange([dateRange[0], lastDay]);
    } else if (e.scrollLeft <= 0) {
      console.log("reached Left");
      let date = new Date(dateRange[0]);
      date.setMonth(date.getMonth() - 1);
      let y = date.getFullYear(),
        m = date.getMonth();

      // const monthNumber = m - 1;
      // const monthName = getMonthName(monthNumber);

      // setJournalDate(monthName);

      let firstDay = formatDates(new Date(y, m, 1));
      console.log("firstDay", firstDay);
      console.log("scrollWidth", e.scrollWidth, e.clientWidth);
      setDateRange([firstDay, dateRange[1]]);
    }
  };

  return (
    <IonPage>
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
                        className="daysIcon" // Apply custom styles to control image display
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
        </div>
      </IonContent>
    </IonPage>
  );
}

export default JournalAdditionRemade;
