import React, { Fragment } from "react";
// bootstrap
import { Card, Form, Col, Row, ProgressBar } from "react-bootstrap";
// constants
import { META_DESCRIPTION } from "@constants/page";
// components
import Page from "@components/page";
import ReportHeader from "@components/new/ReportHeader";
import Dropdown from "@components/new/Dropdown";
import CompletedGrade from "@components/new/CompleteGraph";
import ProgressBarElement from "@components/new/ProgressBar";
// layout
import NewLayout from "@layouts/newLayout";

const ProductCompleted = () => {
  const meta = {
    title: "Product Completed",
    description: META_DESCRIPTION,
  };
  return (
    <Page meta={meta}>
      <NewLayout sidebar={false}>
        <ReportHeader />
        <div className="container mx-auto mt-5">
          <Card className="shadow border-0 p-4 my-4 mb-5 relative overflow-hidden">
            <div className="icon-complete-circle"></div>
            <h3 className="">Congratulations!! You completed the program.</h3>
            <div className="text-muted">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </div>
            <div className="d-flex gap-4 mt-5">
              <small className="">
                <span className="text-muted">Join date:</span> Jan 2, 2022
              </small>
              <small>
                <span className="text-muted">Completion date: </span> Apr 25, 2022
              </small>
            </div>
          </Card>
          <h5 className="fw-bold">Syllabus completion </h5>
          <ProgressBarElement percent={100} />

          <div className="d-flex justify-content-between align-items-center mt-2">
            <small className="text-muted">23 Jan 2022</small>
            <small className="text-muted">23 May 2022</small>
          </div>

          <Row className="mt-5">
            <Col xs={12} md={9}>
              <div style={{ width: "200px" }}>
                <Form.Group className="mb-3">
                  <Form.Control type="date" required />
                </Form.Group>
              </div>
              <CompletedGrade />
            </Col>
            <Col xs={12} md={3}>
              <div>
                <h4>10</h4>
                <div className="mb-3 text-muted">Avg. classes needed/week</div>
                <div className="d-flex gap-2 mb-4">
                  <div className="px-4  bg-primary"> </div>
                  <small className="">Planned Progress</small>
                </div>
                <hr />
              </div>
              <div>
                <h4>7</h4>
                <div className="mb-3 text-muted">Classes happening/week</div>
                <div className="d-flex gap-2 mb-4">
                  <div className="px-4  bg-success"> </div>
                  <small className="">Planned Progress</small>
                </div>
                <hr />
              </div>
              <div>
                <h4>18/180</h4>
                <div className="mb-3 text-muted">Course days left</div>
                <hr />
              </div>
            </Col>
          </Row>

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
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
            dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum. Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
            irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
            deserunt mollit anim id est laborum.
          </div>
          <h5 className="mt-5 fw-bold">Physics</h5>
          <div className="text-muted">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
            dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum. Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
            irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
            deserunt mollit anim id est laborum.
          </div>
        </div>
      </NewLayout>
    </Page>
  );
};

export default ProductCompleted;
