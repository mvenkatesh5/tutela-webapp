import React from "react";
// next imports
import Link from "next/link";
// react-bootstrap
import { Col, Card, Dropdown } from "react-bootstrap";
// icons
import { DocumentBulletList } from "@styled-icons/fluentui-system-regular/DocumentBulletList";
import { ThreeDotsVertical } from "@styled-icons/bootstrap/ThreeDotsVertical";
import { Circle } from "@styled-icons/entypo/Circle";
import { PeopleTeam } from "@styled-icons/fluentui-system-filled/PeopleTeam";
// components
import ProductEditView from "@components/admin/product/edit";
import ProductDeleteView from "@components/admin/product/delete";

const Product = ({ data, user_id, productsList, users, resources, view, student_id }: any) => {
  return (
    <Link
      href={
        view == "parent"
          ? `/parent/product/${student_id}/${data.id}/reports`
          : `/products/${data.id}`
      }
    >
      <a>
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
                backgroundColor: data.color ? data.color : "#ccc",
              }}
            ></div>
          )}

          <div className="p-3">
            <div className="fw-bold text-black">{data.name}</div>
            <small className="text-black">{data.description}</small>
          </div>
          <div className="d-flex justify-content-between  mt-auto px-3 pb-3">
            <div className="d-flex gap-2 flex-wrap">
              {view != "parent" && data.users && (
                <div className="d-flex align-items-center gap-1">
                  <PeopleTeam width="16px" />
                  <small className="fw-bold">{data.users.length} users</small>
                </div>
              )}

              <div className="d-flex align-items-center gap-1 text-black">
                <DocumentBulletList width="16px" />
                <small className="fw-bold">{data?.resources?.length} resource</small>
              </div>
            </div>
            <div>
              {users && (
                <div className="dropdown-wrapper global-dropdown text-black">
                  <Dropdown>
                    <Dropdown.Toggle as="div" className="icon">
                      <ThreeDotsVertical width="14px" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="content-wrapper p-0">
                      <ProductEditView data={data} users={users} resources={resources} />
                      <ProductDeleteView data={data} />
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              )}
            </div>
          </div>
        </Card>
      </a>
    </Link>
  );
};

export default Product;
