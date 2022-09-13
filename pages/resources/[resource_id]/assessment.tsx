import React from "react";
// next imports
import Link from "next/link";
import { useRouter } from "next/router";
import { NextPage } from "next";
import dynamic from "next/dynamic";
// material icons
import { ArrowLeftShort } from "@styled-icons/bootstrap/ArrowLeftShort";
// react bootstrap
import { Button } from "react-bootstrap";
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
import SemiOnlineForm from "@components/assessments/semi-online/SemiOnlineForm";
import OfflineForm from "@components/assessments/offline/OfflineForm";
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

const ResourceAssessments: NextPage = () => {
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
      console.log("resourceDetail?.data?.assessment_data", resourceDetail?.data?.assessment_data);
      setFormData((prevData: any) => {
        return { ...prevData, ...resourceDetail?.data?.assessment_data };
      });
    }
  }, [resourceDetail]);

  const [buttonLoader, setButtonLoader] = React.useState(false);
  const updateResource = (omrData: any = null) => {
    let payload: any = {
      id: resourceDetail?.id,
      data: {
        ...resourceDetail?.data,
        assessment_data: omrData != null ? { ...omrData } : { ...formData },
      },
    };

    setButtonLoader(true);
    ResourceNodeEdit(payload)
      .then((response) => {
        setButtonLoader(false);
        mutate([RESOURCE_NODE_ENDPOINT(resource_node_id), resource_node_id], false);
      })
      .catch((error) => {
        console.log(error);
        setButtonLoader(false);
      });
  };

  console.log("resourceDetail", resourceDetail);

  return (
    <Page meta={meta}>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
        <AdminLayout>
          {resourceDetail && !resourceDetailError ? (
            <>
              {resourceDetail && resourceDetail?.id ? (
                <div className="w-100 h-100 d-flex flex-column" style={{ overflow: "hidden" }}>
                  <div className="border-bottom p-4">
                    <div className="container d-flex justify-content-between align-items-center">
                      <div className="d-flex gap-2 align-items-center">
                        <Link href={`/resources/${resource_id}/`}>
                          <a>
                            <ArrowLeftShort width="24px" />
                          </a>
                        </Link>
                        <h5 className="m-0 p-0">Answer Sheet</h5>
                      </div>
                      <div>
                        <Link
                          href={`/resources/${resource_id}/submissions?resource_node_id=${resource_node_id}`}
                        >
                          <a>
                            <Button className="btn-sm">View Submissions</Button>
                          </a>
                        </Link>
                      </div>
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
                        {resourceDetail?.data?.kind === "document_objective_answers" && (
                          <SemiOnlineForm
                            formData={formData}
                            handleFormData={handleFormData}
                            updateResource={updateResource}
                            buttonLoader={buttonLoader}
                          />
                        )}
                        {resourceDetail?.data?.kind === "document_subjective_answers" && (
                          <OfflineForm
                            formData={formData}
                            handleFormData={handleFormData}
                            updateResource={updateResource}
                            buttonLoader={buttonLoader}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-100 text-center text-muted py-5">No resource are available.</div>
              )}
            </>
          ) : (
            <div className="w-100 text-center text-muted py-5">Loading...</div>
          )}
        </AdminLayout>
      </Worker>
    </Page>
  );
};

export default withAdminTeacherAuth(ResourceAssessments);
