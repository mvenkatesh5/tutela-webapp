import React from "react";
// react bootstrap
import { Form, Card, Row, Col, Button, Table } from "react-bootstrap";
// components
import { SlateEditor } from "@components/SlateEditor";

const AdvertsFormView = (props: any) => {
  const [formPayload, setFormPayload] = React.useState(Object);
  const handleFormPayload = (key: any, value: any) => {
    setFormPayload({ ...formPayload, [key]: value });
    props.handleData({ ...formPayload, [key]: value });
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
    // if (props.data) {
    //   console.log(props.data);
    //   setFormPayload(props.data);
    // }
    if (props.data && props.data.content.length > 0 && Array.isArray(props.data.content)) {
      setFormPayload({
        id: props.data.id,
        content: props.data.content,
        test_details:
          props.data.test_details &&
          props.data.test_details.length > 0 &&
          Array.isArray(props.data.test_details)
            ? props.data.test_details
            : [],
      });
    } else {
      setFormPayload({
        id: props.data.id,
        content: [
          {
            type: "paragraph",
            children: [{ text: props.data.content.length > 0 ? props.data.content : "" }],
          },
        ],
        test_details:
          props.data.test_details &&
          props.data.test_details.length > 0 &&
          Array.isArray(props.data.test_details)
            ? props.data.test_details
            : [],
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
