import React from "react";
// react bootstrap
import { Form, Card, Row, Col, Button } from "react-bootstrap";
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
      <Card className="p-2 mb-2">
        <Row>
          <Col>
            <h6 className="m-0 p-0">Name</h6>
          </Col>
          <Col>
            <h6 className="m-0 p-0">Date</h6>
          </Col>
          <Col>
            <h6 className="m-0 p-0">Score</h6>
          </Col>
          <Col md={2}>
            <h6 className="m-0 p-0">Delete</h6>
          </Col>
        </Row>
      </Card>

      {formPayload && formPayload.test_details && formPayload.test_details.length > 0 && (
        <>
          {formPayload.test_details.map((element: any, index: any) => (
            <Card className="p-2 mb-2">
              <Row>
                <Col>
                  <div className="m-0 p-0">{element.name}</div>
                </Col>
                <Col>
                  <div className="m-0 p-0">{element.date}</div>
                </Col>
                <Col>
                  <div className="m-0 p-0">{element.score}</div>
                </Col>
                <Col md={2}>
                  <Button
                    variant="outline-danger"
                    className="btn-sm"
                    onClick={() => removeTestDetails(index)}
                  >
                    Remove
                  </Button>
                </Col>
              </Row>
            </Card>
          ))}
        </>
      )}

      <Card className="ps-2 pe-2 mb-3">
        <Form>
          <Row>
            <Col>
              <Form.Group className="mb-3 mt-3">
                <Form.Control
                  type="text"
                  placeholder="Enter test name"
                  value={testPayload.name}
                  onChange={(e: any) => handleTestPayload("name", e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3 mt-3">
                <Form.Control
                  type="date"
                  placeholder="Enter test date"
                  value={testPayload.date}
                  onChange={(e: any) => handleTestPayload("date", e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3 mt-3">
                <Form.Control
                  type="text"
                  placeholder="Enter test score ex.80/100"
                  value={testPayload.score}
                  onChange={(e: any) => handleTestPayload("score", e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={12} className="mb-2 ">
              <Button className="btn-sm" onClick={testSubmit}>
                Add New Test
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default AdvertsFormView;
