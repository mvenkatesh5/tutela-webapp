import React from "react";
// components
import CalendarWeekMonthCardDetailView from "./monthWeekCardView";
// global imports
import { calendarDays, returnDate, bindZero } from "@constants/global";

const CalenderWeekView = (props: any) => {
  const [currentWeekRenderData, setCurrentWeekRenderData] = React.useState<any>();

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

  const returnSessionWithDateRoot = () => {
    if (props.startDate && props.endDate) {
      const startDate: any = props.startDate;
      const endDate: any = props.endDate;
      let datePayload: any = [];
      for (let i: any = 0; i < 7; i++) {
        const today = new Date(startDate);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + i);
        const loopData: any = {
          current_date: returnDate(tomorrow),
          current_date_values: {
            day: tomorrow.getDate(),
            month: bindZero(tomorrow.getMonth() + 1),
            year: tomorrow.getFullYear(),
          },
          current_date_days: calendarDays[i],
          data: returnSessionWithDate(returnDate(tomorrow)),
          active: returnDate(props.currentDate) === returnDate(tomorrow) ? true : false,
        };
        if (loopData) datePayload.push(loopData);
      }
      setCurrentWeekRenderData(datePayload);
    }
  };

  React.useEffect(() => {
    if (props.startDate && props.endDate) returnSessionWithDateRoot();
  }, [props.startDate && props.endDate]);
  React.useEffect(() => {
    if (props.startDate && props.endDate) returnSessionWithDateRoot();
  }, [props.sessionList]);

  return (
    <div>
      <div className="calendar-week-wrapper">
        <div className="week-wrapper-header">
          {currentWeekRenderData &&
            currentWeekRenderData.length > 0 &&
            currentWeekRenderData.map((day: any, index: any) => (
              <div
                className={`item ` + (day.active ? "active" : "")}
                key={`calender-days-${index}`}
              >
                <span className="me-2">
                  {day.current_date_values && day.current_date_values.day}
                </span>
                <span>{day.current_date_days && day.current_date_days.key}</span>
              </div>
            ))}
        </div>

        {!props.sessionListError && !props.sessionList ? (
          <div className="text-center text-muted mt-5 mb-5">Loading...</div>
        ) : (
          <div className="week-wrapper-content">
            {currentWeekRenderData &&
              currentWeekRenderData.length > 0 &&
              currentWeekRenderData.map((day: any, index: any) => (
                <div
                  className={`item ` + (day.active ? "active" : "")}
                  key={`calender-days-${index}`}
                >
                  <CalendarWeekMonthCardDetailView data={day.data} role={props.role} />
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalenderWeekView;
