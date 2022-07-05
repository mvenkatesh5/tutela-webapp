import React from "react";
// bootstrap
import { Card, Form, Col, Row, ProgressBar } from "react-bootstrap";
// icons
import { ChevronDown } from "@styled-icons/boxicons-solid/ChevronDown";
import { ChevronUp } from "@styled-icons/boxicons-solid/ChevronUp";
import { CheckCircleFill } from "@styled-icons/bootstrap/CheckCircleFill";
import { ThreeDots } from "@styled-icons/bootstrap/ThreeDots";

const StudentTopicCard = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="border w-100 bg-light rounded my-4">
      <div className="d-flex my-2 bg-light rounded p-1 px-2 gap-2 align-items-center">
        <CheckCircleFill className="text-success flex-shrink-0" width="16px" />
        <div className="fw-bold">Lorem ipsum dolor </div>
        <div className="ms-auto text-muted">
          <div
            onClick={() => {
              setOpen(!open);
            }}
            className="cursor-pointer"
          >
            {open ? <ChevronUp width="16px" /> : <ChevronDown width="16px" />}
          </div>
        </div>
      </div>
      {open && (
        <>
          <hr className="my-0" />

          <Row className="p-4">
            <Col md={6}>
              <Form.Group className="mb-4">
                <Form.Label className="mb-1 text-muted">Score</Form.Label>
                <Form.Control type="text" required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="mb-1 text-muted">Remarks</Form.Label>
                <Form.Control as="textarea" rows={3} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-4">
                <Form.Label className="mb-1 text-muted">rating</Form.Label>
                <Form.Control type="text" required />
              </Form.Group>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default StudentTopicCard;
