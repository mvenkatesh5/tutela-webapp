import React from "react";
// react bootstrap
import { Button, Form, Modal } from "react-bootstrap";
// material icons
import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline";

const ConcernModal = (props: any) => {
  const [modal, setModal] = React.useState(false);
  const closeModal = () => {
    setModal(false);
    setFormData("");
  };
  const openModal = () => setModal(true);

  const [buttonLoader, setButtonLoader] = React.useState(false);

  const [formData, setFormData] = React.useState<any>({
    title: "",
    explain: "",
  });
  const handleFromData = (key: any, value: any) => {
    setFormData({ ...formData, [key]: value });
  };

  const raiseConcern = () => {
    closeModal();
  };

  return (
    <>
      <Button
        variant="primary"
        className="btn-sm my-auto px-4 me-2" 
        style={{ height: "30px" }}
        onClick={openModal}
      >
        <div>Raise a concern</div>
      </Button>

      <Modal show={modal} onHide={closeModal} closeButton centered backdrop={"static"}>
        <Modal.Body>
          <div className="d-flex justify-content-between">
            <h5 className="mb-3">Raise a concern</h5>
            <Button variant="" className="btn-sm text-muted" onClick={closeModal}>
              <CloseOutline width="20px" />
            </Button>
          </div>
          <Form onSubmit={raiseConcern}>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1 text-muted">Title</Form.Label>
              <Form.Control
                type="text"
                value={formData.title}
                onChange={(e: any) => handleFromData("title", e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1 text-muted">Explain</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={formData.explain}
                onChange={(e) => handleFromData("explain", e.target.value)}
                required
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button variant="primary" className="btn-sm" type="submit" disabled={buttonLoader}>
                {buttonLoader ? "Raising..." : "Raise Concern"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <Form></Form>
    </>
  );
};

export default ConcernModal;
