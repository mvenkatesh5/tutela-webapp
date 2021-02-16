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
import { calendarMonths, calendarDays, bindZero, returnDate } from "@constants/global";
// cookie
import { getAuthenticationToken } from "@lib/cookie";
// api routes
import { USER_ENDPOINT, USER_CALENDAR_SESSION_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";
// hoc
import withAdminAuth from "@lib/hoc/withAdminAuth";

const Admin = () => {
  const [tokenDetails, setTokenDetails] = React.useState<any>();
  React.useEffect(() => {
    if (getAuthenticationToken()) {
      let details: any = getAuthenticationToken();
      details = details ? JSON.parse(details) : null;
      if (details) {
        setTokenDetails(details);
      }
    }
  }, []);

  const renderViews = ["day", "week", "month"];
  const [currentRenderView, setCurrentRenderView] = React.useState("day");
  const handleCurrentRenderView = (value: any) => {
    setCurrentRenderView(value);
    handleStartEndDate(currentDate, value);
  };

  const [currentDateQuery, setCurrentDateQuery] = React.useState<any>();
  const [currentDate, setCurrentDate] = React.useState(String);
  const handleCurrentDate = (value: any) => {
    setCurrentDate(value);
    handleStartEndDate(value, currentRenderView);
  };

  const [startDate, setStartDate] = React.useState<any>();
  const [endDate, setEndDate] = React.useState<any>();
  const handleStartEndDate = (value: any, renderView: any) => {
    if (renderView === "day") {
      setStartDate("");
      setEndDate("");
      handleCurrentDateQuery(value, null, renderView);
    }
    if (renderView === "week") {
      const newDate = new Date(value);
      const firstDate: any = newDate.getDate() - newDate.getDay();
      const lastDate: any = firstDate + 6;

      const firstDateInWeek = new Date(newDate.setDate(firstDate));
      const lastDayInWeek = new Date(newDate.setDate(lastDate));

      setStartDate(firstDateInWeek);
      setEndDate(lastDayInWeek);
      handleCurrentDateQuery(firstDateInWeek, lastDayInWeek, renderView);
    }
    if (renderView === "month") {
      const newDate = new Date(value);
      const firstDate: any = new Date(newDate.getFullYear(), newDate.getMonth(), 1);
      const lastDate: any = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0);
      setStartDate(firstDate);
      setEndDate(lastDate);
      handleCurrentDateQuery(firstDate, lastDate, renderView);
    }
  };

  const handleCurrentDateQuery = (start_date: any, end_date: any, renderView: any) => {
    if (renderView === "day") {
      setCurrentDateQuery(`date=${returnDate(start_date)}`);
    } else {
      setCurrentDateQuery(`start_date=${returnDate(start_date)}&end_date=${returnDate(end_date)}`);
    }
  };

  const renderDate = () => {
    const date = new Date(currentDate);
    return `${date.getDate()} ${calendarMonths[date.getMonth()].fullName} ${date.getFullYear()}`;
  };
  const renderDay = () => {
    const date = new Date(currentDate);
    return `${calendarDays[date.getDay()].fullName}`;
  };

  const { data: sessionList, error: sessionListError } = useSWR(
    currentDateQuery
      ? [
          USER_CALENDAR_SESSION_ENDPOINT(currentDateQuery && currentDateQuery),
          currentDateQuery && currentDateQuery,
        ]
      : null,
    (url) => APIFetcher(url),
    { refreshInterval: 0 }
  );
  const { data: userList, error: userListError } = useSWR(USER_ENDPOINT, APIFetcher);

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
                        onClick={() => handleCurrentRenderView(data)}
                      >
                        {data}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <SessionCreateView users={userList} />
                </div>
              </div>

              <div style={{ marginTop: "10px" }}>
                {currentRenderView === "day" ? (
                  <CalenderDayView sessionList={sessionList} role="admin" />
                ) : currentRenderView === "week" ? (
                  <CalenderWeekView
                    currentDate={currentDate}
                    sessionList={sessionList}
                    startDate={startDate}
                    endDate={endDate}
                    role="admin"
                  />
                ) : (
                  <CalenderMonthView
                    currentDate={currentDate}
                    sessionList={sessionList}
                    startDate={startDate}
                    endDate={endDate}
                    role="admin"
                  />
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
