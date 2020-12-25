import { Container, Row, Col, Image, Nav } from "react-bootstrap";

function AuthWrapper(props: any) {
  return (
    <>
      <div style={{ height: "100vh" }}>
        <Container fluid className="h-100">
          <Row className="h-100 justify-content-center">
            <Col md="6" className="m-0 p-0">
              <div className="bg-dark auth-lef-bg h-100 p-5">
                <Container className="h-100">
                  <Image className="img-fluid mb-5" src="/logo.svg" />
                  <Row className="h-75">
                    <Col className="align-self-center" md="12">
                      <Row>
                        <Col md="8">
                          <Image className="img-fluid mb-4" src="/quote.svg" />
                          <p className="text-white mb-4-5 lead">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris.
                          </p>
                          <h4 className="text-white fw-bold">Kumar</h4>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Container>
              </div>
            </Col>
            <Col md="6" className="align-self-center">
              <Nav className="position-absolute top-0 start-50">
                <Nav.Item>
                  <Nav.Link className="text-muted fw-bold mt-2 ml-3">
                    Back
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              <div className="p-2">
                <Row className="justify-content-center">
                  <Col md="9">{props.children}</Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default AuthWrapper;
