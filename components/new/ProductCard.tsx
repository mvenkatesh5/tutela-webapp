import React from "react";
// react-bootstrap
import { Col,Card } from "react-bootstrap";
// icons
import { DocumentBulletList } from "@styled-icons/fluentui-system-regular/DocumentBulletList";
import { ThreeDotsVertical } from "@styled-icons/bootstrap/ThreeDotsVertical";
import { Circle } from "@styled-icons/entypo/Circle";

const Product = ({ data }: any) => {
  return (
    <Col className="my-2" md={4}>
      <Card className="border h-100 d-flex flex-column">
        {data.completed_percentage == "100" ? (
          <small
            style={{ backgroundColor: "#E6F7EB" }}
            className="p-2 d-flex gap-2 align-items-center"
          >
            <div className="text-success">
              <Circle width="16px" />
            </div>
            Completed!!
          </small>
        ) : (
          <div className="p-2 pt-3 bg-primary"></div>
        )}

        <div className="p-3">
          <div className="fw-bold">{data.name}</div>
          <small className="">{data.description}</small>
        </div>
        <div className="d-flex justify-content-between  mt-auto px-3 pb-3">
          <div className="d-flex align-items-center gap-1">
            <DocumentBulletList width="16px" />
            <small className="fw-bold">31 Resources</small>
          </div>
          <div>
            <ThreeDotsVertical width="14px" />
          </div>
        </div>
      </Card>
    </Col>
  );
};

export default Product;
