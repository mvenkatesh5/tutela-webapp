import React from "react";
// next imports
import { useRouter } from "next/router";
import Link from "next/link";
// react bootstrap
import { Container, Badge, Card, Tab, Nav, Row, Col } from "react-bootstrap";
// material icons
import { ArrowLeftShort } from "@styled-icons/bootstrap/ArrowLeftShort";
// swr
import useSWR from "swr";
// layouts
import AdminLayout from "@layouts/adminLayout";
// components
import Page from "@components/page";
import ReportCreateView from "@components/reports/create";
import ReportEditView from "@components/reports/edit";
import ReportDeleteView from "@components/reports/delete";
import ReportStatusView from "@components/reports/status";
import { SlateEditor } from "@components/SlateEditor";
// cookie
import { getAuthenticationToken } from "@lib/cookie";
// constants
import { META_DESCRIPTION } from "@constants/page";
// api services
import { APIFetcher } from "@lib/services";
// api routes
import {
  USER_REPORTS_WITH_USER_ID_ENDPOINT,
  PRODUCTS_WITH_ID_ENDPOINT,
  USER_ENDPOINT,
  USER_WITH_ID_ENDPOINT,
  USER_PRODUCT_RESOURCE_VIEW_ENDPOINT,
  USER_REPORTS_WITH_ID_ENDPOINT,
} from "@constants/routes";
// hoc
import withGlobalAuth from "@lib/hoc/withGlobalAuth";

const ReportCreate = () => {
  const meta = {
    title: "User Report Create",
    description: META_DESCRIPTION,
  };

  const router = useRouter();

  const user_id = router.query.user_id;
  const product_id = router.query.product_id;
  const report_id = router.query.report_id;

  const { data: reportList, error: reportListError } = useSWR(
    report_id ? USER_REPORTS_WITH_ID_ENDPOINT(report_id) : null,
    APIFetcher,
    { refreshInterval: 0 }
  );

  console.log("reportList", reportList);

  return (
    <Page meta={meta}>
      <AdminLayout>
        <div className="right-layout">
          <div className="pb-3">
            <Link href={`/user-report/${user_id}/${product_id}/reports`}>
              <a>Back to reports</a>
            </Link>
          </div>
          <div>
            {reportList && <ReportEditView data={reportList} product={product_id} user={user_id} />}
          </div>
        </div>
      </AdminLayout>
    </Page>
  );
};

export default withGlobalAuth(ReportCreate);
