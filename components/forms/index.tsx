// react bootstrap
import { Col } from "react-bootstrap";
// components
import FormTextView from "./text";
import FormTextAreaView from "./textarea";
import FormRadioCheckboxView from "./radioCheckbox";
import FormSelect from "./select";

const FromBuilder = (props: any) => {
  return (
    <>
      {props.data.map((element_data: any, element_index: any) => (
        <Col
          md={element_data.md ? element_data.md : 12}
          key={`tab-pane-row-${props.rowIndex}-col-${element_index}`}
        >
          {(element_data.kind === "text" ||
            element_data.kind === "select" ||
            element_data.kind === "date") && (
            <FormTextView
              data={element_data}
              profile={props.profile}
              handleProfile={props.handleProfile}
              disabled={props.disabled}
            />
          )}
          {element_data.kind === "textarea" && (
            <FormTextAreaView
              data={element_data}
              profile={props.profile}
              handleProfile={props.handleProfile}
              disabled={props.disabled}
            />
          )}
          {(element_data.kind === "radio" || element_data.kind === "checkbox") && (
            <FormRadioCheckboxView
              data={element_data}
              profile={props.profile}
              handleProfile={props.handleProfile}
              disabled={props.disabled}
            />
          )}
          {/* {element_data.kind === "select" && (
            <FormRadioCheckboxView
              data={element_data}
              profile={props.profile}
              handleProfile={props.handleProfile}
            />
          )} */}
        </Col>
      ))}
    </>
  );
};

export default FromBuilder;
