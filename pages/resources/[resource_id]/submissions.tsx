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
import { RESOURCE_ASSESSMENT_USER_ALLOCATION, USER_ENDPOINT } from "@constants/routes";
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

  const { data: users, error: usersError } = useSWR(USER_ENDPOINT, APIFetcher);
  const { data: resourceAssessmentUserDetail, error: resourceAssessmentUserDetailError } = useSWR(
    resource_node_id && users
      ? [RESOURCE_ASSESSMENT_USER_ALLOCATION(resource_node_id), resource_node_id]
      : null,
    (url) => APIFetcher(url),
    { refreshInterval: 0 }
  );

  const bindZero = (value: any) => {
    if (value > 9) return value;
    else return `0${value}`;
  };

  const dateFormat = (date: any) => {
    const d = new Date(date);
    let year = d.getFullYear();
    let month = d.getMonth();
    let day = d.getDate();
    let hour = d.getHours();
    let minutes = d.getMinutes();
    let returnDate = `${bindZero(year)}-${bindZero(month)}-${bindZero(day)}T${bindZero(
      hour
    )}:${bindZero(minutes)}`;
    return returnDate;
  };

  const getCurrentUserName = (user_id: any) => {
    if (users && users.length > 0) {
      const currentData: any = users.find(
        (element: any, i: any) => element.id === parseInt(user_id)
      );
      if (currentData) return `${currentData.first_name} ${currentData.last_name}`;
      // (${currentData.email})
    }
  };

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
            {resourceAssessmentUserDetail && !resourceAssessmentUserDetailError ? (
              <div className="w-100 text-center text-muted py-3">
                <Table bordered style={{ whiteSpace: "nowrap" }}>
                  <thead>
                    <tr>
                      <th>S.no</th>
                      <th>Teacher</th>
                      <th>Student</th>
                      <th>Scheduled at </th>
                      <th>Submitted at </th>
                      <th>Results</th>
                      <th>Status</th>
                      {/* <th>View</th> */}
                      {/* <th>Reset</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {resourceAssessmentUserDetail && resourceAssessmentUserDetail.length > 0 ? (
                      <>
                        {resourceAssessmentUserDetail.map((user: any, index: any) => (
                          <tr key={index}>
                            <th>{index + 1}</th>
                            <td>{getCurrentUserName(user?.teacher)}</td>
                            <td>{getCurrentUserName(user?.student)}</td>
                            <td>
                              <Form.Control
                                type="datetime-local"
                                value={dateFormat(user?.scheduled_at)}
                                onChange={(e) => console.log("time", e.target.value)}
                                required
                                placeholder="time"
                              />
                            </td>
                            <td>
                              {resourceAssessmentUserDetail?.completed_at
                                ? datePreview(resourceAssessmentUserDetail?.completed_at)
                                : "-"}
                            </td>
                            <td className="text-sm">
                              {user?.score ? user?.score : "-"} /
                              {resourceAssessmentUserDetail?.data?.assessment_data?.results || 100}
                            </td>
                            <td>
                              {user?.completed_at ? (
                                <Badge className="bg-success">Completed</Badge>
                              ) : (
                                <Badge className="bg-danger">Not Started</Badge>
                              )}
                            </td>
                            {/* <td>
                              <Button size="sm">View</Button>
                            </td> */}
                            {/* <td>
                              <Button size="sm">Reset</Button>
                            </td> */}
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
