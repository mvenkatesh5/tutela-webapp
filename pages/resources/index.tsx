import React from "react";
// next imports
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
// react bootstrap
import { Container, Button, Row, Col } from "react-bootstrap";
// material icons
import { Delete } from "@styled-icons/material/Delete";
import { Edit } from "@styled-icons/boxicons-regular/Edit";
// swr
import useSWR from "swr";
// components
import ResourceCreateView from "@components/resources/create";
import RenderEditView from "@components/resources/treeStructure/edit";
import ResourceDeleteView from "@components/resources/treeStructure/delete";
import BookCard from "@components/BookCard";
// layouts
import AdminLayout from "@layouts/adminLayout";
// api routes
import { RESOURCE_ENDPOINT, NODES_WITH_TEACHER_ID_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";
// hoc
import withAdminTeacherAuth from "@lib/hoc/withAdminTeacherAuth";
// components
import Page from "@components/page";
// constants
import { META_DESCRIPTION } from "@constants/page";
// cookie
import { getAuthenticationToken } from "@lib/cookie";

const Resources = () => {
  const [userDetails, setUserDetails] = React.useState<any>();
  React.useEffect(() => {
    if (getAuthenticationToken()) {
      let details: any = getAuthenticationToken();
      details = details ? JSON.parse(details) : null;
      if (details && details.info) {
        setUserDetails(details);
      }
    }
  }, []);

  const router = useRouter();
  const { data: resources, error: resourcesError } = useSWR(
    userDetails && userDetails?.user && userDetails?.user?.id
      ? userDetails?.user?.role === 1
        ? NODES_WITH_TEACHER_ID_ENDPOINT(userDetails?.user?.id)
        : RESOURCE_ENDPOINT
      : null,
    APIFetcher,
    { refreshInterval: 0 }
  );

  const { data: allResources, error: allResourcesError } = useSWR(RESOURCE_ENDPOINT, APIFetcher, {
    refreshInterval: 0,
  });

  const handleResourcesRender = (_resources: any) => {
    if (
      userDetails &&
      userDetails?.user &&
      userDetails?.user?.role === 1 &&
      allResources &&
      allResources.length > 0
    )
      return allResources.filter((_r: any) => _resources?.teacher_nodes.includes(_r?.id)) || [];
    else {
      if (_resources && _resources.length > 0) return _resources;
    }
  };

  const meta = {
    title: "Resources",
    description: META_DESCRIPTION,
  };

  return (
    <Page meta={meta}>
      <div>
        <Head>
          <title>Resources</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <AdminLayout>
          <div className="right-layout">
            <Container>
              <div className="d-flex justify-content-end ms-auto gap-2">
                <Link href="/resources/tags">
                  <a>
                    <Button variant="outline-primary" className="mb-2 btn-sm">
                      Tags
                    </Button>
                  </a>
                </Link>
                <ResourceCreateView>
                  <Button variant="outline-primary" className="mb-2 btn-sm">
                    Create Resource
                  </Button>
                </ResourceCreateView>
              </div>

              {!resources && !resourcesError && !allResources && !allResourcesError ? (
                <div className="text-secondary mt-5 mb-5 text-center">Loading...</div>
              ) : (
                <div>
                  {resources && allResources && handleResourcesRender(resources).length === 0 ? (
                    <div className="text-secondary mt-5 mb-5 text-center">
                      No resources are available.
                    </div>
                  ) : (
                    <Row>
                      {resources &&
                        allResources &&
                        handleResourcesRender(resources).map(
                          (resource: any, resourceIndex: number) => (
                            <Col
                              md={3}
                              key={`resource-title-${resourceIndex}`}
                              className="mb-2 h-100"
                            >
                              <div className="resource-home-card-book-view">
                                <Link href={`/resources/${resource.id}`} passHref>
                                  <div className="book-root-container">
                                    <BookCard color={resource?.data?.color || "#000000"} />
                                  </div>
                                </Link>
                                <div className="book-content-container">
                                  <div className="flex">
                                    <div className="flex-item title">
                                      <div className="resource-title">
                                        <Link href={`/resources/${resource.id}`}>
                                          <a>{resource.title}</a>
                                        </Link>
                                      </div>
                                    </div>
                                    <div className="flex-item delete">
                                      <RenderEditView
                                        data={{ id: resource.id, data: resource }}
                                        root_node_id={null}
                                      >
                                        <Edit />
                                      </RenderEditView>
                                    </div>
                                    <div className="flex-item delete">
                                      <ResourceDeleteView data={resource} root_node_id={null}>
                                        <Delete />
                                      </ResourceDeleteView>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Col>
                          )
                        )}
                    </Row>
                  )}
                </div>
              )}
            </Container>
          </div>
        </AdminLayout>
      </div>
    </Page>
  );
};
export default withAdminTeacherAuth(Resources);
