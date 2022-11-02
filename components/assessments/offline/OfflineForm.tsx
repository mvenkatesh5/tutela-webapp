import React from "react";
// react bootstrap
import { Row, Col, Form, Button } from "react-bootstrap";
// uuid
import { v4 as uuidV4 } from "uuid";

interface IOfflineForm {
  formData: any;
  handleFormData: any;
  updateResource: any;
  buttonLoader: any;
}

const OfflineForm: React.FC<IOfflineForm> = ({
  formData,
  handleFormData,
  updateResource,
  buttonLoader,
}) => {
  const generateOnlineQuestions = (omrPayload: any) => {
    let questions: any = {};
    for (let i = 0; i < parseInt(omrPayload.questions); i++) {
      questions[uuidV4()] = {};
    }
    return questions;
  };

  const onOnlineQuestionGenerate = () => {
    let payload: any = { ...formData };
    if (payload?.questions > 0) {
      let omrData = generateOnlineQuestions(payload);
      omrData = omrData;
      payload = { ...payload, omr_data: omrData, answer_data: omrData };
      if (updateResource) updateResource(payload);
    } else {
      alert("Please fill no of questions and no of options per question.");
    }
  };

  return (
    <>
      <div className="py-3 d-flex gap-4 align-items-center">
        <div>
          <h6 className="m-0 p-0">Answer Key</h6>
        </div>
        <div className="ms-auto">
          <Form.Group>
            <Form.Label className="mb-1 text-muted text-sm">Timer (In Minutes)</Form.Label>
            <Form.Control
              size="sm"
              type="number"
              value={formData.time}
              onChange={(e) => handleFormData("time", e.target.value)}
              required
              placeholder="time"
            />
          </Form.Group>
        </div>
        <div>
          <Button
            disabled={buttonLoader}
            variant="primary"
            size={"sm"}
            onClick={() => updateResource(null)}
          >
            {buttonLoader ? "Processing..." : "Update"}
          </Button>
        </div>
      </div>

      <div>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label className="mb-1 text-muted text-sm">Enter No.of Questions</Form.Label>
              <Form.Control
                size="sm"
                type="number"
                value={formData.questions}
                onChange={(e) => handleFormData("questions", e.target.value)}
                required
                placeholder="Questions"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label className="mb-1 text-muted text-sm">Points per question</Form.Label>
              <Form.Control
                size="sm"
                type="number"
                value={formData.points_per_question}
                onChange={(e) => handleFormData("points_per_question", e.target.value)}
                required
                placeholder="Points per question"
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <div className="w-100 h-100 d-flex justify-content-center align-items-end">
              <Button
                variant="primary"
                size={"sm"}
                onClick={onOnlineQuestionGenerate}
                disabled={buttonLoader}
              >
                {buttonLoader ? "Processing..." : "Generate"}
              </Button>
            </div>
          </Col>
        </Row>
      </div>

      {/* rendering buttons  */}
      <div className="w-100 h-100 py-4" style={{ overflow: "auto" }}>
        {formData?.omr_data &&
          Object.keys(formData?.omr_data) &&
          Object.keys(formData?.omr_data).map((rowKey: string, rowIndex: number) => (
            <div
              key={rowIndex}
              className="mb-2"
              style={{ position: "relative", display: "flex", alignItems: "center", gap: "10px" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  minWidth: "22px",
                }}
              >
                {rowIndex + 1}.
              </div>
              <div>
                <Button variant="outline-primary" size="sm">
                  Upload Answer
                </Button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default OfflineForm;
