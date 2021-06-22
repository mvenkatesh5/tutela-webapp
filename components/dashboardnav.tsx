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
import PreFetchLink from "@components/PreFetchLink";

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
      <Navbar className="shadow-sm t-navbar-root h-100" collapseOnSelect expand="xl">
        <Container fluid>
          <Navbar.Brand className="navbar-brand-image">
            <Image src="/logo.svg" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <div className="navbar-collapse-wrapper w-100">
            <div className="navbar-left">
              <Navbar.Collapse className="justify-content-start">
                <Nav>
                  {/* {tokenDetails && tokenDetails.user && tokenDetails.user.role === 0 && (
                    <PreFetchLink href="/student">
                      <div> Dashboard</div>
                    </PreFetchLink>
                  )}
                  {tokenDetails && tokenDetails.user && tokenDetails.user.role === 0 && (
                    <PreFetchLink href="/profile">
                      <div> Profile</div>
                    </PreFetchLink>
                  )}
                  {tokenDetails && tokenDetails.user && tokenDetails.user.role === 0 && (
                    <PreFetchLink href="/request-session">
                      <div>Request Session</div>
                    </PreFetchLink>
                  )}
                  {tokenDetails && tokenDetails.user && tokenDetails.user.role === 0 && (
                    <PreFetchLink href="/user-resources">
                      <div>My Resources</div>
                    </PreFetchLink>
                  )}
                  {tokenDetails && tokenDetails.user && tokenDetails.user.role === 0 && (
                    <PreFetchLink href="/notes">
                      <div>My Notes</div>
                    </PreFetchLink>
                  )}

                  {tokenDetails && tokenDetails.user && tokenDetails.user.role != 3 && (
                    <PreFetchLink href="/calendar">
                      <div> My Calendar</div>
                    </PreFetchLink>
                  )} */}

                  {/* teacher */}
                  {tokenDetails && tokenDetails.user && tokenDetails.user.role === 1 && (
                    <PreFetchLink href="/dashboard">
                      <div className="fw-bold text-muted nav-link">Dashboard</div>
                    </PreFetchLink>
                  )}
                  {/* {tokenDetails && tokenDetails.user && tokenDetails.user.role === 1 && (
                    <PreFetchLink href="/teacher-profile">
                      <div className="fw-bold text-muted nav-link"> Profile</div>
                    </PreFetchLink>
                  )}
                  {tokenDetails && tokenDetails.user && tokenDetails.user.role === 1 && (
                    <PreFetchLink href="/users?t=1">
                      <div> Students</div>
                    </PreFetchLink>
                  )}
                  {tokenDetails && tokenDetails.user && tokenDetails.user.role === 1 && (
                    <PreFetchLink href="/admin/quick-meetings">
                      <div> Quick Meetings</div>
                    </PreFetchLink>
                  )}
                  {tokenDetails && tokenDetails.user && tokenDetails.user.role === 1 && (
                    <PreFetchLink href="/admin/messages">
                      <div> Messages</div>
                    </PreFetchLink>
                  )} */}
                </Nav>
              </Navbar.Collapse>
            </div>
            <div className="navbar-right">
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
            </div>
          </div>
        </Container>
      </Navbar>
    </>
  );
}

export default DashboardNav;
