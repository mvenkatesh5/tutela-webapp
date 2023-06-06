import React from "react";
// material icons
import { ChevronLeft, ChevronRight } from "@styled-icons/boxicons-regular/";
// global imports
import { calendarMonths, calendarDays } from "@constants/global";

const Calendar = (props: any) => {
  const [todayDate, setTodayDate] = React.useState(String);
  const [currentMonth, setCurrentMonth] = React.useState(Number);
  const [currentYear, setCurrentYear] = React.useState(Number);

  const [currentSelectDate, setCurrentSelectDate] = React.useState(String);
  const [renderDateTitle, setRenderDateTitle] = React.useState(String);

  React.useEffect(() => {
    updateTodayDate(new Date());
  }, []);

  const updateNextDate = () => {
    const year = currentMonth === 11 ? currentYear + 1 : currentYear;
    const month = (currentMonth + 1) % 12;
    setCurrentMonth(month);
    setCurrentYear(year);
    setRenderDateTitle(calendarMonths[month].fullName + " " + year);
  };

  const updatePreviousDate = () => {
    const year = currentMonth === 0 ? currentYear - 1 : currentYear;
    const month = currentMonth === 0 ? 11 : currentMonth - 1;
    setCurrentMonth(month);
    setCurrentYear(year);
    setRenderDateTitle(calendarMonths[month].fullName + " " + year);
  };

  const updateTodayDate = (todayDateValue: any) => {
    setTodayDate(todayDateValue);
    setCurrentSelectDate(todayDateValue);
    setCurrentMonth(todayDateValue.getMonth());
    setCurrentYear(todayDateValue.getFullYear());
    setRenderDateTitle(
      `${calendarMonths[todayDateValue.getMonth()].fullName} ${todayDateValue.getFullYear()}`
    );
    props.handleData(todayDateValue);
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
          colData.push(<div className="calendar-column" key={`col-${i}-${j}-${date}-empty`}></div>);
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
              renderCalendarColumn(currentYear, currentMonth, date, calendarDays[j].key, true)
            );
          } else {
            colData.push(
              renderCalendarColumn(currentYear, currentMonth, date, calendarDays[j].key, false)
            );
          }
          date++;
        }
      }

      if (colCounter > 0 && colCounter <= 7) {
        let countData = 7 - colCounter;
        for (let k = 0; k < countData; k++) {
          colData.push(
            <div className="calendar-column old-dates" key={`col-extra-${k}-next-month`}>
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

  const renderCalendarColumn = (year: any, month: any, date: any, day: any, active: Boolean) => {
    const data = {
      year: year,
      month: month + 1,
      date: date,
      day: day,
    };

    const selectActive = () => {
      if (
        data.month === new Date(currentSelectDate).getMonth() + 1 &&
        data.year === new Date(currentSelectDate).getFullYear() &&
        data.date === new Date(currentSelectDate).getDate()
      )
        return true;
      return false;
    };

    const handleSelectedDate = () => {
      // if (props.renderView === "day") {
      const newDate = new Date(data.year, data.month - 1, data.date);
      setCurrentSelectDate(newDate.toString());
      props.handleData(newDate);
      if (props.clickOnDate) {
        props.clickOnDate();
      }
      // }
    };

    return (
      <div
        key={`${data.date}-${data.month}-${data.year}-${data.day}`}
        className={
          `calendar-column ` +
          (active ? "today-active " : "") +
          (selectActive() ? "selected-active " : "")
        }
        onClick={handleSelectedDate}
      >
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
          <div className="middle text-center" onClick={() => updateTodayDate(new Date())}>
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
            calendarDays.map((day, index) => (
              <div className="item" key={`calender-days-${index}`}>
                {day.key}
              </div>
            ))}
        </div>
        {/* calendar */}
        <div className="calendar-wrapper">{todayDate && renderCalendar()}</div>
      </div>
    </div>
  );
};

export default Calendar;
