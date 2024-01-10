// react bootstrap
import { Form, Image, Row, Col, Table } from "react-bootstrap";
// icons
import { LeftArrowAlt } from "@styled-icons/boxicons-regular";
import { Star } from "@styled-icons/boxicons-regular/Star";
import { Star as StarFill } from "@styled-icons/boxicons-solid/Star";
import { CheckCircleFill } from "@styled-icons/bootstrap/CheckCircleFill";
import { Clock } from "@styled-icons/fa-solid/Clock";
import { CloseCircle } from "@styled-icons/evaicons-solid/CloseCircle";
// layouts
import ParentLayout from "layouts/ParentLayout";
// components
import CustomNavTabs from "@components/navtabs/customNavtabs";
import Sonnet from "@components/navtabs/Sonnet";
// hoc
import withParentAuth from "@lib/hoc/withParentAuth";
// components
import Page from "@components/page";
// constants
import { META_DESCRIPTION } from "@constants/page";
import ReportLayout from "@layouts/ReportLayout";
import AttendanceTable from "@components/new/attendanceTable";

const Attendance = () => {
  const navTabsData = [
    { title: "Overview", component: <Sonnet /> },
    { title: "Performance Breakdown", component: <Sonnet /> },
    { title: "Behaviour", component: <Sonnet /> },
    { title: "Attendance", component: <Sonnet /> },
    { title: "Syllabus Covered", component: <Sonnet /> },
  ];

  const attendanceData = [
    {
      topic: "Algebra",
      date_of_completion: "Feb 21,2024",
      attendance: "present",
      rewards: 20,
      teacher: "Raj gopal",
      product: "ACT",
    },
    {
      topic: "Algebra",
      date_of_completion: "Feb 21,2024",
      attendance: "absent",
      rewards: 20,
      teacher: "Raj gopal",
      product: "ACT",
    },
    {
      topic: "Algebra",
      date_of_completion: "Feb 21,2024",
      attendance: "late",
      rewards: 20,
      teacher: "Raj gopal",
      product: "ACT",
    },
    {
      topic: "Algebra",
      date_of_completion: "Feb 21,2024",
      attendance: "present",
      rewards: 20,
      teacher: "Raj gopal",
      product: "ACT",
    },
  ];
  const meta = {
    title: "Attendance",
    description: META_DESCRIPTION,
  };
  return (
    <Page meta={meta}>
      <ReportLayout>
        <div className="position-relative tw-space-y-10 ">
          <div className="d-flex justify-content-start gap-4">
            <Form.Group className="rounded-3">
              <Form.Control type="date" required />
            </Form.Group>
            <Form.Select
              className="tw-w-fit"
              style={{
                width: "10em",
              }}
            >
              <option>Attendance</option>
              <option>Overview</option>
              <option>Overview</option>
            </Form.Select>
          </div>
          <div className="position-relative d-flex gap-3">
            <div className="">
              <Image src="/exam.svg" width={"45"} />
            </div>
            <div className="tw-leading-3">
              <p className="mb-0 tw-font-semibold tw-text-lg p-0">20/24</p>
              <small className="text-muted mt-0 p-0">Attendance</small>
            </div>
          </div>

          <div className="d-flex justify-content-start gap-4">
            <Form.Select
              className="tw-w-fit"
              style={{
                width: "10em",
              }}
            >
              <option>Maths</option>
              <option>Overview</option>
              <option>Overview</option>
            </Form.Select>
            <Form.Select
              className="tw-w-fit"
              style={{
                width: "10em",
              }}
            >
              <option>Teacher</option>
              <option>Overview</option>
              <option>Overview</option>
            </Form.Select>
          </div>
          <div className="position-relative tw-space-y-5">
            <AttendanceTable attendanceData={attendanceData} />
            {/* <Row className="w-100 ">
              {[1, 2, 3, 4].map((ele: any, index: number) => (
                <Col md={3} className="p-3 position-relative tw-space-y-5" key={index}>
                  <div className="position-relative tw-text-2xl fw-bold ">WEEK {ele}</div>

                  <div className="position-relative tw-space-y-5">
                    <div className="d-flex gap-3 align-items-center">
                      <div className="p-2 rounded-1 tw-bg-gray-300 tw-leading-3 tw-text-center tw-h-14 tw-w-14">
                        <h5 className="m-0 p-0">1</h5>
                        <small className="tw-text-xs">Mon</small>
                      </div>
                      <div className="position-relative tw-text-xl tw-text-green-600 ">
                        <CheckCircleFill className="tw-w-4 me-2" />
                        Present
                      </div>
                    </div>
                    <div className="d-flex gap-3 align-items-center">
                      <div className="p-2 rounded-1 tw-bg-gray-300 tw-leading-3 tw-text-center tw-h-14 tw-w-14">
                        <h5 className="m-0 p-0">2</h5>
                        <small className="tw-text-xs">Tue</small>
                      </div>
                      <div className="position-relative tw-text-xl tw-text-green-600 ">
                        <CheckCircleFill className="tw-w-4 me-2" />
                        Present
                      </div>
                    </div>
                    <div className="d-flex gap-3 align-items-center">
                      <div className="p-2 rounded-1 tw-bg-gray-300 tw-leading-3 tw-text-center tw-h-14 tw-w-14">
                        <h5 className="m-0 p-0">3</h5>
                        <small className="tw-text-xs">Wed</small>
                      </div>
                      <div className="position-relative tw-text-xl tw-text-green-600 ">
                        <CheckCircleFill className="tw-w-4 me-2" />
                        Present
                      </div>
                    </div>
                    <div className="d-flex gap-3 align-items-center">
                      <div className="p-2 rounded-1 tw-bg-gray-300 tw-leading-3 tw-text-center tw-h-14 tw-w-14">
                        <h5 className="m-0 p-0">4</h5>
                        <small className="tw-text-xs ">Thu</small>
                      </div>
                      <div className="position-relative tw-text-xl text-warning ">
                        <Clock className="tw-w-4 me-2" />
                        Late
                      </div>
                    </div>
                    <div className="d-flex gap-3 align-items-center">
                      <div className="p-2 rounded-1 tw-bg-gray-300 tw-leading-3 tw-text-center tw-h-14 tw-w-14">
                        <h5 className="m-0 p-0">5</h5>
                        <small className="tw-text-xs">Fri</small>
                      </div>
                      <div className="position-relative tw-text-xl text-danger">
                        <CloseCircle className="tw-w-4 me-2" />
                        Absent
                      </div>
                    </div>
                    <div className="d-flex gap-3 align-items-center">
                      <div className="p-2 rounded-1 tw-bg-gray-300 tw-leading-3 tw-text-center tw-h-14 tw-w-14">
                        <h5 className="m-0 p-0">6</h5>
                        <small className="tw-text-xs">Sat</small>
                      </div>
                      <div className="position-relative tw-text-xl tw-text-green-600 ">
                        <CheckCircleFill className="tw-w-4 me-2" />
                        Present
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row> */}
          </div>
        </div>
      </ReportLayout>
    </Page>
  );
};

export default withParentAuth(Attendance);
