import React from "react";
// next imports
import { useRouter } from "next/router";
import Link from "next/link";
// swr
import useSWR from "swr";
// layouts
import StudentLayout from "@layouts/studentLayout";
// components
import Page from "@components/page";
import ReportEditView from "@components/reports/edit";
// constants
import { META_DESCRIPTION } from "@constants/page";
// api services
import { APIFetcher } from "@lib/services";
// api routes
import { USER_REPORTS_WITH_ID_ENDPOINT } from "@constants/routes";
// hoc
import withTeacherAuth from "@lib/hoc/withTeacherAuth";

const ReportCreate = () => {
  const meta = {
    title: "User Report Create",
    description: META_DESCRIPTION,
  };

  const router = useRouter();

  const report_id = router.query.report_id;

  const { data: reportList, error: reportListError } = useSWR(
    report_id ? USER_REPORTS_WITH_ID_ENDPOINT(report_id) : null,
    APIFetcher,
    { refreshInterval: 0 }
  );

  console.log("reportList", reportList);

  return (
    <Page meta={meta}>
      <StudentLayout>
        <div className="container mt-3 mb-3">
          <div className="pb-3">
            <Link href={`/reports`}>
              <a>Back to reports</a>
            </Link>
          </div>
          {!reportList && !reportListError ? (
            <div className="mt-5 text-center text-muted">Loading...</div>
          ) : (
            <div>{reportList && <ReportEditView data={reportList} />}</div>
          )}
        </div>
      </StudentLayout>
    </Page>
  );
};

export default withTeacherAuth(ReportCreate);
