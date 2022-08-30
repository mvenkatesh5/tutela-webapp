import React from "react";
// next imports
import Link from "next/link";
import { useRouter } from "next/router";
import { NextPage } from "next";
import dynamic from "next/dynamic";
// material icons
import { ArrowLeftShort } from "@styled-icons/bootstrap/ArrowLeftShort";
// uuid
import { v4 as uuidV4 } from "uuid";
// react bootstrap
import { Row, Col, Form, Button } from "react-bootstrap";
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

  // const { data: resourceDetail, error: resourceDetailError } = useSWR(
  //   resource_node_id ? [RESOURCE_NODE_ENDPOINT(resource_node_id), resource_node_id] : null,
  //   (url) => APIFetcher(url),
  //   { refreshInterval: 0 }
  // );

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
          <div className="w-100 text-center text-muted py-5">Coming Soon</div>
        </div>
      </AdminLayout>
    </Page>
  );
};

export default withAdminTeacherAuth(ResourceSubmissions);
