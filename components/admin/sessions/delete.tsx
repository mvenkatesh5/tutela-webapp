import React from "react";
// react bootstrap
import { Button, Form, Modal } from "react-bootstrap";
// material icons
import { Delete } from "@styled-icons/material/Delete";
// swr
import { mutate } from "swr";
// api routes
import { USER_CALENDAR_SESSION_ENDPOINT } from "@constants/routes";
// api services
import { SessionDelete } from "@lib/services/sessionservice";

const SessionEditView = (props: any) => {
  const [modal, setModal] = React.useState(false);
  const closeModal = () => setModal(false);
  const openModal = () => setModal(true);

  const [buttonLoader, setButtonLoader] = React.useState<any>(false);

  const sessionDelete = (event: any) => {
    event.preventDefault();
    setButtonLoader(true);
    SessionDelete(props.data.id)
      .then((res) => {
        mutate(
          [USER_CALENDAR_SESSION_ENDPOINT(props.currentDateQuery), props.currentDateQuery],
          async (elements: any) => {
            let index = elements.findIndex((mutateData: any) => mutateData.id === props.data.id);
            return elements.filter((oldElement: any, i: any) => i != index);
          },
          false
        );
        closeModal();
        setButtonLoader(false);
      })
      .catch((errors) => {
        console.log(errors);
        setButtonLoader(false);
      });
  };

  return (
    <div>
      <Button variant="outline-danger" className="btn-sm" onClick={openModal}>
        <Delete width="20" />
      </Button>

      <Modal show={modal} onHide={closeModal} centered backdrop={"static"}>
        <Modal.Body>
          <h5>Session Delete</h5>
          <Form onSubmit={sessionDelete}>
            <h6 className="mt-4 mb-4">
              Are you sure to delete this session <strong>"{props.data.title}"</strong>
            </h6>
            <Button
              variant="outline-primary"
              className="btn-sm"
              type="submit"
              style={{ marginRight: "10px" }}
              disabled={buttonLoader}
            >
              {buttonLoader ? "Deleting Session..." : "Delete Session"}
            </Button>
            <Button variant="outline-secondary" className="btn-sm" onClick={closeModal}>
              Close
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Form></Form>
    </div>
  );
};

export default SessionEditView;
