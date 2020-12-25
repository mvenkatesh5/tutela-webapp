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

export default function Dashboard() {
  const meta = {
    title: "Sign In",
    description: META_DESCRIPTION,
  };
  return (
    <Page meta={meta}>
      <DashboardNav />
      <Container className="mt-5 container-lg">
        <Row>
          <h4 className="fw-bold text-dark mb-3">Upcoming Sessions</h4>
          <Col md="8">
            <SessionPreviewCard />
            <SessionPreviewCard />
            <SessionPreviewCard />
            <SessionPreviewCard />

            <h4 className="fw-bold text-dark mt-5 mb-3">Resources</h4>
            <ResourceTable />

            <h4 className="fw-bold text-dark mt-5 mb-3">News and Updates</h4>
            <Row>
              <Col>
                <NewsCard />
              </Col>
              <Col>
                <NewsCard />
              </Col>
            </Row>

            <h4 className="fw-bold text-dark mt-5 mb-3">Doubts</h4>
            <Doubts />
          </Col>

          <Col md="4">
            <TestScroreCard />
            <UpcomingTestsCard />

            <Card className="p-3 mt-4 border-0 shadow">
              <Image
                className="img-fluid mx-auto d-block"
                src="/ad.png"
                width="300"
              />
            </Card>
          </Col>
        </Row>
      </Container>
    </Page>
  );
}
