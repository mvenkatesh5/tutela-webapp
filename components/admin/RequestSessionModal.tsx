import React from "react";
// react bootstrap
import { Container, Modal, Button } from "react-bootstrap";
// swr
import { mutate } from "swr";
// components
import SessionCreateView from "@components/admin/RequestSessionModalCreateSession";
// cookie
import { getAuthenticationToken } from "@lib/cookie";
// api routes
import { REQUEST_SESSION_WITH_STATE_ENDPOINT } from "@constants/routes";
// api services
import { RequestSessionUpdate } from "@lib/services/userSessionService";

const RequestedSessionModal = (props: any) => {
  const [userRole, setUserRole] = React.useState<any>();
  const [tokenDetails, setTokenDetails] = React.useState<any>();
  React.useEffect(() => {
    if (getAuthenticationToken()) {
      let details: any = getAuthenticationToken();
      details = details ? JSON.parse(details) : null;
      if (details) {
        setTokenDetails(details);
        if (details.info.role === 2) setUserRole("admin");
        else if (details.info.role === 1) setUserRole("teacher");
        else setUserRole("student");
      }
    }
  }, []);

  const [modal, setModal] = React.useState<boolean>(false);
  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  const [sessionLoader, setSessionLoader] = React.useState<boolean>(false);
  const updateSession = (session_id: any) => {
    setSessionLoader(true);
    let payload = {
      id: props.data.id,
      state: "SUCCESS",
      session_id: session_id,
    };
    RequestSessionUpdate(payload)
      .then((response) => {
        setSessionLoader(false);
        mutate([REQUEST_SESSION_WITH_STATE_ENDPOINT("NEW"), "NEW"]);
        closeModal();
      })
      .catch((error) => {
        setSessionLoader(false);
      });
  };

  const [rejectLoader, setRejectLoader] = React.useState<boolean>(false);
  const rejectSession = () => {
    setRejectLoader(true);
    let payload = {
      id: props.data.id,
      state: "REJECTED",
    };
    RequestSessionUpdate(payload)
      .then((response) => {
        setRejectLoader(false);
        mutate([REQUEST_SESSION_WITH_STATE_ENDPOINT("NEW"), "NEW"]);
        closeModal();
      })
      .catch((error) => {
        setRejectLoader(false);
      });
  };

  return (
    <div>
      <div onClick={openModal}>{props.children}</div>
      <Modal show={modal} onHide={closeModal} centered backdrop={"static"}>
        <Modal.Body>
          <Container>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="m-0 p-0">Manage Sessions</h5>
              <div style={{ cursor: "pointer" }} onClick={closeModal}>
                Close
              </div>
            </div>
            <SessionCreateView
              users={props.userList}
              handleLoader={setSessionLoader}
              updateSession={updateSession}
              currentDate={props.currentDate}
              role={userRole}
              user={props.data.user}
            />
            <Button className="btn-sm ms-3" onClick={rejectSession} disabled={rejectLoader}>
              {rejectLoader ? "Rejecting..." : "Reject the request"}
            </Button>
          </Container>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default RequestedSessionModal;
