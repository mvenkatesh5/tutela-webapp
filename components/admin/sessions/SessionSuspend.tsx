import React from "react";
// react bootstrap
import { OverlayTrigger, Tooltip, Button, Form, Modal } from "react-bootstrap";
// material icons
import { Stop } from "@styled-icons/boxicons-regular/Stop";
// swr
import { mutate } from "swr";
// api routes
import { USER_CALENDAR_SESSION_ENDPOINT } from "@constants/routes";
// api services
import { SessionUpdate } from "@lib/services/sessionservice";

const SessionSuspendView = (props: any) => {
  const [modal, setModal] = React.useState(false);
  const closeModal = () => setModal(false);
  const openModal = () => setModal(true);

  const [buttonLoader, setButtonLoader] = React.useState<any>(false);

  const sessionDelete = (e: any) => {
    e.preventDefault();
    setButtonLoader(true);

    const payload: any = {
      id: props.data.id,
      details: {
        sessionSuspend:
          props.data.details && props.data.details.sessionSuspend
            ? !props.data.details.sessionSuspend
            : true,
        sessionReschedule:
          props.data.details && props.data.details.sessionReschedule
            ? props.data.details.sessionReschedule
            : "",
      },
    };

    SessionUpdate(payload)
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
        overlay={
          <Tooltip id={`tooltip-bottom`}>
            {!validateSessionSuspend(props.data.details) ? "UnSuspend " : "Suspend "}Session
          </Tooltip>
        }
      >
        <div className="session-detail-redirection" onClick={openModal}>
          <Stop width="30" />
        </div>
      </OverlayTrigger>

      <Modal show={modal} onHide={closeModal} centered backdrop={"static"}>
        <Modal.Body>
          <h5>Session Suspend</h5>
          <Form>
            <h6 className="mt-4 mb-4">
              Are you sure to
              <strong className="text-primary">
                {!validateSessionSuspend(props.data.details) ? " UnSuspend " : " Suspend "}
              </strong>
              this session {`"`}
              <strong>{props.data.title}</strong>
              {`"`}
            </h6>
            <Button
              variant="outline-primary"
              className="btn-sm"
              style={{ marginRight: "10px" }}
              disabled={buttonLoader}
              onClick={sessionDelete}
            >
              {buttonLoader
                ? "Processing..."
                : `${
                    !validateSessionSuspend(props.data.details) ? "UnSuspend" : "Suspend"
                  } this Event`}
            </Button>
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

export default SessionSuspendView;
