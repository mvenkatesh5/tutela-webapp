import React from "react";
// components
import DashboardNav from "@components/new/Navbar";
import SidebarView from "@components/new/Sidebar";
// cookie
import { getAuthenticationToken } from "@lib/cookie";
// global context provider
import { globalContext } from "@contexts/global";

const NewLayout = ({ children, sidebar = true }: any) => {
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

  return (
    <div>
      <div className="new-layout-wrapper">
        <div className="top-layout">
          <DashboardNav />
        </div>
        <div className="bottom-layout">
          {sidebar && (
            <div className={`left-layout ${globalState.sidebarToggle && "active"}`}>
              <SidebarView />
            </div>
          )}
          <div className="w-100 h-100" style={{ overflow: "auto" }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewLayout;
