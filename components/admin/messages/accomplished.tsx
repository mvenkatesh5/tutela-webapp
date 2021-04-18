import React from "react";
// react bootstrap
import { Table, Row, Col, Card, Form } from "react-bootstrap";
// global imports
import { datePreview } from "@constants/global";

const Accomplished = (props: any) => {
  const handleAccomplishedData = (id: any) => {
    let payload: any = { is_accomplished: false };
    payload["id"] = id;
    props.handleEdit(payload);
  };

  const validateUserName = (user_id: any) => {
    if (props.allUsers && props.allUsers.length > 0) {
      const currentUser: any = props.allUsers.find((data: any) => data.id === parseInt(user_id));
      if (currentUser) {
        return (
          <div>
            <strong>{currentUser.first_name}</strong>
            <br />
            <small className="text-secondary">{currentUser.email}</small>
          </div>
        );
      } else {
        return "-";
      }
    }
    return user_id;
  };

  return (
    <div>
      <Card className="border-0">
        <Card.Body>
          <Row className="align-items-center">
            <Col md={1}>
              <small className="text-secondary">#</small>
            </Col>
            <Col>
              <small className="text-secondary">MESSAGE</small>
            </Col>
            <Col md={3}>
              <small className="text-secondary">STUDENT</small>
            </Col>
            <Col md={3}>
              <small className="text-secondary">TEACHER</small>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {props.data && props.data.length > 0 ? (
        <div>
          {props.data.map((message: any, i: any) => {
            if (message.is_accomplished) {
              return (
                <Card key={`message-table-row${i}`} className="mb-2">
                  {console.log(message)}
                  <Card.Body className="p-2 ps-3 pe-3">
                    <Row>
                      <Col md={1}>
                        <Form.Check
                          type="checkbox"
                          id={`message-not-accomplished-checkbox-${message.id}`}
                          value={message.is_accomplished}
                          onChange={(e) => handleAccomplishedData(message.id)}
                          checked={message.is_accomplished === true}
                        />
                      </Col>
                      <Col>
                        <s>{message.text}</s>
                      </Col>
                      <Col md={3}>
                        <div className="d-flex align-items-center">
                          <div
                            style={{
                              width: "25px",
                              height: "25px",
                              borderRadius: "100px",
                              backgroundColor: "#ccc",
                              overflow: "hidden",
                              marginRight: "10px",
                            }}
                          >
                            <img
                              style={{ width: "100%", height: "100%", objectFit: "cover" }}
                              src="/default-image.png"
                            />
                          </div>
                          <div>{validateUserName(message.student)}</div>
                        </div>
                      </Col>
                      <Col md={3}>
                        <div className="d-flex align-items-center">
                          <div
                            style={{
                              width: "25px",
                              height: "25px",
                              borderRadius: "100px",
                              backgroundColor: "#ccc",
                              overflow: "hidden",
                              marginRight: "10px",
                            }}
                          >
                            <img
                              style={{ width: "100%", height: "100%", objectFit: "cover" }}
                              src="/default-image.png"
                            />
                          </div>
                          <div>{validateUserName(message.assigned)}</div>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              );
            }
          })}
        </div>
      ) : (
        <div className="text-center">No Messages available.</div>
      )}
    </div>
  );
};

export default Accomplished;