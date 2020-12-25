import { Card, Image, Row, Col } from "react-bootstrap";

function NewsCard() {
  return (
    <>
      <Card className="shadow-sm border-0">
        <Card.Body className="p-3">
          <Row>
            <Col md="8">
              <p className="fw-bold text-dark mb-2">
                US Colleges See Big Drop In Foreign Enrollment
              </p>
              <p className="fw-light mb-0">1 day ago</p>
            </Col>
            <Col md="4" className="text-end">
              <Image className="img-fluid" src="/news.svg" width="80" />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}

export default NewsCard;
