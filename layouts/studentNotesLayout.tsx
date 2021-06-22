// components
import DashboardNav from "@components/dashboardnav";
import UserSidebar from "@components/UserSidebar";

const StudentNotesLayout = (props: any) => {
  return (
    <>
      <div className="student-notes-layout-container">
        <div className="left-layout-wrapper">
          <div className="top-layout">
            <DashboardNav />
          </div>
          <div className="bottom-layout">
            <div className="bottom-left-layout active">
              <UserSidebar />
            </div>
            <div className="bottom-right-layout">{props.children}</div>
          </div>
        </div>
        <div
          className={`right-layout-wrapper notes-wrapper-layout ${
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
