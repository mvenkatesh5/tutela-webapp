import React from "react";
// bootstrap
import { Image, Form, Row, Col } from "react-bootstrap";

const FeedBackCard = ({ data }: any) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="border rounded my-4">
      <div className="bg-light d-flex justify-content-between align-items-center p-2 rounded">
        <div className="d-flex align-items-center gap-2 my-1">
          <Image className="img-fluid rounded-circle" src={data.image} width="25" alt="" />
          <div className="">{data.name}</div>
        </div>
        <small onClick={() => setOpen(!open)} className="cursor-pointer text-primary">
          {open ? <div className="text-success">Submit</div> : "Give Feedback"}
        </small>
      </div>
      {open && (
        <Row className="d-flex p-3">
          <Col>
            <Form>
              <Form.Group className="mb-4" controlId="formBasicEmail">
                <Form.Label className="text-secondary">Classroom Score</Form.Label>
                <Form.Control type="text" placeholder="Enter email" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="text-secondary">Homework Score</Form.Label>
                <Form.Control type="text" placeholder="Enter email" />
              </Form.Group>
            </Form>
          </Col>
          <Col className="">
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label className="text-secondary">Report</Form.Label>
              <Form.Control as="textarea" rows={5} />
            </Form.Group>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default FeedBackCard;
