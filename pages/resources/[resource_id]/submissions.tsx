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
import AssessmentResultModalPreview from "@components/assessments/semi-online/results";
import AssessmentResetModal from "@components/assessments/semi-online/reset-user-allocation";
import AssessmentEditModal from "@components/assessments/semi-online/edit-user-allocation";
// global imports
import { datePreview } from "@constants/global";
// api routes
import {
  RESOURCE_ASSESSMENT_USER_ALLOCATION,
  RESOURCE_NODE_ENDPOINT,
  USER_ENDPOINT,
} from "@constants/routes";
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
    resource_node_id && users ? (url) => APIFetcher(url[0]) : null,
    { refreshInterval: 0 }
  );
  const { data: resourceDetail, error: resourceDetailError } = useSWR(
    resource_node_id ? [RESOURCE_NODE_ENDPOINT(resource_node_id), resource_node_id] : null,
    resource_node_id ? (url) => APIFetcher(url[0]) : null,
    { refreshInterval: 0, revalidateOnFocus: false }
  );

  const [formData, setFormData] = React.useState({
    time: 0,
    questions: 0,
    options: 0,
    points_per_question: 0,
    omr_data: null,
    answer_data: null,
  });
  const handleFormData = (key: string, value: any) => {
    setFormData({ ...formData, [key]: value });
  };
  React.useEffect(() => {
    if (resourceDetail && resourceDetail?.data && resourceDetail?.data?.assessment_data) {
      setFormData({
        ...resourceDetail?.data?.assessment_data,
        resource_id: resource_id,
        omr_data: resourceDetail?.data?.assessment_data?.omr_data,
        answer_data: resourceDetail?.data?.assessment_data?.answer_data,
      });
    }
  }, [resourceDetail, resource_id]);

  const [resultPreview, setResultPreview] = React.useState<any>(null);

  const bindZero = (value: any) => {
    if (value > 9) return value;
    else return `0${value}`;
  };

  const dateFormat = (date: any) => {
    const d = new Date(date);
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
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

  const [selectedUser, setSelectedUser] = React.useState<any>(null);

  const [editAllocationData, setEditAllocationData] = React.useState<any>(null);
  const [resetAllocationData, setResetAllocationData] = React.useState<any>(null);
  const handleMutation = () => {
    mutate([RESOURCE_ASSESSMENT_USER_ALLOCATION(resource_node_id), resource_node_id], false);
    setFormData({
      time: 0,
      questions: 0,
      options: 0,
      points_per_question: 0,
      omr_data: null,
      answer_data: null,
    });
  };

  return (
    <Page meta={meta}>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
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
            <Container style={{ overflow: "hidden", overflowY: "auto" }}>
              {resourceAssessmentUserDetail && !resourceAssessmentUserDetailError ? (
                <div className="w-100 text-center text-muted py-3">
                  <Table bordered style={{ whiteSpace: "nowrap" }}>
                    <thead>
                      <tr>
                        <th>S.no</th>
                        <th>Teacher</th>
                        <th>Student</th>
                        <th>Scheduled at </th>
                        {resourceDetail?.data?.kind !== "digital_sat" && (
                          <>
                            <th>Submitted at </th>
                            <th>Results</th>
                            <th>Status</th>
                          </>
                        )}

                        <th>
                          {resourceDetail?.data?.kind === "digital_sat" ? "Submissions" : "Results"}
                        </th>
                        {resourceDetail?.data?.kind !== "digital_sat" && <th>Edit</th>}
                        {resourceDetail?.data?.kind !== "digital_sat" && <th>Reset</th>}
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
                              <td>{datePreview(user?.scheduled_at)}</td>

                              {resourceDetail?.data?.kind !== "digital_sat" && (
                                <>
                                  <td>
                                    {user?.completed_at != null
                                      ? datePreview(user?.completed_at)
                                      : "-"}
                                  </td>
                                  <td className="text-sm">
                                    {user?.score
                                      ? `${user?.score}/${user.work_submission_data?.max_score}`
                                      : "-"}
                                  </td>
                                  <td>
                                    {user?.completed_at ? (
                                      <Badge className="bg-success">Completed</Badge>
                                    ) : (
                                      <Badge className="bg-danger">Not Started</Badge>
                                    )}
                                  </td>
                                </>
                              )}
                              <td>
                                {user?.completed_at ? (
                                  <Button
                                    variant="outline-primary"
                                    size="sm"
                                    onClick={() => setResultPreview(user.work_submission_data)}
                                  >
                                    {resourceDetail?.data?.kind === "digital_sat"
                                      ? "Submissions"
                                      : "View"}
                                  </Button>
                                ) : resourceDetail?.data?.kind === "digital_sat" ? (
                                  <Button
                                    variant="outline-primary"
                                    size="sm"
                                    onClick={() => {
                                      setResultPreview(user.work_submission_data);
                                      setSelectedUser(user?.student);
                                    }}
                                  >
                                    Submissions
                                  </Button>
                                ) : (
                                  "-"
                                )}
                              </td>
                              <td>
                                {resourceDetail?.data?.kind !== "digital_sat" &&
                                user?.completed_at === null ? (
                                  <Button
                                    variant={"outline-secondary"}
                                    size="sm"
                                    onClick={() => {
                                      setEditAllocationData(user);
                                    }}
                                  >
                                    Reschedule
                                  </Button>
                                ) : (
                                  "-"
                                )}
                              </td>
                              <td>
                                {resourceDetail?.data?.kind !== "digital_sat" &&
                                user?.completed_at != null ? (
                                  <Button
                                    variant={"outline-danger"}
                                    size="sm"
                                    onClick={() => {
                                      setResetAllocationData(user);
                                    }}
                                  >
                                    Reset
                                  </Button>
                                ) : (
                                  "-"
                                )}
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
          <AssessmentResultModalPreview
            resourceDetail={resourceDetail}
            omrData={formData}
            result={resultPreview}
            handleModal={setResultPreview}
            type="admin"
            selectedUser={selectedUser}
          />

          {editAllocationData && editAllocationData?.id && (
            <AssessmentEditModal
              result={editAllocationData}
              setResult={setEditAllocationData}
              mutate={handleMutation}
            />
          )}
          {resetAllocationData && resetAllocationData?.id && (
            <AssessmentResetModal
              result={resetAllocationData}
              setResult={setResetAllocationData}
              mutate={handleMutation}
            />
          )}
        </AdminLayout>
      </Worker>
    </Page>
  );
};

export default withAdminTeacherAuth(ResourceSubmissions);
