import React from "react";
// react bootstrap
import { Table, Form } from "react-bootstrap";
// global imports
import { datePreview } from "@constants/global";

const NotAccomplished = (props: any) => {
  const handleAccomplishedData = (id: any) => {
    let payload: any = { is_accomplished: true };
    payload["id"] = id;
    props.handleEdit(payload);
  };

  const validateUserName = (user_id: any) => {
    if (props.allUsers && props.allUsers.length > 0) {
      const currentUser: any = props.allUsers.find((data: any) => data.id === parseInt(user_id));
      if (currentUser) {
        return currentUser.username;
      }
    }
    return user_id;
  };

  return (
    <div>
      <Table bordered>
        <thead>
          <tr>
            <th>Accomplished</th>
            <th>Message</th>
            <th>Teacher</th>
            <th>Student</th>
            <th>Created</th>
          </tr>
        </thead>
        {props.data && props.data.length > 0 ? (
          <tbody>
            {props.data.map((message: any, i: any) => {
              if (!message.is_accomplished) {
                return (
                  <tr key={`message-table-row${i}`}>
                    <td className="text-center">
                      <Form.Check
                        type="checkbox"
                        id={`message-not-accomplished-checkbox-${message.id}`}
                        value={message.is_accomplished}
                        onChange={(e) => handleAccomplishedData(message.id)}
                        checked={message.is_accomplished === true}
                      />
                    </td>
                    <td>{message.text}</td>
                    <td className="text-center">{validateUserName(message.user)}</td>
                    <td className="text-center">{validateUserName(message.student)}</td>
                    <td>{datePreview(message.created)}</td>
                  </tr>
                );
              }
            })}
          </tbody>
        ) : (
          <div className="text-center">No Messages available.</div>
        )}
      </Table>
    </div>
  );
};

export default NotAccomplished;
