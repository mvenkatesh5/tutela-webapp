import React from "react";
// next imports
import Link from "next/link";
import { useRouter } from "next/router";
import { NextPage } from "next";
import dynamic from "next/dynamic";
// material icons
import { ArrowLeftShort } from "@styled-icons/bootstrap/ArrowLeftShort";
// react bootstrap
import { Container, Table, Button, Badge, Form } from "react-bootstrap";
// swr
import useSWR, { mutate } from "swr";
// pdf worker
import { Worker } from "@react-pdf-viewer/core";
// constants
import { META_DESCRIPTION } from "@constants/page";
// layout
import AdminLayout from "@layouts/adminLayout";
// components
import Page from "@components/page";
const PDFRenderView = dynamic(import("@components/pdfRender"), { ssr: false });
import RenderOmr from "@components/assessments/semi-online/OmrRender";
// global imports
import { datePreview } from "@constants/global";
// api routes
import { RESOURCE_NODE_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";
import { ResourceNodeEdit } from "@lib/services/resource.service";
// hoc
import withAdminTeacherAuth from "@lib/hoc/withAdminTeacherAuth";

const meta = {
  title: "Assessment",
  description: META_DESCRIPTION,
};

const ResourceSubmissions: NextPage = () => {
  const router = useRouter();
  const { resource_id, resource_node_id } = router.query;

  const { data: resourceDetail, error: resourceDetailError } = useSWR(
    resource_node_id ? [RESOURCE_NODE_ENDPOINT(resource_node_id), resource_node_id] : null,
    (url) => APIFetcher(url),
    { refreshInterval: 0 }
  );

  let users = [
    { name: "user 1", status: "not_started", results: 10 },
    { name: "user 2", status: "started", results: 20 },
    { name: "user 3", status: "not_started", results: 30 },
    { name: "user 4", status: "completed", results: 12 },
  ];

  console.log("resourceDetail", resourceDetail);

  return (
    <Page meta={meta}>
      <AdminLayout>
        <div className="w-100 h-100 d-flex flex-column" style={{ overflow: "hidden" }}>
          <div className="border-bottom p-4">
            <div className="container d-flex justify-content-between align-items-center">
              <div className="d-flex gap-2 align-items-center">
                <Link href={`/resources/${resource_id}/`}>
                  <a>
                    <ArrowLeftShort width="24px" />
                  </a>
                </Link>
                <h5 className="m-0 p-0">User Submissions</h5>
              </div>
            </div>
          </div>
          <Container>
            {resourceDetail && !resourceDetailError ? (
              <div className="w-100 text-center text-muted py-3">
                <Table bordered style={{ whiteSpace: "nowrap" }}>
                  <thead>
                    <tr>
                      <th>S.no</th>
                      <th>Student Name</th>
                      <th>Scheduled at </th>
                      <th>Submitted at </th>
                      <th>Results</th>
                      <th>Status</th>
                      <th>View</th>
                      <th>Reset</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users && users.length > 0 ? (
                      <>
                        {users.map((user: any, index: any) => (
                          <tr key={index}>
                            <th>{index + 1}</th>
                            <td>{user?.name}</td>
                            <td>
                              <Form.Control
                                type="datetime-local"
                                // value={formData.time}
                                // onChange={(e) => handleFormData("time", e.target.value)}
                                required
                                placeholder="time"
                              />
                            </td>
                            <td>{datePreview(resourceDetail?.updated)}</td>
                            <td className="text-sm">
                              {user?.results} /
                              {resourceDetail?.data?.assessment_data?.results || 100}
                            </td>
                            <td>
                              {user?.status === "not_started" && (
                                <Badge className="bg-danger">Not Started</Badge>
                              )}
                              {user?.status === "started" && (
                                <Badge className="bg-warning">Started</Badge>
                              )}
                              {user?.status === "completed" && (
                                <Badge className="bg-success">Completed</Badge>
                              )}
                            </td>
                            <td>
                              <Button size="sm">View</Button>
                            </td>
                            <td>
                              <Button size="sm">Reset</Button>
                            </td>
                          </tr>
                        ))}
                      </>
                    ) : (
                      <div className="w-100 text-center text-muted py-5">
                        No users are attached.
                      </div>
                    )}
                  </tbody>
                </Table>
              </div>
            ) : (
              <div className="w-100 text-center text-muted py-5">Loading...</div>
            )}
          </Container>
        </div>
      </AdminLayout>
    </Page>
  );
};

export default withAdminTeacherAuth(ResourceSubmissions);
