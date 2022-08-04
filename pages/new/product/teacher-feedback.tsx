import React from "react";
// layout
import NewLayout from "@layouts/newLayout";
// bootstrap
import { Col, Row, Image } from "react-bootstrap";
// constants
import { META_DESCRIPTION } from "@constants/page";
// components
import Page from "@components/page";
import FeedbackCard from "@components/new/FeedbackCard";

const TeacherFeedback = () => {
  const meta = {
    title: "Teacher Feedback",
    description: META_DESCRIPTION,
  };
  const [finished, setFinished] = React.useState("unfinished");
  const meetings = [
    { name: "Meeting Name", timing: "8 AM - 9 AM", image: "/bird.svg" },
    { name: "Meeting Name", timing: "8 AM - 9 AM", image: "/bird.svg" },
    { name: "Meeting Name", timing: "8 AM - 9 AM", image: "/bird.svg" },
    { name: "Meeting Name", timing: "8 AM - 9 AM", image: "/bird.svg" },
  ];

  const students = [
    { name: "Meeting Name", timing: "8 AM - 9 AM", image: "/bird.svg" },
    { name: "Meeting Name", timing: "8 AM - 9 AM", image: "/bird.svg" },
    { name: "Meeting Name", timing: "8 AM - 9 AM", image: "/bird.svg" },
  ];
  return (
    <Page meta={meta}>
      <NewLayout sidebar={false}>
        <div className="h-100 overflow-hidden">
          <div
            style={{ background: "#0052CC" }}
            className="p-4 text-white d-flex justify-content-between align-items-center"
          >
            <h3 className="">Session Feedback</h3>
            <div>Skip for now</div>
          </div>
          <Row className="h-100">
            <Col className="border h-100 overflow-auto" md={4}>
              <div
                // style={{ margin: "0px -12px" }}
                className="d-flex gap-5 fw-bold border-bottom px-4 pt-2"
              >
                <div className="cursor-pointer" onClick={() => setFinished("unfinished")}>
                  <div
                    className={` p-2 ${finished == "unfinished" ? "text-primary" : "text-muted"}`}
                  >
                    Unfinished
                  </div>
                  {finished == "unfinished" && <div className="bg-primary pt-1 rounded"></div>}
                </div>
                <div className="cursor-pointer" onClick={() => setFinished("finished")}>
                  <div className={` p-2 ${finished == "finished" ? "text-primary" : "text-muted"}`}>
                    Finished
                  </div>
                  {finished == "finished" && <div className="bg-primary pt-1 rounded"></div>}
                </div>
              </div>
              <div className="px-3">
                {meetings &&
                  meetings.map((data: any, index: any) => (
                    <div
                      key={`meetings-${index}-index-data`}
                      className="rounded my-4 bg-light p-2 d-flex align-items-center gap-2"
                    >
                      <Image className="img-fluid rounded" src={data.image} width="40" alt="" />
                      <div>{data.name}</div>
                      <div className="ms-auto">{data.timing}</div>
                    </div>
                  ))}
              </div>
            </Col>

            <Col className="p-4" md={8}>
              <h3>Students</h3>

              {students &&
                students.map((data: any, index: any) => (
                  <div key={`students-feedback-${index}`} className="">
                    <FeedbackCard data={data} />
                  </div>
                ))}
            </Col>
          </Row>
        </div>
      </NewLayout>
    </Page>
  );
};

export default TeacherFeedback;
