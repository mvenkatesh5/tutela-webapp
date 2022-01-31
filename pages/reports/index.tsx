import React from "react";
// next imports
import Link from "next/link";
// react bootstrap
import { Container, Button, Badge, Row, Col, Form, Tab, Nav, Modal, Image } from "react-bootstrap";
// swr
import useSWR, { mutate } from "swr";
// components
import Page from "@components/page";
import { SlateEditor } from "@components/SlateEditor";
import ReportsForm from "@components/reports/reportsForm";
// layouts
import StudentLayout from "@layouts/studentLayout";
// cookie
import { getAuthenticationToken } from "@lib/cookie";
// api routes
import { MENTOR_REPORT_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher, APIPusherWithData } from "@lib/services";
import { ReportEdit } from "@lib/services/report.service";
// hoc
import withTeacherAuth from "@lib/hoc/withTeacherAuth";
// constants
import { META_DESCRIPTION } from "@constants/page";

const TeacherReport = () => {
  const meta = {
    title: "User Reports",
    description: META_DESCRIPTION,
  };

  const defaultImageUrl = "/default-image.png";

  const report_tab_data = [
    { tab_key: "unpublished", tab_name: "Un Published" },
    { tab_key: "published", tab_name: "Published" },
  ];

  const [tabKey, setTabKey] = React.useState<any>(report_tab_data[0].tab_key);

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

  const { data: mentorReportsList, error: mentorReportsListError } = useSWR(
    tabKey && currentUser && currentUser.user && currentUser.user.id
      ? [MENTOR_REPORT_ENDPOINT, tabKey]
      : null,
    (url) =>
      APIPusherWithData(url, {
        mentor_id: currentUser.user.id,
        publish: tabKey === "published" ? true : false,
      }),
    { refreshInterval: 0 }
  );

  const [reportLoader, setReportLoader] = React.useState<any>(false);

  const [reportEditModalContent, setReportEditModalContent] = React.useState<any>();

  const [reportEditModal, setReportEditModal] = React.useState<any>(false);
  const openReportModal = (report: any) => {
    setReportEditModal(true);
    setReportEditModalContent({
      id: report.id,
      content: report.report && report.report.content ? report.report.content : "",
      test_details: report.report && report.report.test_details ? report.report.test_details : [],
    });
  };
  const closeReportModal = () => {
    setReportEditModal(false);
    setReportEditModalContent("");
  };

  const updateReport = (e: any) => {
    e.preventDefault();

    setReportLoader(true);

    const payload = {
      id: reportEditModalContent.id,
      report: {
        content: reportEditModalContent.content,
        test_details: reportEditModalContent.test_details,
      },
    };

    ReportEdit(payload)
      .then((res) => {
        mutate([MENTOR_REPORT_ENDPOINT, tabKey]);
        closeReportModal();
        setReportLoader(false);
      })
      .catch((error) => {
        setReportLoader(false);
      });
  };

  const RenderTabItem = ({ content, type }: any) => {
    const [buttonLoader, setButtonLoader] = React.useState<any>(false);

    const reportUpdate = (id: any, approved: any) => {
      const payload = {
        id: id,
        is_approved: approved,
      };

      setButtonLoader(id);

      ReportEdit(payload)
        .then((res) => {
          setButtonLoader(null);
          mutate([MENTOR_REPORT_ENDPOINT, tabKey]);
        })
        .catch((error) => {
          setButtonLoader(null);
        });
    };

    const renderSlateContent = (value: any) => {
      if (value.length > 0 && Array.isArray(value)) {
        return value;
      } else {
        return [
          {
            type: "paragraph",
            children: [{ text: value.length > 0 ? value : "" }],
          },
        ];
      }
    };

    return (
      <div>
        {content.map((element: any, index: any) => (
          <div
            key={`element-${index}`}
            className="mb-3"
            style={{
              border: "1px solid #e2e2e2",
              padding: "16px 20px",
              borderRadius: "4px",
            }}
          >
            {element.user && (
              <div className="d-flex align-items-center mb-2" style={{ gap: "10px" }}>
                <div
                  style={{
                    border: "1px solid #ccc",
                    backgroundColor: "#ccc",
                    width: "25px",
                    height: "25px",
                    borderRadius: "50px",
                  }}
                >
                  <Image alt="" className="rounded-circle img-fluid" src={defaultImageUrl} />
                </div>
                <h6 className="m-0" style={{ fontSize: "14px" }}>
                  {element.user.username} ({element.user.email})
                </h6>
                <div>
                  <Badge className="bg-success">{element.product.name}</Badge>
                </div>
                <div>
                  <Badge className="bg-secondary">{element.flags}</Badge>
                </div>
                <div className="ms-auto">
                  <Link href={`/reports/${element.id}`}>
                    <a>
                      <Button
                        variant="outline-secondary"
                        className="btn-sm"
                        // onClick={() => openReportModal(element)}
                      >
                        Edit
                      </Button>
                    </a>
                  </Link>
                </div>
                <div className="ml-2">
                  <Button
                    className="btn-sm"
                    onClick={() => reportUpdate(element.id, type == "published" ? false : true)}
                    disabled={buttonLoader === element.id}
                  >
                    {buttonLoader === element.id
                      ? "Processing..."
                      : type == "published"
                      ? "Unpublish"
                      : "Publish"}
                  </Button>
                </div>
              </div>
            )}

            {element?.title && <h4>{element?.title}</h4>}

            {element?.report?.content && (
              <div className="mt-3">
                <h6>General Report</h6>
                {renderSlateContent(element?.report?.content) && (
                  <div className="mb-3">
                    <SlateEditor
                      readOnly={true}
                      initialValue={renderSlateContent(element?.report?.content)}
                    />
                  </div>
                )}
              </div>
            )}

            {element?.performance?.content && (
              <div className="mt-3">
                <h6>Performance Report</h6>
                {renderSlateContent(element?.performance?.content) && (
                  <div className="mb-3">
                    <SlateEditor
                      readOnly={true}
                      initialValue={renderSlateContent(element?.performance?.content)}
                    />
                  </div>
                )}
              </div>
            )}

            {element?.syllabus?.content && (
              <div className="mt-3">
                <h6>Syllabus</h6>
                {renderSlateContent(element?.syllabus?.content) && (
                  <div className="mb-3">
                    <SlateEditor
                      readOnly={true}
                      initialValue={renderSlateContent(element?.syllabus?.content)}
                    />
                  </div>
                )}
              </div>
            )}

            {element?.behavior?.content && (
              <div className="mt-3">
                <h6>Behavior</h6>
                {renderSlateContent(element?.behavior?.content) && (
                  <div className="mb-3">
                    <SlateEditor
                      readOnly={true}
                      initialValue={renderSlateContent(element?.behavior?.content)}
                    />
                  </div>
                )}
              </div>
            )}

            {element.report.test_details && element.report.test_details.length > 0 && (
              <div>
                <h6>Test Details</h6>
                <Row className="ms-1 me-1">
                  {element.report.test_details.map((element: any, index: any) => (
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
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <Page meta={meta}>
        <>
          <StudentLayout>
            <Container>
              <h5 className="mt-4 mb-3">Student Reports</h5>

              <Tab.Container
                id="profile-schema-component"
                defaultActiveKey={tabKey}
                onSelect={(k) => setTabKey(k)}
              >
                <Nav className="custom-nav-tabs-links profile-account-nav" variant="pills">
                  {report_tab_data.map((item: any, index: any) => {
                    if (true)
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

                <Tab.Content className="pt-3 pb-3">
                  {!mentorReportsList && !mentorReportsListError ? (
                    <div className="text-secondary mt-5 mb-5 text-center">Loading...</div>
                  ) : (
                    <>
                      <Tab.Pane eventKey={`published`}>
                        {mentorReportsList && mentorReportsList.length > 0 ? (
                          <div>
                            <RenderTabItem content={mentorReportsList} type={`published`} />
                          </div>
                        ) : (
                          <div>No published reports</div>
                        )}
                      </Tab.Pane>
                      <Tab.Pane eventKey={`unpublished`}>
                        {mentorReportsList && mentorReportsList.length > 0 ? (
                          <div>
                            <RenderTabItem content={mentorReportsList} type={`unpublished`} />
                          </div>
                        ) : (
                          <div>No un-published reports</div>
                        )}
                      </Tab.Pane>
                    </>
                  )}
                </Tab.Content>
              </Tab.Container>
            </Container>
          </StudentLayout>

          <Modal
            show={reportEditModal}
            size="lg"
            onHide={closeReportModal}
            centered
            backdrop={"static"}
          >
            <Modal.Body>
              <Form onSubmit={updateReport}>
                <h5 className="mb-3">Edit Report</h5>
                {reportEditModalContent && (
                  <div>
                    <ReportsForm
                      data={reportEditModalContent}
                      handleData={setReportEditModalContent}
                    />
                    <Button
                      variant="outline-primary"
                      className="btn-sm"
                      type="submit"
                      style={{ marginRight: "10px" }}
                      disabled={reportLoader}
                    >
                      {reportLoader ? "Updating Report..." : "Update Report"}
                    </Button>
                    <Button
                      variant="outline-secondary"
                      className="btn-sm"
                      onClick={closeReportModal}
                    >
                      Close
                    </Button>
                  </div>
                )}
              </Form>
            </Modal.Body>
          </Modal>
        </>
      </Page>
    </>
  );
};

export default withTeacherAuth(TeacherReport);
