// components
import DashboardNav from "@components/dashboardnav";

const StudentNotesLayout = (props: any) => {
  return (
    <div>
      <div className="student-notes-layout-container">
        <div className="left-layout">
          <DashboardNav />
          <div>{props.children}</div>
        </div>
        <div className={`right-layout ${props.notesToggle ? "active" : ""}`}>{props.right}</div>
      </div>
    </div>
  );
};

export default StudentNotesLayout;
