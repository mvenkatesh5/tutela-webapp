import React, { useRef, useState, useEffect } from "react";
// next imports
import Link from "next/link";
// chart js
import { Bar } from "react-chartjs-2";
// react bootstrap
import { Row, Col, Form } from "react-bootstrap";
// icons
import { Calendar, RightArrowAlt } from "@styled-icons/boxicons-regular";
// swr
import useSWR from "swr";
// layouts
import ParentLayout from "layouts/ParentLayout";
// api services
import { APIFetcher } from "@lib/services";
// api routes
import { PRODUCTS_ENDPOINT, USER_ENDPOINT } from "@constants/routes"; // api routes
// hoc
import withParentAuth from "@lib/hoc/withParentAuth";
// components
import Page from "@components/page";
// constants
import { META_DESCRIPTION } from "@constants/page";
// cookie
import { getAuthenticationToken } from "@lib/cookie";

function ParentDashboard() {
  const meta = {
    title: "Dashboard",
    description: META_DESCRIPTION,
  };

  const [currentUser, setCurrentUser] = React.useState<any>();
  const [userRole, setUserRole] = React.useState<any>();

  React.useEffect(() => {
    if (getAuthenticationToken()) {
      let details: any = getAuthenticationToken();
      details = details ? JSON.parse(details) : null;
      if (details) {
        setCurrentUser(details);
        if (details.info.role === 2) setUserRole("admin");
        else if (details.info.role === 1) setUserRole("teacher");
        else if (details.info.role === 3) setUserRole("parent");
        else setUserRole("student");
      }
    }
  }, []);

  const { data: users, error: usersError } = useSWR(USER_ENDPOINT, APIFetcher);

  const { data: productsList, error: productsListError } = useSWR(PRODUCTS_ENDPOINT, APIFetcher);

  return (
    <Page meta={meta}>
      <ParentLayout>
        <div className="container">
          <h5 className="fw-bold mt-4 mb-2">Progress Report</h5>

          {/* users */}

          <div className="mt-3 mb-3">
            <div className="mb-2">Select Users</div>
            <Row>
              <Col md={4}>
                <Form.Control as="select" style={{ fontSize: "12px", padding: "4px 8px" }} disabled>
                  <option value="">User1 (usera@sample.com)</option>
                  {users &&
                    users.length > 0 &&
                    users.map((user: any, index: any) => {
                      if (user.role === 1)
                        return (
                          <option key={`${user.id}`} value={user.id}>
                            {user.email}
                          </option>
                        );
                    })}
                </Form.Control>
              </Col>
            </Row>
          </div>

          {!productsListError && !productsList ? (
            <div className="text-center text-muted mt-5 mb-5">Loading...</div>
          ) : (
            <Row className="mt-3 mb-3">
              {productsList &&
                productsList.length > 0 &&
                productsList.map((product: any, index: any) => (
                  <Col md={4} key={product.id}>
                    <Link href={`/user-report/5/${product.id}/reports`}>
                      <a>
                        <div className="card rounded mb-3">
                          <div
                            className="card-header d-flex align-items-center text-white"
                            style={{ backgroundColor: product.color ? product.color : "#ccc" }}
                          >
                            <div>
                              <h6 className="mb-0 text-white fw-bold single-line-text">
                                {product.name}
                              </h6>
                            </div>
                            <div className="ms-auto">
                              <RightArrowAlt className="icon-size-lg text-white" />
                            </div>
                          </div>
                        </div>
                      </a>
                    </Link>
                  </Col>
                ))}
            </Row>
          )}
        </div>
      </ParentLayout>
    </Page>
  );
}

export default withParentAuth(ParentDashboard);
