import React from "react";
// react bootstrap
import { OverlayTrigger, Tooltip, Button, Form, Modal } from "react-bootstrap";
// material icons
import { Schedule } from "@styled-icons/material-rounded/Schedule";
// swr
import { mutate } from "swr";
// api routes
import { USER_CALENDAR_SESSION_ENDPOINT } from "@constants/routes";
// api services
import { SessionDelete, BulkSessionDelete } from "@lib/services/sessionservice";

const SessionRescheduleView = (props: any) => {
  const [modal, setModal] = React.useState(false);
  const closeModal = () => setModal(false);
  const openModal = () => setModal(true);

  const [buttonLoader, setButtonLoader] = React.useState<any>(false);

  const sessionDelete = (event: any, bulk_delete: any) => {
    event.preventDefault();
    setButtonLoader(true);
    if (bulk_delete != "bulk") {
      SessionDelete(props.data.id)
        .then((res) => {
          mutate(
            [USER_CALENDAR_SESSION_ENDPOINT(props.currentDateQuery), props.currentDateQuery],
            async (elements: any) => {
              let index = elements.findIndex((mutateData: any) => mutateData.id === props.data.id);
              return elements.filter((oldElement: any, i: any) => i != index);
            },
            false
          );
          closeModal();
          setButtonLoader(false);
        })
        .catch((errors) => {
          console.log(errors);
          setButtonLoader(false);
        });
    } else {
      const payload: any = {
        key: props.data.key,
      };
      BulkSessionDelete(payload)
        .then((res) => {
          mutate(
            [USER_CALENDAR_SESSION_ENDPOINT(props.currentDateQuery), props.currentDateQuery],
            async (elements: any) => {
              let index = elements.findIndex((mutateData: any) => mutateData.id === props.data.id);
              return elements.filter((oldElement: any, i: any) => i != index);
            },
            false
          );
          closeModal();
          setButtonLoader(false);
        })
        .catch((errors) => {
          console.log(errors);
          setButtonLoader(false);
        });
    }
  };

  const validateSessionSuspend = (details: any) => {
    if (details) {
      if (details.sessionSuspend) return false;
      return true;
    }
    return true;
  };

  return (
    <div>
      <OverlayTrigger
        key={`bottom`}
        placement={`bottom`}
        overlay={<Tooltip id={`tooltip-bottom`}>Reschedule Session</Tooltip>}
      >
        <div className="session-detail-redirection" onClick={openModal}>
          <Schedule width="18" />
        </div>
      </OverlayTrigger>

      <Modal show={modal} onHide={closeModal} centered backdrop={"static"}>
        <Modal.Body>
          <h5>Session Delete</h5>
          <Form>
            <h6 className="mt-4 mb-4">
              Are you sure to delete this session <strong>"{props.data.title}"</strong>
            </h6>
            <Button
              variant="outline-primary"
              className="btn-sm"
              style={{ marginRight: "10px" }}
              disabled={buttonLoader}
              onClick={(e: any) => sessionDelete(e, "single")}
            >
              {buttonLoader ? "Processing..." : `Delete this Event`}
            </Button>
            {props.data.key != "none" && (
              <Button
                variant="outline-primary"
                className="btn-sm"
                style={{ marginRight: "10px" }}
                disabled={buttonLoader}
                onClick={(e: any) => sessionDelete(e, "bulk")}
              >
                {buttonLoader ? "Processing..." : "Delete all recurring events"}
              </Button>
            )}
            <Button variant="outline-secondary" className="btn-sm" onClick={closeModal}>
              Close
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Form></Form>
    </div>
  );
};

export default SessionRescheduleView;
