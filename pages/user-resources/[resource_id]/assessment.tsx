import React from "react";
// next imports
import Link from "next/link";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
// material icons
import { ArrowLeftShort } from "@styled-icons/bootstrap/ArrowLeftShort";
// swr
import useSWR from "swr";
// react bootstrap
import { Container, Button, Row, Col } from "react-bootstrap";
// pdf worker
import { Worker } from "@react-pdf-viewer/core";
// layouts
import AssessmentLayout from "@layouts/AssessmentLayout";
// components
const PDFRenderView = dynamic(import("@components/pdfRender"), { ssr: false });
import RenderOmr from "@components/assessments/semi-online/OmrRender";
import Timer from "@components/assessments/Timer";
import AssessmentResultModalPreview from "@components/assessments/semi-online/results";
import ResultPreview from "@components/assessments/semi-online/results/Preview";
import { assessmentSemiOnlineValidate } from "@components/assessments/helpers/assessment-validation";
// api routes
import { RESOURCE_NODE_ENDPOINT, RESOURCE_ASSESSMENT_USER_DETAILS } from "@constants/routes";
// api services
import { UpdateResourceUserAllocation } from "@lib/services/resource.service";
import { APIFetcher } from "@lib/services";
// hoc
import withStudentAuth from "@lib/hoc/withStudentAuth";
// components
import Page from "@components/page";
// constants
import { META_DESCRIPTION } from "@constants/page";

const ResourceTreeView = () => {
  const router = useRouter();
  const { resource_id, resource_node_id, session_id = "", session_user = "" } = router.query;

  const { data: resourceUserAssessment, error: resourceUserAssessmentError } = useSWR(
    resource_node_id
      ? [RESOURCE_ASSESSMENT_USER_DETAILS(resource_node_id), resource_node_id]
      : null,
    resource_node_id ? (url) => APIFetcher(url[0]) : null,
    { refreshInterval: 0, revalidateOnFocus: false }
  );

  const { data: resourceDetail, error: resourceDetailError } = useSWR(
    resourceUserAssessment && resourceUserAssessment?.resource_node && resource_node_id
      ? [RESOURCE_NODE_ENDPOINT(resource_node_id), resource_node_id]
      : null,
    resourceUserAssessment && resourceUserAssessment?.resource_node && resource_node_id
      ? (url) => APIFetcher(url[0])
      : null,
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

  const meta = {
    title: "Resources",
    description: META_DESCRIPTION,
  };

  const [resultPreview, setResultPreview] = React.useState<any>(null);
  const [resultCompletionPreview, setResultCompletionPreview] = React.useState<any>(null);

  React.useEffect(() => {
    if (
      resourceUserAssessment &&
      resourceUserAssessment?.completed_at != null &&
      resourceUserAssessment?.work_submission_data
    ) {
      setResultCompletionPreview(resourceUserAssessment?.work_submission_data);
    }
  }, [resourceUserAssessment]);

  const handleAssessmentComplete = () => {
    let assessmentResults: any = assessmentSemiOnlineValidate(formData);
    setResultPreview(assessmentResults);
    let payload = {
      node_id: resourceUserAssessment?.id,
      data: {
        resource : resource_node_id,
        session: session_id,
        session_user: session_user,
        completed_at: new Date(),
        score: assessmentResults?.user_score,
        work_submission_data: assessmentResults,
      },
    };
    UpdateResourceUserAllocation(payload)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const convertMinutesToSeconds = (minutes: any) => {
    let seconds = minutes * 60;
    return seconds;
  };
  const handleTimerClose = () => {
    handleAssessmentComplete();
  };

  return (
    <Page meta={meta}>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
        <AssessmentLayout>
          <>
            {/* validation for the user access */}
            {resourceUserAssessment && !resourceUserAssessmentError ? (
              <>
                {resourceUserAssessment && resourceUserAssessment?.resource_node ? (
                  <>
                    {resourceDetail && !resourceDetailError ? (
                      <>
                        {resourceUserAssessment && resourceUserAssessment?.completed_at != null ? (
                          <div className="w-100 h-100" style={{ overflow: "auto" }}>
                            <div className="container">
                              <div className="py-5 d-flex align-items-center">
                                <Link href={`/user-resources/${resource_id}/`}>
                                  <a>
                                    <ArrowLeftShort width="32px" />
                                  </a>
                                </Link>
                                <h5 className="m-0 p-0">Test completed successfully.</h5>
                              </div>
                              <ResultPreview
                                resourceDetail={resourceDetail}
                                omrData={formData}
                                results={resultCompletionPreview}
                              />
                            </div>
                          </div>
                        ) : (
                          <>
                            {resourceDetail && resourceDetail?.id ? (
                              <div
                                className="w-100 h-100 d-flex flex-column"
                                style={{ overflow: "hidden" }}
                              >
                                <div className="border-bottom p-4">
                                  <div className="container-fluid d-flex justify-content-between align-items-center">
                                    <div className="d-flex gap-2 align-items-center">
                                      <Link href={`/user-resources/${resource_id}/`}>
                                        <a>
                                          <ArrowLeftShort width="24px" />
                                        </a>
                                      </Link>
                                      <h5 className="m-0 p-0">{resourceDetail?.title}</h5>
                                    </div>
                                    <div className="d-flex gap-3">
                                      <div
                                        className="ms-auto"
                                        style={{ fontSize: "20px", fontWeight: "bold" }}
                                      >
                                        {formData?.time && formData?.time > 0 && (
                                          <Timer
                                            initialTime={convertMinutesToSeconds(formData?.time)}
                                            timeHandler={handleTimerClose}
                                          />
                                        )}
                                      </div>
                                      <div>
                                        <Button
                                          variant="primary"
                                          size={"sm"}
                                          onClick={handleAssessmentComplete}
                                        >
                                          Submit
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="w-100 h-100" style={{ overflow: "hidden" }}>
                                  <div className="container-fluid d-flex w-100 h-100 align-items-center">
                                    <div className="w-100 h-100 border-end px-3 d-flex flex-column">
                                      <div
                                        className="w-100 h-100 pb-3"
                                        style={{ overflow: "hidden" }}
                                      >
                                        {resourceDetail?.data?.url && (
                                          <PDFRenderView pdf_url={resourceDetail?.data?.url} />
                                        )}
                                      </div>
                                    </div>
                                    <div
                                      className="w-100 h-100 border-end px-3 d-flex flex-column"
                                      style={{ overflow: "hidden", maxWidth: "260px" }}
                                    >
                                      <div className="py-3">
                                        <h6 className="m-0 p-0">User Answer</h6>
                                      </div>

                                      {resourceDetail?.data?.kind ===
                                        "document_objective_answers" && (
                                        <div
                                          className="w-100 h-100 py-4"
                                          style={{ overflow: "auto" }}
                                        >
                                          <RenderOmr
                                            render_key={`answer_data`}
                                            data={formData}
                                            handleData={(value: any) =>
                                              handleFormData("answer_data", value)
                                            }
                                            noOfQuestionInARow={1000}
                                          />
                                        </div>
                                      )}
                                      {resourceDetail?.data?.kind ===
                                        "document_subjective_answers" && (
                                        <div>
                                          <div
                                            className="w-100 h-100 py-4"
                                            style={{ overflow: "auto" }}
                                          >
                                            {formData?.omr_data &&
                                              Object.keys(formData?.omr_data) &&
                                              Object.keys(formData?.omr_data).map(
                                                (rowKey: string, rowIndex: number) => (
                                                  <div
                                                    key={rowIndex}
                                                    className="mb-2"
                                                    style={{
                                                      position: "relative",
                                                      display: "flex",
                                                      alignItems: "center",
                                                      gap: "10px",
                                                    }}
                                                  >
                                                    <div
                                                      style={{
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        gap: "10px",
                                                        fontSize: "14px",
                                                        fontWeight: "bold",
                                                        minWidth: "22px",
                                                      }}
                                                    >
                                                      {rowIndex + 1}.
                                                    </div>
                                                    <div>
                                                      <Button variant="outline-primary" size="sm">
                                                        Upload Answer
                                                      </Button>
                                                    </div>
                                                  </div>
                                                )
                                              )}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="w-100 text-center text-muted py-5">
                                No resource are available.
                              </div>
                            )}
                          </>
                        )}
                      </>
                    ) : (
                      <div className="w-100 text-center text-muted py-5">Loading...</div>
                    )}
                  </>
                ) : (
                  <div className="w-100 text-center text-muted py-5">
                    <div>
                      Don{"'"}t have permission to access this test. Please contact your teacher.
                    </div>
                    <Link href={`/user-resources/${resource_id}/`}>
                      <a>
                        <Button variant="primary" size={"sm"} className="mt-4">
                          Back to resources
                        </Button>
                      </a>
                    </Link>
                  </div>
                )}
              </>
            ) : (
              <div className="w-100 text-center text-muted py-5">Loading...</div>
            )}
          </>
        </AssessmentLayout>

        {resultPreview && (
          <AssessmentResultModalPreview
            resourceDetail={resourceDetail}
            omrData={formData}
            result={resultPreview}
            handleModal={setResultPreview}
          />
        )}
      </Worker>
    </Page>
  );
};

export default withStudentAuth(ResourceTreeView);
