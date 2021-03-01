import React from "react";
// components
import CalendarWeekMonthCardDetailView from "./monthWeekCardView";
// global imports
import { calendarDays, returnDate, bindZero } from "@constants/global";

const CalendarMonthView = (props: any) => {
  const returnSessionWithDate = (date: any) => {
    let currentDatePayload: any = [];
    if (props.sessionList && props.sessionList.length > 0)
      props.sessionList.map((element: any, index: any) => {
        if (returnDate(element.start_datetime) === date) {
          currentDatePayload.push(element);
        }
      });
    return currentDatePayload;
  };

  const [todayDate, setTodayDate] = React.useState<any>(String);
  const [currentMonth, setCurrentMonth] = React.useState<any>(Number);
  const [currentYear, setCurrentYear] = React.useState<any>(Number);

  const [currentSelectDate, setCurrentSelectDate] = React.useState<any>(String);

  React.useEffect(() => {
    updateTodayDate(new Date(props.currentDate));
  }, [props.currentDate]);

  const updateTodayDate = (todayDateValue: any) => {
    setTodayDate(new Date());
    setCurrentSelectDate(todayDateValue);
    setCurrentMonth(todayDateValue.getMonth());
    setCurrentYear(todayDateValue.getFullYear());
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
              className="calendar-column month-view-calender-column"
              key={`col-${i}-${j}-${date}-empty`}
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
              <>
                {renderCalendarColumn(currentYear, currentMonth, date, calendarDays[j].key, true)}
              </>
            );
          } else {
            colData.push(
              <>
                {renderCalendarColumn(currentYear, currentMonth, date, calendarDays[j].key, false)}
              </>
            );
          }
          date++;
        }
      }

      if (colCounter > 0 && colCounter <= 7) {
        let countData = 7 - colCounter;
        for (let k = 0; k < countData; k++) {
          colData.push(
            <div
              className="calendar-column month-view-calender-column old-dates"
              key={`col-extra-${k}`}
            >
              {/* {k + 1} */}
            </div>
          );
        }
      }

      rowData.push(
        <div className="calendar-row month-view-calender-row" key={`row-${i}`}>
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

    return (
      <div
        key={`${data.date}-${data.month}-${data.year}-${data.day}`}
        className={
          `calendar-column month-view-calender-column ` +
          (active ? "today-active " : "") +
          (selectActive() ? "selected-active " : "")
        }
      >
        <div className="month-header">
          <div>{data.date}</div>
          <div>{data.day}</div>
        </div>
        <div className="month-content">
          {returnSessionWithDate(
            `${bindZero(data.date)}-${bindZero(data.month)}-${bindZero(data.year)}`
          ) && (
            <CalendarWeekMonthCardDetailView
              data={returnSessionWithDate(
                `${bindZero(data.date)}-${bindZero(data.month)}-${bindZero(data.year)}`
              )}
              role={props.role}
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="calendar-root shadow">
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

export default CalendarMonthView;
