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
import {
  PRODUCTS_ENDPOINT,
  USER_ENDPOINT,
  USER_PRODUCT_RESOURCE_VIEW_ENDPOINT,
} from "@constants/routes"; // api routes
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

  const [parentUsers, setParentUsers] = React.useState<any>();
  const [currentSelectedUser, setCurrentSelectedUser] = React.useState<any>();

  const { data: users, error: usersError } = useSWR(USER_ENDPOINT, APIFetcher);

  const generateUniqueList = (arrayList: any) => {
    let uniqueNames: any = [];
    arrayList.forEach((element: any) => {
      if (!uniqueNames.includes(element)) uniqueNames.push(element);
    });
    return uniqueNames;
  };

  React.useEffect(() => {
    if (users && users.length > 0) {
      if (
        currentUser &&
        currentUser.user &&
        currentUser.user.linked_items &&
        currentUser.user.linked_items.students &&
        currentUser.user.linked_items.students.length > 0
      ) {
        let uniqueUsers = generateUniqueList(currentUser.user.linked_items.students);
        if (uniqueUsers && uniqueUsers.length > 0) {
          let uniqueUserDetails: any = [];
          uniqueUsers.forEach((element: any) => {
            let currentUser = users.find(
              (userElement: any) => userElement.id === parseInt(element)
            );
            if (currentUser) uniqueUserDetails.push(currentUser);
          });
          if (uniqueUserDetails && uniqueUserDetails.length > 0) {
            setCurrentSelectedUser(uniqueUserDetails[0].id);
            setParentUsers(uniqueUserDetails);
          }
        }
      }
    }
  }, [users && currentUser]);

  const { data: productsList, error: productsListError } = useSWR(
    currentSelectedUser && currentSelectedUser
      ? [USER_PRODUCT_RESOURCE_VIEW_ENDPOINT(currentSelectedUser), currentSelectedUser]
      : null,
    (url) => APIFetcher(url)
  );

  return (
    <Page meta={meta}>
      <ParentLayout>
        <div className="container">
          <h5 className="fw-bold mt-4 mb-2">Progress Report</h5>

          {parentUsers && parentUsers.length > 0 ? (
            <div className="mt-3 mb-3">
              <div className="mb-2">Users</div>
              <Row>
                <Col md={4}>
                  <Form.Control
                    as="select"
                    value={currentSelectedUser}
                    onChange={(e: any) => setCurrentSelectedUser(e.target.value)}
                  >
                    {parentUsers &&
                      parentUsers.length > 0 &&
                      parentUsers.map((user: any, index: any) => (
                        <option key={`${user.id}`} value={user.id}>
                          {user.username} ({user.email})
                        </option>
                      ))}
                  </Form.Control>
                </Col>
              </Row>
            </div>
          ) : (
            <div className="text-center">No students Available.</div>
          )}
          {currentSelectedUser && (
            <>
              {!productsListError && !productsList ? (
                <div className="text-center text-muted mt-5 mb-5">Loading...</div>
              ) : (
                <div className="mt-3 mb-3">
                  <div className="mb-2">Products</div>
                  <Row>
                    {productsList &&
                      productsList.product_users &&
                      productsList.product_users.length > 0 &&
                      productsList.product_users.map((product: any, index: any) => (
                        <Col md={4} key={`${product.id}-${product.product.id}`}>
                          <Link
                            href={`/user-report/${productsList.id}/${product.product.id}/reports`}
                          >
                            <a>
                              <div className="card rounded mb-3">
                                <div
                                  className="card-header d-flex align-items-center text-white"
                                  style={{
                                    backgroundColor: product.product.color
                                      ? product.product.color
                                      : "#ccc",
                                  }}
                                >
                                  <div>
                                    <h6 className="mb-0 text-white fw-bold single-line-text">
                                      {product.product.name}
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
                </div>
              )}
            </>
          )}
        </div>
      </ParentLayout>
    </Page>
  );
}

export default withParentAuth(ParentDashboard);
