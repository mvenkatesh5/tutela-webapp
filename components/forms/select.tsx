// react bootstrap
import { Form } from "react-bootstrap";

const FormSelect = (props: any) => {
  return (
    <div>
      <Form.Group className="mb-3" controlId={`element-select-${props.data.key}`}>
        <Form.Label>
          {props.data.label}
          {props?.data?.required && <span className="tw-text-red-500"> *</span>}
        </Form.Label>
        <Form.Control
          as="select"
          value={props.profile && props.profile[props.data.key] && props.profile[props.data.key]}
          onChange={(e) => props.handleProfile(e.target.value)}
          required
          disabled={props.disabled}
        >
          <option value="">Select Option</option>
          {props.data &&
            props.data.data &&
            props.data.data.length > 0 &&
            props.data.data.map((option: any, index: any) => (
              <option key={`element-select-option-${option.key}`} value={option.key}>
                {option.value}
              </option>
            ))}
        </Form.Control>
      </Form.Group>
    </div>
  );
};

export default FormSelect;
