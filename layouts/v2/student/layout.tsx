import React from "react";
// components
import Sidebar from "./sidebar";
import Header from "./header";
// api routes
import { UNRATED_SESSION_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";
// cookie
import { getAuthenticationToken } from "@lib/cookie";
// global context provider
import { globalContext } from "@contexts/global";

const StudentLayout = ({ children, page = "dashboard" }: any) => {
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
    <div className="tw-w-screen tw-h-screen tw-overflow-hidden tw-relative tw-flex tw-justify-center tw-items-center">
      <div
        className={`tw-transition-all tw-flex-shrink-0 tw-h-full tw-overflow-hidden ${
          globalState.sidebarToggle ? `tw-w-[70px]` : `tw-w-[280px]`
        }`}
      >
        <Sidebar page={page} />
      </div>
      <div className="tw-w-full tw-h-full tw-overflow-hidden tw-relative tw-flex tw-flex-col tw-bg-[#E7D3B5] tw-bg-opacity-10">
        <div className="tw-h-[70px] tw-w-full tw-flex-shrink-0">
          <Header />
        </div>
        <div className="tw-w-full tw-h-full tw-overflow-hidden">{children}</div>
      </div>
    </div>
  );
};

export default StudentLayout;
