// layouts
import ParentLayout from "layouts/ParentLayout";
// bootstrap
import { Card, Accordion, Button } from "react-bootstrap";
// icons
import { Phone, MailSend, LocationPlus } from "@styled-icons/boxicons-regular";
// hoc
import withParentAuth from "@lib/hoc/withParentAuth";

function TeacherProfile() {
  return (
    <ParentLayout>
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-8">
            <div className="card p-3 shadow-sm">
              <div className="d-flex align-items-center">
                <div>
                  <img className="img-fluid" src="/user.png" width="100" />
                </div>
                <div className="px-3">
                  <h5 className="fw-bold mb-0">Raj Gopal</h5>
                  <p className="text-muted mb-1">Asst. Professor Mathematics</p>
                  <span className="badge bg-light text-dark">Delhi, India</span>
                </div>
              </div>
            </div>

            {/* details */}
            <div className="mt-3">
              <Accordion defaultActiveKey="0">
                <Card>
                  <Card.Header className="bg-white border-bottom-0">
                    <Accordion.Toggle
                      className="text-decoration-none"
                      as={Button}
                      variant="link"
                      eventKey="0"
                    >
                      Educational Details
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body className="px-4">
                      <p>Bachelor of Science Mathematics at Shiv Nadar University</p>
                      <p>
                        Masters of Science Statistics at Indian Statistical Institute, Bangalore{" "}
                      </p>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>

                <Card>
                  <Card.Header className="bg-white border-bottom-0">
                    <Accordion.Toggle
                      className="text-decoration-none"
                      as={Button}
                      variant="link"
                      eventKey="1"
                    >
                      Experience Details
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="1">
                    <Card.Body className="px-4">...</Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Card.Header className="bg-white border-bottom-0">
                    <Accordion.Toggle
                      className="text-decoration-none"
                      as={Button}
                      variant="link"
                      eventKey="2"
                    >
                      Skills
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="2">
                    <Card.Body className="px-4">...</Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </div>

            {/* contact */}
            <div className="card p-3 shadow-sm mt-3">
              <h4 className="mb-4">Contact Information</h4>

              <p>
                <Phone className="icon-size-elg me-3" /> +91 9982377429
              </p>
              <p>
                <MailSend className="icon-size-elg me-3" /> rajgopal9@gmail.com
              </p>
              <p>
                <LocationPlus className="icon-size-elg me-3" /> Delhi, India
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-3 shadow-sm">
              <h4 className="mb-4">Availability</h4>
            </div>
          </div>
        </div>
      </div>
    </ParentLayout>
  );
}

export default withParentAuth(TeacherProfile);
