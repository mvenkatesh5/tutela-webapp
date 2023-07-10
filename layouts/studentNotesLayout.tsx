import React from "react";
// components
import DashboardNav from "@components/dashboardnav";
import UserSidebar from "@components/UserSidebar";
import UserSidebarView from "@layouts/v2/student/sidebar";
import UserHeaderView from "@layouts/v2/student/header";
// global context provider
import { globalContext } from "@contexts/global";

const StudentNotesLayout = (props: any) => {
  const [globalState, globalDispatch] = React.useContext(globalContext);

  return (
    <>
      <div className="student-notes-layout-container">
        <div className="left-layout-wrapper">
          <div className="bottom-layout">
            {/* <div className="bottom-left-layout active">
              <UserSidebar />
            </div> */}
            <div
              className={`left-layout student-side tw-transition-all tw-flex-shrink-0 tw-h-full tw-overflow-hidden ${
                globalState.sidebarToggle ? `!tw-w-[70px]` : `tw-w-[280px]`
              }`}
            >
              <UserSidebarView page={"my-resources"} />
            </div>
            <div className="bottom-right-layout tw-bg-[#E7D3B5] tw-bg-opacity-10">
              <div className="tw-h-[70px] tw-w-full tw-flex-shrink-0">
                <UserHeaderView />
              </div>
              <div>{props.children}</div>
            </div>
          </div>
        </div>
        <div
          className={`right-layout-wrapper notes-wrapper-layout tw-bg-[#E7D3B5] tw-bg-opacity-30 ${
            props.notesToggle ? "active" : ""
          }`}
        >
          {props.right}
        </div>
        <div
          className={`right-layout-wrapper pdf-wrapper-layout ${props.pdfToggle ? "active" : ""}`}
        >
          {props.rightPdfBlock}
        </div>
      </div>
    </>
  );
};

export default StudentNotesLayout;
