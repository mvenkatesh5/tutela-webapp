import React from "react";
// react bootstrap
import { Form } from "react-bootstrap";
// components
import { SlateEditor } from "@components/SlateEditor";

const AdvertsFormView = (props: any) => {
  const [formPayload, setFormPayload] = React.useState(Object);
  const handleFormPayload = (key: any, value: any) => {
    setFormPayload({ ...formPayload, [key]: value });
    props.handleData({ ...formPayload, [key]: value });
  };

  React.useEffect(() => {
    // if (props.data) {
    //   console.log(props.data);
    //   setFormPayload(props.data);
    // }
    if (props.data && props.data.content.length > 0 && Array.isArray(props.data.content)) {
      setFormPayload({
        content: props.data.content,
        test_name: props.data.test_name ? props.data.test_name : "",
        test_date: props.data.test_date ? props.data.test_date : "",
        test_score: props.data.test_score ? props.data.test_score : "",
      });
    } else {
      setFormPayload({
        content: [
          {
            type: "paragraph",
            children: [{ text: props.data.content.length > 0 ? props.data.content : "" }],
          },
        ],
        test_name: props.data.test_name ? props.data.test_name : "",
        test_date: props.data.test_date ? props.data.test_date : "",
        test_score: props.data.test_score ? props.data.test_score : "",
      });
    }
  }, [props.data]);

  return (
    <div>
      <Form.Group className="mb-3 mt-3">
        <Form.Label className="mb-1 text-muted">Content</Form.Label>
        {formPayload.content && (
          <SlateEditor
            readOnly={false}
            initialValue={formPayload.content}
            handleData={(value: any) => handleFormPayload("content", value)}
          />
        )}
      </Form.Group>
      <Form.Group className="mb-3 mt-3">
        <Form.Label className="mb-1 text-muted">Test Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter test name"
          value={formPayload.test_name}
          onChange={(e: any) => handleFormPayload("test_name", e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3 mt-3">
        <Form.Label className="mb-1 text-muted">Test Date</Form.Label>
        <Form.Control
          type="date"
          placeholder="Enter test date"
          value={formPayload.test_date}
          onChange={(e: any) => handleFormPayload("test_date", e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3 mt-3">
        <Form.Label className="mb-1 text-muted">Test Score</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter test score ex.80/100"
          value={formPayload.test_score}
          onChange={(e: any) => handleFormPayload("test_score", e.target.value)}
        />
        <Form.Text className="text-muted">(Ex. 80/100)</Form.Text>
      </Form.Group>
    </div>
  );
};

export default AdvertsFormView;
