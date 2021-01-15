import React from "react";
// swr
import useSWR from "swr";
// layouts
import AdminLayout from "@layouts/adminLayout";
// components
import CalenderView from "@components/calendar";
// components
import SessionCreateView from "@components/admin/sessions/create";
import CalenderDayView from "@components/admin/calenderviews/dayview";
import CalenderWeekView from "@components/admin/calenderviews/weekview";
import CalenderMonthView from "@components/admin/calenderviews/monthview";
// global imports
import { calendarMonths, calendarDays } from "@constants/global";
// api routes
import { SESSION_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";
// hoc
import withAdminAuth from "@lib/hoc/withAdminAuth";

const Admin = () => {
  const [currentDate, setCurrentDate] = React.useState(String);
  const handleCurrentDate = (value: any) => {
    setCurrentDate(value);
  };

  const renderViews = ["day", "week", "month"];
  const [currentRenderView, setCurrentRenderView] = React.useState("day");

  const renderDate = () => {
    const date = new Date(currentDate);
    return `${date.getDate()} ${calendarMonths[date.getMonth()].fullName} ${date.getFullYear()}`;
  };
  const renderDay = () => {
    const date = new Date(currentDate);
    return `${calendarDays[date.getDay()].fullName}`;
  };

  const { data: sessionList, error: sessionListError } = useSWR(SESSION_ENDPOINT, APIFetcher);

  return (
    <div>
      <AdminLayout>
        <div className="right-layout-calender">
          {/* <Container className="border h-100 p-0"> */}
          <div className="calender-root-wrapper">
            <div className="left-wrapper">
              <CalenderView renderView={currentRenderView} handleData={handleCurrentDate} />
            </div>
            <div className="right-wrapper">
              <div className="d-flex flex-row align-items-center border-bottom pb-2">
                <div style={{ marginRight: "auto" }}>
                  {currentDate && <div className="description">{renderDay()}</div>}
                  {currentDate && <div className="giant-heading">{renderDate()}</div>}
                </div>
                <div style={{ marginRight: "20px" }}>
                  <div className="d-flex flex-row align-items-center calender-render-view">
                    {renderViews.map((data, index) => (
                      <div
                        key={data}
                        className={data === currentRenderView ? "active " : ""}
                        onClick={() => setCurrentRenderView(data)}
                      >
                        {data}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <SessionCreateView />
                </div>
              </div>

              <div style={{ marginTop: "10px" }}>
                {currentRenderView === "day" ? (
                  <CalenderDayView sessionList={sessionList} />
                ) : currentRenderView === "week" ? (
                  <CalenderWeekView sessionList={sessionList} />
                ) : (
                  <CalenderMonthView sessionList={sessionList} />
                )}
              </div>
            </div>
          </div>
          {/* </Container> */}
        </div>
      </AdminLayout>
    </div>
  );
};

export default withAdminAuth(Admin);
