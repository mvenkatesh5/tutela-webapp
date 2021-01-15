// components
import DashboardNav from "@components/dashboardnav";

const TeacherLayout = (props: any) => {
  return (
    <div>
      <DashboardNav />
      <div>{props.children}</div>
    </div>
  );
};

export default TeacherLayout;
