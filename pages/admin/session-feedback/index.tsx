import React from "react";
// next imports
import { useRouter } from "next/router";
// react-bootstrap
import { Container, Row, Col, Image, Card, Form, Dropdown, ProgressBar } from "react-bootstrap";
// constants
import { META_DESCRIPTION } from "@constants/page";
// seo
import Page from "@components/page";
// icons
import { CheveronDown } from "@styled-icons/zondicons/CheveronDown";
// layout
import AdminLayout from "@layouts/adminLayout";
// components
import SessionCard from "@components/new/teacherFeedback/SessionCard";
import ReportCard from "@components/new/teacherFeedback/ReportCard";
// swr
import useSWR from "swr";
// api routes
import {
  TEACHER_SESSION_FEEDBACK_UN_REVIEWED_ENDPOINT,
  PRODUCTS_WITH_ID_ENDPOINT,
} from "@constants/routes";
// cookie
import { getAuthenticationToken } from "@lib/cookie";
// api services
import { APIFetcher } from "@lib/services";
// hoc
import withGlobalAuth from "@lib/hoc/withGlobalAuth";
// global context provider
import { globalContext } from "@contexts/global";

const SessionFeedback = () => {
  const router = useRouter();
  const { session, user, product } = router.query;

  const meta = {
    title: "Teacher Feedback",
    description: META_DESCRIPTION,
  };

  const [globalState, globalDispatch] = React.useContext(globalContext);

  React.useEffect(() => {
    globalDispatch({
      type: "SIDEBAR_TOGGLE",
      payload: false,
    });
  }, [globalDispatch]);

  const { data: unReviewedSessions, error: unReviewedSessionsError } = useSWR(
    TEACHER_SESSION_FEEDBACK_UN_REVIEWED_ENDPOINT,
    APIFetcher,
    { refreshInterval: 0 }
  );

  React.useEffect(() => {
    if (
      unReviewedSessions &&
      unReviewedSessions?.data &&
      unReviewedSessions?.data.length > 0 &&
      !session &&
      !user &&
      !product
    ) {
      router.replace(
        `/admin/session-feedback?session=${unReviewedSessions.data[0].id}${
          unReviewedSessions.data[0]?.session_users.length > 0 &&
          `&user=${unReviewedSessions.data[0].session_users[0].user.id}`
        }&product=96`,
        undefined,
        { shallow: true }
      );
    }
  }, [unReviewedSessions, router, session, user, product]);

  const currentSessionUsers = () => {
    let sessionUsers = unReviewedSessions?.data?.filter((item: any) => item.id == session);
    if (sessionUsers && sessionUsers.length > 0) {
      sessionUsers = sessionUsers[0]?.session_users;
      return sessionUsers;
    }
    return [];
  };

  const currentUser = () => {
    let sessionUsers = unReviewedSessions?.data?.filter((item: any) => item.id == session);
    if (sessionUsers && sessionUsers.length > 0) {
      sessionUsers = sessionUsers[0]?.session_users;
      sessionUsers = sessionUsers?.filter((_user: any) => _user?.user?.id == user);
      if (sessionUsers && sessionUsers.length > 0) return sessionUsers[0];
    }
    return [];
  };

  const { data: productDetails, error: productDetailsError } = useSWR(
    product ? PRODUCTS_WITH_ID_ENDPOINT(product) : null,
    (url) => APIFetcher(url),
    { refreshInterval: 0 }
  );

  const [activeTab, setActiveTab] = React.useState("unfinished ");
  const tabs = [
    { name: "Unfinished ", key: "unfinished " },
    { name: "Finished", key: "finished" },
  ];

  return (
    <Page meta={meta}>
      <AdminLayout>
        {unReviewedSessions && unReviewedSessions ? (
          <>
            {unReviewedSessions?.data && unReviewedSessions?.data.length > 0 ? (
              <div style={{ margin: "0px" }} className="h-100 w-100 overflow-hidden">
                <div
                  style={{ background: " #0052CC" }}
                  className="border p-4 w-100 d-flex align-items-center justify-content-between text-white"
                >
                  <h4 className="my-3">Session Feedback</h4>
                  <div>Skip for now</div>
                </div>
                <Row className="h-100 w-100 p-0 m-0">
                  <Col className="h-100 overflow-auto pb-5 px-0" md={3}>
                    <div className="d-flex gap-3 border-bottom px-3 pt-2">
                      {tabs &&
                        tabs.map((tab: any, index: number) => (
                          <div
                            key={`index-tabs-${index}`}
                            onClick={() => setActiveTab(tab.key)}
                            className={`p-2 cursor-pointer ${
                              activeTab == tab.key
                                ? "border-bottom text-primary border-primary border-2 fw-bold"
                                : "text-muted fw-bold"
                            } `}
                          >
                            {tab.name}
                          </div>
                        ))}
                    </div>
                    <div className="px-3 pb-5 px-4">
                      {unReviewedSessions?.data &&
                        unReviewedSessions?.data.map((data: any, index: any) => (
                          <div key={`meetings-${index}-index-data`}>
                            <SessionCard data={data} currentSession={session} />
                          </div>
                        ))}
                    </div>
                  </Col>
                  <Col
                    className="h-100 overflow-auto pb-5"
                    style={{ borderLeft: "1px solid #eee", borderRight: "1px solid #eee" }}
                    md={3}
                  >
                    <h4 className="mt-3 mb-3">Students</h4>
                    {currentSessionUsers() && currentSessionUsers()?.length > 0 && (
                      <>
                        {currentSessionUsers().map((_user: any, _idx: any) => (
                          <div key={_idx}>
                            {_user?.user.role === 0 && (
                              <div
                                className={`cursor-pointer my-2 border rounded p-2 d-flex align-items-center gap-2 ${
                                  _user.user.id == user
                                    ? "border-primary alert alert-primary text-black"
                                    : "bg-light"
                                }`}
                                onClick={() => {
                                  router.replace(
                                    `/admin/session-feedback?session=${session}&user=${_user.user.id}&product=96`,
                                    undefined,
                                    { shallow: true }
                                  );
                                }}
                              >
                                <Image
                                  className="img-fluid rounded-circle mt-1"
                                  src={"/bird.svg"}
                                  width="30"
                                  alt=""
                                />
                                <div className="fw-medium">
                                  {_user?.user.first_name} {_user?.user.last_name}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </>
                    )}
                  </Col>

                  <Col className="p-4 pt-3 h-100 overflow-auto pb-5" md={6}>
                    <div className="d-flex align-items-center gap-2">
                      <Image
                        className="img-fluid rounded-circle"
                        src={"/bird.svg"}
                        width="30"
                        alt=""
                      />
                      <div className="text-lg fw-medium flex-shrink-0 justify-content-end">
                        {currentUser()?.user?.first_name} {currentUser()?.user?.last_name}
                      </div>
                      <div className="ms-auto me-4 d-flex align-items-center gap-4">
                        <div style={{ width: "150px" }}>
                          <div className="text-xs fw-medium mb-1"> Reports : 2/6 </div>
                          <ProgressBar
                            style={{ height: " 6px" }}
                            variant="success"
                            className="rounded-pill"
                            now={50}
                          />
                        </div>
                        <div className="plain-dropdown">
                          <Dropdown>
                            <Dropdown.Toggle
                              as="div"
                              className="icon d-flex gap-2  plain-dropdown text-primary border-2 border-bottom border-primary text-sm"
                            >
                              <div>Conducted Topics</div>
                              <CheveronDown width="14px" />
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="content-wrapper p-0">
                              <div className="p-2">dropdown</div>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 pt-2 mb-5">
                      {productDetails && !productDetailsError ? (
                        <>
                          {productDetails?.report_schema &&
                          productDetails?.report_schema?.data &&
                          productDetails?.report_schema?.data.length > 0 ? (
                            <ReportCard user={currentUser()} data={productDetails} />
                          ) : (
                            <div className="text-center mt-5 mb-5 w-100">
                              No Report Schema available.
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="text-center mt-5 mb-5 w-100">Loading...</div>
                      )}
                    </div>
                  </Col>
                </Row>
              </div>
            ) : (
              <div className="text-center mt-5 mb-5 w-100">
                No Scheduled sessions are available.
              </div>
            )}
          </>
        ) : (
          <div className="text-center mt-5 mb-5 w-100">Loading...</div>
        )}
      </AdminLayout>
    </Page>
  );
};

export default withGlobalAuth(SessionFeedback);
