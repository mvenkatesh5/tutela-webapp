import { TimesCircle } from "@styled-icons/fa-solid/TimesCircle";
import { CheckCircle } from "@styled-icons/fa-solid/CheckCircle";
import { returnDate, returnSingleDate, returnSingleMonth } from "@constants/global";

const AttendanceView = ({ tableData }: any) => {
  return (
    <div className="border overflow-auto rounded custom-table mt-5">
      <table className="mb-0 responsive">
        <thead className="bg-light">
          <tr className="my-3 tw-text-lg">
            <th className="text-center">#</th>
            <th>Topic</th>
            <th>Date of Completion</th>
            <th>Rewards</th>
            <th>Attendance</th>
            <th>Teacher</th>
          </tr>
        </thead>
        <tbody>
          {tableData?.length > 0 ? (
            tableData.map((data: any, index: any) => (
              <tr key={`attendanceData-key-${index}`}>
                <td className="text-center">{index + 1}</td>
                <td className="fw-bold">{data?.title}</td>
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <div className="my-auto rounded-1 tw-flex tw-justify-center tw-items-center tw-flex-col tw-bg-gray-300 tw-leading-3 tw-text-center tw-h-14 tw-w-14">
                      <>
                        <h6 className="m-0 p-0 fw-bold">
                          {returnSingleDate(data?.end_time || new Date())}
                        </h6>
                        <small className="tw-text-xs">
                          {returnSingleMonth(data?.end_time || new Date())}
                        </small>
                      </>
                    </div>
                    {returnDate(data?.end_time)}
                  </div>
                </td>
                <td>{data?.reward}</td>
                <td>
                  {data?.is_going ? (
                    <div className="d-flex align-items-center text-success gap-2">
                      <CheckCircle width="14px" />
                      Present
                    </div>
                  ) : (
                    <div className="d-flex align-items-center text-danger gap-2">
                      <TimesCircle width="14px" />
                      Absent
                    </div>
                  )}
                </td>
                <td>
                  {data?.teacher.map((teacher: any) => (
                    <>
                      <span> {teacher?.first_name}</span> <span> {teacher?.last_name}, </span>
                    </>
                  ))}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="tw-text-center">
                <p className="tw-w-full tw-text-center tw-font-bold">No data to display</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceView;
