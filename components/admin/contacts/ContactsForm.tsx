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
        <Form.Label className="mb-1 text-muted">Title</Form.Label>
        <Form.Control
          type="text"
          value={formPayload.title}
          onChange={(e) => handleFormPayload("title", e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label className="mb-1 text-muted">Image URL</Form.Label>
        <Form.Control
          type="text"
          value={formPayload.image}
          onChange={(e) => handleFormPayload("image", e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="mb-1 text-muted">Redirect url</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={formPayload.link}
          onChange={(e) => handleFormPayload("link", e.target.value)}
          required
        />
      </Form.Group>
    </div>
  );
};

export default ContactsFormView;
