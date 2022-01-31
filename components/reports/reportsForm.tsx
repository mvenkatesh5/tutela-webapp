import React from "react";
// react bootstrap
import { Form, Card, Row, Col, Button, Table } from "react-bootstrap";
// components
import { SlateEditor } from "@components/SlateEditor";

const AdvertsFormView = (props: any) => {
  const initialSlateContent = [
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ];

  const [slateContent, setSlateContent] = React.useState<any>({
    performance: "",
    syllabus: "",
    behavior: "",
  });
  const handleSlateContent = (key: any, value: any) => {
    setSlateContent({
      ...slateContent,
      [key]: value,
    });
    props.handleSlateData(key, value);
  };

  const [formPayload, setFormPayload] = React.useState(Object);
  const handleFormPayload = (key: any, value: any) => {
    setFormPayload({ ...formPayload, [key]: value });
    props.handleSlateData(key, value);
  };
  const removeTestDetails = (index: any) => {
    handleFormPayload(
      "test_details",
      formPayload.test_details.filter((oldElement: any, i: any) => i != index)
    );
  };

  const [testPayload, setTestPayload] = React.useState({
    name: "",
    date: "",
    score: "",
  });
  const handleTestPayload = (key: any, value: any) => {
    setTestPayload({ ...testPayload, [key]: value });
  };
  const testSubmit = (e: any) => {
    handleFormPayload("test_details", [...formPayload.test_details, testPayload]);
    setTestPayload({
      name: "",
      date: "",
      score: "",
    });
  };

  React.useEffect(() => {
    if (props.data) {
      console.log("props.data", props.data);
      setFormPayload({
        id: props.data.id,
        title: props.data.title,
        content:
          props.data.content && props.data.content.length > 0 && Array.isArray(props.data.content)
            ? props.data.content
            : initialSlateContent,
        test_details:
          props.data.test_details &&
          props.data.test_details.length > 0 &&
          Array.isArray(props.data.test_details)
            ? props.data.test_details
            : [],
      });
      setSlateContent({
        ...slateContent,
        performance:
          props.data.performance &&
          props.data.performance.length > 0 &&
          Array.isArray(props.data.performance)
            ? props.data.performance
            : null,
        syllabus:
          props.data.syllabus &&
          props.data.syllabus.length > 0 &&
          Array.isArray(props.data.syllabus)
            ? props.data.syllabus
            : null,
        behavior:
          props.data.behavior &&
          props.data.behavior.length > 0 &&
          Array.isArray(props.data.behavior)
            ? props.data.behavior
            : null,
      });
    }
  }, []);

  return (
    <div>
      <Form.Group className="mb-3 mt-3">
        <h6>Title</h6>
        <Form.Control
          type="text"
          value={formPayload.title}
          onChange={(e) => handleFormPayload("title", e.target.value)}
          required
          placeholder="Enter title"
        />
      </Form.Group>

      <Form.Group className="mb-3 mt-3">
        <h6>General Report</h6>
        {/* <Form.Label className="mb-1 text-muted">General</Form.Label> */}
        {formPayload.content && (
          <SlateEditor
            readOnly={false}
            initialValue={formPayload.content}
            handleData={(value: any) => handleFormPayload("content", value)}
          />
        )}
      </Form.Group>

      <div className="mb-3">
        {slateContent.performance ? (
          <div>
            <h6>Performance Report</h6>
            <SlateEditor
              readOnly={false}
              initialValue={slateContent.performance}
              handleData={(value: any) => handleSlateContent("performance", value)}
            />
            <Button
              variant="outline-secondary"
              className="btn-sm mt-2"
              onClick={() => handleSlateContent("performance", null)}
            >
              Clear
            </Button>
          </div>
        ) : (
          <Button
            variant="primary"
            className="btn-sm"
            onClick={() => handleSlateContent("performance", initialSlateContent)}
          >
            Add Performance
          </Button>
        )}
      </div>
      <div className="mb-3">
        {slateContent.syllabus ? (
          <div>
            <h6>Syllabus</h6>
            <SlateEditor
              readOnly={false}
              initialValue={slateContent.syllabus}
              handleData={(value: any) => handleSlateContent("syllabus", value)}
            />
            <Button
              variant="outline-secondary"
              className="btn-sm mt-2"
              onClick={() => handleSlateContent("syllabus", null)}
            >
              Clear
            </Button>
          </div>
        ) : (
          <Button
            variant="primary"
            className="btn-sm"
            onClick={() => handleSlateContent("syllabus", initialSlateContent)}
          >
            Add Syllabus
          </Button>
        )}
      </div>
      <div className="mb-3">
        {slateContent.behavior ? (
          <div>
            <h6>Behavior</h6>
            <SlateEditor
              readOnly={false}
              initialValue={slateContent.behavior}
              handleData={(value: any) => handleSlateContent("behavior", value)}
            />
            <Button
              variant="outline-secondary"
              className="btn-sm mt-2"
              onClick={() => handleSlateContent("behavior", null)}
            >
              Clear
            </Button>
          </div>
        ) : (
          <Button
            variant="primary"
            className="btn-sm"
            onClick={() => handleSlateContent("behavior", initialSlateContent)}
          >
            Add Behavior
          </Button>
        )}
      </div>

      <h5>Test Details</h5>
      <Table bordered>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Score</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {formPayload &&
            formPayload.test_details &&
            formPayload.test_details.length > 0 &&
            formPayload.test_details.map((element: any, index: any) => (
              <tr key={`table-content-${element.date}-${index}`}>
                <td>{element.name}</td>
                <td>{element.date}</td>
                <td>{element.score}</td>
                <td>
                  <Button
                    variant="outline-danger"
                    className="btn-sm border-0 m-0"
                    onClick={() => removeTestDetails(index)}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))}

          <tr>
            <td>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Enter test name"
                  value={testPayload.name}
                  onChange={(e: any) => handleTestPayload("name", e.target.value)}
                />
              </Form.Group>
            </td>
            <td>
              <Form.Group>
                <Form.Control
                  type="date"
                  placeholder="Enter test date"
                  value={testPayload.date}
                  onChange={(e: any) => handleTestPayload("date", e.target.value)}
                />
              </Form.Group>
            </td>
            <td>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Enter test score ex.80/100"
                  value={testPayload.score}
                  onChange={(e: any) => handleTestPayload("score", e.target.value)}
                />
              </Form.Group>
            </td>
            <td></td>
          </tr>
        </tbody>
      </Table>

      <Button className="btn-sm mb-3" onClick={testSubmit}>
        Add New Test
      </Button>
    </div>
  );
};

export default AdvertsFormView;
