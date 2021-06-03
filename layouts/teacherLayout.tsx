// components
import DashboardNav from "@components/dashboardnav";

const TeacherLayout = (props: any) => {
  return (
    <>
      <div className="t-default-layout">
        <div className="top-bar">
          <DashboardNav />
        </div>
        <div className="bottom-bar">
          <div>{props.children}</div>
        </div>
      </div>
    </>
  );
};

export default TeacherLayout;
