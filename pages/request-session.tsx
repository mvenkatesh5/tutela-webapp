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
    date: "",
    time: "",
  });
  const handleSessionData = (key: any, value: any) => {
    setSessionData({ ...sessionData, [key]: value });
  };

  const handleDatetime = (date: any, time: any) => {
    let currentDate = new Date(date);
    let currentTime = new Date(time);
    currentDate.setHours(currentTime.getHours());
    currentDate.setMinutes(currentTime.getMinutes());
    currentDate.setSeconds(currentTime.getSeconds());
    return new Date(currentDate);
  };

  const sessionSubmit = (event: any) => {
    event.preventDefault();
    setButtonLoader(true);

    const payload = {
      topic: sessionData.topic,
      datetime: handleDatetime(sessionData.date, sessionData.time),
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
            description: `Session created successfully.`,
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
            description: `Session request is not successful.`,
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
                  <Form.Label>Date</Form.Label>
                  <br />
                  <DatePicker
                    className="form-control w-100"
                    selected={sessionData.date ? new Date(sessionData.date) : new Date()}
                    onChange={(date: any) => handleSessionData("date", date)}
                  />
                </Form.Group>

                <Form.Group controlId="session_data.time" className="mb-2">
                  <Form.Label>Time</Form.Label>
                  <br />
                  <DatePicker
                    className="form-control w-100"
                    selected={sessionData.time ? new Date(sessionData.time) : new Date()}
                    onChange={(date: any) => handleSessionData("time", date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                  />
                </Form.Group>

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
