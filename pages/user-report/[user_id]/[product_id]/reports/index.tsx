import React from "react";
// next imports
import Link from "next/link";
import { useRouter } from "next/router";
// react bootstrap
import {
  Container,
  Badge,
  Card,
  Tab,
  Nav,
  Row,
  Col,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
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
} from "@constants/routes";
// hoc
import withGlobalAuth from "@lib/hoc/withGlobalAuth";

const ToolTip = ({ children, content, position = "right" }: any) => {
  return (
    <OverlayTrigger
      key={position}
      placement={position}
      overlay={<Tooltip id={`tooltip-${position}-${content}`}>{content}</Tooltip>}
    >
      <div>{children}</div>
    </OverlayTrigger>
  );
};

const CopyText = ({ children, text }: any) => {
  const [status, setStatus] = React.useState(false);

  const copyText = () => {
    navigator.clipboard.writeText(text);
    setStatus(true);
    setTimeout(() => {
      setStatus(false);
    }, 1000);
  };

  return <div onClick={copyText}>{status ? "Copied" : children}</div>;
};

const UserAdminReportsView = () => {
  const router = useRouter();

  const defaultImageUrl = "/default-image.png";

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

  const RenderTabContent = ({ view }: any) => {
    const [currentReports, setCurrentReports] = React.useState<any>();
    const [revealPin, setRevealPin] = React.useState<any>(null);

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
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex gap-2">
                    <div>{report.title && <h5 className="m-0 p-0">{report.title}</h5>}</div>
                    {revealPin === report.id && (
                      <>
                        <div>-</div>
                        <ToolTip
                          position="top"
                          content="Click here to copy the pin."
                          copyText={`${report?.pin}`}
                        >
                          <CopyText text={`${report?.pin}`}>
                            <b className="text-primary cursor-pointer">{report?.pin}</b>
                          </CopyText>
                        </ToolTip>
                      </>
                    )}
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <ToolTip position="top" content="Click here to copy the URL.">
                      <CopyText
                        text={`https://${window && window?.location?.host}/report-detail/${
                          report?.uuid
                        }`}
                      >
                        <small className="text-primary cursor-pointer">Copy</small>
                      </CopyText>
                    </ToolTip>
                    <Link
                      href={`https://${window && window?.location?.host}/report-detail/${
                        report?.uuid
                      }`}
                    >
                      <a target="_blank" className="text-primary">
                        <ToolTip position="top" content="Preview URL.">
                          {report?.uuid}
                        </ToolTip>
                      </a>
                    </Link>
                  </div>
                </div>

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
                    {report?.pin && (
                      <div>
                        <Button
                          variant="outline-secondary"
                          className="btn-sm"
                          onClick={() => setRevealPin(revealPin ? null : report.id)}
                        >
                          {revealPin == report.id ? "Hide Pin" : "Reveal Pin"}
                        </Button>
                      </div>
                    )}
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

  const meta = {
    title: "User Reports",
    description: META_DESCRIPTION,
  };

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

  const [currentUser, setCurrentUser] = React.useState<any>();
  const [userRole, setUserRole] = React.useState<any>();

  return (
    <Page meta={meta}>
      <AdminLayout>
        <div className="right-layout">
          {productDetail && (
            <div
              style={{
                padding: "40px 32px",
                backgroundColor: productDetail.color ? productDetail.color : "#000",
                color: "#fff",
                borderRadius: "6px",
                overflow: "hidden",
                gap: "10px",
              }}
              className="d-flex align-items-center"
            >
              <div>
                {/* user details */}
                {userDetailList && (
                  <div className="d-flex align-items-center mb-3" style={{ gap: "10px" }}>
                    {/* <div>
                      <ArrowLeftShort width="24" />
                    </div> */}
                    <div
                      style={{
                        border: "1px solid #ccc",
                        backgroundColor: "#ccc",
                        width: "34px",
                        height: "34px",
                        borderRadius: "50px",
                      }}
                    >
                      <img className="rounded-circle img-fluid" src={defaultImageUrl} />
                    </div>
                    <h6 className="m-0">{userDetailList.username}</h6>
                  </div>
                )}
                <h3>{productDetail.name}</h3>
                <p>{productDetail.description}</p>
              </div>
              {userProductResourceList && (
                <div className="ms-auto">
                  <div className="mb-3" style={{ fontWeight: 500 }}>
                    Mentor Details:
                  </div>
                  <h5 className="m-0 p-0">{getCurrentMentorDetails().name}</h5>
                </div>
              )}
            </div>
          )}

          <div className="report-detail-wrapper mt-3">
            <Tab.Container
              id="profile-schema-component"
              defaultActiveKey={tabKey}
              onSelect={(k) => setTabKey(k)}
            >
              <Nav className="custom-nav-tabs-links profile-account-nav" variant="pills">
                {report_tab_data.map((item: any, index: any) => {
                  if (true)
                    // if (userRole === "admin" && item.tab_key != "overview")
                    return (
                      <Nav.Item
                        key={`nav-item-${item.tab_key}`}
                        className="profile-account-nav-item"
                      >
                        <Nav.Link key={`nav-item-${item.tab_key}`} eventKey={item.tab_key}>
                          {item.tab_name}
                        </Nav.Link>
                      </Nav.Item>
                    );
                })}
              </Nav>

              {userRole && (userRole === "admin" || userRole === "teacher") && (
                <div className="d-flex mt-3 justify-content-end">
                  <div>
                    <Link href={`/user-report/${user_id}/${product_id}/reports/create`}>
                      <a>
                        <Button variant="primary" className="btn-sm">
                          Add Report
                        </Button>
                      </a>
                    </Link>
                  </div>
                </div>
              )}

              <Tab.Content className="pt-3 pb-3">
                {!reportList && !reportListError ? (
                  <div className="text-secondary mt-5 mb-5 text-center">Loading...</div>
                ) : (
                  <>
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

export default withGlobalAuth(UserAdminReportsView);
