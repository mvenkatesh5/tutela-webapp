import React from "react";
// react bootstrap
import { Button, Form, Modal } from "react-bootstrap";
// material icons
import { MessageSquareEdit } from "@styled-icons/boxicons-regular/";
// swr
import { mutate } from "swr";
// components
import ContactsForm from "./ContactsForm";
// api routes
import { CONTACT_ENDPOINT } from "@constants/routes";
// api services
import { ContactUpdate } from "@lib/services/contact.service";

const ContactsEditView = (props: any) => {
  const [modal, setModal] = React.useState(false);
  const closeModal = () => setModal(false);
  const openModal = () => setModal(true);

  const [formData, setFormData] = React.useState();
  const handleFormData = (value: any) => {
    setFormData(value);
  };

  React.useEffect(() => {
    if (props.data) {
      setFormData(props.data);
    }
  }, [props.data]);

  const onFormSubmit = (event: any) => {
    event.preventDefault();
    ContactUpdate(formData)
      .then((res) => {
        mutate(
          CONTACT_ENDPOINT,
          async (elements: any) => {
            let index = elements.findIndex((mutateData: any) => mutateData.id === res.id);
            return elements.map((oldElement: any, i: Number) => (i === index ? res : oldElement));
            // return elements.filter((oldElement: any, i) => i != index);
          },
          false
        );
        closeModal();
      })
      .catch((errors) => {
        console.log(errors);
      });
  };

  return (
    <>
      <Button variant="primary" className="btn-sm" onClick={openModal}>
        <div className="d-flex justify-content-center align-items-center">
          <MessageSquareEdit width="16" />
        </div>
      </Button>

      <Modal show={modal} onHide={closeModal} centered backdrop={"static"}>
        <Modal.Body>
          <h5>Edit Contact</h5>
          <Form onSubmit={onFormSubmit}>
            {formData && (
              <div>
                <ContactsForm data={formData} handleData={handleFormData} />
                <Button
                  variant="outline-primary"
                  className="btn-sm"
                  type="submit"
                  style={{ marginRight: "10px" }}
                >
                  Update Contact
                </Button>
                <Button variant="outline-secondary" className="btn-sm" onClick={closeModal}>
                  Close
                </Button>
              </div>
            )}
          </Form>
        </Modal.Body>
      </Modal>
      <Form></Form>
    </>
  );
};

export default ContactsEditView;
