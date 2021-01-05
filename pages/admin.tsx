// react bootstrap
import { Container, Row, Col, Card, Button } from "react-bootstrap";
// swr
import useSWR from "swr";
// layouts
import AdminLayout from "@layouts/adminLayout";
// components
import CalenderView from "@components/calendar";
// components
import SessionCreateView from "@components/admin/sessions/create";
import SessionEditView from "@components/admin/sessions/edit";
// api routes
import { SESSION_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";
// hoc
import withAdminAuth from "@lib/hoc/withAdminAuth";

const Admin = () => {
  const { data: sessionList, error: sessionListError } = useSWR(SESSION_ENDPOINT, APIFetcher);

  return (
    <div>
      <AdminLayout>
        <Container>
          <Row>
            <Col md={4}>
              <CalenderView />
            </Col>
            <Col>
              <div>
                <div style={{ marginBottom: "10px", display: "flex", justifyContent: "flex-end" }}>
                  <SessionCreateView />
                </div>
                <Row>
                  {sessionList &&
                    sessionList.length > 0 &&
                    sessionList.map((data: any, index: Number) => (
                      <Col md={12} key={data.id} style={{ marginTop: "10px" }}>
                        <Card>
                          <Card.Body>
                            <h6 className="mt-2 mb-2">{data.title}</h6>
                            <p>{data.description}</p>
                            <p>{data.datetime}</p>
                            <Row>
                              <Col>
                                <a href={data.link} target="_blank">
                                  <Button size="sm">Join Session</Button>
                                </a>
                              </Col>
                              <Col md={2}>
                                <SessionEditView data={data} />
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </AdminLayout>
    </div>
  );
};

export default withAdminAuth(Admin);
