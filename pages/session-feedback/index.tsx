import React from "react";
// next imports
import { useRouter } from "next/router";
// react-bootstrap
import { Image, ProgressBar } from "react-bootstrap";
// swr
import useSWR, { mutate } from "swr";
// constants
import { META_DESCRIPTION } from "@constants/page";
// seo
import Page from "@components/page";
// layout
import StudentLayout from "@layouts/studentLayout";
// components
import SessionCard from "@components/session-feedback/session-card";
import UserCard from "@components/session-feedback/user-card";
import ReportCard from "@components/session-feedback/report-card";
// api routes
import {
  TEACHER_SESSION_FEEDBACK_UN_REVIEWED_ENDPOINT,
  PRODUCTS_WITH_ID_ENDPOINT,
} from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";
import { SessionReport } from "@lib/services/session-report.service";
import { SessionUserUpdate } from "@lib/services/sessionservice";
// hoc
import withGlobalAuth from "@lib/hoc/withGlobalAuth";
// global context provider
import { globalContext } from "@contexts/global";

const SessionFeedback = () => {
  const router = useRouter();
  const { session, user, product: product_id } = router.query as any;

  const meta = {
    title: "Teacher Feedback",
    description: META_DESCRIPTION,
  };

  const [globalState, globalDispatch] = React.useContext(globalContext);
  React.useEffect(() => {
    globalDispatch({
      type: "SIDEBAR_TOGGLE",
      payload: true,
    });
  }, [globalDispatch]);

  const { data: teacherSessions, error: teacherSessionsError } = useSWR(
    TEACHER_SESSION_FEEDBACK_UN_REVIEWED_ENDPOINT,
    APIFetcher,
    { refreshInterval: 0 }
  );
  React.useEffect(() => {
    if (
      teacherSessions &&
      teacherSessions?.data &&
      teacherSessions?.data.length > 0 &&
      !session &&
      !user
    ) {
      router.replace(
        `/session-feedback?session=${teacherSessions.data[0].id}${
          teacherSessions.data[0]?.session_users.length > 0 &&
          `&user=${teacherSessions.data[0].session_users[0].id}`
        }${teacherSessions.data[0]?.product && `&product=${teacherSessions.data[0]?.product}`}`,
        undefined,
        { shallow: true }
      );
    }
  }, [teacherSessions, router, session, user]);

  // fetch product details
  const { data: product, error: productError } = useSWR(
    product_id ? `session_product_teacher-${product_id}` : null,
    product_id ? () => APIFetcher(PRODUCTS_WITH_ID_ENDPOINT(product_id)) : null,
    { refreshInterval: 0 }
  );

  // fetch session user report details
  const { data: userReports, error: userReportsError } = useSWR(
    session && user ? `session_user_report_teacher-${session}-${user}` : null,
    session && user ? () => SessionReport.getBySessionUserId(user, { session_id: session }) : null,
    { refreshInterval: 0 }
  );

  const currentSessionUsers = () => {
    let sessionUsers = teacherSessions?.data?.filter((item: any) => item.id == session);
    if (sessionUsers && sessionUsers.length > 0) {
      sessionUsers = sessionUsers[0]?.session_users;
      return sessionUsers;
    }
    return [];
  };

  const currentUser = () => {
    let sessionUsers = teacherSessions?.data?.filter((item: any) => item.id == session);
    if (sessionUsers && sessionUsers.length > 0) {
      sessionUsers = sessionUsers[0]?.session_users;
      sessionUsers = sessionUsers?.filter((_user: any) => _user?.id == user);
      if (sessionUsers && sessionUsers.length > 0) return sessionUsers[0];
    }
    return [];
  };

  const tabs = [
    { name: "Unfinished ", key: "unfinished" },
    { name: "Finished", key: "finished" },
  ];
  const [activeTab, setActiveTab] = React.useState("unfinished");

  const percentage = (partialValue: any, totalValue: any) => {
    return (100 * partialValue) / totalValue;
  };

  const [attendanceLoader, setAttendanceLoader] = React.useState(false);
  const updateUserAttendance = (sessionUser: any, _going: any) => {
    const payload = { id: sessionUser, going: _going };
    console.log("payload", payload);
    setAttendanceLoader(true);
    SessionUserUpdate(payload)
      .then((response) => {
        mutate(
          TEACHER_SESSION_FEEDBACK_UN_REVIEWED_ENDPOINT,
          async (elements: any) => {
            elements && elements.data.length > 0
              ? elements.data.map((oldElement: any, i: any) => {
                  if (oldElement.id == session) {
                    oldElement.session_users.map((_user: any) => {
                      if (_user.id == sessionUser) {
                        _user.going = _going;
                      }
                    });
                  }
                })
              : elements.data;
            return { data: elements.data };
          },
          false
        );
        setAttendanceLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setAttendanceLoader(false);
      });
  };

  console.log("---");
  console.log("teacherSessions", teacherSessions);
  console.log("product", product);
  console.log("userReports", userReports);
  console.log("user", user);
  console.log("currentUser()", currentUser());
  console.log("---");

  return (
    <Page meta={meta}>
      <StudentLayout assessmentSidebar={true}>
        <div className="tw-relative tw-w-full tw-h-full">
          {teacherSessions && !teacherSessionsError ? (
            <>
              {teacherSessions?.data && teacherSessions?.data.length > 0 ? (
                <div className="tw-w-full tw-h-full tw-flex tw-flex-col">
                  {/* <div className="tw-flex-shrink-0 tw-h-[60px] tw-bg-blue-600 tw-text-white tw-flex tw-justify-between tw-items-center tw-p-3">
                    <h5 className="tw-m-0 tw-p-0">Session Feedback</h5>
                    <div>Skip for now</div>
                  </div> */}

                  <div className="tw-relative tw-w-full tw-h-full tw-overflow-hidden tw-flex">
                    <div className="tw-flex-shrink-0 tw-relative tw-flex tw-flex-col !tw-w-[280px] tw-h-full tw-border-0 tw-border-r tw-border-solid tw-border-gray-300 tw-overflow-hidden">
                      <div className="tw-flex-shrink-0 tw-flex tw-border-0 tw-border-b tw-border-solid tw-border-gray-300 tw-p-3 tw-font-medium">
                        All Sessions
                      </div>
                      {/* <div className="tw-flex-shrink-0 tw-flex tw-border-0 tw-border-b tw-border-solid tw-border-gray-300">
                        {tabs &&
                          tabs.map((tab: any, index: number) => (
                            <div
                              key={`index-tabs-${index}`}
                              onClick={() => setActiveTab(tab.key)}
                              className={`tw-w-full tw-border-0 tw-border-b-2 tw-border-solid tw-text-center tw-p-2 tw-text-sm tw-cursor-pointer tw-font-medium 
                              ${
                                activeTab == tab.key
                                  ? `tw-border-blue-500 tw-text-blue-500`
                                  : `tw-border-transparent`
                              }`}
                            >
                              {tab.name}
                            </div>
                          ))}
                      </div> */}

                      <div className="tw-p-2 tw-w-full tw-h-full tw-space-y-2 tw-overflow-y-auto">
                        {teacherSessions?.data &&
                          teacherSessions?.data.map((data: any, index: any) => (
                            <div key={`session-${index}-index-data`}>
                              <SessionCard
                                data={data}
                                currentSession={session}
                                currentUser={user}
                                currentProduct={product_id}
                              />
                            </div>
                          ))}
                      </div>
                    </div>

                    <div className="tw-flex-shrink-0 tw-relative tw-flex tw-flex-col !tw-w-[280px] tw-h-full tw-border-0 tw-border-r tw-border-solid tw-border-gray-300 tw-overflow-hidden">
                      <div className="tw-flex-shrink-0 tw-flex tw-border-0 tw-border-b tw-border-solid tw-border-gray-300 tw-p-3 tw-font-medium">
                        Users
                      </div>
                      <div className="tw-p-2 tw-w-full tw-h-full tw-space-y-2 tw-overflow-y-auto">
                        {currentSessionUsers() && currentSessionUsers()?.length > 0 && (
                          <>
                            {currentSessionUsers().map(
                              (_user: any, _idx: any) =>
                                _user?.as_role === 0 && (
                                  <div key={`user-${_idx}-index-data`}>
                                    <UserCard
                                      data={_user}
                                      currentSession={session}
                                      currentUser={user}
                                      currentProduct={product_id}
                                    />
                                  </div>
                                )
                            )}
                          </>
                        )}
                      </div>
                    </div>

                    <div className="tw-relatives tw-w-full tw-h-full tw-overflow-hidden tw-flex tw-flex-col">
                      <div className="tw-flex-shrink-0 tw-flex tw-items-center tw-gap-2 tw-border-0 tw-border-b tw-border-solid tw-border-gray-300 tw-p-3 tw-font-medium">
                        <div className="tw-flex tw-items-center tw-gap-2">
                          <div className="tw-flex-shrink-0 tw-w-[24px] tw-h-[24px] tw-rounded-full tw-overflow-hidden tw-flex tw-justify-center tw-items-center">
                            <Image
                              className="tw-object-contain tw-object-center tw-w-full tw-h-full"
                              src={"/bird.svg"}
                              alt=""
                            />
                          </div>
                          <div className="tw-font-medium tw-text-sm tw-capitalize">
                            {user && currentUser()?.user?.first_name}{" "}
                            {user && currentUser()?.user?.last_name}
                          </div>
                        </div>

                        <div>
                          {user && currentUser() && (
                            <div
                              className={`tw-text-xs tw-uppercase tw-p-1 tw-py-0.5 tw-rounded-sm tw-font-medium tw-cursor-pointer tw-bg-opacity-50 hover:tw-bg-opacity-100  
                              ${
                                currentUser()?.going
                                  ? `tw-text-green-500 tw-bg-green-200`
                                  : `tw-text-red-500 tw-bg-red-200`
                              }
                              `}
                              onClick={() =>
                                updateUserAttendance(currentUser()?.id, !currentUser()?.going)
                              }
                            >
                              {attendanceLoader
                                ? "Updating..."
                                : currentUser()?.going
                                ? "Present"
                                : "Absent"}
                            </div>
                          )}
                        </div>

                        {userReports && userReports?.reports && user && currentUser()?.going && (
                          <div className="tw-w-[150px] tw-h-[24px] tw-ml-auto">
                            <div className="tw-text-xs tw-font-medium tw-mb-1">
                              Reports :{" "}
                              {`${
                                userReports?.reports.filter((_i: any) => _i?.is_submitted).length ||
                                0
                              }/${userReports?.reports.length || 0}`}
                            </div>
                            <ProgressBar
                              style={{ height: "6px" }}
                              variant="success"
                              className="rounded-pill"
                              now={percentage(
                                userReports?.reports.filter((_i: any) => _i?.is_submitted).length,
                                userReports?.reports.length
                              )}
                            />
                          </div>
                        )}
                      </div>

                      <div className="tw-relative tw-w-full tw-h-full tw-p-2 tw-px-3 tw-overflow-y-auto">
                        {user && currentUser()?.going ? (
                          <>
                            {product_id ? (
                              <>
                                {product && !productError ? (
                                  <>
                                    {userReports && !userReportsError ? (
                                      <>
                                        {userReports &&
                                        userReports?.reports &&
                                        userReports?.reports.length > 0 ? (
                                          <div className="tw-space-y-3">
                                            {userReports?.reports.map((_report: any) => (
                                              <div
                                                key={_report?.id}
                                                className="tw-border tw-border-solid tw-border-gray-300 tw-rounded-sm tw-overflow-hidden tw-bg-gray-100 tw-bg-opacity-50"
                                              >
                                                <ReportCard
                                                  product={product}
                                                  report={_report}
                                                  mutate_url={`session_user_report_teacher-${session}-${user}`}
                                                />
                                              </div>
                                            ))}
                                          </div>
                                        ) : (
                                          <div className="text-center pt-5 pb-5 w-100">
                                            No resources are attached to the user
                                          </div>
                                        )}
                                      </>
                                    ) : (
                                      <div className="text-center pt-5 pb-5 w-100">Loading...</div>
                                    )}
                                  </>
                                ) : (
                                  <div className="text-center pt-5 pb-5 w-100">Loading...</div>
                                )}
                              </>
                            ) : (
                              <div className="tw-text-center tw-text-sm tw-font-medium tw-text-gray-500 tw-py-6">
                                No product is assigned under the session.
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="tw-text-center tw-text-sm tw-font-medium tw-text-gray-500 tw-py-10">
                            Student did not joined the session
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
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
        </div>
      </StudentLayout>
    </Page>
  );
};

export default withGlobalAuth(SessionFeedback);
