import React from "react";
// layout
import NewLayout from "@layouts/newLayout";
// bootstrap
import { Col, Row, Image, Button } from "react-bootstrap";
// constants
import { META_DESCRIPTION } from "@constants/page";
// components
import Page from "@components/page";
import ResourceCard from "@components/new/ResourceCard";
// Icons
import { TextAlignLeft } from "@styled-icons/fluentui-system-filled/TextAlignLeft";
import { PersonFill } from "@styled-icons/bootstrap/PersonFill";
import { Circle } from "@styled-icons/boxicons-solid/Circle";
import { PeopleTeam } from "@styled-icons/fluentui-system-filled/PeopleTeam";
import { SendPlane } from "@styled-icons/remix-fill/SendPlane";

const TeacherFeedback = () => {
  const meta = {
    title: "Topic Cluster",
    description: META_DESCRIPTION,
  };

  const [tab, setTab] = React.useState("videos");

  const videos = [
    { name: "Recording Name" },
    { name: "Recording Name" },
    { name: "Recording Name" },
  ];

  const doubts = [
    {
      title: "Title",
      student: "student",
      description:
        "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      title: "Title",
      student: "student",
      description:
        "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      title: "Title",
      student: "student",
      description:
        "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
  ];

  const students = [
    { name: "Riya" },
    { name: "Riya" },
    { name: "Varun kashyap" },
    { name: "Riya" },
    { name: "Riya" },
  ];
  return (
    <Page meta={meta}>
      <NewLayout sidebar={false}>
        <div className="h-100 overflow-hidden">
          <Row className="h-100">
            <Col className="border border-bottom-0 h-100 overflow-auto p-3 ps-4 pt-4" md={3}>
              <div className=" h-100">
                <div className="d-flex align-items-start gap-3">
                  <Image className="img-fluid rounded" src="/bird.svg" width="45" alt="" />
                  <div>
                    <h6 className="">Meeting Name</h6>
                    <div className="text-muted">by Mukul</div>
                    <small className="text-muted">
                      Sunday, November 21 ⋅ 8 AM – 9 AM Weekly on weekdays
                    </small>
                  </div>
                </div>

                <div className="d-flex mt-4">
                  <div className="px-2">
                    <TextAlignLeft width="20px" />
                  </div>
                  <small className="text-muted">
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                    dolore eu fugiat nulla pariatur.
                  </small>
                </div>

                <div className="d-flex align-items-center mt-4 gap-2">
                  <div className="ps-2">
                    <PersonFill width="20px" />
                  </div>
                  <div className="text-secondary">
                    {" "}
                    <Circle width="20px" />
                  </div>
                  <div className="">Teacher Name</div>
                </div>
                <div className="d-flex align-items-center mt-4 ">
                  <div className="px-2">
                    <PeopleTeam width="20px" />
                  </div>
                  <div className="">
                    20 students - <span className="text-muted">18 present, 2 absent</span>
                  </div>
                </div>
                <div className="mt-4"></div>
                <small className="text-muted ps-2 mt-4 mb-3">PRESENT</small>
                <div className="d-flex flex-column">
                  {students &&
                    students.map((data: any, index: any) => (
                      <div
                        key={`students-index-${index}`}
                        style={{ maxWidth: "fit-content" }}
                        className="d-flex gap-2 aline-items-center bg-light my-2 rounded-pill p-1"
                      >
                        <Image
                          className="img-fluid rounded-circle flex-shrink-0"
                          src="/bird.svg"
                          width="30"
                          alt=""
                        />
                        <div className="flex-shrink-0"> {data.name}</div>
                        <div>
                          <Image
                            className="img-fluid rounded-circle flex-shrink-0"
                            src="/tutela-coin.png"
                            width="20"
                            alt=""
                          />
                          <small className="text-muted flex-shrink-0">10</small>
                        </div>
                      </div>
                    ))}
                </div>

                <div className="mt-4"></div>
                <small className="text-muted ps-2 mt-4 mb-3">ABSENT</small>
                <div className="d-flex flex-column">
                  {students &&
                    students.map((data: any, index: any) => (
                      <div
                        key={`students-index-${index}`}
                        style={{ maxWidth: "fit-content" }}
                        className="d-flex gap-2 aline-items-center bg-light my-2 rounded-pill p-1"
                      >
                        <Image
                          className="img-fluid rounded-circle flex-shrink-0"
                          src="/bird.svg"
                          width="30"
                          alt=""
                        />
                        <div className="flex-shrink-0"> {data.name}</div>
                        <div>
                          <Image
                            className="img-fluid rounded-circle flex-shrink-0"
                            src="/tutela-coin.png"
                            width="20"
                            alt=""
                          />
                          <small className="text-muted flex-shrink-0">10</small>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </Col>

            <Col className="px-0 overflow-auto h-100" md={6}>
              <div
                // style={{ margin: "0px -12px" }}
                className="d-flex gap-5 fw-bold border-bottom px-4 pt-2"
              >
                <div className="cursor-pointer" onClick={() => setTab("videos")}>
                  <div className={` p-2 ${tab == "videos" ? "text-primary" : "text-muted"}`}>
                    All Videos
                  </div>
                  {tab == "videos" && <div className="bg-primary pt-1 rounded"></div>}
                </div>
                <div className="cursor-pointer" onClick={() => setTab("resources")}>
                  <div className={` p-2 ${tab == "resources" ? "text-primary" : "text-muted"}`}>
                    Resources
                  </div>
                  {tab == "resources" && <div className="bg-primary pt-1 rounded"></div>}
                </div>
                <div className="cursor-pointer" onClick={() => setTab("doubts")}>
                  <div className={` p-2 ${tab == "doubts" ? "text-primary" : "text-muted"}`}>
                    Doubts
                  </div>
                  {tab == "doubts" && <div className="bg-primary pt-1 rounded"></div>}
                </div>
              </div>
              <div className="p-4">
                <h3>All Videos</h3>
                <Row>
                  {videos &&
                    videos.map((data: any, index: any) => (
                      <Col md={4} key={`videos-${index}-index`}>
                        <Image className="img-fluid rounded w-100" src="/news.svg" alt="" />
                        <div className="mt-1 fw-bold">{data.name}</div>
                      </Col>
                    ))}
                </Row>
                <div className="bg-light rounded p-5 mt-4">
                  <div className="bg-light p-5 mt-4">
                    <div className="bg-light p-5 mt-4"></div>
                  </div>
                </div>
                <h3 className="mt-4">Resources</h3>
                <ResourceCard />
                <h3 className="mt-4">Doubts</h3>
                {doubts &&
                  doubts.map((data: any, index: any) => (
                    <div
                      key={`doubts-index-${index}`}
                      className="border rounded my-3 p-3 d-flex flex-column gap-2"
                    >
                      <div className="fw-bold">{data.title}</div>
                      <small className="">by student {data.student}</small>
                      <small className="">{data.description}</small>
                    </div>
                  ))}
              </div>
            </Col>
            <Col className="border p-4 pb-0 d-flex flex-column border-bottom-0" md={3}>
              <div className="mt-auto border p-2 w-100 rounded d-flex justify-content-between mb-3">
                <div className="text-muted">message... </div>
                <div className="text-muted">
                  <SendPlane width="20px" />
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </NewLayout>
    </Page>
  );
};

export default TeacherFeedback;
