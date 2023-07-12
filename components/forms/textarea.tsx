// react bootstrap
import { Form } from "react-bootstrap";

const FormText = (props: any) => {
  return (
    <div>
      <Form.Group className="mb-3" controlId={`element-textarea-${props.data.key}`}>
        <Form.Label className="mb-1 text-muted">
          {props.data.label}
          {props?.data?.required && <span className="tw-text-red-500"> *</span>}
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={
            props.profile && props.profile[props.data.key] ? props.profile[props.data.key] : ""
          }
          onChange={(e) => props.handleProfile(props.data.key, e.target.value)}
          required
          disabled={props.disabled}
        />
      </Form.Group>
    </div>
  );
};

export default FormText;
