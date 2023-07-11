import React from "react";
// components
import DashboardNav from "@components/dashboardnav";
import SidebarView from "@components/sidebar";
import TeacherSidebarView from "@components/UserSidebar";
import UserSidebarView from "@layouts/v2/student/sidebar";
// cookie
import { getAuthenticationToken } from "@lib/cookie";
// global context provider
import { globalContext } from "@contexts/global";

const AdminLayout = (props: any) => {
  const [globalState, globalDispatch] = React.useContext(globalContext);

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

  // console.log("details", tokenDetails.user.role);

  return (
    <div>
      <div className="admin-wrapper">
        {tokenDetails?.user?.role !== 0 && (
          <div className="top-layout">
            <DashboardNav />
          </div>
        )}

        <div className="bottom-layout">
          {tokenDetails && tokenDetails.info && tokenDetails.info.role === 2 ? (
            <div className={`left-layout ${globalState.sidebarToggle && "active"}`}>
              <SidebarView />
            </div>
          ) : tokenDetails && tokenDetails.info && tokenDetails.info.role === 1 ? (
            <div className={`left-layout ${globalState.sidebarToggle && "active"}`}>
              <TeacherSidebarView />
            </div>
          ) : (
            <div
              className={`left-layout student-side tw-transition-all tw-flex-shrink-0 tw-h-full tw-overflow-hidden ${
                globalState.sidebarToggle ? `!tw-w-[70px]` : `tw-w-[280px]`
              }`}
            >
              <UserSidebarView page={"my-calendar"} />
            </div>
          )}
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
