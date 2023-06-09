import React from "react";
// swr
import useSWR from "swr";
// react-bootstrap
import { Image } from "react-bootstrap";
// components
import DashboardNav from "@components/dashboardnav";
import UserSidebar from "@components/UserSidebar";
import UnratedSessions from "@components/UnratedSessions";
// material icons
import { Logout } from "@styled-icons/material-rounded/";
// api routes
import { UNRATED_SESSION_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";
// global context provider
import { globalContext } from "@contexts/global";
// cookie
import { getAuthenticationToken } from "@lib/cookie";
// cookie
import { logout } from "@lib/cookie";
// api services
import { SignOut } from "@lib/services/authenticationservice";

const StudentLayout = (props: any) => {
  const signOut = () => {
    SignOut()
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    logout();
  };

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

  const [tokenDetails, setTokenDetails] = React.useState<any>();
  React.useEffect(() => {
    if (getAuthenticationToken()) {
      let details: any = getAuthenticationToken();
      details = details ? JSON.parse(details) : null;
      if (details && details.info) {
        setTokenDetails(details);
      }
    }
  }, []);

  return (
    <>
      <div className="t-default-layout">
        {/* <div className="top-bar ">
          <DashboardNav />
        </div> */}
        <div className="bottom-bar">
          <div className={`t-side-bar ${globalState.sidebarToggle && "active"}`}>
            <UserSidebar />
          </div>
          {props.assessmentSidebar === true ? (
            <>{props.children}</>
          ) : (
            <div className="t-right-bar border tw-bg-[#E7D3B5] tw-bg-opacity-30">
              <>
                <div className="mt-4 d-flex tw-w-full px-2">
                  <div className="tw-ml-auto d-flex tw-gap-3 tw-items-center">
                    <div className="tw-w-10 tw-h-10 tw-rounded-full tw-flex-shrink-0">
                      <Image
                        src={tokenDetails?.user?.photo ? tokenDetails?.user?.photo : "/user.png"}
                        alt=""
                        className="tw-w-10 tw-h-10 tw-rounded-full"
                      />
                    </div>
                    <div className="">
                      <strong className="tw-font-base">
                        Welcome back {tokenDetails?.user?.username}
                      </strong>
                      <div className="tw-font-light tw-text-sm">Have a great learning!</div>
                    </div>
                    <div
                      className="tw-font-medium hover:tw-text-gray-600 tw-cursor-pointer tw-flex tw-items-center tw-gap-1 tw-ml-[20px]"
                      onClick={signOut}
                    >
                      <div>
                        <Logout className="tw-w-[20px]" />
                      </div>
                      <div className="tw-pt-[2px]">Logout</div>
                    </div>
                  </div>
                </div>
                {props.children}
              </>
            </div>
          )}
        </div>
      </div>
      {globalState.unratedSessions && globalState.unratedSessions.length > 0 && (
        <UnratedSessions data={globalState.unratedSessions} user={getRole("user")} />
      )}
    </>
  );
};

export default StudentLayout;
