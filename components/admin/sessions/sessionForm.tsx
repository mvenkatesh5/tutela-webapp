import React from "react";
// react bootstrap
import { Form, Row, Col } from "react-bootstrap";
// material icons
import { Text } from "@styled-icons/evaicons-solid";
import { Text as TextDescription } from "@styled-icons/entypo";
import { DateRange } from "@styled-icons/material";
import { Time } from "@styled-icons/boxicons-regular/Time";
// date picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// global imports
import { dateTimeFormat } from "@constants/global";

const SessionFormView = (props: any) => {
  const [formPayload, setFormPayload] = React.useState(Object);
  const handleFormPayload = (key: any, value: any) => {
    setFormPayload({ ...formPayload, [key]: value });
    props.handleData({ ...formPayload, [key]: value });
  };

  React.useEffect(() => {
    if (props.data) {
      setFormPayload(props.data);
    }
  }, [props.data]);

  const handleFormDate = (date: any) => {
    if (date && new Date(date)) {
      date = dateTimeFormat(date);
    }
    return date;
  };

  return (
    <div>
      {formPayload && (
        <div>
          <Form.Group className="mb-2" controlId="session-create-title">
            <Form.Label className="mb-1 text-muted">
              <Text style={{ width: "16px", marginRight: "8px", marginTop: "-2px" }} />
              Title
            </Form.Label>
            <Form.Control
              type="text"
              value={formPayload.title}
              onChange={(e) => handleFormPayload("title", e.target.value)}
              required
            />
            <div className="d-flex align-items-center gap-2 mt-2">
              <Form.Check
                name="schedule-session-check"
                type="radio"
                label="Online"
                id="weekend"
                value="ONLINE"
                onChange={(e) => handleFormPayload("kind", "ONLINE")}
                checked={formPayload.kind === "ONLINE"}
              />
              <Form.Check
                name="schedule-session-check"
                type="radio"
                label="Offline"
                id="weekend"
                value="OFFLINE"
                onChange={(e) => handleFormPayload("kind", "OFFLINE")}
                checked={formPayload.kind === "OFFLINE"}
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="session-create-description">
            <Form.Label className="mb-1 text-muted">
              <TextDescription style={{ width: "16px", marginRight: "8px", marginTop: "-2px" }} />
              Description
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={formPayload.description}
              onChange={(e) => handleFormPayload("description", e.target.value)}
              required
            />
          </Form.Group>

          {props.role === "admin" && (
            <div>
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
                          formPayload.start_date ? new Date(formPayload.start_date) : new Date()
                        }
                        onChange={(date: any) => handleFormPayload("start_date", date)}
                        disabled={props.disabled ? props.disabled : false}
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
                            formPayload.end_date ? new Date(formPayload.end_date) : new Date()
                          }
                          onChange={(date: any) => handleFormPayload("end_date", date)}
                          disabled={props.disabled ? props.disabled : false}
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
                          formPayload.start_time ? new Date(formPayload.start_time) : new Date()
                        }
                        onChange={(date: any) => handleFormPayload("start_time", date)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={5}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                        disabled={props.disabled ? props.disabled : false}
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
                          formPayload.end_time ? new Date(formPayload.end_time) : new Date()
                        }
                        onChange={(date: any) => handleFormPayload("end_time", date)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={5}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                        disabled={props.disabled ? props.disabled : false}
                      />
                    </div>
                  </Form.Group>
                </Col>
              </Row>
              <div className="mb-2">
                {!props.disabled && (
                  <Form.Text className="text-info">
                    Click the{" "}
                    <strong>
                      reschedule session <Time width="16" />
                    </strong>{" "}
                    to update new date and time of this event.
                  </Form.Text>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SessionFormView;
