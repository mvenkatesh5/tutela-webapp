import React from "react";
// next imports
import { useRouter } from "next/router";
// react bootstrap
import { Modal, Button, Form } from "react-bootstrap";
// api services
import { UpdateResourceUserAllocation } from "@lib/services/resource.service";

interface IAssessmentReset {
  result: any;
  setResult: any;
  mutate: any;
}

const bindZero = (value: any) => {
  if (value > 9) return value;
  else return `0${value}`;
};

const dateFormat = (date: any) => {
  const d = new Date(date);
  let year = d.getFullYear();
  let month = d.getMonth() + 1;
  let day = d.getDate();
  let hour = d.getHours();
  let minutes = d.getMinutes();
  let returnDate = `${bindZero(year)}-${bindZero(month)}-${bindZero(day)}T${bindZero(
    hour
  )}:${bindZero(minutes)}`;
  return returnDate;
};

const AssessmentReset: React.FC<IAssessmentReset> = ({ result, setResult, mutate }) => {
  const [scheduled_at, setScheduledAt] = React.useState<any>(null);
  const [buttonLoader, setButtonLoader] = React.useState<boolean>(false);

  const [modal, setModal] = React.useState(false);
  const closeModal = () => {
    setModal(false);
    setResult(null);
    setScheduledAt(null);
  };
  const openModal = () => setModal(true);

  const resetAssessmentUserData = async () => {
    setButtonLoader(true);
    let payload = {
      node_id: result?.id,
      data: {
        scheduled_at: new Date(scheduled_at),
        work_submission_data: null,
        score: 0,
        completed_at: null,
      },
    };

    UpdateResourceUserAllocation(payload)
      .then((res) => {
        setButtonLoader(false);
        mutate();
        closeModal();
      })
      .catch((err) => {
        setButtonLoader(false);
      });
  };

  React.useEffect(() => {
    if (result && result?.id) {
      setScheduledAt(result?.scheduled_at);
      openModal();
    }
  }, [result]);

  return (
    <div>
      <Modal
        size="lg"
        show={modal}
        onHide={closeModal}
        centered
        backdrop={"static"}
        style={{ zIndex: 999999 }}
      >
        <Modal.Body>
          <h5 className="m-0 p-0 mb-3">Reset Confirmation</h5>

          <div>
            <h5 className="tw-text-blue-500">Are you sure you want to reset the assessment.</h5>

            <div className="tw-my-4">
              <div>Scheduled At</div>
              <div>
                <Form.Control
                  type="datetime-local"
                  value={dateFormat(scheduled_at)}
                  onChange={(e) => setScheduledAt(e.target.value)}
                  required
                  placeholder="time"
                />
              </div>
            </div>

            <div className="tw-flex tw-justify-end tw-items-center tw-w-full tw-gap-3">
              <Button
                variant="outline-secondary"
                size="sm"
                className=""
                onClick={closeModal}
                disabled={buttonLoader}
              >
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                className=""
                onClick={resetAssessmentUserData}
                disabled={buttonLoader}
              >
                {buttonLoader ? `Resetting...` : `Continue`}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AssessmentReset;
