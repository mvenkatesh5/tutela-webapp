import React from "react";
// react bootstrap
import { Form } from "react-bootstrap";
// date picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TestsFormView = (props: any) => {
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
      <Form.Group className="mb-2" id="tests-name">
        <Form.Label className="mb-1 text-muted">Name</Form.Label>
        <Form.Control
          type="text"
          value={formPayload.name}
          onChange={(e) => handleFormPayload("name", e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-2" id="tests-description">
        <Form.Label className="mb-1 text-muted">Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={formPayload.description}
          onChange={(e) => handleFormPayload("description", e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-2" id="tests-link">
        <Form.Label className="mb-1 text-muted">Link</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={formPayload.url}
          onChange={(e) => handleFormPayload("url", e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" id="tests-datetime">
        <Form.Label className="mb-1 text-muted">Date</Form.Label>
        <DatePicker
          className="form-control w-100"
          selected={formPayload.datetime ? new Date(formPayload.datetime) : new Date()}
          onChange={(date: any) => handleFormPayload("datetime", date)}
          showTimeSelect
          dateFormat="MMMM d, yyyy h:mm aa"
        />
      </Form.Group>
    </div>
  );
};

export default TestsFormView;
