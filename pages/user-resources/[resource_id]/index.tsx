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
import ResourceView from "@components/resources/userRender";
import ResourceNotesView from "@components/notes/view";
const PDFRenderView = dynamic(import("@components/pdfRender"), { ssr: false });
// layouts
import StudentNotesLayout from "@layouts/studentNotesLayout";
import StudentV2Layout from "@layouts/v2/student/layout";
// cookie
import { getAuthenticationToken } from "@lib/cookie";
// api routes
import {
  RESOURCE_WITH_NODE_ENDPOINT,
  USER_RESOURCE_WITH_ID_ENDPOINT,
  USER_NOTES_ENDPOINT,
} from "@constants/routes";
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
  const resource_id = router.query.resource_id;

  const [tokenDetails, setTokenDetails] = React.useState<any>();
  React.useEffect(() => {
    if (getAuthenticationToken()) {
      let details: any = getAuthenticationToken();
      details = details ? JSON.parse(details) : null;
      if (details) {
        setTokenDetails(details);
      }
    }
  }, []);

  const [notesToggle, setNotesToggle] = React.useState<any>("");
  const handleNotesToggle = (tree: any) => {
    setPdfToggle("");
    if (tree.id === notesToggle.id) setNotesToggle("");
    else setNotesToggle(tree);
  };

  const [pdfToggle, setPdfToggle] = React.useState<any>("");
  const handlePdfToggle = (pdfObject: any) => {
    setNotesToggle("");
    if (pdfObject.id === pdfToggle.id) setPdfToggle("");
    else setPdfToggle(pdfObject);
  };

  const { data: resourceNode, error: resourceNodeError } = useSWR(
    resource_id ? USER_RESOURCE_WITH_ID_ENDPOINT(resource_id) : null,
    (url) => APIFetcher(url),
    { refreshInterval: 0 }
  );

  const { data: resourceDetail, error: resourceDetailError } = useSWR(
    resourceNode ? RESOURCE_WITH_NODE_ENDPOINT(resourceNode.resource_node) : null,
    (url) => APIFetcher(url),
    { refreshInterval: 0 }
  );

  const { data: notes, error: notesError } = useSWR(
    notesToggle && notesToggle.id && resourceNode && resourceNode.id
      ? [USER_NOTES_ENDPOINT(resourceNode.id, notesToggle.id), resourceNode.id, notesToggle.id]
      : null,
    notesToggle && notesToggle.id && resourceNode && resourceNode.id
      ? (url) => APIFetcher(url[0])
      : null,
    { refreshInterval: 0 }
  );

  const meta = {
    title: "User Resource Details",
    description: META_DESCRIPTION,
  };

  // const LayoutFilter = ({ children }: any) => {
  //   if (userRole === "student")
  //     return <StudentV2Layout page="calendar">{children}</StudentV2Layout>;
  //   else return <AdminLayout>{children}</AdminLayout>;
  // };

  return (
    <Page meta={meta}>
      <div>
        <Head>
          <title>Resources</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
          <StudentNotesLayout
            notesToggle={notesToggle}
            pdfToggle={pdfToggle}
            right={
              <>
                {notesToggle && (
                  <ResourceNotesView
                    resourceNode={resourceNode}
                    user={tokenDetails}
                    tree={notesToggle}
                    handleNotesToggle={handleNotesToggle}
                    notes={notes}
                  />
                )}
              </>
            }
            rightPdfBlock={
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
                    <div className="pdf-content">
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
            {!resourceDetail ? (
              <div className="text-center mt- 5 mb-5">Loading.....</div>
            ) : (
              <div>
                <Container className="pt-3 pb-3">
                  <h5 className="mb-4">
                    Resource {resourceDetail && resourceDetail.tree[0].data.title}
                  </h5>
                  {resourceDetail &&
                  resourceDetail.tree &&
                  resourceDetail.tree.length > 0 &&
                  resourceDetail.tree[0] &&
                  resourceDetail.tree[0].children ? (
                    <ResourceView
                      data={resourceDetail.tree[0].children}
                      root_node_id={resource_id}
                      currentProduct={resourceDetail}
                      resourceNode={resourceNode}
                      user={tokenDetails}
                      notesToggle={notesToggle}
                      handleNotesToggle={handleNotesToggle}
                      pdfToggle={pdfToggle}
                      handlePdfToggle={handlePdfToggle}
                    />
                  ) : (
                    <div className="mt-4 mb-4 text-center text-secondary">
                      No Resources are available.
                    </div>
                  )}
                </Container>
              </div>
            )}
          </StudentNotesLayout>
        </Worker>
      </div>
    </Page>
  );
};

export default withStudentAuth(ResourceTreeView);
