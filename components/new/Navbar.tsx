import React from "react";
// next imports
import Link from "next/link";
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
import { HelpWithCircle } from "@styled-icons/entypo/HelpWithCircle";
// component
import ConcernModal from "@components/new/ConcernModal";
// cookie
import { logout, getAuthenticationToken } from "@lib/cookie";
import PreFetchLink from "@components/PreFetchLink";
// swr
import useSWR from "swr";
// api services
import { APIFetcher } from "@lib/services";
// api routes
import { USER_ENDPOINT } from "@constants/routes";

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

  const { data: users, error: usersError } = useSWR(USER_ENDPOINT, APIFetcher);
  const generateUniqueList = (arrayList: any) => {
    let uniqueNames: any = [];
    arrayList.forEach((element: any) => {
      if (!uniqueNames.includes(element)) uniqueNames.push(element);
    });
    return uniqueNames;
  };

  const [parentUsers, setParentUsers] = React.useState<any>();

  React.useEffect(() => {
    if (users && users.length > 0) {
      if (
        currentUser &&
        currentUser.user &&
        currentUser.user.linked_items &&
        currentUser.user.linked_items.students &&
        currentUser.user.linked_items.students.length > 0
      ) {
        let uniqueUsers = generateUniqueList(currentUser.user.linked_items.students);
        if (uniqueUsers && uniqueUsers.length > 0) {
          let uniqueUserDetails: any = [];
          uniqueUsers.forEach((element: any) => {
            let currentUser = users.find(
              (userElement: any) => userElement.id === parseInt(element)
            );
            if (currentUser) uniqueUserDetails.push(currentUser);
          });
          if (uniqueUserDetails && uniqueUserDetails.length > 0) {
            setParentUsers(uniqueUserDetails);
          }
        }
      }
    }
  }, [users && currentUser]);

  return (
    <>
      <Navbar className="shadow-sm n-navbar-root h-100 px-2" collapseOnSelect expand="xl">
        <Container fluid>
          <Navbar.Brand className="navbar-brand-image">
            <Link href="/parent/dashboard">
              <a>
                <Image src="/logo.svg" alt="" />
              </a>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <div className="navbar-collapse-wrapper w-100">
            <div className="navbar-right">
              <Navbar.Collapse className="justify-content-end">
                <Nav>
                  {parentUsers && parentUsers.length > 0 && (
                    <ConcernModal parentUsers={parentUsers} />
                  )}
                  {/* <Nav.Link className="fw-bold mt-1 nav-icons">
                    <Notifications />
                  </Nav.Link> */}
                  <Nav.Link
                    className="mt-1 nav-icons"
                    // onClick={crispOpen}
                    href="/parent/concern"
                  >
                    <HelpWithCircle />
                  </Nav.Link>
                  {/* <Nav.Link className="mt-1 nav-icons">
                    <Settings />
                  </Nav.Link> */}
                  {/* <Nav.Link className="rounded-circle nav-icons me-2">
                    <Image className="rounded-circle" src="/bird.svg" alt="" />{" "}
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
