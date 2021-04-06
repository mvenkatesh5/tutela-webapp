import { useState, useReducer } from "react";
// react bootstrap
import { Form } from "react-bootstrap";
// material icons
import { Times } from "@styled-icons/fa-solid/Times";

const ProductSubjectsView = (props: any) => {
  const [productSubjectStagesArray, setProductSubjectStagesArray] = useReducer(
    (optionArray: any, { type, index, value }: any) => {
      switch (type) {
        case "add":
          props.handleFormData("subjects", [...optionArray, value]);
          return [...optionArray, value];
        case "remove":
          props.handleFormData(
            "subjects",
            optionArray.filter((_: any, i: any) => i !== index)
          );
          return optionArray.filter((_: any, i: any) => i !== index);
        case "update":
          const updatedArray = [...optionArray];
          updatedArray[index] = value;
          props.handleFormData("subjects", updatedArray);
          return updatedArray;
        case "replace":
          return value;
        default:
          return optionArray;
      }
    },
    []
  );

  const [input, setInput] = useState<any>();
  const handleInput = (value: any) => {
    setInput(value);
  };
  const handleInputKeyPress = (event: any) => {
    if (event.charCode === 13) {
      event.preventDefault();
      if (event.target.value) {
        setProductSubjectStagesArray({
          type: "add",
          value: event.target.value,
        });
        setInput("");
      }
    }
  };

  return (
    <div>
      {productSubjectStagesArray && productSubjectStagesArray.length > 0 && (
        <div className="product-subjects-wrapper">
          {productSubjectStagesArray.map((levelData: any, levelIndex: any) => (
            <div className="product-subjects-item">
              <div className="inner-flex no-select">
                <div className="inner-item text">
                  {/* <Form.Group controlId="flow-level-edit-input">
                    <Form.Control
                      className="flow-level-edit-input"
                      type="text"
                      placeholder="Enter stages"
                      value={levelData}
                      onChange={(e) =>
                        setProductSubjectStagesArray({
                          type: "update",
                          value: e.target.value,
                          index: levelIndex,
                        })
                      }
                    />
                  </Form.Group> */}
                  {levelData}
                </div>
                <div
                  className="inner-item icon"
                  onClick={() =>
                    setProductSubjectStagesArray({
                      type: "remove",
                      index: levelIndex,
                    })
                  }
                >
                  <Times />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Form.Group controlId="flow-level-input">
        <Form.Control
          type="text"
          placeholder="Enter stages"
          value={input}
          onChange={(e) => handleInput(e.target.value)}
          onKeyPress={handleInputKeyPress}
        />
        <Form.Text className="text-muted">
          Type subject name and click enter to bind the subject to product.
        </Form.Text>
      </Form.Group>
    </div>
  );
};

export default ProductSubjectsView;
