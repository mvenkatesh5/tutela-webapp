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
import { RESOURCE_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";
// hoc
import withGlobalAuth from "@lib/hoc/withGlobalAuth";
// components
import Page from "@components/page";
// constants
import { META_DESCRIPTION } from "@constants/page";

const Resources = () => {
  const router = useRouter();
  const { data: resources, error: resourcesError } = useSWR(RESOURCE_ENDPOINT, APIFetcher, {
    refreshInterval: 0,
  });

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
              <ResourceCreateView>
                <div className="d-flex ms-auto">
                  <Button variant="outline-primary" className="mb-2 btn-sm ms-auto">
                    Create Resource
                  </Button>
                </div>
              </ResourceCreateView>
              {!resources && !resourcesError ? (
                <div className="text-secondary mt-5 mb-5 text-center">Loading...</div>
              ) : (
                <div>
                  {resources && resources.length === 0 ? (
                    <div className="text-secondary mt-5 mb-5 text-center">
                      No resources are available.
                    </div>
                  ) : (
                    <Row>
                      {resources.map((resource: any, resourceIndex: number) => (
                        <Col md={3} key={`resource-title-${resourceIndex}`} className="mb-2 h-100">
                          <div className="resource-home-card-book-view">
                            <Link href={`/resources/${resource.id}`}>
                              <div className="book-root-container">
                                <BookCard data={resource} />
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
                      ))}
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
export default withGlobalAuth(Resources);
