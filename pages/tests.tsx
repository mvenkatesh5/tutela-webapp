import React from "react";
// next imports
import Head from "next/head";
// react bootstrap
import { Container, Row, Col, Card, Dropdown } from "react-bootstrap";
// material icons
import { DotsHorizontalRounded } from "@styled-icons/boxicons-regular";
// swr
import useSWR from "swr";
// layouts
import AdminLayout from "@layouts/adminLayout";
// components
import Page from "@components/page";
import TestsCreate from "@components/tests/create";
import TestsEdit from "@components/tests/edit";
import TestsDelete from "@components/tests/delete";
// api routes
import { TESTS_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";
// hoc
import withGlobalAuth from "@lib/hoc/withGlobalAuth";
// constants
import { META_DESCRIPTION } from "@constants/page";
import { dateTimeFormat } from "@constants/global";

const Tests = () => {
  const meta = {
    title: "Tests",
    description: META_DESCRIPTION,
  };

  const { data: tests, error: testsError } = useSWR(TESTS_ENDPOINT, APIFetcher, {
    refreshInterval: 0,
  });

  return (
    <Page meta={meta}>
      <Head>
        <title>Tests</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AdminLayout>
        <div className="right-layout">
          {!tests ? (
            <div className="text-center mt-5 mb-5">Loading.....</div>
          ) : (
            <Container>
              <div className="d-flex align-items-center justify-content-between mt-2">
                <div>
                  <h5 className="m-0 p-0">Tests</h5>
                </div>
                <div>
                  <TestsCreate />
                </div>
              </div>
              <div className="mt-2">
                {tests && tests.length > 0 ? (
                  <Row>
                    {tests.map((data: any, index: Number) => (
                      <Col md={3} key={data.id} style={{ marginTop: "10px" }}>
                        <Card className="h-100">
                          <Card.Body>
                            <div className="d-flex align-items-center justify-content-between mb-2">
                              <h6 className="m-0 p-0">{data.name}</h6>
                              <div className="dropdown-wrapper global-dropdown">
                                <Dropdown>
                                  <Dropdown.Toggle as="div" className="icon">
                                    <DotsHorizontalRounded />
                                  </Dropdown.Toggle>
                                  <Dropdown.Menu className="content-wrapper p-0">
                                    <TestsEdit data={data} />
                                    <TestsDelete data={data} />
                                  </Dropdown.Menu>
                                </Dropdown>
                              </div>
                            </div>
                            <p className="mb-2">{data.description}</p>
                            <p className="mb-2">{dateTimeFormat(data.datetime)}</p>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <div className="text-center mt-5 mb-5">No Tests are available</div>
                )}
              </div>
            </Container>
          )}
        </div>
      </AdminLayout>
    </Page>
  );
};

export default withGlobalAuth(Tests);
