import React from "react";
// react-bootstrap
import { Container, Row, Col, Image, Card, Button, Form } from "react-bootstrap";
// constants
import { META_DESCRIPTION } from "@constants/page";
// components
import Page from "@components/page";
import Messenger from "@components/new/Messenger";
// icons
import { StarFill } from "@styled-icons/bootstrap/StarFill";
import { Plus } from "@styled-icons/fa-solid/Plus";
// layout
import NewLayout from "@layouts/newLayout";

const AddReport = () => {
  const meta = {
    title: "Add Report",
    description: META_DESCRIPTION,
  };

  return (
    <Page meta={meta}>
      <NewLayout>
        <div className="container mx-auto mt-4">
          <div className="d-flex align-items-center justify-content-between">
            <h3>Create Report</h3>
            <Button className="btn btn-sm">Add Report</Button>
          </div>
          <div className="w-100 border rounded p-3 my-4">
            <h5>Product Name</h5>
            <div className="d-flex flex-wrap gap-5 mt-4">
              <div className="d-flex align-items-center gap-2">
                <Image alt="" className="rounded-circle" width="20px" src="/bird.svg" />
                <div>Anuchal mehta</div>
              </div>
              <div className="d-flex align-items-center gap-2">
                <StarFill width="20px" /> <div>Performance Report</div>
              </div>
            </div>
          </div>
          {/* add report */}
          <h4>Add Tests</h4>
          <div className="w-100 border rounded p-3 my-4 d-flex justify-content-between flex-wrap">
            <div>Test Name</div>
            <div className="d-flex gap-5">
              <div className="">31 Aug 2021</div>
              <div className="">80/100</div>
            </div>
          </div>

          <div className="w-100 border rounded p-3 my-4">
            <Row>
              <Col className="" md={6}>
                <Form.Group className="mb-4 w-100">
                  <Form.Label className="mb-1 text-muted">Title</Form.Label>
                  <Form.Control type="text" required />
                </Form.Group>
              </Col>
              <Col className="d-flex gap-3" md={6}>
                <Form.Group className="mb-4 w-100">
                  <Form.Label className="mb-1 text-muted">Date</Form.Label>
                  <Form.Control type="date" required />
                </Form.Group>
                <Form.Group className="mb-4 w-100">
                  <Form.Label className="mb-1 text-muted">Score</Form.Label>
                  <Form.Control type="text" required />
                </Form.Group>
              </Col>
            </Row>
          </div>
          <button className="d-flex align-items-center gap-1 text-primary text-button fw-bold">
            <Plus className="" size={14} />
            Add another test
          </button>
          <h4 className="mt-4">Decription</h4>
          <div className="w-100 border rounded p-3">text Editor</div>
        </div>
      </NewLayout>
    </Page>
  );
};

export default AddReport;
