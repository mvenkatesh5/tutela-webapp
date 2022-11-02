import React from "react";
// react bootstrap
import { Button, Form, Modal } from "react-bootstrap";
// swr
import { mutate } from "swr";
// components
import ContactsForm from "./ContactsForm";
// api routes
import { CONTACT_ENDPOINT } from "@constants/routes";
// api services
import { ContactCreate } from "@lib/services/contact.service";

const ContactsCreateView = () => {
  const [modal, setModal] = React.useState(false);
  const closeModal = () => {
    setModal(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };
  const openModal = () => setModal(true);

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const handleFormData = (value: any) => {
    setFormData(value);
  };

  const contactFormSubmit = (event: any) => {
    event.preventDefault();
    ContactCreate(formData)
      .then((res) => {
        mutate(
          CONTACT_ENDPOINT,
          async (elements: any) => {
            return [...elements, res];
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
    <div>
      <Button variant="primary" className="btn-sm" onClick={openModal}>
        Add Contact
      </Button>

      <Modal show={modal} onHide={closeModal} centered backdrop={"static"}>
        <Modal.Body>
          <h5>Create Contact</h5>
          <Form onSubmit={contactFormSubmit}>
            <ContactsForm data={formData} handleData={handleFormData} />
            <Button
              variant="outline-primary"
              className="btn-sm"
              type="submit"
              style={{ marginRight: "10px" }}
            >
              Create Contact
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

export default ContactsCreateView;
