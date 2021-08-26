import React from "react";
// react bootstrap
import { Container, Row, Col, Form } from "react-bootstrap";
// styled icons
import { Square } from "@styled-icons/boxicons-regular/Square";
import { CheckSquareFill } from "@styled-icons/bootstrap/CheckSquareFill";
// swr
import useSWR from "swr";
// components
import Page from "@components/page";
import { SlateEditor } from "@components/SlateEditor";
// layouts
import StudentLayout from "@layouts/studentLayout";
// cookie
import { getAuthenticationToken } from "@lib/cookie";
// api routes
import {
  USER_REPORTS_WITH_USER_ID_ENDPOINT,
  USER_PRODUCT_RESOURCE_VIEW_ENDPOINT,
  USER_ENDPOINT,
} from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";
import { ReportEdit } from "@lib/services/report.service";
// hoc
import withTeacherAuth from "@lib/hoc/withTeacherAuth";
// constants
import { META_DESCRIPTION } from "@constants/page";

const TeacherReport = () => {
  const meta = {
    title: "User Reports",
    description: META_DESCRIPTION,
  };

  const [currentUser, setCurrentUser] = React.useState<any>();
  const [userRole, setUserRole] = React.useState<any>();

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

  const [currentMentorUser, setCurrentMentorUser] = React.useState<any>();
  const [mentorUsers, setMentorUsers] = React.useState<any>();

  const { data: users, error: usersError } = useSWR(USER_ENDPOINT, APIFetcher);

  const { data: userProductResourceList, error: userProductListError } = useSWR(
    users && currentUser && currentUser.user && currentUser.user.id
      ? USER_PRODUCT_RESOURCE_VIEW_ENDPOINT(currentUser.user.id)
      : null,
    (url) => APIFetcher(url),
    { refreshInterval: 0 }
  );

  React.useEffect(() => {
    if (userProductResourceList) {
      if (userProductResourceList && userProductResourceList.product_users.length > 0) {
        let _users: any = [];
        userProductResourceList.product_users.map((user_products: any) => {
          if (
            user_products.product &&
            user_products.product.users &&
            user_products.product.users.length > 0
          ) {
            user_products.product.users.map((userElement: any) => {
              if (!_users.includes(userElement)) {
                let currentUser = users.find(
                  (element: any) => element.id === parseInt(userElement)
                );
                if (currentUser && currentUser.role === 0) _users.push(currentUser);
              }
            });
          }
        });

        if (_users && _users.length > 0) {
          setMentorUsers(_users);
          setCurrentMentorUser(_users[0].id);
        }
      }
    }
  }, [userProductResourceList]);

  const { data: reportList, error: reportListError } = useSWR(
    currentMentorUser
      ? [USER_REPORTS_WITH_USER_ID_ENDPOINT(currentMentorUser), currentMentorUser]
      : null,
    APIFetcher,
    { refreshInterval: 0 }
  );

  React.useEffect(() => {
    if (reportList && reportList.length > 0) {
    }
  }, [reportList]);

  const RenderUserReports = ({ reports }: any) => {
    const [userReports, setUserReports] = React.useState<any>();
    const handleUserReports = (id: any, value: any) => {
      let reportArray = [...userReports];
      let index = reportArray.findIndex((element: any) => element.id === id);
      if (index >= 0) {
        reportArray[index].is_approved = value;
        setUserReports(reportArray);
        reportUpdate(id, value);
      }
    };

    React.useEffect(() => {
      if (reports) setUserReports(reports);
    }, [reports]);

    const reportUpdate = (id: any, approved: any) => {
      const payload = {
        id: id,
        is_approved: approved,
      };

      ReportEdit(payload)
        .then((res) => {})
        .catch((error) => {
          console.log(error);
        });
    };

    const renderSlateContent = (value: any) => {
      if (value.length > 0 && Array.isArray(value)) {
        return value;
      } else {
        return [
          {
            type: "paragraph",
            children: [{ text: value.length > 0 ? value : "" }],
          },
        ];
      }
    };

    return (
      <div className="teacher-user-report-wrapper mt-3">
        <div className="report-left-wrapper">
          <div className="report-header mb-2">Un Published Reports</div>
          <div className="report-content">
            {userReports &&
              userReports.length > 0 &&
              userReports.map((report: any) => (
                <>
                  {!report.is_approved && (
                    <div
                      className="report-detail-card-container mb-2"
                      style={{
                        border: "1px solid #e2e2e2",
                        borderRadius: "4px",
                        padding: "10px 18px",
                      }}
                    >
                      <div className="d-flex align-item-center" style={{ gap: "10px" }}>
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() => handleUserReports(report.id, true)}
                        >
                          <Square width="16px" />
                        </div>
                        <div>
                          {renderSlateContent(report.report.content) && (
                            <SlateEditor
                              readOnly={true}
                              initialValue={renderSlateContent(report.report.content)}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ))}
          </div>
        </div>
        <div className="report-right-wrapper">
          <div className="report-header mb-2">Published Reports</div>
          <div className="report-content">
            {userReports &&
              userReports.length > 0 &&
              userReports.map((report: any) => (
                <>
                  {report.is_approved && (
                    <div
                      className="report-detail-card-container mb-2"
                      style={{
                        border: "1px solid #e2e2e2",
                        borderRadius: "4px",
                        padding: "10px 18px",
                      }}
                    >
                      <div className="d-flex align-item-center" style={{ gap: "10px" }}>
                        <div
                          className="text-primary"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleUserReports(report.id, false)}
                        >
                          <CheckSquareFill width="16px" />
                        </div>
                        <div>
                          {renderSlateContent(report.report.content) && (
                            <SlateEditor
                              readOnly={true}
                              initialValue={renderSlateContent(report.report.content)}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Page meta={meta}>
        <>
          <StudentLayout>
            <Container>
              <h5 className="mt-4 mb-3">User Reports</h5>

              {mentorUsers && mentorUsers.length > 0 ? (
                <div className="mt-4 mb-3">
                  <div className="mb-2 text-secondary">Select Users</div>
                  <Row>
                    <Col md={4}>
                      <Form.Control
                        as="select"
                        value={currentMentorUser}
                        onChange={(e: any) => setCurrentMentorUser(e.target.value)}
                      >
                        {mentorUsers &&
                          mentorUsers.length > 0 &&
                          mentorUsers.map((user: any, index: any) => (
                            <option key={`${user.id}`} value={user.id}>
                              {user.username} ({user.email})
                            </option>
                          ))}
                      </Form.Control>
                    </Col>
                  </Row>

                  {reportList && reportList.length > 0 ? (
                    <RenderUserReports reports={reportList} />
                  ) : (
                    <div className="text-center text-secondary mt-5 mb-5">
                      No reports are available.
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center">No students Available.</div>
              )}
            </Container>
          </StudentLayout>
        </>
      </Page>
    </>
  );
};

export default withTeacherAuth(TeacherReport);
