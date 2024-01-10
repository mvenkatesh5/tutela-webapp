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
import ReportLayout from "@layouts/ReportLayout";

const ProductCompleted = () => {
  const meta = {
    title: "Product Completed",
    description: META_DESCRIPTION,
  };
  return (
    <Page meta={meta}>
      <ReportLayout>
        <div className="position-relative tw-space-y-10 ">
          <Card className="shadow border-0 p-5 my-4 mb-5 relative overflow-hidden">
            <div className="icon-complete-circle"></div>
            <h2 className="">Congratulations!! You completed the program.</h2>
            <div className="text-dark tw-text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </div>
            <div className="d-flex gap-4 mt-5">
              <div className="tw-text-lg">
                <span className="text-muted">Join date: </span> Jan 2, 2022
              </div>
              <div className="tw-text-lg">
                <span className="text-muted">Completion date: </span> Apr 25, 2022
              </div>
            </div>
          </Card>
          <div className="position-relative">
            <h2 className="tw-text-black">Syllabus completion</h2>
            <ProgressBarElement percent={100} />
          </div>

          <div className="d-flex justify-content-between align-items-center mt-2">
            <small className="text-muted">23 Jan 2022</small>
            <small className="text-muted">23 May 2024</small>
          </div>

          <Row className="mt-5">
            <Col xs={12} md={9} className="p-3">
              <div className="d-flex justify-content-start gap-4">
                <Form.Group className="mb-3">
                  <Form.Control type="date" required />
                </Form.Group>
              </div>
              <CompletedGrade />
            </Col>
            <Col xs={12} md={3}>
              <div className="position-relative mb-4">
                <h3 className="mb-0">10</h3>
                <div className="mb-3 text-muted">Avg. classes needed/week</div>
                <div className="d-flex gap-2 mb-4">
                  <div className="px-3  bg-primary" />
                  <small className="">Planned Progress</small>
                </div>
                <hr />
              </div>
              <div className="position-relative mb-4">
                <h3 className="mb-0">7</h3>
                <div className="mb-3 text-muted">Classes happening/week</div>
                <div className="d-flex gap-2 mb-4">
                  <div className="px-3  bg-success" />
                  <small className="">Planned Progress</small>
                </div>
                <hr />
              </div>

              <div>
                <h4>18/180</h4>
                <div className="mb-3 text-muted">Course days left</div>
              </div>
            </Col>
          </Row>

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
              <option>Overview</option>
              <option>Overview</option>
              <option>Overview</option>
            </Form.Select>
          </div>

          <div className="position-relative">
            <h2 className="tw-text-black">Mathematics</h2>
            <p className="mt-3 tw-text-lg tw-text-justify tw-text-gray-500">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
              proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
              dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
              in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <div className="position-relative">
            <h2 className="tw-text-black">Physics</h2>
            <p className="mt-3 tw-text-lg tw-text-justify tw-text-gray-500">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
              proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
              dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
              in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
      </ReportLayout>
    </Page>
  );
};

export default ProductCompleted;
