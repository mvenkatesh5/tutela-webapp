import React from "react";
// next imports
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
// react bootstrap
import { Container, Button, Row, Col } from "react-bootstrap";
// swr
import useSWR from "swr";
// cookie
import { getAuthenticationToken } from "@lib/cookie";
// layouts
import StudentLayout from "@layouts/studentLayout";
// api routes
import { USER_RESOURCE_VIEW_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";
// hoc
import withStudentAuth from "@lib/hoc/withStudentAuth";
import BookCard from "@components/BookCard";
// components
import Page from "@components/page";
// constants
import { META_DESCRIPTION } from "@constants/page";

const Resources = () => {
  const router = useRouter();

  const [tokenDetails, setTokenDetails] = React.useState<any>();
  React.useEffect(() => {
    if (getAuthenticationToken()) {
      let details: any = getAuthenticationToken();
      details = details ? JSON.parse(details) : null;
      if (details) {
        setTokenDetails(details);
      }
    }
  }, []);

  const { data: resources, error: resourcesError } = useSWR(
    tokenDetails && tokenDetails.user ? USER_RESOURCE_VIEW_ENDPOINT(tokenDetails.user.id) : null,
    (url) => APIFetcher(url),
    { refreshInterval: 0 }
  );

  const meta = {
    title: "User Resource",
    description: META_DESCRIPTION,
  };

  return (
    <Page meta={meta}>
      <div>
        <Head>
          <title>Resources</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <StudentLayout>
          <Container className="pt-3 pb-3">
            <div className="tw-bg-[#f8f8f8] p-4 tw-rounded-lg">
              <div className="tw-bg-white p-4">
                <h3 className="mb-4">Resources</h3>
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
                          <Col
                            sm={12}
                            md={4}
                            lg={3}
                            key={`resource-title-${resourceIndex}`}
                            className="mb-2 h-100"
                          >
                            <div className="resource-home-card-book-view">
                              <Link href={`/user-resources/${resource.id}`} passHref>
                                <div className="book-root-container tw-max-w-[160px] mx-auto">
                                  <BookCard data={resource.resource_node} />
                                </div>
                              </Link>
                              <div className="book-content-container">
                                <div className="flex">
                                  <div className="flex-item title">
                                    <div className="resource-title">
                                      <Link href={`/user-resources/${resource.id}`}>
                                        <a
                                          title={resource.resource_node.title}
                                          className="tw-text-black tw-font-medium tw-truncate"
                                        >
                                          {resource.resource_node.title}
                                        </a>
                                      </Link>
                                    </div>
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
              </div>
            </div>
          </Container>
        </StudentLayout>
      </div>
    </Page>
  );
};

export default withStudentAuth(Resources);
