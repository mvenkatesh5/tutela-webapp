import React from "react";
// next imports
import Link from "next/link";
import { useRouter } from "next/router";
// bootstrap
import { Form, Row, Col, Badge, Button } from "react-bootstrap";
// swr
import useSWR from "swr";
// constants
import { META_DESCRIPTION } from "@constants/page";
// cookie
import { getAuthenticationToken } from "@lib/cookie";
// components
import Page from "@components/page";
import ReportHeader from "@components/new/ReportHeader";
import Dropdown from "@components/new/Dropdown";
import ProgressBarElement from "@components/new/ProgressBar";
import ReportStatusView from "@components/reports/status";
import ReportDeleteView from "@components/reports/delete";
import { SlateEditor } from "@components/SlateEditor";
// api services
import { APIFetcher } from "@lib/services";
// api routes
import {
  USER_REPORTS_WITH_USER_ID_ENDPOINT,
  PRODUCTS_WITH_ID_ENDPOINT,
  USER_ENDPOINT,
  USER_WITH_ID_ENDPOINT,
  USER_PRODUCT_RESOURCE_VIEW_ENDPOINT,
} from "@constants/routes";
// layout
import NewLayout from "@layouts/newLayout";

const ProductReport = () => {
  const meta = {
    title: "Product Report",
    description: META_DESCRIPTION,
  };
  const router = useRouter();

  const defaultImageUrl = "/default-image.png";

  const [currentUser, setCurrentUser] = React.useState<any>();
  const [userRole, setUserRole] = React.useState<any>();

  React.useEffect(() => {
    if (getAuthenticationToken()) {
      let details: any = getAuthenticationToken();
      details = details ? JSON.parse(details) : null;
      if (details) {
        setCurrentUser(details);
        if (details.info.role === 2) setUserRole("admin");
        else if (details.info.role === 1) setUserRole("teacher");
        else if (details.info.role === 3) setUserRole("parent");
        else setUserRole("student");
      }
    }
  }, []);

  const user_id = router.query.user_id;
  const product_id = router.query.product_id;
  const product = router.query.product;

  const [userReports, setUserReports] = React.useState<any>();

  const report_tab_data = [
    { tab_key: "overview", tab_name: "Reports" },
    // { tab_key: "performance", tab_name: "Performance" },
    // { tab_key: "syllabus", tab_name: "Syllabus" },
    // { tab_key: "behavior", tab_name: "Behavior" },
  ];
  const [tabKey, setTabKey] = React.useState<any>(report_tab_data[0].tab_key);

  const { data: userDetailList, error: userDetailListError } = useSWR(
    user_id ? USER_WITH_ID_ENDPOINT(user_id) : null,
    (url) => APIFetcher(url),
    { refreshInterval: 0 }
  );

  const { data: userProductResourceList, error: userProductListError } = useSWR(
    user_id ? USER_PRODUCT_RESOURCE_VIEW_ENDPOINT(user_id) : null,
    (url) => APIFetcher(url),
    { refreshInterval: 0 }
  );

  const { data: productDetail, error: productDetailError } = useSWR(
    product_id ? PRODUCTS_WITH_ID_ENDPOINT(product_id) : null,
    APIFetcher,
    { refreshInterval: 0 }
  );

  const { data: reportList, error: reportListError } = useSWR(
    user_id ? USER_REPORTS_WITH_USER_ID_ENDPOINT(user_id) : null,
    APIFetcher,
    { refreshInterval: 0 }
  );

  React.useEffect(() => {
    if (reportList) setUserReports(reportList);
  }, [reportList]);

  // console.log("userDetailList", userDetailList);
  // console.log("userProductResourceList", userProductResourceList);
  // console.log("productDetail", productDetail);
  console.log("reportList", reportList);

  const getCurrentMentorDetails = () => {
    if (
      userProductResourceList &&
      userProductResourceList.product_users &&
      userProductResourceList.product_users.length > 0
    ) {
      const currentMentor = userProductResourceList.product_users.filter(
        (element: any) => element.product.id == product_id
      );

      if (currentMentor && currentMentor.length == 1)
        return {
          name:
            currentMentor[0].mentor && currentMentor[0].mentor.username
              ? currentMentor[0].mentor.username
              : "",
          email:
            currentMentor[0].mentor && currentMentor[0].mentor.email
              ? currentMentor[0].mentor.email
              : "",
        };
    }
    return {
      name: "",
      email: "",
    };
  };

  const RenderTabContent = ({ view }: any) => {
    const [currentReports, setCurrentReports] = React.useState<any>();

    React.useEffect(() => {
      if (userReports && userReports.length > 0) {
        let currentElements: any;
        if (view === "overview") {
          currentElements = userReports.filter((element: any) =>
            ["performance", "syllabus", "behavior"].includes(element.flags)
          );
        } else {
          currentElements = userReports.filter((element: any) => element.flags === view);
        }
        if (currentElements && currentElements.length > 0) setCurrentReports(currentElements);
      }
    }, [view, userReports]);

    const renderSlateContent = (value: any) => {
      if (value && value.length > 0 && Array.isArray(value)) {
        return value;
      } else {
        return [
          {
            type: "paragraph",
            children: [{ text: value && value.length > 0 ? value : "" }],
          },
        ];
      }
    };

    return (
      <div>
        {currentReports && currentReports.length > 0 ? (
          <>
            {currentReports.map((report: any, reportIndex: any) => (
              <div
                key={`reports-${report.id}`}
                className="mb-3"
                style={{
                  border: "1px solid #e2e2e2",
                  padding: "16px",
                  borderRadius: "4px",
                }}
              >
                {report.title && <h4>{report.title}</h4>}

                {report?.report?.content && (
                  <div className="mt-3">
                    <h6>General Report</h6>
                    {renderSlateContent(report?.report?.content) && (
                      <div className="mb-3">
                        <SlateEditor
                          readOnly={true}
                          initialValue={renderSlateContent(report?.report?.content)}
                        />
                      </div>
                    )}
                  </div>
                )}

                {report?.performance?.content && (
                  <div className="mt-3">
                    <h6>Performance Report</h6>
                    {renderSlateContent(report?.performance?.content) && (
                      <div className="mb-3">
                        <SlateEditor
                          readOnly={true}
                          initialValue={renderSlateContent(report?.performance?.content)}
                        />
                      </div>
                    )}
                  </div>
                )}

                {report?.syllabus?.content && (
                  <div className="mt-3">
                    <h6>Syllabus</h6>
                    {renderSlateContent(report?.syllabus?.content) && (
                      <div className="mb-3">
                        <SlateEditor
                          readOnly={true}
                          initialValue={renderSlateContent(report?.syllabus?.content)}
                        />
                      </div>
                    )}
                  </div>
                )}

                {report?.behavior?.content && (
                  <div className="mt-3">
                    <h6>Behavior</h6>
                    {renderSlateContent(report?.behavior?.content) && (
                      <div className="mb-3">
                        <SlateEditor
                          readOnly={true}
                          initialValue={renderSlateContent(report?.behavior?.content)}
                        />
                      </div>
                    )}
                  </div>
                )}

                {report.report.test_details && report.report.test_details.length > 0 && (
                  <div className="mb-3">
                    <h6>Test Details</h6>
                    <Row className="ms-1 me-1">
                      {report.report.test_details.map((element: any, index: any) => (
                        <Col key={`report-test-details-${index}`} md={3} className="ps-0">
                          <div
                            style={{
                              border: "1px solid #e2e2e2",
                              marginBottom: "10px",
                              padding: "10px 12px",
                              borderRadius: "4px",
                            }}
                          >
                            <h5 className="m-0 p-0 mb-2">{element.name ? element.name : ""}</h5>
                            <div>
                              <Badge className="bg-info">{element.date ? element.date : ""}</Badge>
                              <Badge className="bg-info ms-2">
                                {element.score ? element.score : ""}
                              </Badge>
                            </div>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </div>
                )}

                {userRole && userRole === "admin" && (
                  <div className="d-flex align-items-center" style={{ gap: "10px" }}>
                    <div>
                      <ReportStatusView
                        data={report}
                        product={product_id}
                        user={user_id}
                        view={tabKey}
                      />
                    </div>
                    <div>
                      <Link href={`/user-report/${user_id}/${product_id}/reports/${report.id}`}>
                        <a>
                          <Button variant="outline-secondary" className="btn-sm">
                            Edit
                          </Button>
                        </a>
                      </Link>
                    </div>
                    <div>
                      <ReportDeleteView
                        data={report}
                        product={product_id}
                        user={user_id}
                        view={tabKey}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </>
        ) : (
          <div className="text-secondary mt-5 mb-5 text-center">No reports Under {view}.</div>
        )}
      </div>
    );
  };

  return (
    <Page meta={meta}>
      <NewLayout sidebar={false}>
        {userDetailList && productDetail ? (
          <>
            <ReportHeader
              userDetailList={userDetailList}
              productDetail={productDetail}
              mentor={getCurrentMentorDetails()}
            />
            <div className="container mx-auto mt-5">
              <h5 className="fw-bold">Syllabus completion </h5>
              <div></div>
              <ProgressBarElement percent={75} />

              <div className="d-flex justify-content-between align-items-center mt-2">
                <div className="text-muted">23 Jan 2022</div>
                <div className="text-muted">23 May 2022</div>
              </div>
              <div className="d-flex gap-3 pt-4 mb-4">
                <div>
                  <Form.Group className="mb-3">
                    <Form.Control type="date" required />
                  </Form.Group>
                </div>

                <Dropdown name="overview">
                  <div className="bg-light px-2 py-1">Overview</div>
                </Dropdown>
              </div>

              {/* <h5 className="mt-4 fw-bold">Mathematics</h5>
              <div className="text-muted">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </div>
              <h5 className="mt-5 fw-bold">Physics</h5>
              <div className="text-muted">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </div> */}
              {report_tab_data.map((item: any, index: any) => (
                <div key={`report-tab-data-${item.tab_key}`}>
                  <RenderTabContent view={item.tab_key} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center">loading...</div>
        )}
      </NewLayout>
    </Page>
  );
};

export default ProductReport;
