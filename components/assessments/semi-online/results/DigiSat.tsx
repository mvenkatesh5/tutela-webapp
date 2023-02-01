import React from "react";
// next imports
import dynamic from "next/dynamic";
// components
// data
import { digitalSatData } from "@components/data/digital-sat";
// react bootstrap
import { Table, Button } from "react-bootstrap";
// style icons
import { ArrowLeft } from "@styled-icons/fa-solid/ArrowLeft";
// global
import { datePreview, secondsToHms } from "@constants/global";
// swr
import useSWR from "swr";
// services
import { FetchEdisonAssessmentResult } from "@lib/services/resource.service";
import { APIFetcher } from "@lib/services";
// api routes
import { USER_WITH_ID_ENDPOINT } from "@constants/routes";

interface IResultPreview {
  resourceDetail: any;
  selectedUser?: number;
}

export default function DigitalSAT({ resourceDetail, selectedUser }: IResultPreview) {
  const [assessmentResponse, setAssessmentResponse] = React.useState<any>();
  const [loader, setLoader] = React.useState(false);
  const [resultMode, setResultMode] = React.useState(false);
  const [selectedData, setSelectedData] = React.useState<any>();

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
          setAssessmentResponse(response?.assessment_sessions);
          setLoader(false);
        })
        .catch((error) => {
          console.log(error);
          setLoader(false);
        });
    }
  }, [resourceDetail?.data?.kind]);

  const getSection = (type: string) => {
    let newSection: number = 0;
    newSection =
      selectedData?.section_info_data?.info?.find((data: any) =>
        data?.info?.name?.toLowerCase().includes(type)
      )?.section || 0;
    return newSection;
  };

  return (
    <>
      {assessmentResponse && assessmentResponse?.length > 0 ? (
        <>
          {resultMode ? (
            <>
              <div
                onClick={() => setResultMode(false)}
                className="cursor-pointer d-flex gap-2 aline-items-center mb-2 text-primary"
              >
                <ArrowLeft width="16px" /> Go Back
              </div>

              <div className="w-100 mb-4">
                <h6 className="m-0 p-0 mb-2">User Answered Results</h6>
                <div className="d-flex gap-2">
                  <div className="border p-2 w-100 text-success">
                    <div style={{ fontSize: "26px", fontWeight: "bold" }}>
                      {selectedData?.total_correct}
                    </div>
                    <div>Correct Answers</div>
                  </div>
                  <div className="border p-2 w-100 text-danger">
                    <div style={{ fontSize: "26px", fontWeight: "bold" }}>
                      {selectedData?.total_incorrect}
                    </div>
                    <div>Wrong Answers</div>
                  </div>
                  <div className="border p-2 w-100 text-primary">
                    <div style={{ fontSize: "26px", fontWeight: "bold" }}>
                      {digitalSatData?.reading[
                        getSection("reading") !== 0
                          ? selectedData?.section_score_data[getSection("reading")] || 0
                          : 0
                      ] +
                        digitalSatData?.writing[
                          getSection("writing") !== 0
                            ? selectedData?.section_score_data[getSection("writing")] || 0
                            : 0
                        ] +
                        digitalSatData?.maths[
                          getSection("maths") !== 0
                            ? selectedData?.section_score_data[getSection("maths")] || 0
                            : 0
                        ]}
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
                      Reading
                    </div>

                    <div className="d-flex justify-content-around">
                      <div style={{ fontSize: "20px" }}>
                        Scaled score :{" "}
                        <strong>
                          {
                            digitalSatData?.reading[
                              getSection("reading") !== 0
                                ? selectedData?.section_score_data[getSection("reading")] || 0
                                : 0
                            ]
                          }{" "}
                        </strong>
                      </div>
                      <div style={{ fontSize: "20px" }}>
                        Raw score :{" "}
                        <strong>
                          {selectedData?.section_score_data[getSection("reading")] || 0}
                        </strong>
                      </div>
                    </div>
                  </div>
                  <div className="border p-2 w-100">
                    <div
                      className="text-center mb-2"
                      style={{ fontSize: "19px", fontWeight: "bold" }}
                    >
                      Writing
                    </div>

                    <div className="d-flex justify-content-around">
                      <div style={{ fontSize: "20px" }}>
                        Scaled score :{" "}
                        <strong>
                          {
                            digitalSatData?.writing[
                              getSection("writing") !== 0
                                ? selectedData?.section_score_data[getSection("writing")] || 0
                                : 0
                            ]
                          }{" "}
                        </strong>
                      </div>
                      <div style={{ fontSize: "20px" }}>
                        Raw score :{" "}
                        <strong>
                          {selectedData?.section_score_data[getSection("writing")] || 0}
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
                          {
                            digitalSatData?.maths[
                              getSection("maths") !== 0
                                ? selectedData?.section_score_data[getSection("maths")] || 0
                                : 0
                            ]
                          }{" "}
                        </strong>
                      </div>
                      <div style={{ fontSize: "20px" }}>
                        Raw score :{" "}
                        <strong>
                          {selectedData?.section_score_data[getSection("maths")] || 0}
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
                      {selectedData?.total_questions}
                    </div>
                    <div style={{ fontSize: "16px" }}>Number of questions</div>
                  </div>
                  <div className="border p-2 w-100">
                    <div style={{ fontSize: "26px", fontWeight: "bold" }}>
                      {selectedData?.total_answered}
                    </div>
                    <div>Answered</div>
                  </div>
                  <div className="border p-2 w-100">
                    <div style={{ fontSize: "26px", fontWeight: "bold" }}>
                      {selectedData?.total_unanswered}
                    </div>
                    <div>Unanswered</div>
                  </div>
                </div>
              </div>
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
                        {assessmentResponse.map((data: any, index: any) => (
                          <tr key={index}>
                            <th>{index + 1}</th>
                            <td>{datePreview(data.submitted_at)}</td>
                            <td>{data.total_answered}</td>
                            <td>{data.total_correct}</td>
                            <td>{secondsToHms(data.total_time)}</td>
                            <td>
                              <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() => {
                                  setSelectedData(data);
                                  setResultMode(true);
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
                        No users are attached.
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
