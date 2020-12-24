// import { SkipNavContent } from '@reach/skip-nav';

import Page from "@components/page";
import { META_DESCRIPTION } from "@constants/page";

// bootstrap
import { Navbar, Nav } from "react-bootstrap";

export default function Conf() {
  const meta = {
    title: "Tutela",
    description: META_DESCRIPTION,
  };

  return (
    <Page meta={meta}>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Page>
  );
}
