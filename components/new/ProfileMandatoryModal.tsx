import React from "react";
// react bootstrap
import { Button, Form, Modal, Row, Col } from "react-bootstrap";
// material icons
import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline";

const ProfileMandatoryModal = () => {
  const [modal, setModal] = React.useState(true);
  const closeModal = () => {
    setModal(false);
    setFormData("");
  };
  const openModal = () => setModal(true);

  const [buttonLoader, setButtonLoader] = React.useState(false);

  const [formData, setFormData] = React.useState<any>({
    mobile: "",
    dob: "",
    target_test_date: "",
  });
  const handleFromData = (key: any, value: any) => {
    setFormData({ ...formData, [key]: value });
  };

  const ProfileUpdate = () => {
    const payload = formData;
    console.log("payload", payload);
    closeModal();
  };

  const [profile, setProfile] = React.useState(false);

  return (
    <>
      <Modal show={modal} size="lg" onHide={closeModal} closeButton centered backdrop={"static"}>
        <Modal.Body>
          <div className="d-flex justify-content-between">
            <h5 className="mb-4">Raise a concern</h5>
            <Button variant="" className="btn-sm text-muted" onClick={closeModal}>
              <CloseOutline width="20px" />
            </Button>
          </div>

          <h4 className="text-center mt-4">Complete your profile to continue learning</h4>
          <div className="text-muted text-center mt-3 px-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </div>

          {profile && (
            <Form>
              <Row className="p-4">
                <Col md={6}>
                  <Form.Group className="mb-4">
                    <Form.Label className="mb-1 text-muted">Mobile</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.mobile}
                      onChange={(e: any) => handleFromData("mobile", e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-4">
                    <Form.Label className="mb-1 text-muted">Date of birth </Form.Label>
                    <Form.Control
                      type="date"
                      value={formData.dob}
                      onChange={(e: any) => handleFromData("dob", e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-4">
                    <Form.Label className="mb-1 text-muted">Target test date</Form.Label>
                    <Form.Control
                      type="date"
                      value={formData.target_test_date}
                      onChange={(e: any) => handleFromData("target_test_date", e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-4">
                    <Form.Label className="mb-1 text-muted">Title</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.title}
                      onChange={(e: any) => handleFromData("title", e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-4">
                    <Form.Label className="mb-1 text-muted">Title</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.title}
                      onChange={(e: any) => handleFromData("title", e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-4">
                    <Form.Label className="mb-1 text-muted">Title</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.title}
                      onChange={(e: any) => handleFromData("title", e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          )}
          <div className="d-flex justify-content-center">
            {profile ? (
              <Button onClick={ProfileUpdate} className="mt-4">
                Update Profile
              </Button>
            ) : (
              <Button onClick={() => setProfile(true)} className="mt-4">
                Go to Profile
              </Button>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProfileMandatoryModal;
