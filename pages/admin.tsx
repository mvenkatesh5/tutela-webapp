import React from "react";
// next imports
import { useRouter } from "next/router";
// layouts
import AdminLayout from "@layouts/adminLayout";
// redirect
import redirect from "@lib/redirect";
// auth wrapper
import withAdminAuth from "@lib/hoc/withAdminAuth";

const Admin = () => {
  const router = useRouter();
  React.useEffect(() => {
    router.push("/admin/classrooms");
  }, []);

  return (
    <div>
      <AdminLayout />
    </div>
  );
};

Admin.getInitialProps = async (ctx: any) => {
  redirect(ctx, `/calendar`);
  return {};
};

export default withAdminAuth(Admin);
