import React from "react";
// next imports
import { useRouter } from "next/router";
// react bootstrap
import { Container, Card, Tab, Nav, Row, Col } from "react-bootstrap";
// swr
import useSWR from "swr";
// layouts
import AdminLayout from "@layouts/adminLayout";
// components
import Page from "@components/page";
import ReportCreateView from "@components/reports/create";
import ReportEditView from "@components/reports/edit";
import ReportDeleteView from "@components/reports/delete";
// constants
import { META_DESCRIPTION } from "@constants/page";
// api services
import { APIFetcher } from "@lib/services";
// api routes
import { USER_REPORTS_WITH_USER_ID_ENDPOINT } from "@constants/routes";
// hoc
import withGlobalAuth from "@lib/hoc/withGlobalAuth";

const userAdminReportsView = () => {
  const router = useRouter();

  const user_id = router.query.user_id;
  const product_id = router.query.product_id;
  const product = router.query.product;

  const [userReports, setUserReports] = React.useState<any>();

  const report_tab_data = [
    { tab_key: "overview", tab_name: "Overview" },
    { tab_key: "performance", tab_name: "Performance" },
    { tab_key: "syllabus", tab_name: "Syllabus" },
    { tab_key: "behavior", tab_name: "Behavior" },
  ];
  const [tabKey, setTabKey] = React.useState<any>(report_tab_data[0].tab_key);

  const RenderTabContent = ({ view }: any) => {
    const [currentReports, setCurrentReports] = React.useState<any>();

    React.useEffect(() => {
      if (userReports && userReports.length > 0) {
        const currentElements: any = userReports.filter((element: any) => element.flags === view);
        if (currentElements && currentElements.length > 0) setCurrentReports(currentElements);
      }
    }, [view, userReports]);

    return (
      <div>
        {currentReports && currentReports.length > 0 ? (
          <>
            {currentReports.map((report: any, reportIndex: any) => (
              <div
                className="report-detail-card-container mb-2"
                style={{ border: "1px solid #ccc", borderRadius: "4px", padding: "8px 16px" }}
              >
                <div className="mb-2" style={{ fontSize: "16px" }}>
                  {report.report.content}
                </div>
                <div className="d-flex align-items-center flex-wrap" style={{ gap: "4px" }}>
                  <ReportEditView data={report} product={product_id} user={user_id} view={tabKey} />
                  <ReportDeleteView
                    data={report}
                    product={product_id}
                    user={user_id}
                    view={tabKey}
                  />
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="text-secondary mt-5 mb-5 text-center">No reports Under {view}.</div>
        )}
      </div>
    );
  };

  const meta = {
    title: "User Reports",
    description: META_DESCRIPTION,
  };

  const { data: reportList, error: reportListError } = useSWR(
    user_id ? USER_REPORTS_WITH_USER_ID_ENDPOINT(user_id) : null,
    APIFetcher,
    { refreshInterval: 0 }
  );

  React.useEffect(() => {
    if (reportList) setUserReports(reportList);
  }, [reportList]);

  return (
    <Page meta={meta}>
      <AdminLayout>
        <div className="right-layout">
          <h3 className="mb-3">{product && product}</h3>
          <div style={{ borderBottom: "1px solid red" }}></div>
          <div className="report-detail-wrapper">
            <Tab.Container
              id="profile-schema-component"
              defaultActiveKey={tabKey}
              onSelect={(k) => setTabKey(k)}
            >
              <Nav className="custom-nav-tabs-links profile-account-nav" variant="pills">
                {report_tab_data.map((item: any, index: any) => (
                  <Nav.Item className="profile-account-nav-item">
                    <Nav.Link key={`nav-item-${item.tab_key}`} eventKey={item.tab_key}>
                      {item.tab_name}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>

              <Tab.Content className="pt-3 pb-3">
                {!reportList && !reportListError ? (
                  <div className="text-secondary mt-5 mb-5 text-center">Loading...</div>
                ) : (
                  <>
                    <div className="d-flex mb-2 justify-content-end">
                      <div>
                        <ReportCreateView product={product_id} user={user_id} view={tabKey} />
                      </div>
                    </div>
                    {report_tab_data.map((item: any, index: any) => (
                      <Tab.Pane key={`tab-pane-${item.tab_key}`} eventKey={item.tab_key}>
                        <RenderTabContent view={item.tab_key} />
                      </Tab.Pane>
                    ))}
                  </>
                )}
              </Tab.Content>
            </Tab.Container>
          </div>
        </div>
      </AdminLayout>
    </Page>
  );
};

export default withGlobalAuth(userAdminReportsView);
