// next imports
import Link from "next/link";
// react bootstrap
import { Image, Col } from "react-bootstrap";

function NewsCard(props: any) {
  return (
    <>
      <Link href={props.data.link ? props.data.link : "#"}>
        <a className="h-100 border rounded p-3 pb-0 my-3" target="_blank">
          <div className="d-flex">
            <Col md="8">
              <p className="fw-bold text-dark mb-2">{props.data.title}</p>
            </Col>
            <Col md="4" className="text-end">
              <Image className="img-fluid" src="/news.svg" width="80" alt="" />
            </Col>
          </div>
          <p className="fw-light text-secondary mb-0 mt-3">{props.data.description}</p>
        </a>
      </Link>
    </>
  );
}

export default NewsCard;
