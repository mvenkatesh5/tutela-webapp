// material icons
import { SquareRounded } from "@styled-icons/boxicons-solid/SquareRounded";
// components
import MonthCardDropdownView from "./MonthCardDropdown";
import MonthWeekDropdownView from "./monthWeekDropdownView";
// global imports
import { returnTime } from "@constants/global";

const CalendarMonthCardView = (props: any) => {
  return (
    <div>
      {props.data && props.data.length > 0 && props.data.length > 3 ? (
        <>
          <div className="global-dropdown d-flex mb-1">
            <div className="ms-auto">
              <MonthCardDropdownView
                data={props.data}
                users={props.users}
                role={props.role}
                day={props.day}
                date={props.date}
                month={props.month}
                currentDateQuery={props.currentDateQuery}
              >
                <div className="month-card-extra"> {props.data.length - 3} more</div>
              </MonthCardDropdownView>
            </div>
          </div>
        </>
      ) : (
        <div className="mt-4"></div>
      )}

      {props.data &&
        props.data.length > 0 &&
        props.data.map((dayElement: any, index: any) => (
          <>
            {index < 3 && (
              <div key={`day-element-${dayElement.id}`}>
                <div className="calendar-month-card global-dropdown">
                  <MonthWeekDropdownView
                    data={dayElement}
                    users={props.users}
                    role={props.role}
                    currentDateQuery={props.currentDateQuery}
                  >
                    <div className="month-detail d-flex">
                      <div className="month-icon">
                        <SquareRounded />
                      </div>
                      <div className="month-content">
                        <div className="month-time">
                          {`${returnTime(dayElement.start_datetime)} - ${returnTime(
                            dayElement.end_datetime
                          )}`}
                        </div>
                        <div className="month-title">{dayElement.title}</div>
                      </div>
                    </div>
                  </MonthWeekDropdownView>
                </div>
              </div>
            )}
          </>
        ))}
    </div>
  );
};

export default CalendarMonthCardView;
