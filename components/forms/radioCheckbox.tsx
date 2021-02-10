// react bootstrap
import { Form } from "react-bootstrap";

const FormRadioCheckbox = (props: any) => {
  const handleElementUserAnswers = (value: any) => {
    if (props.data.kind === "checkbox") {
      let checkboxValues = Array.isArray(props.profile[props.data.key])
        ? props.profile[props.data.key]
        : [props.profile[props.data.key]];
      if (checkboxValues.length === 0) checkboxValues[value];
      else checkboxValues.push(value);
      props.handleProfile(props.data.key, checkboxValues);
    } else {
      props.handleProfile(props.data.key, value);
    }
  };

  return (
    <div>
      <Form.Group controlId={`element-mcq-${props.data.key}`} className="mb-3">
        <Form.Label>{props.data.label}</Form.Label>
        {props.data &&
          props.data.data &&
          props.data.data.length > 0 &&
          props.data.data.map((option: any, index: any) => (
            <Form.Check
              key={`element-mcq-option-${option.key}`}
              type={props.data.kind}
              label={option.value}
              id={`element-mcq-${props.data.key}-${option.key}`}
              value={
                props.profile && props.profile[props.data.key] && props.profile[props.data.key]
              }
              onChange={() => handleElementUserAnswers(option.key)}
              checked={
                props.data.kind === "checkbox"
                  ? props.profile[props.data.key] &&
                    props.profile[props.data.key].includes(option.key)
                  : option.key === props.profile[props.data.key]
              }
              required
              disabled={props.disabled}
            />
          ))}
      </Form.Group>
    </div>
  );
};

export default FormRadioCheckbox;
