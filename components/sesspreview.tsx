import { Card, Row, Col, Image, Button } from "react-bootstrap";

import { ArrowDropDownCircle } from "styled-icons/material-rounded";

// components
import ZoomSessions from "@components/zoomsessions";

function SessionPreviewCard(props: any) {
  return (
    <>
      <Card className="border-0 shadow-sm bg-light mb-3">
        <Card.Body className="p-3">
          <Row>
            <Col className="align-self-center text-start">
              <Image className="img-fluid rounded me-3" src="/bird.svg" />
              <p className="d-inline text-dark fw-bold m-0">{props.data.title}</p>
              <span className="badge border bg-light text-dark ms-3">{props.data.datetime}</span>
            </Col>
            <Col className="align-self-center text-end">
              <ZoomSessions data={props.data} view={props.view} />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}

export default SessionPreviewCard;
