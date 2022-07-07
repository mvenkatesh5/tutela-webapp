// next imports
import Link from "next/link";
// react bootstrap
import { Image, Col } from "react-bootstrap";

function NewsCard(props: any) {
  console.log("props.data", props.data);
  return (
    <>
      <Link href={props.data.link ? props.data.link : "#"}>
        <a className="h-100 w-100 border rounded p-3 pb-0 my-3" target="_blank">
          <div className="d-flex">
            <div>
              <p className="fw-bold text-dark mb-2">{props.data.title}</p>
            </div>
            <div className="text-end flex-shrink-0 ms-auto">
              <Image
                className="img-fluid"
                src={props.data.image_url ? props.data.image_url : "/news.svg"}
                width="80"
                height="80"
                alt=""
              />
            </div>
          </div>
          <p className="fw-light text-secondary mb-0 mt-3">{props.data.description}</p>
        </a>
      </Link>
    </>
  );
}

export default NewsCard;
