import React from "react";
// next imports
import { useRouter } from "next/router";
// react bootstrap
import { Modal, Button } from "react-bootstrap";
// components
import DigiSatPreview from "@components/assessments/semi-online/results/DigiSat";

interface IAssessmentReview {
  resourceDetail: any;
  modal?: any;
  setModal?: any;
  selectedUser?: number;
}

const SubmissionModal: React.FC<IAssessmentReview> = ({
  resourceDetail,
  selectedUser,
  modal,
  setModal,
}) => {
  const router = useRouter();
  const [results, setResults] = React.useState<any>(null);

  const closeModal = () => {
    setModal(false);
    setResults(null);
  };

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
          <>
            <DigiSatPreview resourceDetail={resourceDetail} selectedUser={selectedUser} />
          </>
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

export default SubmissionModal;
