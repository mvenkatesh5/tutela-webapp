import React from "react";
import { useRouter } from "next/router";
// constants
import { META_DESCRIPTION } from "@constants/page";
// react-bootstrap
import { Container, Row, Col, Form, Button } from "react-bootstrap";
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
    title: "Tutela",
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
                  <Form.Label>Topic</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter topic"
                    value={sessionData.topic}
                    onChange={(e) => handleSessionData("topic", e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="session_data.date" className="mb-2">
                  <Form.Label>Select Date and Time</Form.Label>
                  <br />
                  {sessionData &&
                    sessionData.data &&
                    sessionData.data.map((data: any, index: any) => (
                      <Row className="mb-2" key={`rquestiod-sessions-${index}`}>
                        <Col md={3}>Date Time</Col>
                        <Col>
                          <DatePicker
                            className="form-control w-100"
                            selected={data.date ? new Date(data.date) : new Date()}
                            onChange={(date: any) => handleSessionDataDate(index, "date", date)}
                          />
                        </Col>
                        <Col>
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
                        </Col>
                        {sessionData.data.length != 1 && (
                          <Col
                            xs={1}
                            sm={1}
                            md={1}
                            style={{ cursor: "pointer" }}
                            onClick={() => removeSessionDataDate(index)}
                          >
                            X
                          </Col>
                        )}
                      </Row>
                    ))}
                </Form.Group>

                <div>
                  <small>{sessionData.data.length} / 5</small>
                </div>

                {sessionData.data.length != 5 && (
                  <Button
                    variant="outline-primary"
                    className="mt-2 btn-sm"
                    onClick={addSessionDataDate}
                  >
                    Add New Date
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
