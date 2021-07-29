import React from "react";
// react bootstrap
import { Dropdown } from "react-bootstrap";
// material icon
import { SquareRounded } from "@styled-icons/boxicons-solid/SquareRounded";
// global imports
import { returnTime } from "@constants/global";
import MonthWeekDropdownView from "./monthWeekDropdownView";

const CalendarMonthCardDropdownView = (props: any) => {
  const [dropdownToggle, setDropdownToggle] = React.useState<any>(false);

  const months = [
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

  return (
    <div>
      <Dropdown
        onToggle={(value: any) => {
          setDropdownToggle(value);
        }}
        show={dropdownToggle}
      >
        <Dropdown.Toggle as="div" className="global-dropdown-toggle-white-space">
          {props.children}
        </Dropdown.Toggle>
        <Dropdown.Menu className="month-week-dropdown-content-wrapper p-2">
          <>
            <div className="description">{props.day}</div>
            <div className=" mb-2">
              {months[props.month]} {props.date}
            </div>

            {props.data &&
              props.data.length > 0 &&
              props.data.map((dayElement: any, index: any, i: Number) => (
                <>
                  {index > 2 && (
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
                              <SquareRounded className="icon-square me-1" />
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
          </>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default CalendarMonthCardDropdownView;
