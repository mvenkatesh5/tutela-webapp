import React from "react";
// next imports
import { NextPage } from "next";
import { useRouter } from "next/router";
// react bootstrap
// react-bootstrap
import { Container, Row, Col, Form, Button } from "react-bootstrap";
// swr
import useSWR from "swr";
// uuid
import { v4 as uuidV4 } from "uuid";
// constants
import { META_DESCRIPTION } from "@constants/page";
// layout
import AdminLayout from "@layouts/adminLayout";
// components
import Page from "@components/page";
import RenderOmr from "@components/assessments/semi-online/OmrRender";
// hoc
import withGlobalAuth from "@lib/hoc/withGlobalAuth";

const meta = {
  title: "Assessment",
  description: META_DESCRIPTION,
};

const Assessment: NextPage = () => {
  const router = useRouter();
  const {} = router.query;

  const [formData, setFormData] = React.useState({
    title: "",
    questions: 50,
    options: 4,
    omr_data: null,
    answer_data: null,
  });
  const handleFormData = (key: string, value: any) => {
    setFormData({ ...formData, [key]: value });
  };

  const generateOmrSheet = (omrPayload: any) => {
    let questions: any = {};

    for (let i = 0; i < omrPayload.questions; i++) {
      let questionsOptions: any = {};
      for (let j = 0; j < omrPayload.options; j++) questionsOptions[uuidV4()] = false;
      questions[uuidV4()] = questionsOptions;
    }

    return questions;
  };

  const onSubmit = () => {
    let payload: any = { ...formData };
    let omrData = generateOmrSheet(payload);
    console.log("omrData", omrData);
    payload = { ...payload, omr_data: omrData, answer_data: omrData };
    setFormData(payload);
  };

  formData?.omr_data && console.log(formData?.omr_data);

  return (
    <Page meta={meta}>
      <AdminLayout>
        <div className="right-layout">
          <h5>Assessment Semi Online</h5>
          <div>
            <Row>
              <Col>
                <Form.Group className="">
                  <Form.Label className="mb-1 text-muted">Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleFormData("title", e.target.value)}
                    required
                    placeholder="Name"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="">
                  <Form.Label className="mb-1 text-muted">Number of Questions</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.questions}
                    onChange={(e) => handleFormData("questions", e.target.value)}
                    required
                    placeholder="Questions"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="">
                  <Form.Label className="mb-1 text-muted">No of Options per question.</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.options}
                    onChange={(e) => handleFormData("options", e.target.value)}
                    required
                    placeholder="Options"
                  />
                </Form.Group>
              </Col>
              <Col md={1} className="">
                <div className="w-100 h-100 d-flex justify-content-center align-items-end">
                  <Button variant="primary" size={"sm"} onClick={onSubmit}>
                    Create
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
          {/* rendering omr Data */}
          <div className="mt-4">
            <RenderOmr data={formData} handleData={handleFormData} />
          </div>
        </div>
      </AdminLayout>
    </Page>
  );
};

export default withGlobalAuth(Assessment);
