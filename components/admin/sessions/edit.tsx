import React from "react";
// react bootstrap
import { Button, Form, Modal } from "react-bootstrap";
// swr
import { mutate } from "swr";
// components
import SessionForm from "./sessionForm";
// api routes
import { SESSION_ENDPOINT } from "@constants/routes";
// api services
import { SessionUpdate } from "@lib/services/sessionservice";

const SessionEditView = (props: any) => {
  const [modal, setModal] = React.useState(false);
  const closeModal = () => setModal(false);
  const openModal = () => setModal(true);

  const [sessionData, setSessionData] = React.useState();
  const handleSessionData = (value: any) => {
    setSessionData(value);
  };

  React.useEffect(() => {
    if (props.data) {
      setSessionData(props.data);
    }
  }, [props.data]);

  const sessionUpdate = (event: any) => {
    event.preventDefault();
    SessionUpdate(sessionData)
      .then((res) => {
        mutate(
          SESSION_ENDPOINT,
          async (elements: any) => {
            let index = elements.findIndex((mutateData: any) => mutateData.id === res.id);
            return elements.map((oldElement: any, i: Number) => (i === index ? res : oldElement));
            // return elements.filter((oldElement: any, i) => i != index);
          },
          false
        );
        closeModal();
      })
      .catch((errors) => {
        console.log(errors);
      });
  };

  return (
    <div>
      <Button variant="primary" className="btn-sm" onClick={openModal}>
        Edit Session
      </Button>

      <Modal show={modal} onHide={closeModal} centered backdrop={"static"}>
        <Modal.Body>
          <Form onSubmit={sessionUpdate}>
            {sessionData && (
              <div>
                <SessionForm data={sessionData} handleData={handleSessionData} />
                <Button
                  variant="outline-primary"
                  className="btn-sm"
                  type="submit"
                  style={{ marginRight: "10px" }}
                >
                  Update Session
                </Button>
                <Button variant="outline-secondary" className="btn-sm" onClick={closeModal}>
                  Close
                </Button>
              </div>
            )}
          </Form>
        </Modal.Body>
      </Modal>
      <Form></Form>
    </div>
  );
};

export default SessionEditView;
