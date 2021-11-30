import React from "react";
// swr
import useSWR from "swr";
// components
import DashboardNav from "@components/dashboardnav";
import UserSidebar from "@components/UserSidebar";
import UnratedSessions from "@components/UnratedSessions";
// api routes
import { UNRATED_SESSION_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";
// global context provider
import { globalContext } from "@contexts/global";
// cookie
import { getAuthenticationToken } from "@lib/cookie";

const StudentLayout = (props: any) => {
  const [globalState, globalDispatch] = React.useContext(globalContext);

  const getRole = (role: any) => {
    let token: any = getAuthenticationToken();
    token = token ? JSON.parse(token) : null;
    if (token) {
      if (role === "role") {
        if (token) if (token && token.info && token.info.role === 0) return "student";
        return "admin";
      }
      if (token && token.user) return token.user;
      return null;
    }
  };

  const initialUnratedSessions = async () => {
    let role = getRole("role");
    if (role === "student")
      if (!globalState.unratedSessionStatus) {
        const response = await APIFetcher(UNRATED_SESSION_ENDPOINT);
        console.log("response", response);
        if (response) {
          globalDispatch({
            type: "UNRATED_SESSION_STATUS",
            payload: true,
          });
          globalDispatch({
            type: "UNRATED_SESSIONS",
            payload: response,
          });
        }
      }
  };

  React.useEffect(() => {
    initialUnratedSessions();
  }, []);

  return (
    <>
      <div className="t-default-layout">
        <div className="top-bar">
          <DashboardNav />
        </div>
        <div className="bottom-bar">
          <div className={`t-side-bar ${globalState.sidebarToggle && "active"}`}>
            <UserSidebar />
          </div>
          <div className="t-right-bar">
            <div>{props.children}</div>
          </div>
        </div>
      </div>
      {globalState.unratedSessions && globalState.unratedSessions.length > 0 && (
        <UnratedSessions data={globalState.unratedSessions} user={getRole("user")} />
      )}
    </>
  );
};

export default StudentLayout;
