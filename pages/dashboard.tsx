import React from "react";
// react-bootstrap
import { Container, Row, Col, Image, Card } from "react-bootstrap";
// swr
import useSWR from "swr";
// components
import Page from "@components/page";
import SessionCard from "@components/admin/sessions/sessionCard";
import UpcomingTestsCard from "@components/uptestscard";
// api routes
import { SESSION_ENDPOINT_UPCOMING, ADVERTS_ENDPOINT } from "@constants/routes";
// constants
import { META_DESCRIPTION } from "@constants/page";
// cookie
import { getAuthenticationToken } from "@lib/cookie";
// api services
import { APIFetcher } from "@lib/services";
// layouts
import StudentLayout from "layouts/studentLayout";
// hoc
import withTeacherAuth from "@lib/hoc/withTeacherAuth";

const DashboardDetail = (props: any) => {
  const meta = {
    description: META_DESCRIPTION,
    title: "Dashboard",
  };

  const [currentDateQuery, setCurrentDateQuery] = React.useState<any>();
  const [userRole, setUserRole] = React.useState<any>();
  const [tokenDetails, setTokenDetails] = React.useState<any>();
  React.useEffect(() => {
    if (getAuthenticationToken()) {
      let details: any = getAuthenticationToken();
      details = details ? JSON.parse(details) : null;
      if (details) {
        setTokenDetails(details);
        if (details.info.role === 2) {
          setUserRole("admin");
          handleCurrentDateQuery(details.user.id, "admin");
        } else if (details.info.role === 1) {
          setUserRole("teacher");
          handleCurrentDateQuery(details.user.id, "teacher");
        } else {
          setUserRole("student");
          handleCurrentDateQuery(details.user.id, "student");
        }
      }
    }
  }, []);

  const handleCurrentDateQuery = (user_id: any, role: any) => {
    let currentRoute: any = SESSION_ENDPOINT_UPCOMING;
    if (role != "admin") {
      currentRoute = currentRoute + `?user_id=${user_id}`;
    }
    console.log(currentRoute);
    setCurrentDateQuery(currentRoute);
  };

  const { data: sessionList, error: sessionListError } = useSWR(
    currentDateQuery ? currentDateQuery : null,
    (url) => APIFetcher(url),
    { refreshInterval: 5000 }
  );
  const { data: advertsList, error: advertsListError } = useSWR(ADVERTS_ENDPOINT, APIFetcher);

  return (
    <Page meta={meta}>
      <StudentLayout>
        <Container className="mt-5 container-lg">
          <Row>
            <h4 className="fw-bold text-dark mb-3">Upcoming Sessions</h4>
            <Col md="8">
              {sessionList && sessionList.length > 0 ? (
                <div>
                  {sessionList.map((data: any, index: Number) => (
                    <div key={data.id} className="mb-2">
                      <SessionCard data={data} role="teacher" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center mt-4 mb-4">No sessions for Today.</div>
              )}
            </Col>
            <Col>
              <UpcomingTestsCard />
              {advertsList && advertsList.length > 0 && (
                <Card className="p-3 mt-4 border-0 shadow">
                  <a
                    href={advertsList[0].link ? advertsList[0].link : "#"}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image
                      alt=""
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
