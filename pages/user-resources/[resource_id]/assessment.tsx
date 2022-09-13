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
import StudentLayout from "@layouts/studentLayout";
// components
const PDFRenderView = dynamic(import("@components/pdfRender"), { ssr: false });
import RenderOmr from "@components/assessments/semi-online/OmrRender";
import Timer from "@components/assessments/Timer";
// api routes
import { RESOURCE_NODE_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";
// hoc
import withStudentAuth from "@lib/hoc/withStudentAuth";
// components
import Page from "@components/page";
// constants
import { META_DESCRIPTION } from "@constants/page";

const ResourceTreeView = () => {
  const router = useRouter();
  const { resource_id, resource_node_id } = router.query;

  const { data: resourceDetail, error: resourceDetailError } = useSWR(
    resource_node_id ? [RESOURCE_NODE_ENDPOINT(resource_node_id), resource_node_id] : null,
    (url) => APIFetcher(url),
    { refreshInterval: 0 }
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
        answer_data: resourceDetail?.data?.assessment_data?.omr_data,
      });
    }
  }, [resourceDetail]);

  const meta = {
    title: "Resources",
    description: META_DESCRIPTION,
  };

  const convertMinutesToSeconds = (minutes: any) => {
    let seconds = minutes * 60;
    return seconds;
  };
  const handleTimerClose = () => {};

  return (
    <Page meta={meta}>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
        <StudentLayout assessmentSidebar={true}>
          <>
            {resourceDetail && !resourceDetailError ? (
              <>
                {resourceDetail && resourceDetail?.id ? (
                  <div className="w-100 h-100 d-flex flex-column" style={{ overflow: "hidden" }}>
                    <div className="border-bottom p-4">
                      <div className="container d-flex justify-content-between align-items-center">
                        <div className="d-flex gap-2 align-items-center">
                          <Link href={`/user-resources/${resource_id}/`}>
                            <a>
                              <ArrowLeftShort width="24px" />
                            </a>
                          </Link>
                          <h5 className="m-0 p-0">{resourceDetail?.title}</h5>
                        </div>
                        <div></div>
                      </div>
                    </div>
                    <div className="w-100 h-100" style={{ overflow: "hidden" }}>
                      <div className="container d-flex w-100 h-100 align-items-center">
                        <div className="w-100 h-100 border-end px-3 d-flex flex-column">
                          <div className="py-3">
                            <h6 className="m-0 p-0">{resourceDetail?.title}</h6>
                          </div>
                          <div className="w-100 h-100 pb-3" style={{ overflow: "hidden" }}>
                            {resourceDetail?.data?.url && (
                              <PDFRenderView pdf_url={resourceDetail?.data?.url} />
                            )}
                          </div>
                        </div>
                        <div
                          className="w-100 h-100 border-end px-3 d-flex flex-column"
                          style={{ overflow: "hidden" }}
                        >
                          <div className="py-3 d-flex align-items-center gap-4">
                            <div>
                              <h6 className="m-0 p-0">User Answer</h6>
                            </div>
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
                              <Button variant="primary" size={"sm"}>
                                Submit
                              </Button>
                            </div>
                          </div>

                          {resourceDetail?.data?.kind === "document_objective_answers" && (
                            <div className="w-100 h-100 py-4" style={{ overflow: "auto" }}>
                              <RenderOmr
                                data={formData}
                                handleData={handleFormData}
                                noOfQuestionInARow={10}
                              />
                            </div>
                          )}
                          {resourceDetail?.data?.kind === "document_subjective_answers" && (
                            <div>
                              <div className="w-100 h-100 py-4" style={{ overflow: "auto" }}>
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
            ) : (
              <div className="w-100 text-center text-muted py-5">Loading...</div>
            )}
          </>
        </StudentLayout>
      </Worker>
    </Page>
  );
};

export default withStudentAuth(ResourceTreeView);
