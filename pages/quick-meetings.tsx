import React from "react";
// react bootstrap
import { Container, Row, Col, Card, Image } from "react-bootstrap";
// material icons
import { TextLeft } from "@styled-icons/bootstrap/TextLeft";
import { Calendar } from "@styled-icons/boxicons-regular/Calendar";
import { Time } from "@styled-icons/boxicons-regular/Time";
import { Link } from "@styled-icons/boxicons-regular/Link";
// swr
import useSWR from "swr";
// layouts
import AdminLayout from "@layouts/adminLayout";
// components
import QuickMeetingCreateView from "@components/admin/quickMeetings/create";
import QuickMeetingEditView from "@components/admin/quickMeetings/edit";
// api routes
import { QUICK_MEETINGS_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";
import { QuickMeetingDelete } from "@lib/services/quickmeetingsservice";
// global imports
import { datePreview } from "@constants/global";
// cookie
import { getAuthenticationToken } from "@lib/cookie";
// hoc
import withGlobalAuth from "@lib/hoc/withGlobalAuth";
// components
import Page from "@components/page";
// constants
import { META_DESCRIPTION } from "@constants/page";

const QuickMeetingsView = () => {
  const [userRole, setUserRole] = React.useState<any>();
  React.useEffect(() => {
    if (getAuthenticationToken()) {
      let details: any = getAuthenticationToken();
      details = details ? JSON.parse(details) : null;
      if (details) {
        if (details.info.role === 2) setUserRole("admin");
        else if (details.info.role === 1) setUserRole("teacher");
        else setUserRole("student");
      }
    }
  }, []);

  const advertsDelete = (id: Number) => {
    QuickMeetingDelete(id)
      .then((res) => {})
      .catch((errors) => {
        console.log(errors);
      });
  };

  const { data: quickMeetingsList, error: quickMeetingsListError } = useSWR(
    QUICK_MEETINGS_ENDPOINT,
    APIFetcher
  );

  console.log("quickMeetingsList-->-->", quickMeetingsList);

  const meta = {
    title: "Quick Meetings",
    description: META_DESCRIPTION,
  };

  return (
    <Page meta={meta}>
      <div>
        <AdminLayout>
          <div className="right-layout">
            <Container>
              <Row className="align-items-center">
                <Col>
                  <h5>Quick Meetings</h5>
                </Col>
                {userRole === "admin" && (
                  <Col>
                    <QuickMeetingCreateView />
                  </Col>
                )}
              </Row>
              <Row>
                {quickMeetingsList &&
                  quickMeetingsList.length > 0 &&
                  quickMeetingsList.map((data: any, index: Number) => (
                    <Col md={3} key={data.id} style={{ marginTop: "10px" }}>
                      <Card style={{ height: "100%" }}>
                        <Card.Body>
                          <div className="quick-meeting-flex">
                            <div className="image-container">
                              <Image alt="" src="/default-image.png" />
                            </div>
                            <div className="content">
                              <h6 className="mb-2">{data.name}</h6>
                            </div>
                          </div>
                          <div className="quick-meeting-flex">
                            <div className="image-container">
                              <TextLeft />
                            </div>
                            <div className="content">
                              <small>{data.description}</small>
                            </div>
                          </div>
                          <div className="quick-meeting-flex mb-0">
                            <div className="image-container">
                              <Calendar />
                            </div>
                            <div className="content">
                              <small>
                                Starts At : <strong>{datePreview(data.start_time)}</strong>
                              </small>
                            </div>
                          </div>
                          <div className="quick-meeting-flex">
                            <div className="image-container">
                              <Time />
                            </div>
                            <div className="content">
                              <small>
                                Ends At : <strong>{datePreview(data.end_date)}</strong>
                              </small>
                            </div>
                          </div>
                          <div className="quick-meeting-flex">
                            <div className="image-container">
                              <Link />
                            </div>
                            <div className="content">
                              <small>
                                {data.data && data.data.link ? (
                                  <a href={data.data.link} target="_blank" rel="noreferrer">
                                    {data.data.link}
                                  </a>
                                ) : (
                                  "-"
                                )}
                              </small>
                            </div>
                          </div>
                          {userRole === "admin" && <QuickMeetingEditView data={data} />}
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
              </Row>
            </Container>
          </div>
        </AdminLayout>
      </div>
    </Page>
  );
};

export default withGlobalAuth(QuickMeetingsView);
