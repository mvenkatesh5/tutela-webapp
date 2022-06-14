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
      <NewLayout sidebar={false}>
        <ReportHeader />
        <div className="container mx-auto mt-5">
          <div className="d-flex gap-3 pt-3 mb-5">
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
      </NewLayout>
    </Page>
  );
};

export default SyllabusPage;
