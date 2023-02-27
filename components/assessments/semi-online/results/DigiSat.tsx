import React from "react";
// next imports
import { useRouter } from "next/router";
// data
import { assessmentResultRenderGenerator } from "@components/data/digital-sat";
// react bootstrap
import { Table, Button } from "react-bootstrap";
// style icons
import { ArrowLeft } from "@styled-icons/fa-solid/ArrowLeft";
// global
import { datePreview, secondsToHms } from "@constants/global";
// swr
import useSWR from "swr";
// services
import {
  FetchEdisonAssessmentResult,
  EdisonUserAuthentication,
} from "@lib/services/resource.service";
import { APIFetcher } from "@lib/services";
// api routes
import { USER_WITH_ID_ENDPOINT } from "@constants/routes";

interface IResultPreview {
  resourceDetail: any;
  selectedUser?: number;
  user?: boolean;
}

export default function DigitalSAT({ resourceDetail, selectedUser, user }: IResultPreview) {
  const router = useRouter();

  const [loader, setLoader] = React.useState(false);
  const [assessmentResponse, setAssessmentResponse] = React.useState<any>();

  const [assessmentDetailPreview, setAssessmentDetailPreview] = React.useState<any>(null);

  const { data: userDetailList, error: userDetailListError } = useSWR(
    selectedUser ? USER_WITH_ID_ENDPOINT(selectedUser) : null,
    (url) => APIFetcher(url),
    { refreshInterval: 0 }
  );

  React.useEffect(() => {
    if (resourceDetail?.data?.kind === "digital_sat" && userDetailList) {
      setLoader(true);
      const payload = {
        email: userDetailList?.email,
        assessment_uuid: resourceDetail?.data?.sat_token,
        tenant_name: "digitalsat",
      };

      FetchEdisonAssessmentResult(payload)
        .then((response) => {
          setLoader(false);
          if (response && response?.assessment_sessions) {
            console.log("response from the EdisonAssessmentResult", response);
            setAssessmentResponse(assessmentResultRenderGenerator(response));
          }
        })
        .catch((error) => {
          console.log(error);
          setLoader(false);
        });
    }
  }, [resourceDetail?.data?.kind, resourceDetail?.data?.sat_token, userDetailList]);

  const RedirectToDetailedReport = (allotment: any) => {
    const payload = {
      allotment_id: allotment,
    };
    EdisonUserAuthentication(payload)
      .then((response) => {
        router.push(response?.redirect_url);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log("logging issues assessmentResponse", assessmentResponse);
  console.log("logging issues assessmentDetailPreview", assessmentDetailPreview);

  return (
    <>
      {assessmentResponse && assessmentResponse?.length > 0 ? (
        <>
          {assessmentDetailPreview != null ? (
            <>
              <div
                onClick={() => setAssessmentDetailPreview(null)}
                className="cursor-pointer d-flex gap-2 aline-items-center mb-2 text-primary"
              >
                <ArrowLeft width="16px" /> Go Back
              </div>
              <div className="w-100 mb-4">
                <h6 className="m-0 p-0 mb-2">User Answered Results</h6>
                <div className="d-flex gap-2">
                  <div className="border p-2 w-100 text-success">
                    <div style={{ fontSize: "26px", fontWeight: "bold" }}>
                      {assessmentDetailPreview?.total_correct}
                    </div>
                    <div>Correct Answers</div>
                  </div>
                  <div className="border p-2 w-100 text-danger">
                    <div style={{ fontSize: "26px", fontWeight: "bold" }}>
                      {assessmentDetailPreview?.total_incorrect}
                    </div>
                    <div>Wrong Answers</div>
                  </div>
                  <div className="border p-2 w-100 text-primary">
                    <div style={{ fontSize: "26px", fontWeight: "bold" }}>
                      {assessmentDetailPreview?.total_scaled_score}
                    </div>
                    <div>Total Score</div>
                  </div>
                </div>
              </div>

              <div className="w-100 mb-4">
                <h6 className="m-0 p-0 mb-2">Section Score</h6>
                <div className="d-flex gap-2">
                  <div className="border p-2 w-100">
                    <div
                      className="text-center mb-2"
                      style={{ fontSize: "19px", fontWeight: "bold" }}
                    >
                      Reading and Writing
                    </div>

                    <div className="d-flex justify-content-around">
                      <div style={{ fontSize: "20px" }}>
                        Scaled score :{" "}
                        <strong>
                          <strong>
                            {assessmentDetailPreview?.sectional_score?.reading?.total_scaled_score +
                              assessmentDetailPreview?.sectional_score?.writing?.total_scaled_score}
                          </strong>
                        </strong>
                      </div>
                      <div style={{ fontSize: "20px" }}>
                        Raw score :{" "}
                        <strong>
                          {assessmentDetailPreview?.sectional_score?.reading?.total_score +
                            assessmentDetailPreview?.sectional_score?.writing?.total_score}
                        </strong>
                      </div>
                    </div>
                  </div>

                  <div className="border p-2 w-100">
                    <div
                      className="text-center mb-2"
                      style={{ fontSize: "19px", fontWeight: "bold" }}
                    >
                      Maths
                    </div>

                    <div className="d-flex justify-content-around">
                      <div style={{ fontSize: "20px" }}>
                        Scaled score :{" "}
                        <strong>
                          {assessmentDetailPreview?.sectional_score?.math?.total_scaled_score}
                        </strong>
                      </div>
                      <div style={{ fontSize: "20px" }}>
                        Raw score :{" "}
                        <strong>
                          {assessmentDetailPreview?.sectional_score?.math?.total_score}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-100 mb-4">
                <h6 className="m-0 p-0 mb-2">Overall Details</h6>
                <div className="d-flex gap-2">
                  <div className="border p-2 w-100">
                    <div style={{ fontSize: "26px", fontWeight: "bold" }}>
                      {assessmentDetailPreview?.total_questions}
                    </div>
                    <div style={{ fontSize: "16px" }}>Number of questions</div>
                  </div>
                  <div className="border p-2 w-100">
                    <div style={{ fontSize: "26px", fontWeight: "bold" }}>
                      {assessmentDetailPreview?.total_answered}
                    </div>
                    <div>Answered</div>
                  </div>
                  <div className="border p-2 w-100">
                    <div style={{ fontSize: "26px", fontWeight: "bold" }}>
                      {assessmentDetailPreview?.total_unanswered}
                    </div>
                    <div>Unanswered</div>
                  </div>
                </div>
              </div>

              {user && (
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => {
                    RedirectToDetailedReport(assessmentDetailPreview.allotment);
                  }}
                >
                  View detail report
                </Button>
              )}
            </>
          ) : (
            <>
              <div className="w-100 text-center text-muted py-3">
                <Table bordered style={{ whiteSpace: "nowrap" }}>
                  <thead>
                    <tr>
                      <th>S.no</th>
                      <th>Submitted at</th>
                      <th>Total answered</th>
                      <th>Total Correct</th>
                      <th>Total Time</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assessmentResponse && assessmentResponse.length > 0 ? (
                      <>
                        {assessmentResponse.map((_assessmentData: any, index: any) => (
                          <tr key={index}>
                            <th>{index + 1}</th>
                            <td>{datePreview(_assessmentData.submitted_at)}</td>
                            <td>{_assessmentData.total_answered}</td>
                            <td>{_assessmentData.total_correct}</td>
                            <td>{secondsToHms(_assessmentData.total_time)}</td>
                            <td>
                              <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() => {
                                  setAssessmentDetailPreview(_assessmentData);
                                }}
                              >
                                View details
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </>
                    ) : (
                      <div className="w-100 text-center text-muted py-5">
                        No user responses are available.
                      </div>
                    )}
                  </tbody>
                </Table>
              </div>
            </>
          )}
        </>
      ) : (
        <div className="text-center">{loader ? "loading..." : "No attempts were made"}</div>
      )}
    </>
  );
}
