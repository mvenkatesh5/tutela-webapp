import React from "react";
// react bootstrap
import { Button, Form, Modal } from "react-bootstrap";
// material icons
import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline";

const AddTopicClusterModal = (props: any) => {
  const [modal, setModal] = React.useState(false);
  const closeModal = () => {
    setModal(false);
    setFormData("");
  };
  const openModal = () => setModal(true);

  const [buttonLoader, setButtonLoader] = React.useState(false);

  const [formData, setFormData] = React.useState<any>({
    topic: "",
    comment: "",
  });
  const handleFromData = (key: any, value: any) => {
    setFormData({ ...formData, [key]: value });
  };

  const raiseConcern = () => {
    closeModal();
  };

  return (
    <>
      <Button onClick={openModal} className="btn btn-primary flex-shrink-0">
        Add Topic Cluster
      </Button>

      <Modal show={modal} onHide={closeModal} closeButton centered backdrop={"static"}>
        <Modal.Body>
          <div className="d-flex justify-content-between">
            <h5 className="mb-3">Add Topic Cluster</h5>
            <Button variant="" className="btn-sm text-muted" onClick={closeModal}>
              <CloseOutline width="20px" />
            </Button>
          </div>
          <Form onSubmit={raiseConcern}>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1 text-muted">Select Topic Cluster</Form.Label>
              <Form.Control
                type="text"
                value={formData.topic}
                onChange={(e: any) => handleFromData("topic", e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1 text-muted">Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={formData.comment}
                onChange={(e) => handleFromData("comment", e.target.value)}
                required
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button variant="primary" className="btn-sm" type="submit" disabled={buttonLoader}>
                {buttonLoader ? "Adding..." : "Add Topic Cluster"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddTopicClusterModal;
