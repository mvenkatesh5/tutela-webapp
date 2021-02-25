import React from "react";
// react bootstrap
import { Form } from "react-bootstrap";

const ThreadFormView = (props: any) => {
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
          <Form.Group className="mb-2" controlId="thread-name">
            <Form.Label className="mb-1 text-muted">Title</Form.Label>
            <Form.Control
              type="text"
              value={formPayload.title}
              onChange={(e) => handleFormPayload("title", e.target.value)}
              required
            />
          </Form.Group>
        </div>
      )}
    </>
  );
};

export default ThreadFormView;
