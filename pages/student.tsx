import React from "react";
// layouts
import StudentLayout from "layouts/studentLayout";
// hoc
import withStudentAuth from "@lib/hoc/withStudentAuth";

const StudentDetail = (props: any) => {
  return (
    <div>
      <StudentLayout>
        <div>StudentDetail</div>
      </StudentLayout>
    </div>
  );
};

export default withStudentAuth(StudentDetail);
