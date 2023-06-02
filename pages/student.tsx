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
import WarningPopup from "@components/warningpopup";
// swr
import useSWR from "swr";
// layout
import StudentLayout from "@layouts/studentLayout";
// cookie
import { getAuthenticationToken } from "@lib/cookie";
// api routes
import {
  NEWS_ENDPOINT,
  ADVERTS_ENDPOINT,
  SESSION_ENDPOINT_UPCOMING,
  USER_WITH_ID_ENDPOINT,
  USER_COINS_ENDPOINT,
  TESTS_ENDPOINT,
  ANNOUNCEMENT_USER_ENDPOINT,
} from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";
// hoc
import withStudentAuth from "@lib/hoc/withStudentAuth";
// react slick
import Slider from "react-slick";
// constants
import { returnSingleDate, returnSingleMonth } from "@constants/global";

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
    title: "Student",
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
    setCurrentDateQuery(currentRoute);
  };

  const { data: userDetailList, error: userDetailListError } = useSWR(
    tokenDetails && tokenDetails.user ? USER_WITH_ID_ENDPOINT(tokenDetails.user.id) : null,
    (url) => APIFetcher(url),
    { refreshInterval: 0 }
  );

  const { data: coins, error: coinsError } = useSWR(USER_COINS_ENDPOINT, APIFetcher);
  const { data: newsList, error: newsListError } = useSWR(NEWS_ENDPOINT, APIFetcher);
  const { data: advertsList, error: advertsListError } = useSWR(ADVERTS_ENDPOINT, APIFetcher);
  const { data: sessionList, error: sessionListError } = useSWR(
    currentDateQuery ? currentDateQuery : null,
    (url: any) => APIFetcher(url),
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

  const { data: tests, error: testsError } = useSWR(TESTS_ENDPOINT, APIFetcher, {
    refreshInterval: 0,
  });

  const { data: announcement, error: announcementError } = useSWR(
    ANNOUNCEMENT_USER_ENDPOINT,
    APIFetcher,
    {
      refreshInterval: 0,
    }
  );

  return (
    <Page meta={meta}>
      <StudentLayout>
        <Container className="mt-3 container-lg">
          <div className="mb-3">
            {userDetailList &&
              userDetailList.profile_data &&
              Object.keys(userDetailList.profile_data).length <= 0 && (
                <WarningPopup href={`/profile`}>
                  Hello <strong>{userDetailList.username}</strong>, Click here to complete your
                  profile.
                </WarningPopup>
              )}
          </div>

          <Row>
            {announcement && (
              <>
                <div className="px-2 mb-3">
                  <div className="p-2 px-3 rounded alert-container">
                    <Image alt="" src="/announcement.svg" className="icon" />
                    {announcement?.url ? (
                      <a href={announcement?.url} rel="noreferrer" target="_blank">
                        <div className="alert">
                          {announcement?.message ? (
                            announcement?.message
                          ) : (
                            <>
                              Welcome to <strong>Tutela</strong> Have a great Day ahead!
                            </>
                          )}
                        </div>
                      </a>
                    ) : (
                      <div className="alert">
                        {announcement?.message ? (
                          announcement?.message
                        ) : (
                          <>
                            Welcome to <strong>Tutela</strong> Have a great Day ahead!
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
            <h4 className="fw-bold text-dark mb-3">Upcoming Sessions</h4>
            <Col lg="8">
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
                    <Col lg={6} key={data.id} style={{ marginBottom: "10px" }}>
                      <NewsCard data={data} />
                    </Col>
                  ))}
              </Row>

              <h4 className="fw-bold text-dark mt-5 mb-3">Doubts</h4>
              <Doubts />
            </Col>

            <Col lg="4">
              {/* <TestScroreCard /> */}
              {/* <UpcomingTestsCard /> */}
              <Card className="pt-3 pb-3 px-3 border-0 shadow mb-3">
                <h5>Coins Earned</h5>
                {!coins ? (
                  <div className="text-center mt-3">
                    <small>Loading...</small>
                  </div>
                ) : (
                  <div
                    className="mt-1"
                    style={{ display: "flex", alignItems: "center", gap: "10px" }}
                  >
                    <div style={{ width: "40px", height: "40px", flexShrink: 0 }}>
                      <Image
                        src={"/tutela-coin.png"}
                        alt=""
                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                      />
                    </div>
                    <div style={{ fontSize: "20px", fontWeight: 500 }}>{coins.total_coins}</div>
                  </div>
                )}
              </Card>

              {advertsList && advertsList.length > 0 && (
                <Card className="pt-3 pb-5 px-3 border-0 shadow">
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

export default withStudentAuth(StudentDetail);
