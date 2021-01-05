// constants
import { META_DESCRIPTION } from "@constants/page";

// react-bootstrap
import { Container, Row, Col, Image, Card } from "react-bootstrap";

// components
import Page from "@components/page";
import DashboardNav from "@components/dashboardnav";
import SessionPreviewCard from "@components/sesspreview";
import ResourceTable from "@components/resourcetable";
import NewsCard from "@components/newscard";
import Doubts from "@components/doubtscard";
import TestScroreCard from "@components/testscorecard";
import UpcomingTestsCard from "@components/uptestscard";
// swr
import useSWR from "swr";
// api routes
import { NEWS_ENDPOINT, ADVERTS_ENDPOINT, SESSION_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";

export default function Dashboard() {
  const meta = {
    title: "Sign In",
    description: META_DESCRIPTION,
  };

  const { data: newsList, error: newsListError } = useSWR(NEWS_ENDPOINT, APIFetcher);
  const { data: advertsList, error: advertsListError } = useSWR(ADVERTS_ENDPOINT, APIFetcher);
  const { data: sessionList, error: sessionListError } = useSWR(SESSION_ENDPOINT, APIFetcher);

  return (
    <Page meta={meta}>
      <DashboardNav />
      <Container className="mt-5 container-lg">
        <Row>
          <h4 className="fw-bold text-dark mb-3">Upcoming Sessions</h4>
          <Col md="8">
            {sessionList &&
              sessionList.length > 0 &&
              sessionList.map((data: any, index: Number) => (
                <div key={data.id}>
                  <SessionPreviewCard data={data} />
                </div>
              ))}

            <h4 className="fw-bold text-dark mt-5 mb-3">Resources</h4>
            {/* <ResourceTable /> */}

            <h4 className="fw-bold text-dark mt-5 mb-3">News and Updates</h4>
            <Row>
              {newsList &&
                newsList.length > 0 &&
                newsList.map((data: any, index: Number) => (
                  <Col md={6} key={data.id} style={{ marginBottom: "10px" }}>
                    <NewsCard data={data} />
                  </Col>
                ))}
            </Row>

            <h4 className="fw-bold text-dark mt-5 mb-3">Doubts</h4>
            <Doubts />
          </Col>

          <Col md="4">
            <TestScroreCard />
            <UpcomingTestsCard />

            {advertsList && advertsList.length > 0 && (
              <Card className="p-3 mt-4 border-0 shadow">
                <Image
                  className="img-fluid mx-auto d-block"
                  src={advertsList[0].image}
                  width="300"
                />
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </Page>
  );
}
