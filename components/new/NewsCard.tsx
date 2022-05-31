// next imports
import Link from "next/link";
// react bootstrap
import { Image, Col } from "react-bootstrap";

function NewsCard(props: any) {
  return (
    <>
      <Link href={props.data.link ? props.data.link : "#"}>
        <a target="_blank">
          <div className="border-bottom p-3">
            <div className="d-flex">
              <Col md="8">
                <p className="fw-bold text-dark mb-2">{props.data.title}</p>
                <p className="fw-light text-secondary mb-0">{props.data.description}</p>
              </Col>
              <Col md="4" className="text-end">
                <Image className="img-fluid" src="/news.svg" width="80" alt="" />
              </Col>
            </div>
          </div>
        </a>
      </Link>
    </>
  );
}

export default NewsCard;
