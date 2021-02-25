import React from "react";
// react bootstrap
import { Form } from "react-bootstrap";

const ChannelFormView = (props: any) => {
  const [formPayload, setFormPayload] = React.useState<any>();
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
    <>
      {formPayload && (
        <div>
          <Form.Group className="mb-2" controlId="channel-name">
            <Form.Label className="mb-1 text-muted">Name</Form.Label>
            <Form.Control
              type="text"
              value={formPayload.name}
              onChange={(e) => handleFormPayload("name", e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-2" controlId="channel-description">
            <Form.Label className="mb-1 text-muted">Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={formPayload.description}
              onChange={(e) => handleFormPayload("description", e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-2" controlId="channel-collapse">
            <Form.Check
              type="switch"
              id="channel-collapse"
              label={`    Collapse View`}
              value={formPayload.collapse}
              checked={formPayload.collapse}
              onChange={() => handleFormPayload("collapse", !formPayload.collapse)}
            />
          </Form.Group>
        </div>
      )}
    </>
  );
};

export default ChannelFormView;
