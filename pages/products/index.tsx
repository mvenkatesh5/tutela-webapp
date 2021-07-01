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
import { PRODUCTS_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";
// hoc
import withAdminAuth from "@lib/hoc/withAdminAuth";
// components
import Page from "@components/page";
// constants
import { META_DESCRIPTION } from "@constants/page";

const ProductView = () => {
  const { data: productsList, error: productsListError } = useSWR(PRODUCTS_ENDPOINT, APIFetcher);

  const meta = {
    title: "Products",
    description: META_DESCRIPTION,
  };

  return (
    <Page meta={meta}>
    <AdminLayout>
      <div className="right-layout">
        <ProductCreateView />
        {!productsListError && !productsList ? (
          <div className="text-center text-muted mt-5 mb-5">Loading...</div>
        ) : (
          <Row className="mt-2 mb-2">
            {productsList &&
              productsList.length > 0 &&
              productsList.map((product: any, index: any) => (
                <Col md={3} key={product.id}>
                  <div className="product-card-wrapper">
                    <div
                      className="header"
                      style={{ backgroundColor: product.color ? product.color : "#ccc" }}
                    >
                      <div className="left">{product.name}</div>
                      <div className="right">
                        <div className="dropdown-wrapper global-dropdown">
                          <Dropdown>
                            <Dropdown.Toggle as="div" className="icon">
                              <DotsHorizontalRounded />
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="content-wrapper p-0">
                              <ProductEditView data={product} />
                              <ProductDeleteView data={product} />
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </div>
                    </div>
                    <div className="content">
                      <div className="description">{product.description}</div>
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
