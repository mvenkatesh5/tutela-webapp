import React from "react";
// next imports
import Link from "next/link";
// react bootstrap
import { Container, Table, Form } from "react-bootstrap";
// swr
import useSWR, { mutate } from "swr";
// layouts
import AdminLayout from "@layouts/adminLayout";
// api routes
import { REQUEST_SESSION_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher, APIUpdater } from "@lib/services";
// hoc
import withAdminAuth from "@lib/hoc/withAdminAuth";

const UserRequestSession = () => {
  const { data: requestSessions, error: requestSessionsError } = useSWR(
    REQUEST_SESSION_ENDPOINT,
    APIFetcher
  );

  return (
    <div>
      <AdminLayout>
        <div className="right-layout">
          <Container>
            {!requestSessions && !requestSessionsError ? (
              <div className="text-center mt-5">Loading...</div>
            ) : (
              <Table bordered>
                <thead>
                  <tr>
                    <th className="text-center">#</th>
                    <th>Topic</th>
                    <th>Date time</th>
                    <th>Created</th>
                    <th>User</th>
                  </tr>
                </thead>
                {requestSessions && requestSessions.length > 0 ? (
                  <tbody>
                    {requestSessions.map((users: any, i: any) => (
                      <tr key={i}>
                        <td className="text-center">{i + 1}</td>
                        <td className="heading">{users.topic}</td>
                        <td className="">{users.datetime}</td>
                        <td className="">{users.created}</td>
                        <td className="">{users.user}</td>
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
