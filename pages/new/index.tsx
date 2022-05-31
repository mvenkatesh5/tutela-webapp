import React from "react";
// next
import Link from "next/link";
// constants
import { META_DESCRIPTION } from "@constants/page";
// react-bootstrap
import { Container, Row, Col, Image, Card } from "react-bootstrap";
// icons
import { RightArrowAlt } from "@styled-icons/boxicons-regular";
// components
import Page from "@components/page";
import NewsCard from "@components/new/NewsCard";
import ConcernCard from "@components/new/ConcernCard";
import ProfileCard from "@components/new/ProfileCard";
import WarningPopup from "@components/warningpopup";
// swr
import useSWR from "swr";
// layout
import NewLayout from "@layouts/newLayout";
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
import withAdminAuth from "@lib/hoc/withAdminAuth";
// react slick
import Slider from "react-slick";
// constants
import { returnSingleDate, returnSingleMonth } from "@constants/global";

const StudentDetail = () => {
  const meta = {
    title: "New Dashboard",
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

  const profiles = [
    {
      name: "Anuchal Mehta",
      school: "Delhi Public School International",
      grade: "Grade 11",
      syllabus: "IGCSE",
      image: "/bird.svg",
    },
    {
      name: "Ramesh Mehta",
      school: "Delhi Public School International",
      grade: "Grade 12",
      syllabus: "IGCSE",
      image: "/bird.svg",
    },
  ];

  const concerns = [
    { title: "What exactly do I do to ensure Educational achievements of my child?", reply: "2" },
    {
      title:
        "I am concerned about my child's education. I want him to be successful educationally. Where do I begin?",
      reply: "1",
    },
  ];

  const testScore = [
    {
      title: "SAT",
      date: "29/11/2020",
      score: "1150/1600",
    },
    {
      title: "GRE",
      date: "3/12/2020",
      score: "301/340",
    },
  ];

  return (
    <Page meta={meta}>
      <NewLayout>
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
            <div className="px-2 mb-3">
              <h4 className="">Good Evening, Rameshwar </h4>
              <p className="text-muted">
                Here is the list of things which will make you familiar with Tutela platform.
              </p>
            </div>

            <Col lg="8" className="pe-4">
              {profiles &&
                profiles.map((data: any, index: Number) => (
                  <div key={`index-profile-key-${index}`}>
                    <ProfileCard data={data} />
                  </div>
                ))}
              <h5 className="fw-bold text-dark mt-5 mb-3">News and Updates</h5>
              <Row className="pe-3">
                <div className="border rounded p-0">
                  {newsList &&
                    newsList.length > 0 &&
                    newsList.map((data: any, index: Number) => (
                      <div key={data.id}>
                        <NewsCard data={data} />
                      </div>
                    ))}
                </div>
              </Row>
              <div className="d-flex mt-5 mb-3 justify-content-between">
                <h5 className="fw-bold text-dark ">Concerns</h5>
                <div className="d-flex gap-2 text-primary align-items-center">
                  <div className="text-nowrap">View all</div>
                  <RightArrowAlt width="18px" />
                </div>
              </div>
              <Row className="pe-3">
                <div className="border rounded p-0">
                  {concerns &&
                    concerns.length > 0 &&
                    concerns.map((data: any, index: Number) => (
                      <div key={`concerns-${index}`}>
                        <ConcernCard data={data} />
                      </div>
                    ))}
                </div>
              </Row>
            </Col>

            <Col lg="4">
              {/* <TestScroreCard /> */}
              {/* <UpcomingTestsCard /> */}

              {advertsList && advertsList.length > 0 && (
                <Card className="pt-4 pb-5 px-3 border-0 shadow">
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
                              height="250px"
                              style={{
                                height: "250px",
                                width: "350px",
                                overflow: "hidden",
                              }}
                            />
                          </a>
                        </div>
                      );
                    })}
                  </Slider>
                </Card>
              )}
              <Card className="pt-3 pb-4 px-3 mt-3 border-0 shadow">
                <div className="d-flex justify-content-between mb-2">
                  <h6 className="">Last tests score</h6>
                  <div className="d-flex gap-2 text-primary align-items-center">
                    <small className="text-nowrap">View all</small>
                    <RightArrowAlt width="16px" />
                  </div>
                </div>
                <table>
                  <tr className="text-muted">
                    <th>
                      <small className="fw-normal">TEST NAME</small>
                    </th>
                    <th>
                      <small className="fw-normal"> DATE</small>
                    </th>
                    <th>
                      <small className="fw-normal">SCORE</small>
                    </th>
                  </tr>
                  <div className="mb-2"></div>
                  {testScore &&
                    testScore.map((data: any, index: any) => (
                      <tr key={`test-score-${index}`}>
                        <td>
                          {index + 1}. {data.title}
                        </td>
                        <td>{data.date}</td>
                        <td>{data.score}</td>
                      </tr>
                    ))}
                </table>
              </Card>

              {!tests ? (
                <div className="text-center mt-5 mb-5">Loading.....</div>
              ) : (
                <Card className="pt-3 pb-4 px-3 mt-3 border-0 shadow">
                  <h6 className="mb-3">Upcoming Tests</h6>
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
      </NewLayout>
    </Page>
  );
};

export default withAdminAuth(StudentDetail);
