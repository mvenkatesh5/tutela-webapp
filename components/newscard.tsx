// react bootstrap
import { Card, Image, Row, Col } from "react-bootstrap";

function NewsCard(props: any) {
  return (
    <>
      <a href={props.data.link ? props.data.link : "#"} target="_blank">
        <Card className="shadow-sm border-0">
          <Card.Body className="p-3">
            <Row>
              <Col md="8">
                <p className="fw-bold text-dark mb-2">{props.data.title}</p>
                <p className="fw-light mb-0">{props.data.description}</p>
              </Col>
              <Col md="4" className="text-end">
                <Image className="img-fluid" src="/news.svg" width="80" />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </a>
    </>
  );
}

export default NewsCard;
