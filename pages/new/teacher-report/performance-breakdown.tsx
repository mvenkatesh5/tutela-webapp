import React from "react";
// react-bootstrap
import { Container, Row, Col, Image, Card, Button, Form } from "react-bootstrap";
// constants
import { META_DESCRIPTION } from "@constants/page";
// components
import Page from "@components/page";
import ReportHeader from "@components/new/ReportHeaderTeacher";
// layout
import NewLayout from "@layouts/newLayout";

const StudentReport = () => {
  const meta = {
    title: "Student Report",
    description: META_DESCRIPTION,
  };
  const tabs = [
    { name: "Overview", key: "overview" },
    { name: "Performance Breakdown", key: "breakdown" },
    { name: "Behaviour", key: "behaviour" },
    { name: "Attendance", key: "attendance" },
    { name: "Syllabus Covered", key: "syllabus" },
  ];

  const [tab, setTabs] = React.useState("breakdown");
  return (
    <Page meta={meta}>
      <NewLayout sidebar={false}>
        <ReportHeader />
        <div className="container mx-auto mt-5">
          <div className="border-bottom w-100 d-flex gap-4 my-4">
            {tabs &&
              tabs.map((data: any, index: any) => (
                <div
                  key={`key-tabs-index-${index}`}
                  className="cursor-pointer"
                  onClick={() => setTabs(data.key)}
                >
                  <div className={`py-2 ${tab == data.key && "text-danger fw-bold"} `}>
                    {data.name}
                  </div>
                  {tab == data.key && (
                    <div className="border border-2 rounded-pill border-danger"></div>
                  )}
                </div>
              ))}
          </div>

          {tab == "breakdown" && (
            <div className="border-bottom my-4 py-4">
              <div className="d-flex align-items-center justify-content-between ">
                <div className="d-flex align-items-center gap-2">
                  <Image alt="" className="rounded-circle" width="20px" src="/bird.svg" />
                  <small className="fw-bold">Anuchal mehta</small>
                  <small className="bg-light px-2 border rounded">Performance</small>
                </div>
              </div>

              <Row>
                <Col md={4}>
                  <div className="border rounded p-3 my-3">
                    <div className="fw-bold">Test Name</div>
                    <div className="d-flex gap-5 mt-4">
                      <div className="">
                        <Image alt="" className="rounded-circle" width="20px" src="/bird.svg" />
                        <div className="text-sm text-muted">80/100</div>
                      </div>
                      <div className="mt-auto">
                        <div className="text-sm text-muted">31 Aug 2021</div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="border rounded p-3 my-3">
                    <div className="fw-bold">Test Name</div>
                    <div className="d-flex gap-5 mt-4">
                      <div className="">
                        <Image alt="" className="rounded-circle" width="20px" src="/bird.svg" />
                        <div className="text-sm text-muted">80/100</div>
                      </div>
                      <div className="mt-auto">
                        <div className="text-sm text-muted">31 Aug 2021</div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>

              <div className="mt-4 text-muted">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </div>

              <ol className="mt-3">
                <li>Shorter is better- 10/11</li>
                <li>Diction, Idiom, and register - 13/13 </li> <li>Transitions - 20/25</li>{" "}
                <li>Relevance and purpose - 12/14 </li> <li>Sentence Paragraph order - 4 / 4</li>
              </ol>
            </div>
          )}
        </div>
      </NewLayout>
    </Page>
  );
};

export default StudentReport;
