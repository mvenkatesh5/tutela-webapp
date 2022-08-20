import React from "react";
// next imports
import { useRouter } from "next/router";
// react bootstrap
import { Button, Form, Modal } from "react-bootstrap";
// material icons
import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline";
// swr
import { mutate } from "swr";
// api routes
import { CONCERN_ENDPOINT } from "@constants/routes";
// services
import { Concern } from "@lib/services/concernService";

const ConcernModal = (props: any) => {
  const [modal, setModal] = React.useState(false);

  const closeModal = () => {
    setModal(false);
    setFormData("");
  };
  const openModal = () => setModal(true);

  const router = useRouter();
  const [buttonLoader, setButtonLoader] = React.useState(false);

  const [formData, setFormData] = React.useState<any>({
    title: "",
    description: "",
    student: "",
  });
  const handleFromData = (key: any, value: any) => {
    setFormData({ ...formData, [key]: value });
  };
  const [currentSelectedUser, setCurrentSelectedUser] = React.useState<any>(
    props.parentUsers[0].id
  );

  const raiseConcern = () => {
    const payload = {
      title: formData.title,
      description: formData.description,
      student: currentSelectedUser,
    };
    Concern.create(payload)
      .then((response) => {
        console.log("response", response);
        mutate(CONCERN_ENDPOINT);
        closeModal();
        router.push(`/parent/concern?concern=${response.id}`);
      })
      .catch((error) => {
        closeModal();
        console.log("error", error);
      });
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
          <Form
          // onSubmit={raiseConcern}
          >
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
                value={formData.description}
                onChange={(e) => handleFromData("description", e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="mb-1 text-muted">Student</Form.Label>
              <Form.Control
                as="select"
                value={currentSelectedUser}
                onChange={(e: any) => setCurrentSelectedUser(e.target.value)}
              >
                {props.parentUsers &&
                  props.parentUsers.length > 0 &&
                  props.parentUsers.map((user: any, index: any) => (
                    <option key={`${user.id}`} value={user.id}>
                      {user.username} ({user.email})
                    </option>
                  ))}
              </Form.Control>
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button
                variant="primary"
                className="btn-sm"
                onClick={raiseConcern}
                disabled={buttonLoader}
              >
                {buttonLoader ? "Raising..." : "Raise Concern"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ConcernModal;
