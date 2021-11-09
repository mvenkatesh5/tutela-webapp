import { Card, Row, Col } from "react-bootstrap";

function UpcomingTestsCard() {
  return (
    <>
      <Card className="border-0 shadow">
        <Card.Body className="p-3">
          <h5 className="text-dark fw-bold">Upcoming Tests</h5>
          <Row className="justify-content-center mt-3 mb-3">
            <Col md="2" className="align-self-center">
              <div className="text-center rounded-3 p-1" style={{ backgroundColor: "#eee" }}>
                <h6 className="fw-bold text-dark mb-0">13</h6>
                <small className="m-0" style={{ fontSize: "11px" }}>
                  March
                </small>
              </div>
            </Col>
            <Col md="10" className="align-self-center">
              <p className="text-dark m-0">Scholastic Assessment Test (SAT) 2021</p>
            </Col>
          </Row>
          <Row className="justify-content-center mt-3 mb-3">
            <Col md="2" className="align-self-center">
              <div className="text-center rounded-3 p-1" style={{ backgroundColor: "#eee" }}>
                <h6 className="fw-bold text-dark mb-0">13</h6>
                <small className="m-0" style={{ fontSize: "11px" }}>
                  March
                </small>
              </div>
            </Col>
            <Col md="10" className="align-self-center">
              <p className="text-dark m-0">National Merit Scholarship Qualifying Test 2021</p>
            </Col>
          </Row>
          <Row className="justify-content-center mt-3 mb-3">
            <Col md="2" className="align-self-center">
              <div className="text-center rounded-3 p-1" style={{ backgroundColor: "#eee" }}>
                <h6 className="fw-bold text-dark mb-0">13</h6>
                <small className="m-0" style={{ fontSize: "11px" }}>
                  March
                </small>
              </div>
            </Col>
            <Col md="10" className="align-self-center">
              <p className="text-dark m-0">Scholastic Assessment Test (SAT) 2021</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}

export default UpcomingTestsCard;
