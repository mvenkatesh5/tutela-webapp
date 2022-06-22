import React from "react";
import Link from "next/link";
// react-bootstrap
import { Col, Card } from "react-bootstrap";
// icons
import { DocumentBulletList } from "@styled-icons/fluentui-system-regular/DocumentBulletList";
import { ThreeDotsVertical } from "@styled-icons/bootstrap/ThreeDotsVertical";
import { Circle } from "@styled-icons/entypo/Circle";
import { PeopleTeam } from "@styled-icons/fluentui-system-filled/PeopleTeam";

const Product = ({ data, user_id, productsList, users }: any) => {
  console.log("data in product", data);
  return (
    // <Col className="my-2" md={4}>
    <Card className="border h-100 d-flex flex-column">
      {data.completed_percentage == "100" ? (
        <small
          style={{ backgroundColor: "#E6F7EB" }}
          className="p-2 d-flex gap-2 align-items-center rounded"
        >
          <div className="text-success">
            <Circle width="16px" />
          </div>
          Completed!!
        </small>
      ) : (
        <div
          className="p-2 pt-3 rounded-top"
          style={{
            backgroundColor: data.product.color ? data.product.color : "#ccc",
          }}
        ></div>
      )}

      <div className="p-3">
        <Link href={`/new/product/${productsList.id}/${data.product.id}/reports`}>
          <a>
            <div className="fw-bold text-black">{data.product.name}</div>
          </a>
        </Link>
        <small className="">{data.product.description}</small>
      </div>
      <div className="d-flex justify-content-between  mt-auto px-3 pb-3">
        <div className="d-flex gap-2">
          {users && (
            <div className="d-flex align-items-center gap-1">
              <PeopleTeam width="16px" />
              <small className="fw-bold">{users} users</small>
            </div>
          )}

          <div className="d-flex align-items-center gap-1">
            <DocumentBulletList width="16px" />
            <small className="fw-bold">{data.product.resources.length} resource</small>
          </div>
        </div>
        <div>
          <ThreeDotsVertical width="14px" />
        </div>
      </div>
    </Card>
    // </Col>
  );
};

export default Product;
