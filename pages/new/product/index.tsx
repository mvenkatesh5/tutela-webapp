import React, { Fragment } from "react";
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
import { USER_PRODUCT_RESOURCE_VIEW_ENDPOINT } from "@constants/routes";
// components
import Page from "@components/page";
import ProductCard from "@components/new/ProductCard";
// layout
import NewLayout from "@layouts/newLayout";

const BehaviorPage = () => {
  const meta = {
    title: "Product",
    description: META_DESCRIPTION,
  };

  const { data: productsList, error: productsListError } = useSWR(
    "5" && "5" ? [USER_PRODUCT_RESOURCE_VIEW_ENDPOINT("5"), "5"] : null,
    (url) => APIFetcher(url)
  );
  console.log("productsList", productsList);
  const currentUser = {
    user: { id: "5" },
  };
  return (
    <Page meta={meta}>
      <NewLayout>
        <div className="container mx-auto mt-5">
          <div className="d-flex justify-content-between">
            <h3>Products</h3>
            <Button className="d-flex align-items-center gap-2">
              <PeopleTeam width="16px" />
              <div className="">Create Product</div>
            </Button>
          </div>
          <Row className="pe-0">
            {!productsListError && !productsList ? (
              <div className="text-center text-muted mt-5 mb-5">Loading...</div>
            ) : (
              <>
                {productsList &&
                  productsList.product_users &&
                  productsList.product_users.length > 0 &&
                  productsList.product_users.map((product: any, index: any) => (
                    <Col className="my-2" md={3} key={`products-key-${index}`}>
                      <ProductCard
                        data={product}
                        user_id={currentUser?.user.id}
                        productsList={productsList}
                        users={10}
                      />
                    </Col>
                  ))}
              </>
            )}
          </Row>
        </div>
      </NewLayout>
    </Page>
  );
};

export default BehaviorPage;
