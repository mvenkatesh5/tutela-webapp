import React from "react";
// material icons
import { ChevronLeft, ChevronRight } from "@styled-icons/boxicons-regular/";

const Calendar = () => {
  const calendarMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const calendarDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const [todayDate, setTodayDate] = React.useState(String);
  const [currentMonth, setCurrentMonth] = React.useState(Number);
  const [currentYear, setCurrentYear] = React.useState(Number);
  const [renderDateTitle, setRenderDateTitle] = React.useState(String);

  React.useEffect(() => {
    updateTodayDate(new Date());
  }, []);

  const updateNextDate = () => {
    const year = currentMonth === 11 ? currentYear + 1 : currentYear;
    const month = (currentMonth + 1) % 12;
    setCurrentMonth(month);
    setCurrentYear(year);
    setRenderDateTitle(calendarMonths[month] + " " + year);
  };

  const updatePreviousDate = () => {
    const year = currentMonth === 0 ? currentYear - 1 : currentYear;
    const month = currentMonth === 0 ? 11 : currentMonth - 1;
    setCurrentMonth(month);
    setCurrentYear(year);
    setRenderDateTitle(calendarMonths[month] + " " + year);
  };

  const updateTodayDate = (todayDateValue: any) => {
    setTodayDate(todayDateValue);
    setCurrentMonth(todayDateValue.getMonth());
    setCurrentYear(todayDateValue.getFullYear());
    setRenderDateTitle(
      `${
        calendarMonths[todayDateValue.getMonth()]
      } ${todayDateValue.getFullYear()}`
    );
  };

  const daysInMonth = (iMonth: any, iYear: any) => {
    return 32 - new Date(iYear, iMonth, 32).getDate();
  };

  const renderCalendar = () => {
    let firstDay = new Date(currentYear, currentMonth).getDay();
    let date = 1;
    let rowData = [];
    for (let i = 0; i < 6; i++) {
      let colData = [];
      let colCounter = 0;
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          colCounter = colCounter + 1;
          colData.push(
            <div
              className="calendar-column"
              key={`col-${i}-${j}-${date}`}
            ></div>
          );
        } else if (date > daysInMonth(currentMonth, currentYear)) {
          break;
        } else {
          colCounter = colCounter + 1;
          if (
            date === new Date(todayDate).getDate() &&
            currentYear === new Date(todayDate).getFullYear() &&
            currentMonth === new Date(todayDate).getMonth()
          ) {
            colData.push(
              <div
                key={`col-${i}-${j}-${date}`}
                className="calendar-column active"
              >
                {renderCalendarColumn(
                  currentYear,
                  currentMonth,
                  date,
                  calendarDays[j]
                )}
              </div>
            );
          } else {
            colData.push(
              <div className="calendar-column" key={`col-${i}-${j}-${date}`}>
                {renderCalendarColumn(
                  currentYear,
                  currentMonth,
                  date,
                  calendarDays[j]
                )}
              </div>
            );
          }
          date++;
        }
      }

      if (colCounter > 0 && colCounter <= 7) {
        let countData = 7 - colCounter;
        for (let k = 0; k < countData; k++) {
          colData.push(
            <div className="calendar-column old-dates" key={`col-extra-${k}`}>
              {k + 1}
            </div>
          );
        }
      }

      rowData.push(
        <div className="calendar-row" key={`row-${i}`}>
          {colData}
        </div>
      );
    }
    return rowData;
  };

  const renderCalendarColumn = (year: any, month: any, date: any, day: any) => {
    const data = {
      year: year,
      month: month + 1,
      date: date,
      day: day,
    };
    return (
      <div>
        <div>{data.date}</div>
      </div>
    );
  };

  return (
    <div>
      <div className="calendar-root shadow">
        {/* navigation */}
        <div className="calendar-navigation">
          <div className="left" onClick={updatePreviousDate}>
            <ChevronLeft />
          </div>
          <div
            className="middle text-center"
            onClick={() => updateTodayDate(new Date())}
          >
            {renderDateTitle && renderDateTitle}
          </div>
          <div className="right" onClick={updateNextDate}>
            <ChevronRight />
          </div>
        </div>
        {/* days */}
        <div className="calendar-header">
          {calendarDays &&
            calendarDays.length > 0 &&
            calendarDays.map((day, index) => <div className="item">{day}</div>)}
        </div>
        {/* calendar */}
        <div className="calendar-wrapper">{todayDate && renderCalendar()}</div>
      </div>
    </div>
  );
};

export default Calendar;
