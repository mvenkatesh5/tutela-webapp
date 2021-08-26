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
      setFormPayload(props.data);
    } else {
      setFormPayload({
        content: [
          {
            type: "paragraph",
            children: [{ text: props.data.content.length > 0 ? props.data.content : "" }],
          },
        ],
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
    </div>
  );
};

export default AdvertsFormView;
