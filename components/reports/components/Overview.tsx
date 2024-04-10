import CompletedGrade from "@components/new/CompleteGraph";
import { SlateEditor } from "@components/SlateEditor";
import { RenderSlateContent } from "@lib/utils";
import ProgressBarElement from "@components/new/ProgressBar";
import { Card, Col, Form, Row } from "react-bootstrap";
import { returnDateWithText, returnSingleMonth, returnSingleYear } from "@constants/global";

const Overview = ({ reports, userAttendanceData, classesPerWeek, startDate }: any) => {
  return (
    <div className="mt-3">
      {userAttendanceData &&
        userAttendanceData?.conducted_classes.length ==
          userAttendanceData?.total_available_classes && (
          <Card className="shadow border-0 p-5 my-4 mb-5 relative overflow-hidden">
            <div className="icon-complete-circle"></div>
            <h2 className="">Congratulations!! You completed the program.</h2>
            <div className="text-dark tw-text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </div>
            <div className="d-flex gap-4 mt-5">
              <div className="tw-text-lg">
                <span className="text-muted">Join date: </span>{" "}
                {returnDateWithText(userAttendanceData?.session_wise_attendance?.[0]?.end_time)}
              </div>
              <div className="tw-text-lg">
                <span className="text-muted">Completion date: </span>{" "}
                {returnDateWithText(
                  userAttendanceData?.session_wise_attendance?.[
                    userAttendanceData?.session_wise_attendance?.length - 1
                  ]?.end_time
                )}
              </div>
            </div>
          </Card>
        )}

      <div className="position-relative">
        <h2 className="tw-text-black tw-mb-6">Syllabus completion</h2>
        <ProgressBarElement
          percent={
            userAttendanceData
              ? (
                  (userAttendanceData?.conducted_classes.length * 100) /
                  userAttendanceData?.total_available_classes
                ).toFixed(2)
              : 0
          }
        />
      </div>

      {userAttendanceData?.session_wise_attendance?.[0] && (
        <div className="d-flex justify-content-between align-items-center mt-2">
          <small className="text-muted">
            {returnDateWithText(userAttendanceData?.session_wise_attendance?.[0]?.end_time)}
          </small>

          {userAttendanceData?.conducted_classes.length ==
            userAttendanceData?.total_available_classes && (
            <small className="text-muted">23 May 2024</small>
          )}
        </div>
      )}

      <Row className="mt-5">
        <Col xs={12} md={9} className="p-3">
          <CompletedGrade classesPerWeek={classesPerWeek} />
        </Col>
        <Col xs={12} md={3}>
          <div className="position-relative mb-4">
            <h3 className="mb-0">{userAttendanceData?.conducted_classes?.length}</h3>
            <div className="mb-3 text-muted">Classes happening/week</div>
            <div className="d-flex gap-2 mb-4">
              <div className="px-3  bg-success" />
              <small className="">Planned Progress</small>
            </div>
            <hr />
          </div>
        </Col>
      </Row>

      {reports.length > 0 ? (
        reports.map((report: any) => (
          <>
            <div className="position-relative">
              <h2 className="tw-text-black">{report?.title}</h2>
              {report?.report?.content && (
                <div className="mt-3">
                  <h6>General Report</h6>
                  {RenderSlateContent(report?.report?.content) && (
                    <div className="mb-3">
                      <SlateEditor
                        readOnly={true}
                        initialValue={RenderSlateContent(report?.report?.content)}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        ))
      ) : (
        <div className="relative tw-p-7 tw-text-center tw-w-full">No Reports to display</div>
      )}
    </div>
  );
};

export default Overview;
