// components
import DashboardNav from "@components/dashboardnav";
import SidebarView from "@components/sidebar";

const AdminLayout = (props: any) => {
  return (
    <div>
      <div className="admin-wrapper">
        <div className="top-layout">
          <DashboardNav />
        </div>
        <div className="bottom-layout">
          <div className="left-layout active">
            <SidebarView />
          </div>
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
