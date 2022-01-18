import React from "react";
// next imports
import Link from "next/link";
// react-bootstrap
import { Container, Row, Col, Image, Card } from "react-bootstrap";
// swr
import useSWR from "swr";
// components
import Page from "@components/page";
import SessionCard from "@components/admin/sessions/sessionCard";
import UpcomingTestsCard from "@components/uptestscard";
// api routes
import { SESSION_ENDPOINT_UPCOMING, ADVERTS_ENDPOINT, TESTS_ENDPOINT } from "@constants/routes";
// constants
import { META_DESCRIPTION } from "@constants/page";
// cookie
import { getAuthenticationToken } from "@lib/cookie";
// api services
import { APIFetcher } from "@lib/services";
// react slick
import Slider from "react-slick";
// layouts
import StudentLayout from "layouts/studentLayout";
// hoc
import withTeacherAuth from "@lib/hoc/withTeacherAuth";
// constants
import { returnSingleDate, returnSingleMonth } from "@constants/global";

const DashboardDetail = (props: any) => {
  const meta = {
    description: META_DESCRIPTION,
    title: "Dashboard",
  };

  const [currentDateQuery, setCurrentDateQuery] = React.useState<any>();
  const [userRole, setUserRole] = React.useState<any>();
  const [tokenDetails, setTokenDetails] = React.useState<any>();

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

  const { data: tests, error: testsError } = useSWR(TESTS_ENDPOINT, APIFetcher, {
    refreshInterval: 0,
  });

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
            <Col lg="4">
              {/* <UpcomingTestsCard /> */}
              {advertsList && advertsList.length > 0 && (
                <Card className="p-3 pb-4 border-0 shadow">
                  <Slider {...settingsSlider}>
                    {advertsList.map((item: any, index: any) => {
                      return (
                        <div key={`link-${index}`}>
                          <a href={item.link} target="_blank" rel="noreferrer">
                            <Image
                              alt=""
                              className="img-fluid mx-auto d-block"
                              src={item.image}
                              width="300"
                            />
                          </a>
                        </div>
                      );
                    })}
                  </Slider>
                </Card>
                // <Card className="p-3 border-0 shadow">
                //   <a
                //     href={advertsList[0].link ? advertsList[0].link : "#"}
                //     target="_blank"
                //     rel="noreferrer"
                //   >
                //     <Image
                //       alt=""
                //       className="img-fluid mx-auto d-block"
                //       src={advertsList[0].image}
                //       width="300"
                //     />
                //   </a>
                // </Card>
              )}
              {!tests ? (
                <div className="text-center mt-5 mb-5">Loading.....</div>
              ) : (
                <Card className="pt-3 pb-4 px-3 mt-3 border-0 shadow">
                  <h6 className="mb-3">All Tests</h6>
                  {tests && tests.length > 0 ? (
                    <div className="student-test-container">
                      {tests.map((data: any, index: Number) => (
                        <div
                          key={`students-tests-${index}`}
                          className="d-flex align-items-center student-test-item"
                        >
                          <div className="student-icon">
                            <div>{returnSingleDate(data.datetime)}</div>
                            <div>{returnSingleMonth(data.datetime)}</div>
                          </div>
                          {data.link ? (
                            <div className="student-content">
                              <Link href={data.href}>
                                <a>{data.name}</a>
                              </Link>
                            </div>
                          ) : (
                            <div className="student-content">{data.name}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center mt-5 mb-5">No Tests are available</div>
                  )}
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
