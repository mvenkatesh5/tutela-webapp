import React from "react";
// react bootstrap
import { Form } from "react-bootstrap";
// date picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
        <Form.Label className="mb-1 text-muted">Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={formPayload.description}
          onChange={(e) => handleFormPayload("description", e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="mb-1 text-muted">Start Date</Form.Label>
        <br />
        <DatePicker
          className="form-control w-100"
          selected={formPayload.start_time ? new Date(formPayload.start_time) : new Date()}
          onChange={(date: any) => handleFormPayload("start_time", date)}
          showTimeSelect
          timeIntervals={15}
          dateFormat="MMMM d, yyyy h:mm aa"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="mb-1 text-muted">End Date</Form.Label>
        <br />
        <DatePicker
          className="form-control w-100"
          selected={formPayload.end_date ? new Date(formPayload.end_date) : new Date()}
          onChange={(date: any) => handleFormPayload("end_date", date)}
          showTimeSelect
          timeIntervals={15}
          dateFormat="MMMM d, yyyy h:mm aa"
        />
      </Form.Group>
    </div>
  );
};

export default AdvertsFormView;
