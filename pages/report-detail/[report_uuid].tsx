import React from "react";
// next imports
import { useRouter } from "next/router";
// react bootstrap
import { Button, Container, Image, Form, Row, Col, Badge } from "react-bootstrap";
// swr
import useSWR from "swr";
// constants
import { META_DESCRIPTION } from "@constants/page";
// components
import Page from "@components/page";
import { SlateEditor } from "@components/SlateEditor";
// api routes
import { USER_REPORT_UUID_VERIFICATION } from "@constants/routes";
// api services
import { APIPublicFetcher } from "@lib/services";
import { UserReportPinConfirmation } from "@lib/services/public.reports.service";

const meta = {
  title: "User Report",
  description: META_DESCRIPTION,
};

const ReportDetail = () => {
  const router = useRouter();
  const { report_uuid } = router.query;

  const { data: reportConfirmation, error: reportConfirmationError } = useSWR(
    report_uuid ? [USER_REPORT_UUID_VERIFICATION(report_uuid), report_uuid] : null,
    report_uuid ? (url) => APIPublicFetcher(url[0]) : null,
    { refreshInterval: 0 }
  );

  const [reportDetail, setReportDetail] = React.useState<any>(null);
  const [reportPin, setReportPin] = React.useState("");

  const isNumeric = (str: any) => {
    if (typeof str != "string") return false;
    return !isNaN(Number(str)) && !isNaN(parseFloat(str));
  };

  const onReportPinSubmit = () => {
    if (reportPin) {
      if (isNumeric(reportPin)) {
        const reportPayload = {
          uuid: report_uuid,
          payload: {
            pin: reportPin,
          },
        };
        setReportDetail({ type: "report-loading" });
        UserReportPinConfirmation(reportPayload)
          .then((response) => {
            console.log(response);
            setReportDetail({ type: "report", data: response?.data });
          })
          .catch((error) => {
            console.log(error);
            setReportDetail({ type: "report-error", content: error?.error });
          });
      } else setReportDetail({ type: "report-error", content: "Please enter a valid pin." });
    } else setReportDetail({ type: "report-error", content: "Please enter your pin." });
  };

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
    <Page meta={meta}>
      <div className="shadow-sm d-flex align-items-center" style={{ height: "60px" }}>
        <Container fluid className="px-5">
          <Image src="/logo.svg" alt="" height="30px" />
        </Container>
      </div>

      <Container fluid className="px-5">
        {reportConfirmationError || reportConfirmation ? (
          <>
            {reportConfirmationError?.error ? (
              <div className="text-center text-muted mt-5 mb-5">
                Please check your email and access the shared URL.
              </div>
            ) : (
              <div className="pt-5 pb-5 relative">
                {!reportDetail?.data ? (
                  <div className="d-flex justify-content-center align-items-center">
                    <div
                      className="shadow-sm py-3 px-3 border"
                      style={{ width: "100%", maxWidth: "500px", borderRadius: "4px" }}
                    >
                      <h6 className="m-0 p-0">Please enter pin.</h6>
                      <Form.Group className="py-3">
                        <Form.Label className="mb-1 text-muted">Enter you pin here.</Form.Label>
                        <Form.Control
                          value={reportPin}
                          onChange={(e) => setReportPin(e.target.value)}
                          type="text"
                          required
                        />
                        {reportDetail?.type === "report-error" && (
                          <Form.Text className="text-danger">{reportDetail?.content}</Form.Text>
                        )}
                      </Form.Group>
                      <Button
                        className="w-100 rounded-2 shadow-sm mb-3"
                        variant="primary"
                        type="button"
                        disabled={reportDetail?.type === "report-loading"}
                        onClick={onReportPinSubmit}
                      >
                        {reportDetail?.type === "report-loading"
                          ? "Verifying your pin..."
                          : "Continue"}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    {" "}
                    <div
                      className="mb-3"
                      style={{
                        border: "1px solid #e2e2e2",
                        padding: "16px",
                        borderRadius: "4px",
                      }}
                    >
                      <div>
                        {reportDetail?.data?.title && (
                          <h5 className="m-0 p-0">{reportDetail?.data?.title}</h5>
                        )}
                      </div>

                      {reportDetail?.data?.report?.content && (
                        <div className="mt-3">
                          <h6>General Report</h6>
                          {renderSlateContent(reportDetail?.data?.report?.content) && (
                            <div className="mb-3">
                              <SlateEditor
                                readOnly={true}
                                initialValue={renderSlateContent(
                                  reportDetail?.data?.report?.content
                                )}
                              />
                            </div>
                          )}
                        </div>
                      )}

                      {reportDetail?.data?.performance?.content && (
                        <div className="mt-3">
                          <h6>Performance Report</h6>
                          {renderSlateContent(reportDetail?.data?.performance?.content) && (
                            <div className="mb-3">
                              <SlateEditor
                                readOnly={true}
                                initialValue={renderSlateContent(
                                  reportDetail?.data?.performance?.content
                                )}
                              />
                            </div>
                          )}
                        </div>
                      )}

                      {reportDetail?.data?.syllabus?.content && (
                        <div className="mt-3">
                          <h6>Syllabus</h6>
                          {renderSlateContent(reportDetail?.data?.syllabus?.content) && (
                            <div className="mb-3">
                              <SlateEditor
                                readOnly={true}
                                initialValue={renderSlateContent(
                                  reportDetail?.data?.syllabus?.content
                                )}
                              />
                            </div>
                          )}
                        </div>
                      )}

                      {reportDetail?.data?.behavior?.content && (
                        <div className="mt-3">
                          <h6>Behavior</h6>
                          {renderSlateContent(reportDetail?.data?.behavior?.content) && (
                            <div className="mb-3">
                              <SlateEditor
                                readOnly={true}
                                initialValue={renderSlateContent(
                                  reportDetail?.data?.behavior?.content
                                )}
                              />
                            </div>
                          )}
                        </div>
                      )}

                      {reportDetail?.data?.report?.test_details &&
                        reportDetail?.data?.report?.test_details.length > 0 && (
                          <div className="mb-3">
                            <h6>Test Details</h6>
                            <Row className="ms-1 me-1">
                              {reportDetail?.data?.report?.test_details.map(
                                (element: any, index: any) => (
                                  <Col key={`report-test-details-${index}`} md={3} className="ps-0">
                                    <div
                                      style={{
                                        border: "1px solid #e2e2e2",
                                        marginBottom: "10px",
                                        padding: "10px 12px",
                                        borderRadius: "4px",
                                      }}
                                    >
                                      <h5 className="m-0 p-0 mb-2">
                                        {element.name ? element.name : ""}
                                      </h5>
                                      <div>
                                        <Badge className="bg-info">
                                          {element.date ? element.date : ""}
                                        </Badge>
                                        <Badge className="bg-info ms-2">
                                          {element.score ? element.score : ""}
                                        </Badge>
                                      </div>
                                    </div>
                                  </Col>
                                )
                              )}
                            </Row>
                          </div>
                        )}
                    </div>
                  </div>
                )}
                {/* rendering the report */}
              </div>
            )}
          </>
        ) : (
          <div className="text-center text-muted mt-5 mb-5">Loading...</div>
        )}
      </Container>
    </Page>
  );
};

export default ReportDetail;
