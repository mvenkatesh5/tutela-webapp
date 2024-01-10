import React from "react";
// bootstrap
import { Table } from "react-bootstrap";
// icons
import { TimeFive } from "@styled-icons/boxicons-solid/TimeFive";
import { TimesCircle } from "@styled-icons/fa-solid/TimesCircle";
import { CheckCircle } from "@styled-icons/fa-solid/CheckCircle";

const AttendanceTable = ({ attendanceData }: any) => {
  return (
    <div className="border overflow-auto rounded custom-table ">
      <table className="mb-0 responsive" >
        <thead className="bg-light">
          <tr className="my-3 tw-text-lg">
            <th className="text-center">#</th>
            <th>Topic</th>
            <th>Date of Completion</th>
            <th>Rewards</th>
            <th>Attendance</th>
            <th>Teacher</th>
            <th>Product</th>
            <th>
              <div className="mb-1 p-2">...</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {attendanceData &&
            attendanceData.length > 0 &&
            attendanceData.map((data: any, index: any) => (
              <tr key={`attendanceData-key-${index}`}>
                <td className="text-center">{index + 1}</td>
                <td className="fw-bold">{data.topic}</td>
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <div className="p-auto pt-1 rounded-1 tw-bg-gray-300 tw-leading-3 tw-text-center tw-h-10 tw-w-10">
                      <h6 className="m-0 p-0 fw-bold">1</h6>
                      <small className="tw-text-xs">Mon</small>
                    </div>
                    {data.date_of_completion}
                  </div>
                </td>
                <td>{data.rewards}</td>
                <td>
                  {data.attendance == "present" ? (
                    <div className="d-flex align-items-center text-success gap-2">
                      <CheckCircle width="14px" />
                      Present
                    </div>
                  ) : data.attendance == "late" ? (
                    <div className="d-flex align-items-center text-warning gap-2">
                      <TimeFive width="14px" />
                      Late
                    </div>
                  ) : (
                    <div className="d-flex align-items-center text-danger gap-2">
                      <TimesCircle width="14px" />
                      Absent
                    </div>
                  )}
                </td>
                <td>{data.teacher}</td>
                <td>{data.product}</td>
                <td></td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;
