import React from "react";
// next imports
import Head from "next/head";
import { useRouter } from "next/router";
// react bootstrap
import { Container, Button } from "react-bootstrap";
// swr
import useSWR from "swr";
// components
import ResourceView from "@components/resources/treeStructure/view";
import ResourceCreateView from "@components/resources/treeStructure/create";
// layouts
import AdminLayout from "@layouts/adminLayout";
// api routes
import { RESOURCE_WITH_NODE_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";
// hoc
import withAdminAuth from "@lib/hoc/withAdminAuth";

const ResourceTreeView = () => {
  const router = useRouter();

  const resource_id = router.query.resource_id;

  const { data: productCategory, error: productCategoryError } = useSWR(
    resource_id ? RESOURCE_WITH_NODE_ENDPOINT(resource_id) : null,
    (url) => APIFetcher(url),
    { refreshInterval: 0 }
  );

  if (!productCategory) {
    return "Loading...";
  }

  return (
    <div>
      <Head>
        <title>Resources</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AdminLayout>
        <div className="right-layout">
          <Container>
            <h5>Resource {productCategory.tree[0].data.title}</h5>
            {productCategory &&
            productCategory.tree &&
            productCategory.tree.length > 0 &&
            productCategory.tree[0] &&
            productCategory.tree[0].children ? (
              <ResourceView
                data={productCategory.tree[0].children}
                admin={true}
                check={false}
                isDrag={true}
                root_node_id={resource_id}
                currentProduct={productCategory}
              />
            ) : (
              <div className="mt-4 mb-4 text-center text-secondary">
                No Resources are available.
              </div>
            )}
            <ResourceCreateView
              data={{ id: resource_id }}
              root_node_id={resource_id}
              add_to="children"
            >
              <Button
                variant="outline-secondary"
                className="mb-2 btn-sm resource-tree-create-button"
              >
                New Folder
              </Button>
            </ResourceCreateView>
          </Container>
        </div>
      </AdminLayout>
    </div>
  );
};

export default withAdminAuth(ResourceTreeView);
