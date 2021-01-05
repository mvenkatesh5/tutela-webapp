// react bootstrap
import { Navbar, Nav, Container, Image, Form } from "react-bootstrap";
import {
  NotificationsActive,
  QuestionAnswer,
  Settings,
  SupervisedUserCircle,
  Login,
} from "@styled-icons/material-rounded/";
// cookie
import { logout } from "@lib/cookie";

function DashboardNav() {
  const signOut = () => {
    logout();
  };

  return (
    <>
      <Navbar className="shadow-sm" collapseOnSelect expand="lg">
        <Container fluid>
          <Navbar.Brand>
            <Image className="img-fluid" src="/logo.svg" width="200" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse className="justify-content-start">
            <Nav>
              <Nav.Link className="fw-bold text-muted" href="/dashboard">
                Dashboard
              </Nav.Link>
              <Nav.Link className="fw-bold text-muted" href="/admin">
                My Calender
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <Nav.Link>
                <Form.Control size="sm" className="border" type="text" placeholder="Search" />
              </Nav.Link>
              <Nav.Link className="fw-bold text-muted mt-1 nav-icons">
                <NotificationsActive />
              </Nav.Link>
              <Nav.Link className="fw-bold text-muted mt-1 nav-icons">
                <QuestionAnswer />
              </Nav.Link>
              <Nav.Link className="fw-bold text-muted mt-1 nav-icons">
                <Settings />
              </Nav.Link>
              <Nav.Link className="fw-bold text-primary mt-1 nav-icons">
                <SupervisedUserCircle />
              </Nav.Link>
              <Nav.Link className="fw-bold text-muted mt-1 nav-icons" onClick={signOut}>
                <Login />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default DashboardNav;
