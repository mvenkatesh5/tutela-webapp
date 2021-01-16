import React from "react";
// react bootstrap
import { Form } from "react-bootstrap";

const SessionUser = (props: any) => {
  console.log("props.users", props.users);

  const [sessionUsers, setSessionUsers] = React.useState<any>();
  const handleSessionUsers = (value: any) => {
    setSessionUsers(value);
    props.handleData("listeners", value);
  };

  const [sessionTeachers, setSessionTeachers] = React.useState<any>();
  const handleSessionTeachers = (value: any) => {
    setSessionTeachers(value);
    props.handleData("teachers", value);
  };

  return (
    <div>
      <div>
        <Form.Group className="mb-2">
          <Form.Label>Students</Form.Label>
          <Form.Control
            as="select"
            multiple
            value={sessionUsers}
            onChange={(e: any) => {
              let values = [];
              for (let i = 0; i < e.target.selectedOptions.length; i++) {
                values.push(e.target.selectedOptions[i].value);
              }
              handleSessionUsers(values);
            }}
          >
            {props.users &&
              props.users.length > 0 &&
              props.users.map((user: any, i: Number) => (
                <option key={user.id} value={user.id}>
                  {user.username}-{user.id}
                </option>
              ))}
          </Form.Control>
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Teachers</Form.Label>
          <Form.Control
            as="select"
            multiple
            value={sessionTeachers}
            onChange={(e: any) => {
              let values = [];
              for (let i = 0; i < e.target.selectedOptions.length; i++) {
                values.push(e.target.selectedOptions[i].value);
              }
              handleSessionTeachers(values);
            }}
          >
            {props.users &&
              props.users.length > 0 &&
              props.users.map((user: any, i: Number) => (
                <option key={user.id} value={user.id}>
                  {user.username}-{user.id}
                </option>
              ))}
          </Form.Control>
        </Form.Group>
      </div>
    </div>
  );
};

export default SessionUser;
