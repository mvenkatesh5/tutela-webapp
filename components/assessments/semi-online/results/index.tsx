import React from "react";
// next imports
import { useRouter } from "next/router";
// react bootstrap
import { Modal, Button } from "react-bootstrap";
// components
import RenderOmr from "@components/assessments/semi-online/OmrRender";

interface IAssessmentReview {
  omrData: any;
  result: any;
  handleModal: any;
  type?: "user" | "admin";
}

const AssessmentReview: React.FC<IAssessmentReview> = ({
  omrData,
  result,
  handleModal,
  type = "user",
}) => {
  const router = useRouter();
  const [results, setResults] = React.useState<any>(null);

  const [modal, setModal] = React.useState(false);
  const closeModal = () => {
    if (type === "user") {
      router.push(`/user-resources/${omrData?.resource_id}`);
    } else {
      setModal(false);
      handleModal(false);
      setResults(null);
    }
  };
  const openModal = () => setModal(true);

  React.useEffect(() => {
    if (omrData && result) {
      openModal();
      setResults(result);
    }
  }, [omrData, result]);

  return (
    <div>
      <Modal
        size="xl"
        show={modal}
        onHide={closeModal}
        centered
        backdrop={"static"}
        style={{ zIndex: 999999 }}
      >
        <Modal.Body>
          <h5 className="m-0 p-0 mb-3">Assessment Results</h5>
          {results && (
            <>
              <div>
                <div className="w-100 mb-4">
                  <h6 className="m-0 p-0 mb-2">Overall Score</h6>
                  <div className="d-flex gap-2">
                    <div className="border p-2 w-100">
                      <div style={{ fontSize: "26px", fontWeight: "bold" }}>
                        {results?.totalQuestions}
                      </div>
                      <div style={{ fontSize: "16px" }}>Number of questions</div>
                    </div>
                    <div className="border p-2 w-100">
                      <div style={{ fontSize: "26px", fontWeight: "bold" }}>
                        {results?.totalQuestions - results?.omitted}
                      </div>
                      <div>Answered</div>
                    </div>
                    <div className="border p-2 w-100">
                      <div style={{ fontSize: "26px", fontWeight: "bold" }}>{results?.omitted}</div>
                      <div>Un Answered</div>
                    </div>
                  </div>
                </div>

                <div className="w-100 mb-4">
                  <h6 className="m-0 p-0 mb-2">User Answered Results</h6>
                  <div className="d-flex gap-2">
                    <div className="border p-2 w-100 text-success">
                      <div style={{ fontSize: "26px", fontWeight: "bold" }}>
                        {results?.correctAns}
                      </div>
                      <div>Correct Answers</div>
                    </div>
                    <div className="border p-2 w-100 text-danger">
                      <div style={{ fontSize: "26px", fontWeight: "bold" }}>
                        {results?.wrongAns}
                      </div>
                      <div>Wrong Answers</div>
                    </div>
                  </div>
                </div>

                <div className="w-100 mb-4 d-flex flex-column">
                  <h6 className="m-0 p-0">Note:</h6>
                  <small className="text-success">
                    <b>Green: Represents a correct answer</b>
                  </small>
                  <small className="text-danger">
                    <b>Red: Represents a wrong answer</b>
                  </small>
                  <small className="text-primary">
                    <b>Blue: Represents a actual answer</b>
                  </small>
                </div>

                <div className="w-100 mb-4">
                  <h6 className="m-0 p-0">Question wise summary</h6>
                  <div className="mt-3">
                    <RenderOmr
                      render_key={`answer_data`}
                      data={omrData}
                      noOfQuestionInARow={10}
                      disabled={true}
                      validity={true}
                      userResponse={results}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
          <div className="d-flex justify-content-end">
            <Button variant="outline-secondary" size="sm" className="" onClick={closeModal}>
              Close
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AssessmentReview;
