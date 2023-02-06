import React from "react";
// next imports
import Link from "next/link";
import { useRouter } from "next/router";
// react bootstrap
import { Modal, Button } from "react-bootstrap";
// api routes
import { TAGS_WITH_ID_ENDPOINT, RESOURCE_ASSESSMENT_USER_DETAILS } from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";
// swr
import useSWR from "swr";

interface IAssessmentReview {
  treeId: any;
  modal?: any;
  setModal?: any;
  href: string;
}

const DigiSatTestModal: React.FC<IAssessmentReview> = ({ treeId, modal, setModal, href }) => {
  const router = useRouter();

  const closeModal = () => {
    setModal(false);
  };

  const { data: resourceUserAssessment, error: resourceUserAssessmentError } = useSWR(
    treeId ? [RESOURCE_ASSESSMENT_USER_DETAILS(treeId), treeId] : null,
    (url) => APIFetcher(url),
    { refreshInterval: 0, revalidateOnFocus: false }
  );

  return (
    <div>
      <Modal
        show={modal}
        onHide={closeModal}
        centered
        backdrop={"static"}
        style={{ zIndex: 999999 }}
      >
        <Modal.Body>
          <h5 className="m-0 p-0 mb-3">Digital SAT</h5>
          <>
            {resourceUserAssessment &&
            resourceUserAssessment.message !== "User can access this node" ? (
              <h6 style={{ whiteSpace: "nowrap" }}>
                Click <strong>Continue</strong> to start the test
              </h6>
            ) : (
              <h6 style={{ whiteSpace: "nowrap" }}>No access. Contact Admin.</h6>
            )}
          </>
          <div className="d-flex justify-content-end gap-2">
            {resourceUserAssessment &&
              resourceUserAssessment.message !== "User can access this node" && (
                <Link href={href}>
                  <a target="_blank">
                    <Button onClick={closeModal} variant="outline-primary" size="sm">
                      Continue
                    </Button>
                  </a>
                </Link>
              )}
            <Button variant="outline-secondary" size="sm" className="" onClick={closeModal}>
              Close
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DigiSatTestModal;
