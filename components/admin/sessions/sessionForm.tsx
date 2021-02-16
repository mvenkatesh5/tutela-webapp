import React from "react";
// react bootstrap
import { Form } from "react-bootstrap";
// material icons
import { Text } from "@styled-icons/evaicons-solid";
import { Text as TextDescription } from "@styled-icons/entypo";
import { DateRange } from "@styled-icons/material";
// global imports
import { dateTimeFormat } from "@constants/global";

const SessionFormView = (props: any) => {
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

  const handleFormDate = (date: any) => {
    if (date && new Date(date)) {
      date = dateTimeFormat(date);
    }
    return date;
  };

  return (
    <div>
      <Form.Group className="mb-2">
        <Form.Label className="mb-1 text-muted">
          <Text style={{ width: "16px", marginRight: "8px", marginTop: "-2px" }} />
          Title
        </Form.Label>
        <Form.Control
          type="text"
          value={formPayload.title}
          onChange={(e) => handleFormPayload("title", e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="mb-1 text-muted">
          <TextDescription style={{ width: "16px", marginRight: "8px", marginTop: "-2px" }} />
          Description
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={formPayload.description}
          onChange={(e) => handleFormPayload("description", e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="mb-1 text-muted">
          <DateRange style={{ width: "16px", marginRight: "8px", marginTop: "-2px" }} />
          Date Time
        </Form.Label>
        <Form.Control
          type="datetime-local"
          value={handleFormDate(formPayload.datetime)}
          onChange={(e) => handleFormPayload("datetime", e.target.value)}
          required
        />
      </Form.Group>
    </div>
  );
};

export default SessionFormView;
