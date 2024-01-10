import React, { Fragment } from "react";
// react-bootstrap
import { Form } from "react-bootstrap";
// constants
import { META_DESCRIPTION } from "@constants/page";
// components
import Page from "@components/page";
import ReportHeader from "@components/new/ReportHeader";
import Dropdown from "@components/new/Dropdown";
import AttendanceTable from "@components/new/attendanceTable";
// layout
import NewLayout from "@layouts/newLayout";
import ReportLayout from "@layouts/ReportLayout";

const SyllabusPage = () => {
  const meta = {
    title: "Syllabus",
    description: META_DESCRIPTION,
  };

  const attendanceData = [
    {
      topic: "Algebra",
      date_of_completion: "Feburary 1, 2021",
      rewards: "10",
      attendance: "present",
      teacher: "Raj Gopal",
      product: "ACT",
    },
    {
      topic: "Algebra",
      date_of_completion: "Feburary 1, 2021",
      rewards: "10",
      attendance: "present",
      teacher: "Raj Gopal",
      product: "ACT",
    },
    {
      topic: "Algebra",
      date_of_completion: "Feburary 1, 2021",
      rewards: "10",
      attendance: "present",
      teacher: "Raj Gopal",
      product: "ACT",
    },
    {
      topic: "Algebra",
      date_of_completion: "Feburary 1, 2021",
      rewards: "10",
      attendance: "Late",
      teacher: "Raj Gopal",
      product: "ACT",
    },
    {
      topic: "Algebra",
      date_of_completion: "Feburary 1, 2021",
      rewards: "10",
      attendance: "absent",
      teacher: "Raj Gopal",
      product: "ACT",
    },
  ];

  return (
    <Page meta={meta}>
      <ReportLayout>
        <div className="position-relative tw-space-y-10 ">
          <div className="d-flex flex-wrap gap-3 pt-3 mb-4">
            <div>
              <Form.Group className="mb-3">
                <Form.Control type="date" required />
              </Form.Group>
            </div>
            <Dropdown name="overview">
              <div className="bg-light px-2 py-1">Overview</div>
            </Dropdown>
            <Dropdown name="Maths">
              <div className="bg-light px-2 py-1">Maths</div>
            </Dropdown>
            <Dropdown name="Teacher">
              <div className="bg-light px-2 py-1">Teacher</div>
            </Dropdown>
          </div>

          {/* content  */}
          <AttendanceTable attendanceData={attendanceData} />
        </div>
      </ReportLayout>
    </Page>
  );
};

export default SyllabusPage;
