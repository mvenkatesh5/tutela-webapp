// next imports
import Link from "next/link";
// react bootstrap
import { Image } from "react-bootstrap";

function NewsCard({ data }: any) {
  return (
    <>
      <div className="border-bottom p-3 ">
        <div className="d-flex align-items-center gap-2 mb-1">
          <Image alt="" className="img-fluid mb-1 rounded-circle" src="/bird.svg" width="22" />
          <small className="text-primary"> User Name</small>
        </div>
        <p className="fw-bold text-dark mb-1">{data.title || "Concern"}</p>
        <small className="fw-light text-secondary mb-0">
          {data.reply} {data.reply == 1 ? "reply" : "replies"}
        </small>
      </div>
    </>
  );
}

export default NewsCard;
