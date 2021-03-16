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
          <Form.Group className="mb-2">
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
          </Form.Group>

          <Form.Group className="mb-3">
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
                  <Form.Group className="mb-3">
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
                      />
                    </div>
                  </Form.Group>
                </Col>
                {props.view_end_date && (
                  <Col>
                    <Form.Group className="mb-3">
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
                        />
                      </div>
                    </Form.Group>
                  </Col>
                )}
              </Row>

              <Row>
                <Col>
                  <Form.Group className="mb-3">
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
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                      />
                    </div>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
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
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                      />
                    </div>
                  </Form.Group>
                </Col>
              </Row>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SessionFormView;
