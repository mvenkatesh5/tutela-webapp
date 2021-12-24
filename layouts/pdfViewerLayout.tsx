import React from "react";
// components
import DashboardNav from "@components/dashboardnav";
import SidebarView from "@components/sidebar";
// cookie
import { getAuthenticationToken } from "@lib/cookie";
// global context provider
import { globalContext } from "@contexts/global";

const PdfViewerLayout = (props: any) => {
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
      <div className="pdf-viewer-wrapper">
        <div className="left-layout-wrapper">
          <div className="top-layout">
            <DashboardNav />
          </div>
          <div className="bottom-layout">
            {tokenDetails && tokenDetails.info && tokenDetails.info.role === 2 && (
              <div className={`left-layout ${globalState.sidebarToggle && "active"}`}>
                <SidebarView />
              </div>
            )}
            {props.children}
          </div>
        </div>
        <div className={`right-layout-wrapper ${props.pdfToggle ? "active" : ""}`}>
          {props.right}
        </div>
      </div>
    </div>
  );
};

export default PdfViewerLayout;
