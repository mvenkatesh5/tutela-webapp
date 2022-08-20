// react bootstrap
import { Image } from "react-bootstrap";
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
                  <div className="time">
                    {`${returnTime(dayElement.start_datetime)} - ${returnTime(
                      dayElement.end_datetime
                    )}`}
                  </div>
                  <div
                    className="badge text-dark ms-2"
                    style={{
                      fontSize: `10px`,
                      border: `2px solid ${
                        props.data.kind === "ONLINE" ? `rgba(169, 211, 158)` : `rgba(200, 158, 211)`
                      }`,
                      borderRadius: "3px",
                      backgroundColor: `${
                        props.data.kind === "ONLINE"
                          ? `rgba(169, 211, 158, 0.3)`
                          : `rgba(200, 158, 211, 0.3)`
                      }`,
                    }}
                  >
                    {props.data?.kind}
                  </div>
                  <div className="mt-1 mb-1">
                    {dayElement.session_users &&
                      dayElement.session_users.length > 0 &&
                      dayElement.session_users.map((userData: any, index: any) => (
                        <>
                          {userData.as_role === 1 && (
                            <>
                              <div className="d-flex align-items-center" style={{ gap: "10px" }}>
                                <Image
                                  src="/bird.svg"
                                  style={{ borderRadius: "2px", width: "20px", height: "20px" }}
                                  alt=""
                                />
                                <small className="text-secondary">{userData.user.username}</small>
                              </div>
                            </>
                          )}
                        </>
                      ))}
                  </div>

                  <div className="instructor">
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
