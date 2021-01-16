import React from "react";
// react-bootstrap
import { Container, Row, Col, Image, Card } from "react-bootstrap";
// swr
import useSWR from "swr";
// components
import Page from "@components/page";
import SessionPreviewCard from "@components/sesspreview";
// api routes
import { SESSION_ENDPOINT } from "@constants/routes";
// constants
import { META_DESCRIPTION } from "@constants/page";
// api services
import { APIFetcher } from "@lib/services";
// layouts
import StudentLayout from "layouts/studentLayout";
// hoc
import withStudentAuth from "@lib/hoc/withStudentAuth";

const StudentDetail = (props: any) => {
  const meta = {
    title: "Sign In",
    description: META_DESCRIPTION,
  };

  const { data: sessionList, error: sessionListError } = useSWR(SESSION_ENDPOINT, APIFetcher);

  return (
    <Page meta={meta}>
      <StudentLayout>
        <Container className="mt-5 container-lg">
          <Row>
            <h4 className="fw-bold text-dark mb-3">Sessions</h4>
            <Col md="8">
              {sessionList &&
                sessionList.length > 0 &&
                sessionList.map((data: any, index: Number) => (
                  <div key={data.id}>
                    <SessionPreviewCard data={data} />
                  </div>
                ))}
            </Col>
          </Row>
        </Container>
      </StudentLayout>
    </Page>
  );
};

export default withStudentAuth(StudentDetail);
