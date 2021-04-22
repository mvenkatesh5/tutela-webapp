import React from "react";
// next
import Link from "next/link";
// constants
import { META_DESCRIPTION } from "@constants/page";
// react-bootstrap
import { Container, Row, Col, Image, Card } from "react-bootstrap";
// components
import Page from "@components/page";
import DashboardNav from "@components/dashboardnav";
import ResourceTable from "@components/resourcetable";
import NewsCard from "@components/newscard";
import Doubts from "@components/doubtscard";
import TestScroreCard from "@components/testscorecard";
import UpcomingTestsCard from "@components/uptestscard";
import SessionCard from "@components/admin/sessions/sessionCard";
// swr
import useSWR from "swr";
// cookie
import { getAuthenticationToken } from "@lib/cookie";
// api routes
import { NEWS_ENDPOINT, ADVERTS_ENDPOINT, SESSION_ENDPOINT_UPCOMING } from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";
// hoc
import withStudentAuth from "@lib/hoc/withStudentAuth";
// react slick
import Slider from "react-slick";

// function SampleNextArrow(props: any) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: "block", background: "gray" }}
//       onClick={onClick}
//     />
//   );
// }

// function SamplePrevArrow(props: any) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: "block", background: "gray" }}
//       onClick={onClick}
//     />
//   );
// }

const StudentDetail = () => {
  const meta = {
    title: "Tutela",
    description: META_DESCRIPTION,
  };

  const [currentDateQuery, setCurrentDateQuery] = React.useState<any>();
  const [userRole, setUserRole] = React.useState<any>();
  const [tokenDetails, setTokenDetails] = React.useState<any>();
  React.useEffect(() => {
    if (getAuthenticationToken()) {
      let details: any = getAuthenticationToken();
      details = details ? JSON.parse(details) : null;
      if (details && details.info) {
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

  const { data: newsList, error: newsListError } = useSWR(NEWS_ENDPOINT, APIFetcher);
  const { data: advertsList, error: advertsListError } = useSWR(ADVERTS_ENDPOINT, APIFetcher);
  const { data: sessionList, error: sessionListError } = useSWR(
    currentDateQuery ? currentDateQuery : null,
    (url) => APIFetcher(url),
    { refreshInterval: 5000 }
  );

  const settingsSlider = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />,
  };

  return (
    <Page meta={meta}>
      <DashboardNav />
      <Container className="mt-5 container-lg">
        <Row>
          <h4 className="fw-bold text-dark mb-3">Upcoming Sessions</h4>
          <Col md="8">
            {sessionList && sessionList.length > 0 ? (
              <div>
                {sessionList.map((data: any, index: Number) => (
                  <div key={data.id} className="mb-2">
                    <SessionCard data={data} role="student" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center mt-4 mb-4">No sessions for Today.</div>
            )}

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
              <Card className="py-5 px-3 mt-4 mb-5 border-0 shadow">
                <Slider {...settingsSlider}>
                  {advertsList.map((item: any, index: any) => {
                    return (
                      <div>
                        <Link href={item.link}>
                          <a target="_blank">
                            <Image
                              className="img-fluid mx-auto d-block"
                              src={item.image}
                              width="300"
                            />
                          </a>
                        </Link>
                      </div>
                    );
                  })}
                </Slider>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </Page>
  );
};

export default withStudentAuth(StudentDetail);
