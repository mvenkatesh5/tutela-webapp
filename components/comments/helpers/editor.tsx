import React from "react";
// react bootstrap
import { Form } from "react-bootstrap";

const CommentEditor = (props: any) => {
  const [formData, setFormData] = React.useState({
    content: "",
  });

  const handleFromData = (key: any, value: any) => {
    setFormData({ ...formData, [key]: value });
    props.handleData({ ...formData, [key]: value });
  };

  React.useEffect(() => {
    if (props.data) {
      setFormData({ ...formData, content: props.data.content ? props.data.content : "" });
    }
  }, [props.data]);

  return (
    <div>
      {props.edit ? (
        <Form.Group controlId="comment-content">
          <Form.Control
            className="comment-editor"
            as="textarea"
            rows={3}
            value={formData.content}
            onChange={(e) => handleFromData("content", e.target.value)}
            placeholder={`enter your message`}
          />
        </Form.Group>
      ) : (
        <div className="content-message">{formData.content}</div>
      )}
    </div>
  );
};

export default CommentEditor;
