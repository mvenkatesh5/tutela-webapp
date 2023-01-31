import React from "react";
// next imports
import { useRouter } from "next/router";
// react bootstrap
import { Modal, Button } from "react-bootstrap";
// components
import ResultPreview from "./Preview";
import DigiSatPreview from "./DigiSat";

interface IAssessmentReview {
  resourceDetail: any;
  omrData: any;
  result: any;
  handleModal: any;
  type?: "user" | "admin";
  selectedUser?: number;
}

const AssessmentReview: React.FC<IAssessmentReview> = ({
  resourceDetail,
  omrData,
  result,
  handleModal,
  type = "user",
  selectedUser,
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
              {resourceDetail.data.kind === "digital_sat" ? (
                <DigiSatPreview resourceDetail={resourceDetail} selectedUser={selectedUser} />
              ) : (
                <ResultPreview
                  resourceDetail={resourceDetail}
                  omrData={omrData}
                  results={results}
                />
              )}
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
