import React from "react";
// react bootstrap
import { Form } from "react-bootstrap";

const ContactsFormView = (props: any) => {
  const [formPayload, setFormPayload] = React.useState(Object);
  const handleFormPayload = (key: any, value: any) => {
    setFormPayload({ ...formPayload, [key]: value });
    props.handleData({ ...formPayload, [key]: value });
  };

  React.useEffect(() => {
    if (props.data) {
      setFormPayload(props.data);
    }
  }, [props.data]);

  return (
    <div>
      <Form.Group className="mb-2">
        <Form.Label className="mb-1 text-muted">Name</Form.Label>
        <Form.Control
          type="text"
          value={formPayload.name}
          onChange={(e) => handleFormPayload("name", e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label className="mb-1 text-muted">Email</Form.Label>
        <Form.Control
          type="email"
          value={formPayload.email}
          onChange={(e) => handleFormPayload("email", e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label className="mb-1 text-muted">Phone</Form.Label>
        <Form.Control
          type="text"
          value={formPayload.phone}
          onChange={(e) => handleFormPayload("phone", e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className="mb-1 text-muted">Message</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={formPayload.message}
          onChange={(e) => handleFormPayload("message", e.target.value)}
          required
        />
      </Form.Group>
    </div>
  );
};

export default ContactsFormView;
