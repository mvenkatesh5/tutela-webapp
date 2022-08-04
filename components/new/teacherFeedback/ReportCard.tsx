import React from "react";
// react bootstrap
import { Button, Modal, Form, Image } from "react-bootstrap";

const ReportCard = ({ data }: any) => {
  return (
    <div className="w-100 mt-3">
      <div className="bg-light p-2 px-3 rounded " >
        {data.name} - report
      </div>
      <Form.Group className="mt-2">
        <Form.Label className="mb-1 text-muted">Classroom Score</Form.Label>
        <Form.Control type="text" required />
      </Form.Group>
      <Form.Group className="mt-2">
        <Form.Label className="mb-1 text-muted">Homework Score</Form.Label>
        <Form.Control type="text" required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className="mb-1 text-muted">Redirect url</Form.Label>
        <Form.Control as="textarea" rows={3} required />
      </Form.Group>
    </div>
  );
};

export default ReportCard;
