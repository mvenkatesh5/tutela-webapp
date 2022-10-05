import React from "react";
// react bootstrap
import { Modal, Button } from "react-bootstrap";
// components
import RenderOmr from "@components/assessments/semi-online/OmrRender";
// assessment helpers
import { assessmentSemiOnlineValidate } from "../../helpers/assessment-validation";

interface IAssessmentReview {
  omrData: any;
  handleModal: any;
}

const AssessmentReview: React.FC<IAssessmentReview> = ({ omrData, handleModal }) => {
  const [results, setResults] = React.useState<any>(null);

  const [modal, setModal] = React.useState(false);
  const closeModal = () => {
    setModal(false);
    handleModal(false);
    setResults(null);
  };
  const openModal = () => setModal(true);

  React.useEffect(() => {
    if (omrData) {
      openModal();
      let assessmentResults = assessmentSemiOnlineValidate(omrData);
      console.log("assessmentResults", assessmentResults);
      setResults(assessmentResults);
    }
  }, [omrData]);

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
          <h6 className="mb-3">Assessment Results</h6>
          {results && (
            <>
              <div className="mb-3 d-flex align-items-center gap-4">
                <div className="w-100" style={{ fontSize: "18px", fontWeight: "bold" }}>
                  <div>Total questions: {results?.totalQuestions}</div>
                  <div>Questions Answered: {results?.totalQuestions - results?.omitted}</div>
                  <div>Questions Un Answered: {results?.omitted}</div>
                  <div>Correct Answers: {results?.correctAns}</div>
                  <div>Wrong Answers: {results?.wrongAns}</div>
                </div>
                <div className="w-100">
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
