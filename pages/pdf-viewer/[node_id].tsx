import React from "react";
import dynamic from "next/dynamic";
// next imports
import Head from "next/head";
import { useRouter } from "next/router";
// react bootstrap
import { Container } from "react-bootstrap";
// swr
import useSWR from "swr";
// pdf worker
import { Worker } from "@react-pdf-viewer/core";
// components
const PDFRenderView = dynamic(import("@components/pdfRender"), { ssr: false });
// layouts
import AdminLayout from "@layouts/adminLayout";
// api routes
import { RESOURCE_NODE_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";
// hoc
import withGlobalAuth from "@lib/hoc/withGlobalAuth";

const PdfRender = () => {
  const router = useRouter();
  const node_id: any = router.query.node_id;

  const { data: nodeDetail, error: nodeDetailError } = useSWR(
    node_id ? RESOURCE_NODE_ENDPOINT(node_id) : null,
    (url) => APIFetcher(url),
    { refreshInterval: 0 }
  );

  return (
    <div>
      <Head>
        <title>Pdf Render</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AdminLayout>
        <div className="right-layout">
          <Container>
            {!nodeDetailError && !nodeDetail ? (
              <div className="text-center text-muted mt-5 mb-5">Loading...</div>
            ) : (
              <div>
                {nodeDetail.data.url && (
                  <div>
                    <h5 className="mt-3 mb-3">{nodeDetail.title}</h5>
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
                      <PDFRenderView pdf_url={nodeDetail.data.url} />
                    </Worker>
                  </div>
                )}
              </div>
            )}
          </Container>
        </div>
      </AdminLayout>
    </div>
  );
};

export default withGlobalAuth(PdfRender);
