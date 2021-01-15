import React from "react";
// react bootstrap
import { Container, Table, Form } from "react-bootstrap";
// swr
import useSWR, { mutate } from "swr";
// layouts
import AdminLayout from "@layouts/adminLayout";
// api routes
import { USER_ENDPOINT, USER_WITH_ID_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher, APIUpdater } from "@lib/services";
// hoc
import withAdminAuth from "@lib/hoc/withAdminAuth";

const UserDetails = () => {
  const { data: userList, error: userListError } = useSWR(USER_ENDPOINT, APIFetcher);

  console.log(userList);

  const handleUserRole = (user: any, role: any) => {
    console.log(user);
    console.log(role);
    APIUpdater(USER_WITH_ID_ENDPOINT(user.id), { role: role })
      .then((res: any) => {
        console.log(res);
        mutate(
          USER_ENDPOINT,
          async (elements: any) => {
            let index = elements.findIndex((mutateData: any) => mutateData.id === user.id);
            return elements.map((oldElement: any, i: any) => (i === index ? res : oldElement));
          },
          false
        );
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  return (
    <div>
      <AdminLayout>
        <div className="right-layout">
          <Container>
            <Table bordered>
              <thead>
                <tr>
                  <th className="text-center">#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {userList &&
                  userList.length > 0 &&
                  userList.map((users: any, i: any) => (
                    <tr key={i}>
                      <td className="text-center">{i + 1}</td>
                      <td className="heading">{users.username}</td>
                      <td className="description">{users.email}</td>
                      <td>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                          <Form.Control
                            as="select"
                            value={users.role}
                            onChange={(e) => handleUserRole(users, e.target.value)}
                          >
                            <option value="0">Learner</option>
                            <option value="1">Teacher</option>
                            <option value="2">Admin</option>
                          </Form.Control>
                        </Form.Group>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Container>
        </div>
      </AdminLayout>
    </div>
  );
};

export default withAdminAuth(UserDetails);
