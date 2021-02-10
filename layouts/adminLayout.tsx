import React from "react";
// components
import DashboardNav from "@components/dashboardnav";
import SidebarView from "@components/sidebar";
// cookie
import { getAuthenticationToken } from "@lib/cookie";

const AdminLayout = (props: any) => {
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
      <div className="admin-wrapper">
        <div className="top-layout">
          <DashboardNav />
        </div>
        <div className="bottom-layout">
          {tokenDetails && tokenDetails.info && tokenDetails.info.role === 2 && (
            <div className="left-layout active">
              <SidebarView />
            </div>
          )}
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
