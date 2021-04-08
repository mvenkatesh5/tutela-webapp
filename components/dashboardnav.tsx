import React from "react";
// react bootstrap
import { Navbar, Nav, Container, Image, Form } from "react-bootstrap";
import {
  NotificationsActive,
  QuestionAnswer,
  Settings,
  SupervisedUserCircle,
  Login,
} from "@styled-icons/material-rounded/";
import { CircleFill } from "@styled-icons/bootstrap";
// cookie
import { logout, getAuthenticationToken } from "@lib/cookie";

function DashboardNav() {
  const [tokenDetails, setTokenDetails] = React.useState<any>();
  React.useEffect(() => {
    if (getAuthenticationToken()) {
      let details: any = getAuthenticationToken();
      details = details ? JSON.parse(details) : null;
      if (details) {
        setTokenDetails(details);
      }
    }
  }, []);

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
              {/* <Nav.Link className="fw-bold text-muted" href="/dashboard">
                Dashboard
              </Nav.Link> */}
              {tokenDetails && tokenDetails.user && tokenDetails.user.role === 0 && (
                <Nav.Link className="fw-bold text-muted" href="/student">
                  Dashboard
                </Nav.Link>
              )}
              {tokenDetails && tokenDetails.user && tokenDetails.user.role === 0 && (
                <Nav.Link className="fw-bold text-muted" href="/profile">
                  Profile
                </Nav.Link>
              )}
              {tokenDetails && tokenDetails.user && tokenDetails.user.role === 0 && (
                <Nav.Link className="fw-bold text-muted" href="/request-session">
                  Request Session
                </Nav.Link>
              )}
              {tokenDetails && tokenDetails.user && tokenDetails.user.role != 3 && (
                <Nav.Link className="fw-bold text-muted" href="/calendar">
                  My Calendar
                </Nav.Link>
              )}

              {tokenDetails && tokenDetails.user && tokenDetails.user.role === 1 && (
                <Nav.Link className="fw-bold text-muted" href="/teacher-profile">
                  Profile
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              {tokenDetails && tokenDetails.user && tokenDetails.user.role <= 3 && (
                <Nav.Link className="mt-1">
                  <div
                    className="d-flex align-items-center pe-2 ps-2 border"
                    style={{ borderRadius: "4px" }}
                  >
                    <div className="me-2">
                      <CircleFill
                        className="text-success"
                        style={{ width: "10px", height: "10px", marginTop: "-3px" }}
                      />
                    </div>
                    <div>
                      {tokenDetails.user.role === 2
                        ? "Admin"
                        : tokenDetails.user.role === 1
                        ? " Teaching"
                        : tokenDetails.user.role === 0
                        ? " Learning"
                        : " Parents"}
                    </div>
                  </div>
                </Nav.Link>
              )}

              {tokenDetails && tokenDetails.user && tokenDetails.user.role < 2 && (
                <Nav.Link className="mt-1">
                  Dear {tokenDetails.user.username}, Have a great
                  {tokenDetails && tokenDetails.user && tokenDetails.user.role === 1
                    ? " teaching!"
                    : " learning!"}
                </Nav.Link>
              )}
              {/* <Nav.Link>
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
              </Nav.Link> */}
              {/* <Nav.Link className="fw-bold text-primary mt-1 nav-icons">
                <SupervisedUserCircle />
              </Nav.Link> */}
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
