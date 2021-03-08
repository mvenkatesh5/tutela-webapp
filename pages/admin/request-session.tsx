import React from "react";
// next imports
import Link from "next/link";
// react bootstrap
import { Container, Table, Form } from "react-bootstrap";
// swr
import useSWR, { mutate } from "swr";
// layouts
import AdminLayout from "@layouts/adminLayout";
// global imports
import { datePreview } from "@constants/global";
// api routes
import { USER_ENDPOINT, REQUEST_SESSION_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher, APIUpdater } from "@lib/services";
// hoc
import withAdminAuth from "@lib/hoc/withAdminAuth";

const UserRequestSession = () => {
  const { data: requestSessions, error: requestSessionsError } = useSWR(
    REQUEST_SESSION_ENDPOINT,
    APIFetcher
  );

  const { data: userList, error: userListError } = useSWR(USER_ENDPOINT, APIFetcher);

  const returnCurrentUser = (user_id: any) => {
    if (userList) {
      const currentUser: any = userList.find((element: any) => element.id === user_id);
      if (currentUser) {
        return `${currentUser.first_name} (${currentUser.email})`;
      }
    }
  };

  return (
    <div>
      <AdminLayout>
        <div className="right-layout">
          <Container>
            <h5>Requested sessions.</h5>
            {!requestSessions && !requestSessionsError ? (
              <div className="text-center mt-5">Loading...</div>
            ) : (
              <Table bordered>
                <thead>
                  <tr>
                    <th className="text-center">#</th>
                    <th>Topic</th>
                    <th>Requested date</th>
                    <th>Requested on</th>
                    <th>User</th>
                  </tr>
                </thead>
                {requestSessions && requestSessions.length > 0 ? (
                  <tbody>
                    {requestSessions.map((users: any, i: any) => (
                      <tr key={i}>
                        <td className="text-center">{i + 1}</td>
                        <td className="heading">{users.topic}</td>
                        <td className="">{datePreview(users.datetime)}</td>
                        <td className="">{datePreview(users.created)}</td>
                        <td className="">{returnCurrentUser(users.user)}</td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <div className="text-center mt-5">No Sessions are requested.</div>
                )}
              </Table>
            )}
          </Container>
        </div>
      </AdminLayout>
    </div>
  );
};

export default withAdminAuth(UserRequestSession);
