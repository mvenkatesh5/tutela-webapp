import React from "react";
// react bootstrap
import { Row, Col, Dropdown } from "react-bootstrap";
// material icons
import { DotsHorizontalRounded } from "@styled-icons/boxicons-regular";
// swr
import useSWR from "swr";
// components
import ProductCreateView from "@components/admin/product/create";
import ProductEditView from "@components/admin/product/edit";
import ProductDeleteView from "@components/admin/product/delete";
// layouts
import AdminLayout from "@layouts/adminLayout";
// api routes
import { USER_ENDPOINT, RESOURCE_ENDPOINT, PRODUCTS_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";
// hoc
import withAdminAuth from "@lib/hoc/withAdminAuth";
// components
import Page from "@components/page";
// constants
import { META_DESCRIPTION } from "@constants/page";

const ProductView = () => {
  const { data: usersList, error: usersListError } = useSWR(USER_ENDPOINT, APIFetcher);
  const { data: resourcesList, error: resourcesListError } = useSWR(RESOURCE_ENDPOINT, APIFetcher);
  const { data: productsList, error: productsListError } = useSWR(PRODUCTS_ENDPOINT, APIFetcher);

  const meta = {
    title: "Products",
    description: META_DESCRIPTION,
  };

  console.log("productsList", productsList);

  const getCurrentUserName = (user_id: any) => {
    if (usersList && usersList.length > 0) {
      const currentData: any = usersList.find(
        (element: any, i: any) => element.id === parseInt(user_id)
      );
      if (currentData) return `${currentData.first_name} ${currentData.last_name}`;
      // if (currentData) return `${currentData.first_name} (${currentData.email})`;
    }
  };

  const getCurrentResourceName = (resource_id: any) => {
    if (resourcesList && resourcesList.length > 0) {
      const currentData: any = resourcesList.find(
        (element: any, i: any) => element.id === parseInt(resource_id)
      );
      if (currentData) return `${currentData.title}`;
    }
  };

  return (
    <Page meta={meta}>
      <AdminLayout>
        <div className="right-layout">
          <ProductCreateView users={usersList} resources={resourcesList} />
          {!productsListError && !productsList ? (
            <div className="text-center text-muted mt-5 mb-5">Loading...</div>
          ) : (
            <Row className="mt-2 mb-2">
              {productsList &&
                productsList.length > 0 &&
                productsList.map((product: any, index: any) => (
                  <Col md={3} key={product.id} className="mb-2">
                    <div className="product-card-wrapper">
                      <div
                        className="header"
                        style={{ backgroundColor: product.color ? product.color : "#ccc" }}
                      >
                        <div className="left">{product.name}</div>
                        <div className="right">
                          {usersList && (
                            <div className="dropdown-wrapper global-dropdown">
                              <Dropdown>
                                <Dropdown.Toggle as="div" className="icon">
                                  <DotsHorizontalRounded />
                                </Dropdown.Toggle>

                                <Dropdown.Menu className="content-wrapper p-0">
                                  <ProductEditView
                                    data={product}
                                    users={usersList}
                                    resources={resourcesList}
                                  />
                                  <ProductDeleteView data={product} />
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="content">
                        <div className="description">{product.description}</div>
                        <div className="description mt-2 mb-2">Users: ({product.users.length})</div>
                        {product.users && product.users.length > 0 && (
                          <div className="d-flex flex-wrap" style={{ gap: "10px" }}>
                            {product.users.map((data: any) => (
                              <div
                                key={`user-${data}`}
                                style={{
                                  fontSize: "12px",
                                  backgroundColor: "#ccc",
                                  borderRadius: "4px",
                                }}
                                className="p-1"
                              >
                                {getCurrentUserName(data)}
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="description mt-2 mb-2">
                          Resources: ({product.resources.length})
                        </div>
                        {product.resources && product.resources.length > 0 && (
                          <div className="d-flex flex-wrap" style={{ gap: "10px" }}>
                            {product.resources.map((data: any) => (
                              <div
                                key={`user-${data}`}
                                style={{
                                  fontSize: "12px",
                                  backgroundColor: "#ccc",
                                  borderRadius: "4px",
                                }}
                                className="p-1"
                              >
                                {getCurrentResourceName(data)}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </Col>
                ))}
            </Row>
          )}
        </div>
      </AdminLayout>
    </Page>
  );
};

export default withAdminAuth(ProductView);
