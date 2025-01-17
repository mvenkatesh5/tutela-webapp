import React from "react";
// next imports
import Head from "next/head";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
// material icons
import { Times } from "@styled-icons/fa-solid/Times";
// react bootstrap
import { Container, Button } from "react-bootstrap";
// swr
import useSWR from "swr";
// pdf worker
import { Worker } from "@react-pdf-viewer/core";
// components
import ResourceView from "@components/resources/treeStructure/view";
import ResourceCreateView from "@components/resources/treeStructure/create";
const PDFRenderView = dynamic(import("@components/pdfRender"), { ssr: false });
import AttachAssessmentUsers from "@components/assessments/users/AttachAssessmentUsers";
// layouts
import PdfViewerLayout from "@layouts/pdfViewerLayout";
// api routes
import { RESOURCE_WITH_NODE_ENDPOINT, TAGS_ENDPOINT, USER_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";
// hoc
import withAdminTeacherAuth from "@lib/hoc/withAdminTeacherAuth";
// components
import Page from "@components/page";
// constants
import { META_DESCRIPTION } from "@constants/page";

const ResourceTreeView = () => {
  const router = useRouter();

  const resource_id = router.query.resource_id;

  const [pdfToggle, setPdfToggle] = React.useState<any>("");
  const handlePdfToggle = (pdfObject: any) => {
    if (pdfObject.id === pdfToggle.id) setPdfToggle("");
    else setPdfToggle(pdfObject);
  };

  const [assessmentUserData, setAssessmentUserData] = React.useState<any>(null);
  const handleAssessmentUserData = (data: any) => {
    setAssessmentUserData(data);
  };

  const { data: productCategory, error: productCategoryError } = useSWR(
    resource_id ? RESOURCE_WITH_NODE_ENDPOINT(resource_id) : null,
    (url) => APIFetcher(url),
    { refreshInterval: 0 }
  );

  const { data: users, error: usersError } = useSWR(USER_ENDPOINT, APIFetcher);
  const { data: tags, error: tagsError } = useSWR(TAGS_ENDPOINT, APIFetcher);

  const meta = {
    title: "Resources Details",
    description: META_DESCRIPTION,
  };

  return (
    <Page meta={meta}>
      <div>
        <Head>
          <title>Resources</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
          <PdfViewerLayout
            pdfToggle={pdfToggle}
            right={
              <>
                {pdfToggle && pdfToggle.data && pdfToggle.data.data && (
                  <div className="pdf-wrapper">
                    <div className="pdf-header">
                      <div className="pdf-title">
                        PDF READER{" "}
                        <small className="text-secondary">( {pdfToggle.data.title} )</small>
                      </div>
                      <div className="toggle-icon" onClick={() => handlePdfToggle(pdfToggle)}>
                        <Times />
                      </div>
                    </div>
                    <div className="pdf-content" style={{ position: "relative" }}>
                      <PDFRenderView
                        pdf_url={pdfToggle.data.data.url}
                        pdfToggle={pdfToggle}
                        handlePdfToggle={handlePdfToggle}
                      />
                    </div>
                  </div>
                )}
              </>
            }
          >
            {!productCategory ? (
              <div className="text-center mt- 5 mb-5">Loading.....</div>
            ) : (
              <div className="right-layout">
                <Container>
                  {productCategory &&
                  productCategory.tree &&
                  productCategory.tree.length > 0 &&
                  productCategory.tree[0] &&
                  productCategory.tree[0].children ? (
                    <>
                      <h5>Resource {productCategory.tree[0].data.title}</h5>
                      <ResourceView
                        data={productCategory.tree[0].children}
                        admin={true}
                        check={false}
                        isDrag={true}
                        root_node_id={resource_id}
                        currentProduct={productCategory}
                        pdfToggle={pdfToggle}
                        handlePdfToggle={handlePdfToggle}
                        tags={tags}
                        handleAssessmentUserData={handleAssessmentUserData}
                      />
                    </>
                  ) : (
                    <div className="mt-4 mb-4 text-center text-secondary">
                      No Resources are available.
                    </div>
                  )}
                  <ResourceCreateView
                    data={{ id: resource_id }}
                    root_node_id={resource_id}
                    add_to="children"
                  >
                    <Button
                      variant="outline-secondary"
                      className="mb-2 btn-sm resource-tree-create-button"
                    >
                      New Folder
                    </Button>
                  </ResourceCreateView>
                </Container>
              </div>
            )}
          </PdfViewerLayout>
        </Worker>
      </div>
      {assessmentUserData && (
        <AttachAssessmentUsers
          resource={assessmentUserData}
          handleAssessmentUserData={handleAssessmentUserData}
          users={users}
        />
      )}
    </Page>
  );
};

export default withAdminTeacherAuth(ResourceTreeView);
