// react bootstrap
import { Container, Row, Col } from "react-bootstrap";
// layouts
import AdminLayout from "@layouts/adminLayout";
// components
import CalenderView from "@components/calendar";

const Admin = () => {
  return (
    <div>
      <AdminLayout>
        <Container>
          <Row>
            <Col md={4}>
              <CalenderView />
            </Col>
            <Col>
              <div>Admin Panel</div>
            </Col>
          </Row>
        </Container>
      </AdminLayout>
    </div>
  );
};

export default Admin;
