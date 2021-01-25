import React from "react";
// react-bootstrap
import { Container, Row, Col, Image, Card } from "react-bootstrap";
// swr
import useSWR from "swr";
// components
import Page from "@components/page";
import SessionPreviewCard from "@components/sesspreview";
import SessionCard from "@components/admin/sessions/sessionCard";
import UpcomingTestsCard from "@components/uptestscard";
// api routes
import { SESSION_ENDPOINT, ADVERTS_ENDPOINT } from "@constants/routes";
// constants
import { META_DESCRIPTION } from "@constants/page";
// api services
import { APIFetcher } from "@lib/services";
// layouts
import StudentLayout from "layouts/studentLayout";
// hoc
import withTeacherAuth from "@lib/hoc/withTeacherAuth";

const DashboardDetail = (props: any) => {
  const meta = {
    title: "Sign In",
    description: META_DESCRIPTION,
  };

  const { data: sessionList, error: sessionListError } = useSWR(SESSION_ENDPOINT, APIFetcher);
  const { data: advertsList, error: advertsListError } = useSWR(ADVERTS_ENDPOINT, APIFetcher);

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
                  <div key={data.id} className="mb-2">
                    {/* <SessionPreviewCard data={data} view="teacher" /> */}
                    <SessionCard data={data} view="teacher" />
                  </div>
                ))}
            </Col>
            <Col>
              <UpcomingTestsCard />
              {advertsList && advertsList.length > 0 && (
                <Card className="p-3 mt-4 border-0 shadow">
                  <a href={advertsList[0].link ? advertsList[0].link : "#"} target="_blank">
                    <Image
                      className="img-fluid mx-auto d-block"
                      src={advertsList[0].image}
                      width="300"
                    />
                  </a>
                </Card>
              )}
            </Col>
          </Row>
        </Container>
      </StudentLayout>
    </Page>
  );
};

export default withTeacherAuth(DashboardDetail);
