// components
import DashboardNav from "@components/dashboardnav";

const StudentLayout = (props: any) => {
  return (
    <div>
      <DashboardNav />
      <div>{props.children}</div>
    </div>
  );
};

export default StudentLayout;
