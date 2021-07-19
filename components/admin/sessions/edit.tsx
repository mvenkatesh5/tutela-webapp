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
import { APIFetcher } from "@lib/services";
import {
  SessionWithoutIdUpdate,
  SessionBulkUpdate,
  SessionBulkUserCreate,
  SessionBulkUserDelete,
} from "@lib/services/sessionservice";

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
      setSessionData({
        ...sessionData,
        id: props.data.id,
        title: props.data.title,
        description: props.data.description,
        start_date: props.data.start_datetime ? new Date(props.data.start_datetime) : new Date(),
        end_date: props.data.end_datetime ? new Date(props.data.end_datetime) : new Date(),
        start_time: props.data.start_datetime ? new Date(props.data.start_datetime) : new Date(),
        end_time: props.data.end_datetime ? new Date(props.data.end_datetime) : new Date(),
        link: props.data.link,
        data: props.data.data,
        session_users: props.data.session_users,
      });
    }
  }, [props.data]);

  const handleDatetime = (date: any, time: any) => {
    let currentDate = new Date(date);
    let currentTime = new Date(time);
    currentDate.setHours(currentTime.getHours());
    currentDate.setMinutes(currentTime.getMinutes());
    currentDate.setSeconds(currentTime.getSeconds());
    return new Date(currentDate);
  };

  const sessionUpdate = (eventKey: any) => {
    setButtonLoader(true);

    let users: any = [];

    if (sessionData.listeners && sessionData.listeners.length > 0)
      sessionData.listeners.map((userData: any) => {
        const payload = {
          as_role: 0,
          user: parseInt(userData),
        };
        users.push(payload);
      });

    if (sessionData.teachers && sessionData.teachers.length > 0)
      sessionData.teachers.map((userData: any) => {
        const payload = {
          as_role: 1,
          user: parseInt(userData),
        };
        users.push(payload);
      });

    if (props.data && props.data.key === "none" && eventKey === "single") {
      const SessionIdPayload = {
        session_id: sessionData.id,
        title: sessionData.title,
        description: sessionData.description,
        populate: "single",
        start_datetime: handleDatetime(sessionData.start_date, sessionData.start_time),
        end_datetime: handleDatetime(sessionData.start_date, sessionData.end_time),
        users: users,
      };

      SessionWithoutIdUpdate(SessionIdPayload)
        .then((response) => {
          mutateCurrentSession();
          setButtonLoader(false);
        })
        .catch((errors) => {
          console.log(errors);
          setButtonLoader(false);
        });
    } else {
      const SessionKeyPayload = {
        key: props.data.key,
        title: sessionData.title,
        description: sessionData.description,
        start_datetime: handleDatetime(sessionData.start_date, sessionData.start_time),
        end_datetime: handleDatetime(sessionData.start_date, sessionData.end_time),
        populate: "multiple",
        users: users,
      };

      SessionBulkUpdate(SessionKeyPayload)
        .then((response) => {
          mutateCurrentSession();
          setButtonLoader(false);
        })
        .catch((errors) => {
          console.log(errors);
          setButtonLoader(false);
        });
    }
  };

  const mutateCurrentSession = () => {
    mutate(
      [USER_CALENDAR_SESSION_ENDPOINT(props.currentDateQuery), props.currentDateQuery],
      APIFetcher(USER_CALENDAR_SESSION_ENDPOINT(props.currentDateQuery)),
      false
    );
    closeModal();
    setButtonLoader(false);
  };

  return (
    <div>
      <Button variant="outline-secondary" className="btn-sm" onClick={openModal}>
        <Edit width="20" />
      </Button>

      <Modal show={modal} onHide={closeModal} centered backdrop={"static"}>
        <Modal.Body>
          <h5>Session Edit</h5>
          <Form>
            {sessionData && (
              <div>
                <SessionForm data={sessionData} handleData={handleSessionData} role={props.role} />
                {props.role === "admin" && (
                  <SessionUser
                    data={sessionData}
                    users={props.users}
                    handleData={handleSessionListeners}
                    handleSessionData={setSessionData}
                  />
                )}

                <Button
                  variant="outline-primary"
                  className="btn-sm"
                  style={{ marginRight: "10px" }}
                  disabled={buttonLoader}
                  onClick={(e: any) => sessionUpdate("single")}
                >
                  {buttonLoader ? "Processing..." : `Update Session`}
                </Button>

                {props.data.key != "none" && (
                  <Button
                    variant="outline-primary"
                    className="btn-sm"
                    style={{ marginRight: "10px" }}
                    disabled={buttonLoader}
                    onClick={(e: any) => sessionUpdate("bulk")}
                  >
                    {buttonLoader ? "Processing..." : "Update all recurring events"}
                  </Button>
                )}

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
