import React from "react";
// react bootstrap
import { Row, Col, Form, Button } from "react-bootstrap";
// uuid
import { v4 as uuidV4 } from "uuid";
// components
import RenderOmr from "@components/assessments/semi-online/OmrRender";

interface ISemiOnlineForm {
  formData: any;
  handleFormData: any;
  updateResource: any;
  buttonLoader: any;
}

const SemiOnlineForm: React.FC<ISemiOnlineForm> = ({
  formData,
  handleFormData,
  updateResource,
  buttonLoader,
}) => {
  const generateOmrSheet = (omrPayload: any) => {
    let questions: any = {};
    for (let i = 0; i < parseInt(omrPayload.questions); i++) {
      let questionsOptions: any = {};
      for (let j = 0; j < omrPayload.options; j++) questionsOptions[uuidV4()] = false;

      questions[uuidV4()] = questionsOptions;
    }
    return questions;
  };

  const onOMRGenerate = () => {
    let payload: any = { ...formData };
    if (payload?.questions > 0 && payload?.options > 0) {
      let omrData = generateOmrSheet(payload);
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
          <div className="text-muted text-sm">* Please mark all correct answers</div>
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
              <Form.Label className="mb-1 text-muted text-sm">No.of options/question</Form.Label>
              <Form.Control
                size="sm"
                type="number"
                value={formData.options}
                onChange={(e) => handleFormData("options", e.target.value)}
                required
                placeholder="Options"
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
              <Button variant="primary" size={"sm"} onClick={onOMRGenerate} disabled={buttonLoader}>
                {buttonLoader ? "Processing..." : "Generate"}
              </Button>
            </div>
          </Col>
        </Row>
      </div>
      <div className="w-100 h-100 py-4" style={{ overflow: "auto" }}>
        <RenderOmr
          render_key={"omr_data"}
          data={formData}
          handleData={(value: any) => handleFormData("omr_data", value)}
          noOfQuestionInARow={10}
        />
      </div>
    </>
  );
};

export default SemiOnlineForm;
