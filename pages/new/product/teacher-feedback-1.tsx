import React from "react";
// layout
import NewLayout from "@layouts/newLayout";
// bootstrap
import { Col, Row, Image, ProgressBar, Dropdown } from "react-bootstrap";
// icons
import { ChevronDown } from "@styled-icons/boxicons-regular/ChevronDown";
// constants
import { META_DESCRIPTION } from "@constants/page";
// components
import Page from "@components/page";
import SessionCard from "@components/new/teacherFeedback/SessionCard";
import ReportCard from "@components/new/teacherFeedback/ReportCard";

const TeacherFeedback = () => {
  const meta = {
    title: "Teacher Feedback",
    description: META_DESCRIPTION,
  };
  const [finished, setFinished] = React.useState("unfinished");
  const meetings = [
    {
      id: 1,
      name: "Meeting Name",
      timing: "8 AM - 9 AM",
      image: "/bird.svg",
      progress: 8,
      students: [
        { id: 1, name: "Student Name 1", image: "/bird.svg", progress: 4 },
        { id: 2, name: "Student Name 2", image: "/bird.svg", progress: 5 },
        { id: 3, name: "Student Name 3", image: "/bird.svg", progress: 3 },
        { id: 4, name: "Student Name 4", image: "/bird.svg", progress: 4 },
        { id: 5, name: "Student Name 5", image: "/bird.svg", progress: 2 },
        { id: 6, name: "Student Name 6", image: "/bird.svg", progress: 4 },
        { id: 7, name: "Student Name 7", image: "/bird.svg", progress: 1 },
        { id: 8, name: "Student Name 8", image: "/bird.svg", progress: 4 },
        { id: 9, name: "Student Name 9", image: "/bird.svg", progress: 0 },
        { id: 10, name: "Student Name 10", image: "/bird.svg", progress: 1 },
        { id: 11, name: "Student Name 11", image: "/bird.svg", progress: 5 },
        { id: 12, name: "Student Name 12", image: "/bird.svg", progress: 4 },
      ],
      topics: [
        { name: "topic 1", id: 1 },
        { name: "topic 2", id: 2 },
      ],
    },
    {
      id: 2,
      name: "Meeting Name",
      timing: "8 AM - 9 AM",
      image: "/bird.svg",
      progress: 10,
      students: [
        { id: 5, name: "Student Name 5", image: "/bird.svg", progress: 1 },
        { id: 6, name: "Student Name 6", image: "/bird.svg", progress: 2 },
        { id: 7, name: "Student Name 7", image: "/bird.svg", progress: 3 },
        { id: 8, name: "Student Name 8", image: "/bird.svg", progress: 4 },
      ],
      topics: [{ name: "topic 1 alpha", id: 3 }],
    },
    {
      id: 3,
      name: "Meeting Name",
      timing: "8 AM - 9 AM",
      image: "/bird.svg",
      students: [
        { id: 9, name: "Student Name 9", image: "/bird.svg", progress: 0 },
        { id: 10, name: "Student Name 10", image: "/bird.svg", progress: 0 },
        { id: 11, name: "Student Name 11", image: "/bird.svg", progress: 2 },
        { id: 12, name: "Student Name 12", image: "/bird.svg", progress: 6 },
      ],
      topics: [
        { name: "topic 1 beta", id: 4 },
        { name: "topic 2 beta", id: 5 },
        { name: "topic 3 ", id: 6 },
      ],
    },
  ];

  const tabs = [
    { name: "Unfinished", key: "unfinished" },
    { name: "Finished", key: "finished" },
  ];

  const [selected, setSelected] = React.useState<any>(meetings[0]);

  const [studentDetail, setStudentDetail] = React.useState<any>(selected.students[0]);

  return (
    <Page meta={meta}>
      <NewLayout sidebar={false}>
        <div style={{ margin: "0px" }} className="h-100 overflow-hidden">
          <div
            style={{ background: "#0052CC" }}
            className="p-4 text-white d-flex justify-content-between align-items-center"
          >
            <h3 className="">Session Feedback</h3>
            <div>Skip for now</div>
          </div>
          <Row className="h-100">
            <Col className="border h-100 overflow-auto pb-5" md={3}>
              <div className="d-flex gap-5 fw-bold border-bottom px-4 pt-2">
                {tabs &&
                  tabs.map((data: any, index: any) => (
                    <div
                      key={index}
                      className="cursor-pointer"
                      onClick={() => setFinished(data.key)}
                    >
                      <div
                        className={` p-2 ${finished == data.key ? "text-primary" : "text-muted"}`}
                      >
                        {data.name}
                      </div>
                      {finished == data.key && <div className="bg-primary pt-1 rounded"></div>}
                    </div>
                  ))}
              </div>
              <div className="px-3 pb-5">
                {meetings &&
                  meetings.map((data: any, index: any) => (
                    <div key={`meetings-${index}-index-data`}>
                      <SessionCard
                        data={data}
                        setSelected={setSelected}
                        selected={selected}
                        setStudentDetail={setStudentDetail}
                      />
                    </div>
                  ))}
              </div>
            </Col>
            <Col className="border h-100 overflow-auto p-4 pb-5" md={3}>
              <h3>Students</h3>
              <div className="pb-5">
                {selected &&
                  selected.students &&
                  selected.students.map((student: any, index: any) => (
                    <div
                      className={` my-2 border rounded p-2 d-flex align-items-center gap-2 ${
                        student.id === studentDetail.id
                          ? "border-primary alert alert-primary text-black"
                          : "bg-light"
                      }`}
                      onClick={() => setStudentDetail(student)}
                      key={`students-index-${index}`}
                    >
                      <Image
                        className="img-fluid rounded-circle mt-1"
                        src={student.image}
                        width="30"
                        alt=""
                      />
                      <div className="fw-medium">{student.name}</div>
                    </div>
                  ))}
              </div>
            </Col>

            <Col className="p-4 h-100 overflow-auto pb-5" md={6}>
              <div className="d-flex align-items-center gap-2">
                <Image
                  className="img-fluid rounded-circle"
                  src={studentDetail.image}
                  width="30"
                  alt=""
                />
                <div className="text-lg fw-medium flex-shrink-0 justify-content-end">
                  {" "}
                  {studentDetail.name}
                </div>
                <div className="ms-auto me-4 d-flex gap-3">
                  <div style={{ width: "150px" }}>
                    <div className="text-sm"> Reports : {studentDetail.progress}/6</div>
                    <ProgressBar
                      style={{ height: " 6px" }}
                      variant="success"
                      className="rounded-pill"
                      now={50}
                    />
                  </div>
                  <div className="plain-dropdown">
                    <Dropdown>
                      <Dropdown.Toggle
                        as="div"
                        className="icon d-flex gap-2  plain-dropdown text-primary border-bottom border-primary"
                      >
                        <div>Conducted Topics</div> <ChevronDown width="14px" />
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="content-wrapper p-0">
                        <div className="p-2">dropdown</div>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>

                {/* <div className="text-primary fw-medium flex-shrink-0">Conducted Topics</div> */}
              </div>
              <div className="mt-4 mb-5">
                {selected &&
                  selected.topics &&
                  selected.topics.map((topic: any, index: any) => (
                    <div key={`selected-topics-${index}`}>
                      <ReportCard data={topic} />
                    </div>
                  ))}
              </div>
            </Col>
          </Row>
        </div>
      </NewLayout>
    </Page>
  );
};

export default TeacherFeedback;
