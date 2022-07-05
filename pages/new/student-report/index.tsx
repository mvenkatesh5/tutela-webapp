import React, { Fragment } from "react";
// bootstrap
import { Card, Form, Col, Row, ProgressBar } from "react-bootstrap";
// constants
import { META_DESCRIPTION } from "@constants/page";
// components
import Page from "@components/page";
import ReportHeader from "@components/new/ReportHeaderStudent";
import Dropdown from "@components/new/Dropdown";
import CompletedGrade from "@components/new/CompleteGraph";
import ProgressBarElement from "@components/new/ProgressBar";
import StudentTopicCard from "@components/new/StudentTopicCard";
// layout
import NewLayout from "@layouts/newLayout";

const ProductCompleted = () => {
  const meta = {
    title: "Product Completed",
    description: META_DESCRIPTION,
  };

  const tabs = [
    { name: "Reports", key: "reports" },
    { name: "Topics", key: "topics" },
    { name: "Classwork", key: "classwork" },
    { name: "Homework", key: "homework" },
  ];

  const [tab, setTabs] = React.useState("reports");

  const cards = [{}, {}, {}, {}, {}, {}];
  return (
    <Page meta={meta}>
      <NewLayout>
        <div className="container mx-auto mt-5">
          <ReportHeader />
          <h4 className="fw-bold mt-5">Syllabus completion </h4>
          <ProgressBarElement percent={76} />

          <div className="d-flex justify-content-between align-items-center mt-2">
            <small className="text-muted">23 Jan 2022</small>
            <small className="text-muted">23 May 2022</small>
          </div>

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

          {tab == "reports" && (
            <>
              <div className="d-flex gap-3 my-5 mb-3">
                <div>
                  <Form.Group className="mb-3">
                    <Form.Control type="date" required />
                  </Form.Group>
                </div>
                <Dropdown name="overview">
                  <div className="bg-light px-2 py-1 w-100">Overview</div>
                </Dropdown>
              </div>

              <h5 className="mt-4 fw-bold">Mathematics</h5>
              <div className="text-muted">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </div>
              <h5 className="mt-5 fw-bold">Physics</h5>
              <div className="text-muted">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </div>
            </>
          )}

          {tab == "topics" && (
            <>
              {cards &&
                cards.map((data: any, index: any) => (
                  <div key={`topic-card-student-${index}`}>
                    <StudentTopicCard />
                  </div>
                ))}
            </>
          )}
        </div>
      </NewLayout>
    </Page>
  );
};

export default ProductCompleted;
