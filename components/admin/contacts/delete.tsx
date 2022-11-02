import React from "react";
// react bootstrap
import { Button, Form, Modal } from "react-bootstrap";
// material icons
import { Delete } from "@styled-icons/material/Delete";
// swr
import { mutate } from "swr";
// api routes
import { CONTACT_ENDPOINT } from "@constants/routes";
// api services
import { ContactDelete } from "@lib/services/contact.service";

const ContactDeleteView = (props: any) => {
  const [modal, setModal] = React.useState(false);
  const closeModal = () => setModal(false);
  const openModal = () => setModal(true);

  const [buttonLoader, setButtonLoader] = React.useState(false);

  const onFormSubmit = (event: any) => {
    event.preventDefault();
    setButtonLoader(true);
    ContactDelete(props.data.id)
      .then((res) => {
        setButtonLoader(false);
        mutate(
          CONTACT_ENDPOINT,
          async (elements: any) => {
            let index = elements.findIndex((mutateData: any) => mutateData.id === props.data.id);
            return elements.filter((oldElement: any, i: any) => i != index);
          },
          false
        );
        closeModal();
      })
      .catch((errors) => {
        setButtonLoader(false);
        console.log(errors);
      });
  };

  return (
    <>
      <Button variant="danger" className="btn-sm" onClick={openModal}>
        <div className="d-flex justify-content-center align-items-center">
          <Delete width="16" />
        </div>
      </Button>

      <Modal show={modal} onHide={closeModal} centered backdrop={"static"}>
        <Modal.Body>
          <h6 className="mb-3">Delete Contact</h6>
          <p>Are you sure you want to delete this contact.</p>
          <Form onSubmit={onFormSubmit}>
            <div>
              <Button
                variant="outline-danger"
                className="btn-sm"
                type="submit"
                style={{ marginRight: "10px" }}
                disabled={buttonLoader}
              >
                {buttonLoader ? "Processing..." : "Delete Contact"}
              </Button>
              <Button variant="outline-secondary" className="btn-sm" onClick={closeModal}>
                Close
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <Form></Form>
    </>
  );
};

export default ContactDeleteView;
