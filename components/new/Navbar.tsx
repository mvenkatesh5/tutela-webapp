import React from "react";
// react bootstrap
import { Navbar, Nav, Container, Image, Form } from "react-bootstrap";
// material icons
import {
  Notifications,
  QuestionAnswer,
  Settings,
  SupervisedUserCircle,
  Login,
} from "@styled-icons/material-rounded/";
import { CircleFill } from "@styled-icons/bootstrap";
import { HelpWithCircle } from "@styled-icons/entypo/HelpWithCircle";
// component
import ConcernModal from "@components/new/ConcernModal";
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

  const crispOpen = () => {
    if (window) {
      window.$crisp.push(["do", "chat:show"]);
      window.$crisp.push(["do", "chat:open"]);
      window.$crisp.push(["on", "chat:closed", crispClose]);
    }
  };
  const crispClose = () => {
    if (window) {
      window.$crisp.push(["do", "chat:hide"]);
      window.$crisp.push(["do", "chat:close"]);
    }
  };

  return (
    <>
      <Navbar className="shadow-sm n-navbar-root h-100 px-2" collapseOnSelect expand="xl">
        <Container fluid>
          <Navbar.Brand className="navbar-brand-image">
            <Image src="/logo.svg" alt="" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <div className="navbar-collapse-wrapper w-100">
            <div className="navbar-right">
              <Navbar.Collapse className="justify-content-end">
                <Nav>
                  <ConcernModal />
                  <Nav.Link className="fw-bold mt-1 nav-icons">
                    <Notifications />
                  </Nav.Link>
                  <Nav.Link
                    className="mt-1 nav-icons"
                    // onClick={crispOpen}
                  >
                    <HelpWithCircle />
                  </Nav.Link>
                  <Nav.Link className="mt-1 nav-icons">
                    <Settings />
                  </Nav.Link>
                  <Nav.Link className="rounded-circle nav-icons">
                    <Image className="rounded-circle" src="/bird.svg" alt="" />{" "}
                  </Nav.Link>
                  {/* <Nav.Link className="fw-bold text-muted mt-1 nav-icons" onClick={signOut}>
                    <Login />
                  </Nav.Link> */}
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
