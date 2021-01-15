import React from "react";
// react bootstrap
import { Button, Form, Modal } from "react-bootstrap";
// material icons
import { CalendarPlus } from "@styled-icons/boxicons-regular";
// swr
import { mutate } from "swr";
// components
import SessionForm from "./sessionForm";
// api routes
import { SESSION_ENDPOINT } from "@constants/routes";
// api services
import { SessionCreate } from "@lib/services/sessionservice";

const SessionCreateView = () => {
  const [modal, setModal] = React.useState(false);
  const closeModal = () => {
    setModal(false);
    setSessionData({
      title: "",
      description: "",
      datetime: "",
      link: "https://us02web.zoom.us/s/82567434735?pwd=NXBydUQ0RlE3NGdGcHZFZmNwdkFxUT09",
      data: {},
    });
  };
  const openModal = () => setModal(true);

  const [sessionData, setSessionData] = React.useState({
    title: "",
    description: "",
    datetime: "",
    link: "https://us02web.zoom.us/s/82567434735?pwd=NXBydUQ0RlE3NGdGcHZFZmNwdkFxUT09",
    data: {},
  });
  const handleSessionData = (value: any) => {
    setSessionData(value);
  };

  const sessionCreate = (event: any) => {
    event.preventDefault();
    console.log(sessionData);

    const payload = {
      title: sessionData.title,
      description: sessionData.description,
      datetime: new Date(sessionData.datetime),
      link: sessionData.link,
      data: sessionData.data,
    };

    SessionCreate(payload)
      .then((res) => {
        console.log(res);
        mutate(
          SESSION_ENDPOINT,
          async (elements: any) => {
            return [...elements, res];
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
        <div className="d-flex justify-items-center">
          <div style={{ width: "18px", marginRight: "8px" }}>
            <CalendarPlus />
          </div>
          <div>Schedule Sessions</div>
        </div>
      </Button>

      <Modal show={modal} onHide={closeModal} centered backdrop={"static"}>
        <Modal.Body>
          <Form onSubmit={sessionCreate}>
            <SessionForm data={sessionData} handleData={handleSessionData} />
            <Button
              variant="outline-primary"
              className="btn-sm"
              type="submit"
              style={{ marginRight: "10px" }}
            >
              Create Sessions
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

export default SessionCreateView;
