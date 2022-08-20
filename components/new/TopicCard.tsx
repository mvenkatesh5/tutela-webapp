import React from "react";
// bootstrap
import { Image, Form, Row, Col } from "react-bootstrap";
// icon
import { ChevronDown } from "@styled-icons/boxicons-solid/ChevronDown";
import { ChevronUp } from "@styled-icons/boxicons-solid/ChevronUp";

const TopicCard = ({ data }: any) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="border rounded my-3">
      <div className="bg-light d-flex justify-content-between align-items-center p-2 rounded">
        <div className="d-flex align-items-center gap-2 my-1">
          <Image className="img-fluid rounded-circle" src={data.image} width="25" alt="" />
          <div className="">{data.name}</div>
        </div>
        <small onClick={() => setOpen(!open)} className="cursor-pointer text-muted">
          {open ? (
            <div className="">
              <ChevronUp width="16px" />
            </div>
          ) : (
            <div className="">
              <ChevronDown width="16px" />
            </div>
          )}
        </small>
      </div>
      {open && (
        <Row className="d-flex p-3">
          <Col md={5} className="text-muted mt-3">
            Classroom Score :
          </Col>
          <Col md={7} className="mt-3">
            89/100
          </Col>
          <Col md={5} className="text-muted mt-3">
            Homework Score :
          </Col>
          <Col md={7} className="mt-3">
            78/100
          </Col>{" "}
          <Col md={5} className="text-muted mt-3">
            Report :
          </Col>
          <Col md={7} className="mt-3">
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </Col>
        </Row>
      )}
    </div>
  );
};

export default TopicCard;
