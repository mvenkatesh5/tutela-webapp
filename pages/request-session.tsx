import React from "react";
import { useRouter } from "next/router";
// constants
import { META_DESCRIPTION } from "@constants/page";
// react-bootstrap
import { Container, Row, Col, Form, Button } from "react-bootstrap";
// material icons
import { CalendarPlus } from "@styled-icons/boxicons-regular/CalendarPlus";
import { Calendar } from "@styled-icons/boxicons-regular/Calendar";
import { Time } from "@styled-icons/boxicons-regular/Time";
import { Times } from "@styled-icons/fa-solid/Times";
// date picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// components
import Page from "@components/page";
// layouts
import StudentLayout from "layouts/studentLayout";
// api services
import { RequestSessionCreate } from "@lib/services/userSessionService";
// cookie
import { getAuthenticationToken } from "@lib/cookie";
// hoc
import withStudentAuth from "@lib/hoc/withStudentAuth";
// global context provider
import { globalContext } from "@contexts/global";

const RequestSession = () => {
  const [globalState, globalDispatch] = React.useContext(globalContext);
  const router = useRouter();

  const meta = {
    title: "Request Session",
    description: META_DESCRIPTION,
  };

  const [tokenDetails, setTokenDetails] = React.useState<any>();
  React.useEffect(() => {
    if (getAuthenticationToken()) {
      let details: any = getAuthenticationToken();
      details = details ? JSON.parse(details) : null;
      if (details) {
        setTokenDetails(details);
      }
    }
  }, []);

  const [buttonLoader, setButtonLoader] = React.useState<any>(false);
  const [sessionData, setSessionData] = React.useState<any>({
    topic: "",
    data: [{ date: new Date(), time: new Date() }],
  });
  const handleSessionData = (key: any, value: any) => {
    setSessionData({ ...sessionData, [key]: value });
  };
  const handleSessionDataDate = (index: any, key: any, value: any) => {
    const payload = { ...sessionData };
    payload.data[index][key] = value;
    setSessionData(payload);
  };
  const addSessionDataDate = () => {
    const payload = { ...sessionData };
    payload.data.push({ date: new Date(), time: new Date() });
    setSessionData(payload);
  };
  const removeSessionDataDate = (index: any) => {
    const payload = { ...sessionData };
    payload.data.splice(index, 1);
    setSessionData(payload);
  };

  const sessionSubmit = (event: any) => {
    event.preventDefault();
    setButtonLoader(true);

    const payload = {
      topic: sessionData.topic,
      data: { dateTime: sessionData.data },
      user: tokenDetails && tokenDetails.user && tokenDetails.user.id,
    };

    RequestSessionCreate(payload)
      .then((response) => {
        setButtonLoader(false);
        globalDispatch({
          type: "ADD_TOAST_ALERT",
          payload: {
            kind: "success",
            heading: "success",
            description: `Request Session sent for approval.`,
          },
        });
        router.push("/student");
      })
      .catch((error) => {
        console.log(error);
        setButtonLoader(false);
        globalDispatch({
          type: "ADD_TOAST_ALERT",
          payload: {
            kind: "warning",
            heading: "warning",
            description: `Request Session not sent, please refresh and try again.`,
          },
        });
      });
  };

  return (
    <Page meta={meta}>
      <StudentLayout>
        <Container>
          <Row className="justify-content-center mt-4">
            <Col md={8}>
              <h4 className="fw-bolder mb-4">Request a Session</h4>
              <Form onSubmit={sessionSubmit}>
                <Form.Group controlId="session_data.email" className="mb-2">
                  <Form.Label className="text-secondary">
                    <small>Topic</small>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter topic"
                    value={sessionData.topic}
                    onChange={(e) => handleSessionData("topic", e.target.value)}
                  />
                </Form.Group>

                <Row className="mt-3 mb-2">
                  <Col>
                    <small className="text-secondary">Start date</small>
                  </Col>
                  <Col>
                    <small className="text-secondary">Start time</small>
                  </Col>
                  {sessionData.data.length != 1 && <Col xs={1} sm={1} md={1}></Col>}
                </Row>
                {sessionData &&
                  sessionData.data &&
                  sessionData.data.map((data: any, index: any) => (
                    <Row className="mb-2 align-items-center" key={`rquestiod-sessions-${index}`}>
                      <Col>
                        <div className="d-flex align-items-center custom-date-picker">
                          <div className="me-3 w-100">
                            <DatePicker
                              className="w-100 form-control custom-date-picker"
                              selected={data.date ? new Date(data.date) : new Date()}
                              onChange={(date: any) => handleSessionDataDate(index, "date", date)}
                            />
                          </div>
                          <div>
                            <Calendar width="18" />
                          </div>
                        </div>
                      </Col>
                      <Col>
                        <div className="d-flex align-items-center custom-date-picker">
                          <div className="me-3 w-100">
                            <DatePicker
                              className="form-control w-100"
                              selected={data.time ? new Date(data.time) : new Date()}
                              onChange={(date: any) => handleSessionDataDate(index, "time", date)}
                              showTimeSelect
                              showTimeSelectOnly
                              timeIntervals={15}
                              timeCaption="Time"
                              dateFormat="h:mm aa"
                            />
                          </div>
                          <div>
                            <Time width="18" />
                          </div>
                        </div>
                      </Col>
                      {sessionData.data.length != 1 && (
                        <Col xs={1} sm={1} md={1} onClick={() => removeSessionDataDate(index)}>
                          <div className="d-flex">
                            <div className="ms-auto" style={{ cursor: "pointer" }}>
                              <Times width="10" />
                            </div>
                          </div>
                        </Col>
                      )}
                    </Row>
                  ))}

                <div>
                  <small className="text-secondary">{sessionData.data.length} / 5</small>
                </div>

                {sessionData.data.length != 5 && (
                  <Button
                    variant="outline-primary"
                    className="mt-2 btn-sm"
                    onClick={addSessionDataDate}
                  >
                    <div className="d-flex align-items-center">
                      <div className="me-1">
                        <CalendarPlus width="18" />
                      </div>
                      <div>
                        <small>Add another date</small>
                      </div>
                    </div>
                  </Button>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  className="d-block ms-auto mt-3 btn-sm"
                  disabled={buttonLoader}
                >
                  {buttonLoader ? "Requesting session..." : "Request Session"}
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </StudentLayout>
    </Page>
  );
};

export default withStudentAuth(RequestSession);
