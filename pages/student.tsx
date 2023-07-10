import React from "react";
// next
import Link from "next/link";
// constants
import { META_DESCRIPTION } from "@constants/page";
// react-bootstrap
import { Container, Row, Col, Image, Card, Button } from "react-bootstrap";
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
import StudentV2Layout from "@layouts/v2/student/layout";
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
  NOTES_WITH_USER_ID_ENDPOINT,
  USER_RESOURCE_VIEW_ENDPOINT,
} from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";
// hoc
import withStudentAuth from "@lib/hoc/withStudentAuth";
// react slick
import Slider from "react-slick";
// constants
import { returnSingleDate, returnSingleMonth, returnSingleYear } from "@constants/global";

const StudentDetail = () => {
  const defaultImageUrl = `/bird.svg`;

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

  const { data: notes, error: notesError } = useSWR(
    tokenDetails && tokenDetails?.user ? NOTES_WITH_USER_ID_ENDPOINT(tokenDetails?.user?.id) : null,
    (url) => APIFetcher(url),
    { refreshInterval: 0 }
  );

  const { data: resources, error: resourcesError } = useSWR(
    tokenDetails && tokenDetails.user ? USER_RESOURCE_VIEW_ENDPOINT(tokenDetails.user.id) : null,
    (url) => APIFetcher(url),
    { refreshInterval: 0 }
  );

  console.log("notes", notes);
  console.log("resources", resources);

  // const { data: announcement, error: announcementError } = useSWR(
  //   ANNOUNCEMENT_USER_ENDPOINT,
  //   APIFetcher,
  //   {
  //     refreshInterval: 0,
  //   }
  // );

  const isToday = (date: any) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const renderSessionsForTodayAndUpcoming = (
    sessions: any,
    day: "up-coming" | "today" = "up-coming"
  ) => {
    let filteredSessions = [];

    filteredSessions = sessions.filter((session: any) =>
      day === "today" && isToday(new Date(session?.start_datetime))
        ? true
        : day === "up-coming" && !isToday(new Date(session?.start_datetime))
        ? true
        : false
    );

    return filteredSessions;
  };

  return (
    <Page meta={meta}>
      <StudentV2Layout page="dashboard">
        <div className="tw-w-full tw-h-full tw-overflow-y-auto">
          <Container className="mt-3 mb-3 container-lg p-2">
            <div className="tw-bg-[#f8f8f8] p-4 pt-2 tw-rounded-lg">
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
                <h4 className="fw-bold text-dark mb-3">Dashboard</h4>
                <Col lg="8">
                  <h5 className="fw-bold text-dark mt-3 mb-3">Today{"'"}s Classes:</h5>
                  {sessionList &&
                  sessionList.length > 0 &&
                  renderSessionsForTodayAndUpcoming(sessionList, "today").length > 0 ? (
                    <div>
                      {renderSessionsForTodayAndUpcoming(sessionList, "today").map(
                        (data: any, index: Number) => (
                          <div key={data.id} className="mb-2">
                            <SessionCard data={data} role="student" iconColor="coloured" />
                          </div>
                        )
                      )}
                    </div>
                  ) : (
                    <div className="text-center mt-4 mb-4">No sessions for Today.</div>
                  )}

                  <h5 className="fw-bold text-dark mt-5 mb-3">Upcoming Classes:</h5>
                  {sessionList &&
                  sessionList.length > 0 &&
                  renderSessionsForTodayAndUpcoming(sessionList).length > 0 ? (
                    <div>
                      {renderSessionsForTodayAndUpcoming(sessionList).map(
                        (data: any, index: Number) => (
                          <div key={data.id} className="mb-2">
                            <SessionCard data={data} role="student" />
                          </div>
                        )
                      )}
                    </div>
                  ) : (
                    <div className="text-center mt-4 mb-4">No Upcoming sessions are available.</div>
                  )}

                  <h5 className="fw-bold text-dark mt-5 mb-3">Resources:</h5>
                  {resources && resources.length > 0 ? (
                    <div className="tw-border tw-border-solid tw-border-gray-200 tw-rounded-sm tw-overflow-hidden">
                      <div className="tw-flex tw-items-center tw-font-semibold">
                        <div className="tw-w-full tw-p-3">File name</div>
                        <div className="tw-w-full tw-p-3 tw-text-center tw-max-w-[140px]">
                          Subject
                        </div>
                        <div className="tw-w-full tw-p-3 tw-text-center tw-max-w-[140px]">
                          Course
                        </div>
                      </div>
                      {resources.map((_resource: any) => (
                        <div
                          key={_resource?.id}
                          className="tw-bg-white tw-flex tw-items-center tw-text-sm"
                        >
                          <div className="tw-w-full tw-p-3 tw-flex tw-items-center tw-gap-2">
                            <div className="tw-w-[22px] tw-h-[22px] tw-rounded-sm tw-flex tw-justify-center tw-items-center tw-overflow-hidden">
                              <Image
                                src={defaultImageUrl}
                                alt=""
                                className="tw-w-full tw-h-full tw-object-contain"
                              />
                            </div>
                            <div>{_resource?.resource_node?.title || "-"}</div>
                          </div>
                          <div className="tw-w-full tw-p-3 tw-text-center tw-max-w-[140px]">
                            {_resource?.resource_node?.source?.title || "-"}
                          </div>
                          <div className="tw-w-full tw-p-3 tw-text-center tw-max-w-[140px]">
                            {_resource?.resource_node?.course?.title || "-"}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center mt-4 mb-4">No Resources are available.</div>
                  )}

                  <h5 className="fw-bold text-dark mt-5 mb-3">Notes:</h5>
                  {notes && notes.length > 0 ? (
                    <div className="tw-border tw-border-solid tw-border-gray-200 tw-rounded-sm tw-overflow-hidden">
                      <div className="tw-flex tw-items-center tw-font-semibold">
                        <div className="tw-w-full tw-p-3">Notes</div>
                        <div className="tw-w-full tw-p-3 tw-text-center tw-max-w-[140px]">
                          Resource
                        </div>
                      </div>
                      {notes.map((_notes: any) => (
                        <div
                          key={_notes?.id}
                          className="tw-bg-white tw-flex tw-items-center tw-text-sm"
                        >
                          <div className="tw-w-full tw-p-3 tw-flex tw-items-center tw-gap-2">
                            <div>{_notes?.text || "-"}</div>
                          </div>
                          <div className="tw-w-full tw-p-3 tw-text-center tw-max-w-[140px] hover:tw-text-blue-500 tw-cursor-pointer">
                            <Link href={`/user-resources/${_notes?.resource_connection}`}>
                              <a>View Detail</a>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center mt-4 mb-4">No Notes are available.</div>
                  )}

                  <h5 className="fw-bold text-dark mt-5 mb-3">latest Updates:</h5>
                  {newsList && newsList.length > 0 ? (
                    <Row>
                      {newsList.map((data: any, index: Number) => (
                        <Col lg={12} key={data.id} style={{ marginBottom: "10px" }}>
                          <NewsCard data={data} />
                        </Col>
                      ))}
                    </Row>
                  ) : (
                    <div className="text-center mt-4 mb-4">No Latest News are available.</div>
                  )}
                </Col>

                <Col lg="4">
                  <h5 className="fw-bold text-dark mt-3 mb-3">Upcoming Test Dates:</h5>
                  {!tests ? (
                    <div className="text-center mt-5 mb-5">Loading.....</div>
                  ) : (
                    <Card className="pt-3 pb-4 px-3 border-0 shadow mb-2">
                      {tests && tests.length > 0 ? (
                        <div className="student-test-container">
                          {tests.map((data: any, index: Number) => (
                            <div
                              key={`students-tests-${index}`}
                              className="d-flex align-items-center student-test-item"
                            >
                              <div className="tw-text-center tw-border tw-border-solid tw-border-[#C9A060] tw-rounded tw-flex-shrink-0 tw-w-[50px]">
                                <div className="tw-font-bold tw-leading-[28px]">
                                  {returnSingleDate(data.datetime)}
                                </div>
                                <div className="tw-text-xs tw-leading-[8px]">
                                  {returnSingleMonth(data.datetime)}
                                </div>
                                <div className="tw-text-xs">{returnSingleYear(data.datetime)}</div>
                              </div>
                              {data.link ? (
                                <div className="student-content tw-font-bold">
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

                  <h5 className="fw-bold text-dark mt-5 mb-3">Have a doubt?</h5>
                  <Card className="pt-3 pb-3 px-3 border-0 shadow mb-3">
                    <div className="tw-text-xs tw-text-center tw-max-w-[250px] mx-auto">
                      Get your doubts cleared either from our <strong>Expert Mentors</strong> or{" "}
                      <strong>AI</strong>
                    </div>
                    <div className="d-flex tw-justify-around tw-gap-4 mt-3">
                      <Link href="/doubts/ask">
                        <a className="tw-w-full">
                          <button className="tw-bg-[#C9A060] tw-rounded-lg tw-text-white tw-font-semibold tw-w-full tw-whitespace-nowrap py-1">
                            Ask Human
                          </button>
                        </a>
                      </Link>{" "}
                      <button className="tw-bg-black tw-rounded-lg tw-text-white tw-font-semibold tw-w-full tw-whitespace-nowrap py-1">
                        Ask AI
                      </button>
                    </div>
                  </Card>

                  <h5 className="fw-bold text-dark mt-5 mb-3">College Kit:</h5>
                  <Card className="pt-3 pb-3 px-3 border-0 shadow mb-3">
                    <div className="tw-space-y-3">
                      <h5>Start your College Research now!</h5>
                      <ul className="tw-grid tw-grid-cols-2 tw-gap-2 tw-list-disc">
                        <li className="tw-ml-[-18px]">College Navigator</li>
                        <li className="tw-ml-[-18px]">Alumni Network</li>
                        <li className="tw-ml-[-18px]">Quizzes</li>
                        <li className="tw-ml-[-18px]">Scholarship Calculator </li>
                        <li className="tw-ml-[-18px]">GPA Calculator</li>
                      </ul>
                      <div className="tw-flex tw-justify-end">
                        <Link href="https://www.tutelaprep.com/college-kit">
                          <a target="_blank">
                            <button className="tw-bg-[#C9A060] tw-rounded-lg tw-text-white tw-font-semibold tw-w-full tw-whitespace-nowrap py-1">
                              Get Access
                            </button>
                          </a>
                        </Link>
                      </div>
                    </div>
                  </Card>

                  <h5 className="fw-bold text-dark mt-5 mb-3"></h5>
                  {advertsList && advertsList.length > 0 && (
                    <Card className="tw-border tw-border-solid border-red-500 shadow border-0 mb-2">
                      <Slider {...settingsSlider}>
                        {advertsList.map((item: any, index: any) => {
                          return (
                            <div key={`link-${index}`} className="tw-h-[400px] tw-p-5">
                              <a href={item.link} target="_blank" rel="noreferrer">
                                <Image
                                  alt=""
                                  className="tw-w-full tw-h-full tw-object-contain"
                                  src={item.image}
                                />
                              </a>
                            </div>
                          );
                        })}
                      </Slider>
                    </Card>
                  )}
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </StudentV2Layout>
    </Page>
  );
};

export default withStudentAuth(StudentDetail);
