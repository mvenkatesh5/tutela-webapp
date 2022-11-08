import React from "react";
// react bootstrap
import { Navbar, Nav, Container, Image, Form } from "react-bootstrap";
// swr
import useSWR from "swr";
// components
import DashboardNav from "@components/dashboardnav";
import UserSidebar from "@components/UserSidebar";
import UnratedSessions from "@components/UnratedSessions";
// api routes
import { UNRATED_SESSION_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";
// global context provider
import { globalContext } from "@contexts/global";
// cookie
import { getAuthenticationToken } from "@lib/cookie";

const AssessmentLayout = (props: any) => {
  return (
    <>
      <div className="assessment-default-layout">
        <div className="top-bar">
          <Navbar className="shadow-sm t-navbar-root h-100" collapseOnSelect expand="xl">
            <Container fluid>
              <Navbar.Brand className="navbar-brand-image" style={{ height: "40px" }}>
                <Image src="/logo.svg" alt="" height="40px" />
              </Navbar.Brand>
            </Container>
          </Navbar>
        </div>
        <div className="bottom-bar">{props.children}</div>
      </div>
    </>
  );
};

export default AssessmentLayout;
