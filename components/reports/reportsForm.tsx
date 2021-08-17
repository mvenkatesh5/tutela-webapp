import React from "react";
// react bootstrap
import { Form } from "react-bootstrap";

const AdvertsFormView = (props: any) => {
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
      <Form.Group className="mb-3 mt-3">
        <Form.Label className="mb-1 text-muted">Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={formPayload.content}
          onChange={(e) => handleFormPayload("content", e.target.value)}
          required
          placeholder="write report..."
        />
      </Form.Group>
    </div>
  );
};

export default AdvertsFormView;
