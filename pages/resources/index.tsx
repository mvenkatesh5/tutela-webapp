import React from "react";
// next imports
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
// react bootstrap
import { Container, Button } from "react-bootstrap";
// swr
import useSWR from "swr";
// components
import ResourceCreateView from "@components/resources/create";
// layouts
import AdminLayout from "@layouts/adminLayout";
// api routes
import { RESOURCE_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";
// hoc
import withAdminAuth from "@lib/hoc/withAdminAuth";

const Resources = () => {
  const router = useRouter();
  const { data: resources, error: resourcesError } = useSWR(RESOURCE_ENDPOINT, APIFetcher, {
    refreshInterval: 0,
  });

  return (
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
                  <div>
                    {resources.map((resource: any, resourceIndex: number) => (
                      <div key={`resource-title-${resourceIndex}`} className="resource-home-card">
                        <div className="resource-title">
                          <Link href={`/resources/${resource.id}`}>
                            <a>{resource.title}</a>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </Container>
        </div>
      </AdminLayout>
    </div>
  );
};

export default withAdminAuth(Resources);
