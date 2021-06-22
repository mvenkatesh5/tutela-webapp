// components
import DashboardNav from "@components/dashboardnav";
import UserSidebar from "@components/UserSidebar";

const StudentLayout = (props: any) => {
  return (
    <>
      <div className="t-default-layout">
        <div className="top-bar">
          <DashboardNav />
        </div>
        <div className="bottom-bar">
          <div className="t-side-bar active">
            <UserSidebar />
          </div>
          <div className="t-right-bar">
            <div>{props.children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentLayout;
