import React from "react";
// next imports
import dynamic from "next/dynamic";
// components
import RenderOmr from "@components/assessments/semi-online/OmrRender";
const PDFRenderView = dynamic(import("@components/pdfRender"), { ssr: false });

interface IResultPreview {
  resourceDetail: any;
  omrData: any;
  results: any;
}

export default function ResultPreview({ resourceDetail, omrData, results }: IResultPreview) {
  return (
    <>
      {results && (
        <>
          <div className="w-100 mb-4">
            <h6 className="m-0 p-0 mb-2">Overall Score</h6>
            <div className="d-flex gap-2">
              <div className="border p-2 w-100">
                <div style={{ fontSize: "26px", fontWeight: "bold" }}>
                  {results?.totalQuestions}
                </div>
                <div style={{ fontSize: "16px" }}>Number of questions</div>
              </div>
              <div className="border p-2 w-100">
                <div style={{ fontSize: "26px", fontWeight: "bold" }}>
                  {results?.totalQuestions - results?.omitted}
                </div>
                <div>Answered</div>
              </div>
              <div className="border p-2 w-100">
                <div style={{ fontSize: "26px", fontWeight: "bold" }}>{results?.omitted}</div>
                <div>Un Answered</div>
              </div>
            </div>
          </div>

          <div className="w-100 mb-4">
            <h6 className="m-0 p-0 mb-2">User Answered Results</h6>
            <div className="d-flex gap-2">
              <div className="border p-2 w-100 text-success">
                <div style={{ fontSize: "26px", fontWeight: "bold" }}>{results?.correctAns}</div>
                <div>Correct Answers</div>
              </div>
              <div className="border p-2 w-100 text-danger">
                <div style={{ fontSize: "26px", fontWeight: "bold" }}>{results?.wrongAns}</div>
                <div>Wrong Answers</div>
              </div>
            </div>
          </div>

          <div className="w-100 mb-4 d-flex flex-column">
            <h6 className="m-0 p-0">Note:</h6>
            <small className="text-success">
              <b>Green: Represents a correct answer</b>
            </small>
            <small className="text-danger">
              <b>Red: Represents a wrong answer</b>
            </small>
            <small className="text-primary">
              <b>Blue: Represents a actual answer</b>
            </small>
          </div>

          <div className="w-100 mb-4">
            <h6 className="m-0 p-0">Question wise summary</h6>
            <div className="mt-3 d-flex relative w-100" style={{ height: "650px" }}>
              <div className="w-100 h-100">
                {resourceDetail?.data?.url && <PDFRenderView pdf_url={resourceDetail?.data?.url} />}
              </div>
              <div>
                <RenderOmr
                  render_key={`answer_data`}
                  data={omrData}
                  noOfQuestionInARow={100}
                  disabled={true}
                  validity={true}
                  userResponse={results}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
