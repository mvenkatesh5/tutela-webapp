import React, { Fragment } from "react";
// next imports
import Link from "next/link";
// icons
import { PeopleTeam } from "@styled-icons/fluentui-system-filled/PeopleTeam";
import { FileTextOutline } from "@styled-icons/evaicons-outline/FileTextOutline";
// react-bootstrap
import { Button, Table, Row, Col } from "react-bootstrap";
// constants
import { META_DESCRIPTION } from "@constants/page";
// swr
import useSWR from "swr";
// api services
import { APIFetcher } from "@lib/services";
// api routes
import {
  USER_PRODUCT_RESOURCE_VIEW_ENDPOINT,
  USER_ENDPOINT,
  RESOURCE_ENDPOINT,
  PRODUCTS_ENDPOINT,
} from "@constants/routes";
// components
import Page from "@components/page";
import ProductCard from "@components/new/ProductCard";
// layouts
import AdminLayout from "@layouts/adminLayout";
// hoc
import withAdminAuth from "@lib/hoc/withAdminAuth";

const ProductsPage = () => {
  const meta = {
    title: "Products",
    description: META_DESCRIPTION,
  };

  const { data: usersList, error: usersListError } = useSWR(USER_ENDPOINT, APIFetcher);
  const { data: resourcesList, error: resourcesListError } = useSWR(RESOURCE_ENDPOINT, APIFetcher);
  const { data: productsList, error: productsListError } = useSWR(PRODUCTS_ENDPOINT, APIFetcher);

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
        <div className="container mx-auto mt-5 px-4">
          <div className="d-flex justify-content-between mb-3">
            <h3>Products</h3>
            <Link href="/products/create">
              <a>
                <Button className="d-flex align-items-center gap-2">
                  <PeopleTeam width="16px" />
                  <div className="">Create Product</div>
                </Button>
              </a>
            </Link>
          </div>
          <Row className="pe-0">
            {!productsListError && !productsList ? (
              <div className="text-center text-muted mt-5 mb-5">Loading...</div>
            ) : (
              <>
                {productsList &&
                  productsList.length > 0 &&
                  productsList.map((product: any, index: any) => (
                    <Col className="my-2" lg={3} md={6} key={`products-key-${index}`}>
                      <ProductCard
                        data={product}
                        productsList={productsList}
                        users={usersList}
                        resources={resourcesList}
                      />
                    </Col>
                  ))}
              </>
            )}
          </Row>
        </div>
      </AdminLayout>
    </Page>
  );
};

export default withAdminAuth(ProductsPage);
