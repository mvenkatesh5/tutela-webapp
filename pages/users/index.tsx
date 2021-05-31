import React from "react";
// next imports
import Link from "next/link";
import { useRouter } from "next/router";
// react bootstrap
import { Container, Table, Form } from "react-bootstrap";
// swr
import useSWR, { mutate } from "swr";
// blueprint
import { TimezonePicker } from "@blueprintjs/timezone";
// blueprint css
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
// global constants
import { dateTimeFormat } from "@constants/global";
// layouts
import AdminLayout from "@layouts/adminLayout";
// api routes
import { USER_ENDPOINT, USER_WITH_ID_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher, APIUpdater } from "@lib/services";
// hoc
import withGlobalAuth from "@lib/hoc/withGlobalAuth";

const UserDetails = () => {
  const router = useRouter();
  const is_teacher: any = router.query.t;
  const { data: userList, error: userListError } = useSWR(USER_ENDPOINT, APIFetcher);

  const handleUserRole = (user: any, role: any) => {
    const payload = { id: user.id, role: role };
    handleUpdate(payload);
  };
  const handleUserTimezone = (user: any, timezone: any) => {
    const payload = { id: user.id, timezone: timezone };
    handleUpdate(payload);
  };
  const handleUpdate = (payload: any) => {
    APIUpdater(USER_WITH_ID_ENDPOINT(payload.id), payload)
      .then((res: any) => {
        mutate(
          USER_ENDPOINT,
          async (elements: any) => {
            let index = elements.findIndex((mutateData: any) => mutateData.id === payload.id);
            return elements.map((oldElement: any, i: any) => (i === index ? res : oldElement));
          },
          false
        );
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const validateIsTeacherRouter = (user: any) => {
    if (is_teacher) {
      if (user.role === 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };

  return (
    <div>
      <AdminLayout>
        <div className="right-layout">
          <Container>
            <Table bordered>
              <thead>
                <tr>
                  {!is_teacher && <th className="text-center">#</th>}
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Last Login</th>
                  <th>Role</th>
                  <th>TimeZone</th>
                </tr>
              </thead>
              <tbody>
                {userList &&
                  userList.length > 0 &&
                  userList.map((users: any, i: any) => {
                    if (validateIsTeacherRouter(users)) {
                      return (
                        <tr key={i}>
                          {!is_teacher && <td className="text-center">{i + 1}</td>}
                          <td className="heading">
                            <Link
                              href={`/users/${users.role === 1 ? `${users.id}/teacher` : users.id}`}
                            >
                              <a target="_blank">{users.first_name}</a>
                            </Link>
                          </td>
                          {console.log(users)}
                          <td className="heading">{users.last_name}</td>
                          <td className="heading">{users.username}</td>
                          <td className="description">{users.email}</td>
                          <td className="description text-center">
                            {users.last_login ? dateTimeFormat(users.last_login) : "-"}
                          </td>
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
                                <option value="3">Parent</option>
                              </Form.Control>
                            </Form.Group>
                          </td>
                          <td className="description">
                            <TimezonePicker
                              className="timezone-root"
                              valueDisplayFormat="composite"
                              value={users.timezone}
                              onChange={(value) => {
                                handleUserTimezone(users, value);
                              }}
                            />
                          </td>
                        </tr>
                      );
                    }
                  })}
              </tbody>
            </Table>
          </Container>
        </div>
      </AdminLayout>
    </div>
  );
};

export default withGlobalAuth(UserDetails);
