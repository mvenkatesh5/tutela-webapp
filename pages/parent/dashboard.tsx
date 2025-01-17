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
import ProfileMandatoryModal from "@components/new/ProfileMandatoryModal";
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
  USER_ENDPOINT,
  CONCERN_ENDPOINT,
} from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";
// hoc
import withParentAuth from "@lib/hoc/withParentAuth";
// react slick
import Slider from "react-slick";
// constants
import { returnSingleDate, returnSingleMonth } from "@constants/global";
import TestScroreCard from "@components/testscorecard";

const StudentDetail = () => {
  const meta = {
    title: "New Dashboard",
    description: META_DESCRIPTION,
  };

  const currentDate = new Date();
  const currentTime = currentDate.getHours();

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

  const { data: users, error: usersError } = useSWR(USER_ENDPOINT, APIFetcher);
  // const { data: coins, error: coinsError } = useSWR(USER_COINS_ENDPOINT, APIFetcher);
  const { data: newsList, error: newsListError } = useSWR(NEWS_ENDPOINT, APIFetcher);
  const { data: advertsList, error: advertsListError } = useSWR(ADVERTS_ENDPOINT, APIFetcher);
  // const { data: sessionList, error: sessionListError } = useSWR(
  //   currentDateQuery ? currentDateQuery : null,
  //   (url) => APIFetcher(url),
  //   { refreshInterval: 5000 }
  // );
  const { data: concerns, error: concernsError } = useSWR(CONCERN_ENDPOINT, APIFetcher, {
    refreshInterval: 0,
  });

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

  // const concerns = [
  //   { title: "What exactly do I do to ensure Educational achievements of my child?", reply: "2" },
  //   {
  //     title:
  //       "I am concerned about my child's education. I want him to be successful educationally. Where do I begin?",
  //     reply: "1",
  //   },
  // ];

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

  const [currentUser, setCurrentUser] = React.useState<any>();
  const [parentUsers, setParentUsers] = React.useState<any>();
  const [currentSelectedUser, setCurrentSelectedUser] = React.useState<any>();

  React.useEffect(() => {
    if (getAuthenticationToken()) {
      let details: any = getAuthenticationToken();
      details = details ? JSON.parse(details) : null;
      if (details) {
        setCurrentUser(details);
        if (details.info.role === 2) setUserRole("admin");
        else if (details.info.role === 1) setUserRole("teacher");
        else if (details.info.role === 3) setUserRole("parent");
        else setUserRole("student");
      }
    }
  }, []);

  const generateUniqueList = (arrayList: any) => {
    let uniqueNames: any = [];
    arrayList.forEach((element: any) => {
      if (!uniqueNames.includes(element)) uniqueNames.push(element);
    });
    return uniqueNames;
  };

  React.useEffect(() => {
    if (users && users.length > 0) {
      if (
        currentUser &&
        currentUser.user &&
        currentUser.user.linked_items &&
        currentUser.user.linked_items.students &&
        currentUser.user.linked_items.students.length > 0
      ) {
        let uniqueUsers = generateUniqueList(currentUser.user.linked_items.students);
        if (uniqueUsers && uniqueUsers.length > 0) {
          let uniqueUserDetails: any = [];
          uniqueUsers.forEach((element: any) => {
            let currentUser = users.find(
              (userElement: any) => userElement.id === parseInt(element)
            );
            if (currentUser) uniqueUserDetails.push(currentUser);
          });
          if (uniqueUserDetails && uniqueUserDetails.length > 0) {
            setCurrentSelectedUser(uniqueUserDetails[0].id);
            setParentUsers(uniqueUserDetails);
          }
        }
      }
    }
  }, [users && currentUser]);

  return (
    <Page meta={meta}>
      <NewLayout>
        {/* <ProfileMandatoryModal/> */}
        <div className="mt-3 md:tw-px-[4em] lg:tw-px-[10em]  " style={{ color: "#313131" }}>
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
              <h4 className="">
                Good{" "}
                {(currentTime < 12 && "Morning") ||
                  (currentTime >= 12 && currentTime <= 17 && "Afternoon") ||
                  (currentTime >= 17 && currentTime <= 24 && "Evening")}
                , {currentUser?.user?.first_name + " " + currentUser?.user?.last_name}
              </h4>
              <p className="text-muted">
                Here is the list of things which will make you familiar with Tutela platform.
              </p>
            </div>
            <Col lg="8" className="mb-4 ">
              <Row className="position-relative md:tw-pr-3 ">
                {parentUsers && parentUsers.length > 0 ? (
                  <div className="tw-space-y-4 m-0 p-0">
                    {parentUsers &&
                      parentUsers.length > 0 &&
                      parentUsers.map((user: any, index: any) => (
                        <>
                          {/* {index <= 1 && ( */}
                          <div key={`index-profile-key-${index}`}>
                            <ProfileCard data={user} />
                          </div>
                          {/* )} */}
                        </>
                      ))}
                  </div>
                ) : (
                  <div className=" text-center">Loading...</div>
                )}
              </Row>
              {/* <h5 className="fw-bold text-dark mt-5 mb-3">News and Updates</h5> */}
              <div className="d-flex mt-5 justify-content-between">
                <h5 className="fw-bold tw-text-[#313131] ">News and Updates</h5>
                <Link href="/parent/news">
                  <a>
                    <div className="d-flex gap-2 text-primary align-items-center">
                      <div className="text-nowrap">View all</div>
                      <RightArrowAlt width="18px" />
                    </div>
                  </a>
                </Link>
              </div>
              <Row className="position-relative ">
                {newsList &&
                  newsList.length > 0 &&
                  newsList.map((data: any, index: number) => (
                    <>
                      {index <= 1 && (
                        <Col md={6} className="d-flex mt-0" key={data.id}>
                          <NewsCard data={data} />
                        </Col>
                      )}
                    </>
                  ))}
              </Row>
              <div className="d-flex mt-5 mb-3 justify-content-between">
                <h5 className="fw-bold tw-text-[#313131] ">Concerns</h5>
                <Link href="/parent/concern">
                  <a>
                    <div className="d-flex gap-2 text-primary align-items-center">
                      <div className="text-nowrap">View all</div>
                      <RightArrowAlt width="18px" />
                    </div>
                  </a>
                </Link>
              </div>
              <Row className="px-2">
                <div className="border rounded p-0">
                  {concerns &&
                    concerns.length > 0 &&
                    concerns.map((data: any, index: number) => (
                      <>
                        {index <= 3 && (
                          <div key={`concerns-${index}`}>
                            <ConcernCard users={users} data={data} />
                          </div>
                        )}
                      </>
                    ))}
                </div>
              </Row>
            </Col>

            <Col lg="4" className="tw-space-y-10">
              {/* <UpcomingTestsCard /> */}

              {advertsList && advertsList.length > 0 && (
                <Card className="position-relative tw-p-[2em]  rounded-2  tw-transition-all tw-duration-200 tw-ease-in-out">
                  <Slider {...settingsSlider}>
                    {advertsList.map((item: any, index: any) => {
                      return (
                        <div key={`link-${index}`} className="tw-rounded-xl tw-overflow-hidden">
                          <a href={item.link} target="_blank" rel="noreferrer">
                            <Image
                              alt=""
                              className="img-fluid mx-auto d-block tw-rounded-xl"
                              src={item.image}
                              width={1000}
                              height={1000}
                              style={{
                                height: "100%",
                                width: "100%",
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

              <TestScroreCard />

              {!tests || testsError ? (
                <div className="text-center mt-5 mb-5">Loading.....</div>
              ) : (
                <Card className="position-relative mb-4 ">
                  <Card.Body className="position-relative p-4">
                    <div className="d-flex mb-1 justify-content-between mb-3">
                      <h5 className="fw-bold tw-text-[#313131] ">Upcoming Tests</h5>
                    </div>
                    {tests && tests.length > 0 ? (
                      <div className="student-test-container tw-space-y-3">
                        {tests.map((data: any, index: Number) => (
                          <div
                            key={`students-tests-${index}`}
                            className="d-flex align-items-center student-test-item hover:tw-bg-gray-100 tw-transition-all tw-duration-100 tw-ease-in-out"
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
                  </Card.Body>
                </Card>
              )}
            </Col>
          </Row>
        </div>
      </NewLayout>
    </Page>
  );
};

export default withParentAuth(StudentDetail);
