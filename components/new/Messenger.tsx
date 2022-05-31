import React from "react";
// react-bootstrap
import { Container, Row, Col, Image, Card } from "react-bootstrap";

const Messenger = ({ replies }: any) => {
  return (
    <div className="border rounded mt-5 flex flex-column p-3 h-100">
      {replies &&
        replies.map((data: any, index: any) => (
          <div key={`replies-index-${index} `} className="d-flex gap-3 mb-3">
            <div className="flex-shrink-0 mt-1">
              <Image alt="" className="img-fluid mx-auto d-block " src={data.image} width="35" />
            </div>
            <div className="">
              <div className="fw-bold">{data.name}</div>
              <small className="text-muted">{data.description}</small>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Messenger;
