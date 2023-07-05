// next imports
import Link from "next/link";
// react bootstrap
import { Card, Image, Row, Col } from "react-bootstrap";

function NewsCard(props: any) {
  return (
    <>
      <Link href={props.data.link ? props.data.link : "#"}>
        <a target="_blank">
          <Card className="shadow-sm border-0">
            <Card.Body className="p-3">
              <Row>
                <Col md="9">
                  <p className="fw-bold text-dark mb-2">{props.data.title}</p>
                  <p className="fw-light text-secondary mb-0">{props.data.description}</p>
                </Col>
                <Col md="3" className="text-end">
                  <Image
                    className="tw-w-full tw-h-full tw-object-contain tw-object-center"
                    src={props.data.image_url ? props.data.image_url : `/news.svg`}
                    alt=""
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </a>
      </Link>
    </>
  );
}

export default NewsCard;
