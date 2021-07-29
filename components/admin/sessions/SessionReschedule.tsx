import React from "react";
// react bootstrap
import { OverlayTrigger, Tooltip, Button, Form, Modal, Row, Col } from "react-bootstrap";
// material icons
import { Schedule } from "@styled-icons/material-rounded/Schedule";
import { DateRange } from "@styled-icons/material";
import { Time } from "@styled-icons/boxicons-regular/Time";
// date picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// swr
import { mutate } from "swr";
// api routes
import { USER_CALENDAR_SESSION_ENDPOINT } from "@constants/routes";
// api services
import { SessionCreate, SessionUpdate, SessionBulkUserCreate } from "@lib/services/sessionservice";
import { APIFetcher } from "@lib/services";

const SessionRescheduleView = (props: any) => {
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
        start_date: props.data.start_datetime ? new Date(props.data.start_datetime) : new Date(),
        end_date: props.data.end_datetime ? new Date(props.data.end_datetime) : new Date(),
        start_time: props.data.start_datetime ? new Date(props.data.start_datetime) : new Date(),
        end_time: props.data.end_datetime ? new Date(props.data.end_datetime) : new Date(),
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

  const sessionReschedule = (event: any) => {
    event.preventDefault();
    setButtonLoader(true);

    const payload = {
      id: sessionData.id,
      details: {
        sessionSuspend:
          props.data.details && props.data.details.sessionSuspend
            ? props.data.details.sessionSuspend
            : false,
        sessionReschedule: {
          toggle: true,
          scheduledOn: {
            start_datetime: handleDatetime(sessionData.start_date, sessionData.start_time),
            end_datetime: handleDatetime(sessionData.start_date, sessionData.end_time),
          },
        },
      },
    };

    SessionUpdate(payload)
      .then((res) => {
        sessionCreate();
      })
      .catch((errors) => {
        console.log(errors);
        setButtonLoader(false);
      });
  };

  const sessionCreate = () => {
    setButtonLoader(true);

    const payload = {
      title: props.data.title,
      description: props.data.description,
      start_datetime: handleDatetime(sessionData.start_date, sessionData.start_time),
      end_datetime: handleDatetime(sessionData.start_date, sessionData.end_time),
    };

    SessionCreate(payload)
      .then((res) => {
        createSessionUsers(res);
        setButtonLoader(false);
      })
      .catch((errors) => {
        console.log(errors);
        setButtonLoader(false);
      });
  };

  const createSessionUsers = (session: any) => {
    setButtonLoader(true);
    let currentUsers: any = [];

    if (props.data && props.data.session_users && props.data.session_users.length > 0) {
      props.data.session_users.map((users: any) => {
        const data = {
          as_role: users.as_role,
          session: session.id,
          user: parseInt(users.user.id),
        };
        currentUsers.push(data);
      });
    }

    if (currentUsers && currentUsers.length > 0) {
      SessionBulkUserCreate(currentUsers)
        .then((res) => {
          mutate(
            [USER_CALENDAR_SESSION_ENDPOINT(props.currentDateQuery), props.currentDateQuery],
            APIFetcher(USER_CALENDAR_SESSION_ENDPOINT(props.currentDateQuery)),
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
      mutate(
        [USER_CALENDAR_SESSION_ENDPOINT(props.currentDateQuery), props.currentDateQuery],
        async (elements: any) => {
          return [...elements, session];
        },
        false
      );
      closeModal();
      setButtonLoader(false);
    }
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
          <h5 className="mb-3">Session Reschedule</h5>
          {sessionData && (
            <Form>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="session-create-start-date">
                    <Form.Label className="mb-1 text-muted">
                      <DateRange style={{ width: "16px", marginRight: "8px", marginTop: "-2px" }} />
                      Start Date
                    </Form.Label>
                    <div>
                      <DatePicker
                        className="form-control w-100"
                        selected={
                          sessionData.start_date ? new Date(sessionData.start_date) : new Date()
                        }
                        onChange={(date: any) => handleSessionListeners("start_date", date)}
                      />
                    </div>
                  </Form.Group>
                </Col>
                {props.view_end_date && (
                  <Col>
                    <Form.Group className="mb-3" controlId="session-create-end-date">
                      <Form.Label className="mb-1 text-muted">
                        <DateRange
                          style={{ width: "16px", marginRight: "8px", marginTop: "-2px" }}
                        />
                        End Date
                      </Form.Label>
                      <div>
                        <DatePicker
                          className="form-control w-100"
                          selected={
                            sessionData.end_date ? new Date(sessionData.end_date) : new Date()
                          }
                          onChange={(date: any) => handleSessionListeners("end_date", date)}
                        />
                      </div>
                    </Form.Group>
                  </Col>
                )}
              </Row>

              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="session-create-start-time">
                    <Form.Label className="mb-1 text-muted">
                      <Time style={{ width: "16px", marginRight: "8px", marginTop: "-2px" }} />
                      Start Time
                    </Form.Label>
                    <div>
                      <DatePicker
                        className="form-control w-100"
                        selected={
                          sessionData.start_time ? new Date(sessionData.start_time) : new Date()
                        }
                        onChange={(date: any) => handleSessionListeners("start_time", date)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={5}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                      />
                    </div>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="session-create-end-tile">
                    <Form.Label className="mb-1 text-muted">
                      <Time style={{ width: "16px", marginRight: "8px", marginTop: "-2px" }} />
                      End Time
                    </Form.Label>
                    <div>
                      <DatePicker
                        className="form-control w-100"
                        selected={
                          sessionData.end_time ? new Date(sessionData.end_time) : new Date()
                        }
                        onChange={(date: any) => handleSessionListeners("end_time", date)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={5}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                      />
                    </div>
                  </Form.Group>
                </Col>
              </Row>

              <Button
                variant="outline-primary"
                className="btn-sm"
                style={{ marginRight: "10px" }}
                disabled={buttonLoader}
                onClick={sessionReschedule}
              >
                {buttonLoader ? "Processing..." : "Reschedule this event"}
              </Button>

              <Button variant="outline-secondary" className="btn-sm" onClick={closeModal}>
                Close
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
      <Form></Form>
    </div>
  );
};

export default SessionRescheduleView;
