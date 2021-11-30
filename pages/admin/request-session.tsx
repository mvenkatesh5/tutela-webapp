import React from "react";
// next imports
import Link from "next/link";
// react bootstrap
import { Container, Table, Form, Image, Tab, Nav } from "react-bootstrap";
// material icons
import { Calendar } from "@styled-icons/boxicons-regular/Calendar";
// swr
import useSWR, { mutate } from "swr";
// layouts
import AdminLayout from "@layouts/adminLayout";
// components
import RequestedSessionModal from "@components/admin/RequestSessionModal";
// global imports
import { datePreview } from "@constants/global";
// api routes
import { USER_ENDPOINT, REQUEST_SESSION_WITH_STATE_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher, APIUpdater } from "@lib/services";
// hoc
import withGlobalAuth from "@lib/hoc/withGlobalAuth";
// components
import Page from "@components/page";
// constants
import { META_DESCRIPTION } from "@constants/page";

const UserRequestSession = () => {
  const requestTabs = [
    { key: "NEW", title: "New Sessions" },
    { key: "SUCCESS", title: "Success Sessions" },
    { key: "REJECTED", title: "Rejected Sessions" },
  ];
  const [currentState, setCurrentState] = React.useState<any>("NEW");

  const { data: requestSessions, error: requestSessionsError } = useSWR(
    currentState ? [REQUEST_SESSION_WITH_STATE_ENDPOINT(currentState), currentState] : null,
    (url) => APIFetcher(url)
  );

  const { data: userList, error: userListError } = useSWR(USER_ENDPOINT, APIFetcher);

  const returnCurrentUser = (user_id: any) => {
    if (userList) {
      const currentUser: any = userList.find((element: any) => element.id === user_id);
      if (currentUser) {
        return (
          <div>
            <strong>{currentUser.first_name}</strong>
            <br />
            <small className="text-secondary">{currentUser.email}</small>
          </div>
        );
      }
    }
  };
  const handleDatetime = (date: any, time: any) => {
    let currentDate: any = new Date(date);
    let currentTime: any = new Date(time);
    currentDate.setHours(currentTime.getHours());
    currentDate.setMinutes(currentTime.getMinutes());
    currentDate.setSeconds(currentTime.getSeconds());
    return new Date(currentDate);
  };

  const meta = {
    title: "Request Session",
    description: META_DESCRIPTION,
  };

  return (
    <Page meta={meta}>
      <div>
        <AdminLayout>
          <div className="right-layout">
            <Container>
              <h5>Requested sessions.</h5>

              <Tab.Container
                defaultActiveKey="NEW"
                activeKey={currentState}
                onSelect={(k) => setCurrentState(k)}
              >
                <Nav className="custom-nav-tabs-links" variant="pills">
                  {requestTabs.map((item: any, index: any) => (
                    <Nav.Item key={`nav-item-${index}`}>
                      <Nav.Link key={`nav-item-${item.key}`} eventKey={item.key}>
                        <small>{item.title}</small>
                      </Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>

                <Tab.Content className="mt-3">
                  {requestTabs.map((item: any, index: any) => (
                    <Tab.Pane key={`tab-pane-${item.key}`} eventKey={item.key}>
                      {!requestSessions && !requestSessionsError ? (
                        <div className="text-center mt-5">Loading...</div>
                      ) : (
                        <div>
                          {requestSessions && requestSessions.length > 0 ? (
                            <Table bordered>
                              <thead>
                                <tr>
                                  <th className="text-center">#</th>
                                  <th>Topic</th>
                                  <th>Requested date</th>
                                  <th>Requested on</th>
                                  <th>User</th>
                                  {currentState === "SUCCESS" && <th>Session Id</th>}
                                </tr>
                              </thead>
                              <tbody>
                                {requestSessions.map((users: any, i: any) => (
                                  <tr key={i}>
                                    <td className="text-center">{i + 1}</td>
                                    <td className="heading">{users.topic}</td>
                                    <td className="">
                                      {users.data && users.data.dateTime ? (
                                        <div>
                                          {users.data.dateTime.length > 0 &&
                                            users.data.dateTime.map((data: any, index: any) => (
                                              <div
                                                key={datePreview(
                                                  handleDatetime(data.date, data.time)
                                                )}
                                                className="c-badge"
                                              >
                                                {currentState === "NEW" ? (
                                                  <RequestedSessionModal
                                                    data={users}
                                                    userList={userList}
                                                    currentDate={handleDatetime(
                                                      data.date,
                                                      data.time
                                                    )}
                                                  >
                                                    <div className="d-flex align-items-center">
                                                      <div className="me-2">
                                                        <Calendar width="14" />
                                                      </div>
                                                      <div>
                                                        <small>
                                                          {datePreview(
                                                            handleDatetime(data.date, data.time)
                                                          )}
                                                        </small>
                                                      </div>
                                                    </div>
                                                  </RequestedSessionModal>
                                                ) : (
                                                  <div className="d-flex align-items-center">
                                                    <div className="me-2">
                                                      <Calendar width="14" />
                                                    </div>
                                                    <div>
                                                      <small>
                                                        {datePreview(
                                                          handleDatetime(data.date, data.time)
                                                        )}
                                                      </small>
                                                    </div>
                                                  </div>
                                                )}
                                              </div>
                                            ))}
                                        </div>
                                      ) : (
                                        <div className="text-center">-</div>
                                      )}
                                    </td>
                                    <td className="">{datePreview(users.created)}</td>
                                    <td className="">
                                      <div className="d-flex align-items-center">
                                        <div
                                          style={{
                                            width: "25px",
                                            height: "25px",
                                            borderRadius: "100px",
                                            backgroundColor: "#ccc",
                                            overflow: "hidden",
                                            marginRight: "10px",
                                          }}
                                        >
                                          <Image
                                            style={{
                                              width: "100%",
                                              height: "100%",
                                              objectFit: "cover",
                                            }}
                                            src="/default-image.png"
                                            alt=""
                                          />
                                        </div>
                                        <div>{returnCurrentUser(users.user)}</div>
                                      </div>
                                    </td>
                                    {currentState === "SUCCESS" && <td>{users.session_id}</td>}
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                          ) : (
                            <div className="text-center mt-5">No Sessions are requested.</div>
                          )}
                        </div>
                      )}
                    </Tab.Pane>
                  ))}
                </Tab.Content>
              </Tab.Container>
            </Container>
          </div>
        </AdminLayout>
      </div>
    </Page>
  );
};

export default withGlobalAuth(UserRequestSession);
