// react bootstrap
import { Button } from "react-bootstrap";
// components
import ZoomSessions from "@components/zoomsessions";
import MonthWeekDropdownView from "./monthWeekDropdownView";
// global imports
import { returnTime } from "@constants/global";

const CalendarWeekMonthCardDetailView = (props: any) => {
  return (
    <div>
      {props.data &&
        props.data.length > 0 &&
        props.data.map((dayElement: any, index: any) => (
          <div key={`day-element-${dayElement.id}`}>
            <div className="calendar-card global-dropdown">
              <MonthWeekDropdownView
                data={dayElement}
                users={props.users}
                role={props.role}
                currentDateQuery={props.currentDateQuery}
              >
                <>
                  <div className="header">{dayElement.title}</div>
                  <div className="time">{returnTime(dayElement.start_datetime)}</div>
                  <div className="instructor w-100">
                    {!props.bulkPreview && (
                      <ZoomSessions data={dayElement} role={props.role ? props.role : null} />
                    )}
                  </div>
                </>
              </MonthWeekDropdownView>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CalendarWeekMonthCardDetailView;
