import React from "react";
// bootstrap
import { Form } from "react-bootstrap";
// constants
import { META_DESCRIPTION } from "@constants/page";
// components
import Page from "@components/page";
import ReportHeader from "@components/new/ReportHeader";
import Dropdown from "@components/new/Dropdown";
import ProgressBarElement from "@components/new/ProgressBar";
// layout
import NewLayout from "@layouts/newLayout";

const ProductReport = () => {
  const meta = {
    title: "Product Report",
    description: META_DESCRIPTION,
  };
  return (
    <Page meta={meta}>
      <NewLayout sidebar={false}>
        <ReportHeader />
        <div className="container mx-auto mt-5">
          <h5 className="fw-bold">Syllabus completion </h5>
          <div></div>
          <ProgressBarElement percent={75} />

          <div className="d-flex justify-content-between align-items-center mt-2">
            <div className="text-muted">23 Jan 2022</div>
            <div className="text-muted">23 May 2022</div>
          </div>
          <div className="d-flex gap-3 pt-4 mb-4">
            <div>
              <Form.Group className="mb-3">
                <Form.Control type="date" required />
              </Form.Group>
            </div>

            <Dropdown name="overview">
              <div className="bg-light px-2 py-1">Overview</div>
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

export default ProductReport;
