import React from "react";
// react-bootstrap
import { Image, Form } from "react-bootstrap";
// constants
import { META_DESCRIPTION } from "@constants/page";
// components
import Page from "@components/page";
import ReportHeader from "@components/new/ReportHeader";
import Dropdown from "@components/new/Dropdown";
import AttendanceTable from "@components/new/attendanceTable";
// layout
import NewLayout from "@layouts/newLayout";

const AttendancePage = () => {
  const meta = {
    title: "Attendance",
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
      attendance: "late",
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
          <div className="d-flex gap-3 pt-4 mb-5">
            <div>
              <Form.Group className="mb-3">
                <Form.Control type="date" required />
              </Form.Group>
            </div>

            <Dropdown name="Attendance">
              <div className="bg-light px-2 py-1">Attendance</div>
            </Dropdown>
          </div>

          <div className="d-flex align-items-center gap-2 my-3">
            <div className="flex-shrink-0 round-image-lg">
              <Image alt="" className="img-fluid d-block" src="/bird.svg" width="32" />
            </div>
            <div>
              <div className="fw-bolder lh-1">20/24</div>
              <small className="lh-1">Attendance</small>
            </div>
          </div>
          <div className="d-flex gap-3 pt-4 mb-5">
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

export default AttendancePage;
