import React from "react";
// react bootstrap
import { Button, Form, Modal } from "react-bootstrap";
// material icons
import { Edit } from "@styled-icons/entypo/Edit";
// swr
import { mutate } from "swr";
// components
import SessionForm from "./sessionForm";
import SessionUser from "./sessionUser";
// api routes
import { USER_CALENDAR_SESSION_ENDPOINT } from "@constants/routes";
// api services
import { SessionUpdate, SessionUserCreate, SessionUserDelete } from "@lib/services/sessionservice";

const SessionEditView = (props: any) => {
  const [modal, setModal] = React.useState(false);
  const closeModal = () => setModal(false);
  const openModal = () => setModal(true);

  const [buttonLoader, setButtonLoader] = React.useState<any>(false);

  const [sessionData, setSessionData] = React.useState<any>();
  const handleSessionData = (value: any) => {
    setSessionData(value);
  };
  const handleSessionListeners = (key: any, value: any) => {
    setSessionData({ ...sessionData, [key]: value });
  };

  React.useEffect(() => {
    if (props.data) {
      setSessionData(props.data);
    }
  }, [props.data]);

  const sessionUpdate = (event: any) => {
    event.preventDefault();
    setButtonLoader(true);
    createSessionUsers();
    SessionUpdate(sessionData)
      .then((res) => {
        mutate(
          [USER_CALENDAR_SESSION_ENDPOINT(props.currentDateQuery), props.currentDateQuery],
          async (elements: any) => {
            let index = elements.findIndex((mutateData: any) => mutateData.id === res.id);
            return elements.map((oldElement: any, i: Number) => (i === index ? res : oldElement));
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

  const createSessionUsers = () => {
    let listeners: any = sessionData.listeners;
    let existingListeners: any = [];
    let teachers: any = sessionData.teachers;
    let existingTeachers: any = [];
    let createUsers: any = [];
    let createTeachers: any = [];
    let deleteUsers: any = [];

    let usersData: any = [];

    props.data.session_users.map((data: any) => {
      // users
      if (data.as_role === 0) {
        existingListeners.push(data);
      }
      // teachers
      if (data.as_role === 1) {
        existingTeachers.push(data);
      }
    });

    if (listeners && listeners.length > 0) {
      listeners.map((data: any) => {
        let index: any = existingListeners.findIndex(
          (element: any, i: any) => parseInt(element.user.id) === parseInt(data)
        );
        if (index < 0) {
          createUsers.push(data);
        }
      });
    }

    if (teachers && teachers.length > 0) {
      teachers.map((data: any) => {
        let index: any = existingTeachers.findIndex(
          (element: any, i: any) => parseInt(element.user.id) === parseInt(data)
        );
        if (index < 0) {
          createTeachers.push(data);
        }
      });
    }

    if (existingListeners && existingListeners.length > 0 && listeners && listeners.length > 0) {
      existingListeners.map((data: any) => {
        if (!listeners.includes(data.user.id.toString())) {
          deleteUsers.push(data.id);
        }
      });
    }

    if (existingTeachers && existingTeachers.length > 0 && teachers && teachers.length > 0) {
      existingTeachers.map((data: any) => {
        if (!teachers.includes(data.user.id.toString())) {
          deleteUsers.push(data.id);
        }
      });
    }

    createUsers.map((data: any) => {
      const payload = {
        as_role: 0,
        session: props.data.id,
        user: parseInt(data),
      };
      usersData.push(payload);
    });

    createTeachers.map((data: any) => {
      const payload = {
        as_role: 1,
        session: props.data.id,
        user: parseInt(data),
      };
      usersData.push(payload);
    });

    if (usersData && usersData.length > 0) {
      usersData.map((data: any) => {
        SessionUserCreate(data)
          .then((res) => {})
          .catch((errors) => {
            console.log(errors);
          });
      });
    }

    if (deleteUsers && deleteUsers.length > 0) {
      deleteUsers.map((data: any) => {
        SessionUserDelete(data)
          .then((res) => {})
          .catch((errors) => {
            console.log(errors);
          });
      });
    }
  };

  return (
    <div>
      <Button variant="outline-secondary" className="btn-sm" onClick={openModal}>
        <Edit width="20" />
      </Button>

      <Modal show={modal} onHide={closeModal} centered backdrop={"static"}>
        <Modal.Body>
          <h5>Session Edit</h5>
          <Form onSubmit={sessionUpdate}>
            {sessionData && (
              <div>
                <SessionForm data={sessionData} handleData={handleSessionData} />
                <SessionUser
                  data={sessionData}
                  users={props.users}
                  handleData={handleSessionListeners}
                  handleSessionData={setSessionData}
                />
                <Button
                  variant="outline-primary"
                  className="btn-sm"
                  type="submit"
                  style={{ marginRight: "10px" }}
                  disabled={buttonLoader}
                >
                  {buttonLoader ? "Updating Session..." : "Update Session"}
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
