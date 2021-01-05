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
import SessionPreviewCard from "@components/sesspreview";
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
                <Row className="justify-content-center mt-3 mb-3">
                  <Col className="align-items-center">
                    <h3>All Sessions</h3>
                  </Col>
                  <Col className="align-items-center" md={2}>
                    <SessionCreateView />
                  </Col>
                </Row>
                <Row>
                  {sessionList &&
                    sessionList.length > 0 &&
                    sessionList.map((data: any, index: Number) => (
                      <Col md={12} key={data.id} style={{ marginTop: "10px" }}>
                        <SessionPreviewCard data={data} />
                        {/* <SessionEditView data={data} /> */}
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
