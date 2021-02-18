import React from "react";
// react bootstrap
import { Form } from "react-bootstrap";
// components
import SearchCheckboxView from "./SearchCheckbox";
// material icons
import { Users } from "@styled-icons/fa-solid";
import { Users as StudentUsers } from "@styled-icons/heroicons-solid";

const SessionUser = (props: any) => {
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

  React.useEffect(() => {
    if (props.data && props.data.session_users && props.data.session_users.length > 0) {
      let users: any = [];
      let teachers: any = [];
      props.data.session_users.map((listeners: any) => {
        if (listeners.as_role === 0) {
          users.push(listeners.user.id.toString());
        }
        if (listeners.as_role === 1) {
          teachers.push(listeners.user.id.toString());
        }
      });
      setSessionUsers(users);
      setSessionTeachers(teachers);
      props.handleSessionData({ ...props.data, listeners: users, teachers: teachers });
    }
  }, []);

  return (
    <div>
      <div>
        <Form.Group className="mb-2">
          <Form.Label>
            <Users style={{ width: "16px", marginRight: "8px", marginTop: "-2px" }} />
            Students
          </Form.Label>
          <SearchCheckboxView
            users={props.users}
            data={sessionUsers}
            handleData={handleSessionUsers}
            role={0}
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>
            <StudentUsers style={{ width: "16px", marginRight: "8px", marginTop: "-2px" }} />
            Teachers
          </Form.Label>
          <SearchCheckboxView
            users={props.users}
            data={sessionTeachers}
            handleData={handleSessionTeachers}
            role={1}
          />
        </Form.Group>
      </div>
    </div>
  );
};

export default SessionUser;
