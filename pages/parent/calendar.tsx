import React from "react";
// next imports
import Link from "next/link";
// react bootstrap
import { Button } from "react-bootstrap";
// material icons
import { Calendar } from "@styled-icons/boxicons-regular/Calendar";
// swr
import useSWR from "swr";
// layouts
import NewLayout from "@layouts/newLayout"; // components
import CalenderView from "@components/calendar";
// components
import SessionCreateView from "@components/admin/sessions/create";
import SessionBulkCreateView from "@components/admin/sessions/bulkCreate";
import CalenderDayView from "@components/admin/calenderviews/dayview";
import CalenderWeekView from "@components/admin/calenderviews/weekview";
import CalenderMonthView from "@components/admin/calenderviews/monthview";
import UserSelectCalendarView from "@components/UserSelectDropdown";
// global imports
import {
  calendarMonths,
  calendarDays,
  bindZero,
  returnDate,
  getCurrentUser,
} from "@constants/global";
// cookie
import { getAuthenticationToken } from "@lib/cookie";
// api routes
import { USER_ENDPOINT, USER_CALENDAR_SESSION_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";
// hoc
import withGlobalAuth from "@lib/hoc/withGlobalAuth";
// components
import Page from "@components/page";
// constants
import { META_DESCRIPTION } from "@constants/page";

const CalendarView = () => {
  const [currentSelectUser, setCurrentSelectUser] = React.useState<any>();
  const handleCurrentSelectUser = (user: any) => {
    setCurrentSelectUser(user);
    let currentUser = user && user.length > 0 ? user[0] : null;
    let currentUserRole = currentUser && currentUser > 0 ? "student" : userRole;
    handleStartEndDate(currentDate, currentRenderView, currentUserRole, currentUser);
  };

  const [calendarToggle, setCalendarToggle] = React.useState(false);
  const [userRole, setUserRole] = React.useState<any>();
  const [tokenDetails, setTokenDetails] = React.useState<any>();
  React.useEffect(() => {
    if (getAuthenticationToken()) {
      let details: any = getAuthenticationToken();
      details = details ? JSON.parse(details) : null;
      if (details) {
        setTokenDetails(details);
        setCurrentUser(details);
        if (details.info.role === 2) setUserRole("admin");
        else if (details.info.role === 1) setUserRole("teacher");
        else setUserRole("student");
      }
    }
  }, []);

  const renderViews = ["day", "week", "month"];
  const [currentRenderView, setCurrentRenderView] = React.useState("day");
  const handleCurrentRenderView = (value: any) => {
    setCurrentRenderView(value);
    let currentUser =
      currentSelectUser && currentSelectUser.length > 0 ? currentSelectUser[0] : null;
    let currentUserRole = currentUser && currentUser > 0 ? "student" : userRole;
    handleStartEndDate(currentDate, value, currentUserRole, currentUser);
  };

  const [currentDateQuery, setCurrentDateQuery] = React.useState<any>();
  const [currentDate, setCurrentDate] = React.useState(String);
  const handleCurrentDate = (value: any) => {
    setCurrentDate(value);
    let currentUser =
      currentSelectUser && currentSelectUser.length > 0 ? currentSelectUser[0] : null;
    let currentUserRole = currentUser && currentUser > 0 ? "student" : userRole;
    handleStartEndDate(value, currentRenderView, currentUserRole, currentUser);
  };

  const [startDate, setStartDate] = React.useState<any>();
  const [endDate, setEndDate] = React.useState<any>();
  const handleStartEndDate = (value: any, renderView: any, currentUserRole: any, user_id: any) => {
    if (renderView === "day") {
      setStartDate("");
      setEndDate("");
      handleCurrentDateQuery(value, null, renderView, currentUserRole, user_id);
    }
    if (renderView === "week") {
      const newDate = new Date(value);
      const firstDate: any = newDate.getDate() - newDate.getDay();
      const lastDate: any = firstDate + 6;

      const firstDateInWeek = new Date(newDate.setDate(firstDate));
      const lastDayInWeek = new Date(newDate.setDate(lastDate));

      setStartDate(firstDateInWeek);
      setEndDate(lastDayInWeek);
      handleCurrentDateQuery(firstDateInWeek, lastDayInWeek, renderView, currentUserRole, user_id);
    }
    if (renderView === "month") {
      const newDate = new Date(value);
      const firstDate: any = new Date(newDate.getFullYear(), newDate.getMonth(), 1);
      const lastDate: any = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0);
      setStartDate(firstDate);
      setEndDate(lastDate);
      handleCurrentDateQuery(firstDate, lastDate, renderView, currentUserRole, user_id);
    }
  };

  const handleCurrentDateQuery = (
    start_date: any,
    end_date: any,
    renderView: any,
    role: any,
    user_id: any
  ) => {
    let currentRoute: any = `date=${returnDate(start_date)}`;
    if (renderView === "day") {
      if (role != "admin") {
        if (user_id) currentRoute = currentRoute + `&user_id=${parseInt(user_id)}`;
        else {
          if (getCurrentUser() && getCurrentUser().user) {
            currentRoute = currentRoute + `&user_id=${getCurrentUser().user.id}`;
          }
        }
      }
    } else {
      currentRoute = `start_date=${returnDate(start_date)}&end_date=${returnDate(end_date)}`;
      if (role != "admin") {
        if (user_id) currentRoute = currentRoute + `&user_id=${parseInt(user_id)}`;
        else {
          if (tokenDetails && tokenDetails.user && tokenDetails.user.id) {
            currentRoute = currentRoute + `&user_id=${tokenDetails.user.id}`;
          }
        }
      }
    }
    setCurrentDateQuery(currentRoute);
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
    currentDateQuery ? [USER_CALENDAR_SESSION_ENDPOINT(currentDateQuery), currentDateQuery] : null,
    (url) => APIFetcher(url),
    { refreshInterval: 5000 }
  );

  const { data: userList, error: userListError } = useSWR(USER_ENDPOINT, APIFetcher);

  const meta = {
    title: "Calendar",
    description: META_DESCRIPTION,
  };

  const generateUniqueList = (arrayList: any) => {
    let uniqueNames: any = [];
    arrayList.forEach((element: any) => {
      if (!uniqueNames.includes(element)) uniqueNames.push(element);
    });
    return uniqueNames;
  };

  const [currentUser, setCurrentUser] = React.useState<any>();
  const [parentUsers, setParentUsers] = React.useState<any>();
  const [currentSelectedUser, setCurrentSelectedUser] = React.useState<any>();


  React.useEffect(() => {
    if (userList && userList.length > 0) {
      if (
        currentUser &&
        currentUser.user &&
        currentUser.user.linked_items &&
        currentUser.user.linked_items.students &&
        currentUser.user.linked_items.students.length > 0
      ) {
        let uniqueUsers = generateUniqueList(currentUser.user.linked_items.students);
        if (uniqueUsers && uniqueUsers.length > 0) {
          let uniqueUserDetails: any = [];
          uniqueUsers.forEach((element: any) => {
            let currentUser = userList.find(
              (userElement: any) => userElement.id === parseInt(element)
            );
            if (currentUser) uniqueUserDetails.push(currentUser);
          });
          if (uniqueUserDetails && uniqueUserDetails.length > 0) {
            setCurrentSelectedUser(uniqueUserDetails[0].id);
            setParentUsers(uniqueUserDetails);
          }
        }
      }
    }
  }, [userList && currentUser]);

  return (
    <Page meta={meta}>
      <div>
        <NewLayout>
          <div className="right-layout-calender overflow-auto">
            <div className="calender-root-wrapper">
              {currentRenderView == "day" && (
                <div className="left-wrapper">
                  {userRole && (
                    <CalenderView
                      renderView={currentRenderView}
                      currentDate={currentDate}
                      handleData={handleCurrentDate}
                      role={userRole}
                    />
                  )}
                  <div>
                    {parentUsers && parentUsers.length > 0 && (
                      <UserSelectCalendarView
                        data={currentSelectUser}
                        users={parentUsers}
                        handleData={handleCurrentSelectUser}
                      />
                    )}
                  </div>
                </div>
              )}

              <div className="right-wrapper">
                <div className="border-bottom pb-2 calender-right-header">
                  <div className="user-view-calender dropdown-wrapper p-0 calendar">
                    <div
                      className="dropdown-icon"
                      onClick={() => setCalendarToggle(!calendarToggle)}
                    >
                      <Calendar />
                    </div>
                    <div className={`dropdown-content ` + (calendarToggle ? `active` : ``)}>
                      {userRole && (
                        <CalenderView
                          clickOnDate={() => setCalendarToggle(!calendarToggle)}
                          renderView={currentRenderView}
                          currentDate={currentDate}
                          handleData={handleCurrentDate}
                          role={userRole}
                        />
                      )}
                    </div>
                  </div>
                  <div style={{ marginRight: "auto" }} className="today-date">
                    {currentDate && <div className="description">{renderDay()}</div>}
                    {currentDate && <div className="giant-heading">{renderDate()}</div>}
                  </div>
                  <div className="calendar-type">
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
                  <div className="divider"></div>
                  {userRole != "student" && (
                    <div style={{ marginLeft: "10px" }} className="calendar-session-create">
                      <SessionCreateView
                        users={userList}
                        currentDateQuery={currentDateQuery}
                        currentDate={currentDate}
                        role={userRole}
                      />
                    </div>
                  )}
                  {userRole === "admin" && (
                    <div style={{ marginLeft: "10px" }} className="calendar-bulk-session">
                      {/* <SessionBulkCreateView
                      users={userList}
                      currentDateQuery={currentDateQuery}
                      currentDate={currentDate}
                    /> */}
                      <Link href="/bulk-schedules">
                        <a>
                          <Button className="btn-sm">Schedule recurring sessions</Button>
                        </a>
                      </Link>
                    </div>
                  )}
                </div>

                <div style={{ marginTop: "10px" }}>
                  {currentRenderView === "day" ? (
                    <CalenderDayView
                      sessionList={sessionList}
                      users={userList}
                      role={userRole}
                      currentDateQuery={currentDateQuery}
                      sessionListError={sessionListError}
                      view="parent"
                    />
                  ) : currentRenderView === "week" ? (
                    <CalenderWeekView
                      users={userList}
                      currentDate={currentDate}
                      sessionList={sessionList}
                      startDate={startDate}
                      endDate={endDate}
                      role={userRole}
                      currentDateQuery={currentDateQuery}
                      sessionListError={sessionListError}
                    />
                  ) : (
                    <CalenderMonthView
                      users={userList}
                      currentDate={currentDate}
                      sessionList={sessionList}
                      startDate={startDate}
                      endDate={endDate}
                      role={userRole}
                      currentDateQuery={currentDateQuery}
                      sessionListError={sessionListError}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </NewLayout>
      </div>
    </Page>
  );
};

export default withGlobalAuth(CalendarView);
