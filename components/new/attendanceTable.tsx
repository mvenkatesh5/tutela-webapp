import React from "react";
// bootstrap
import { Table } from "react-bootstrap";
// icons
import { TimeFive } from "@styled-icons/boxicons-solid/TimeFive";
import { TimesCircle } from "@styled-icons/fa-solid/TimesCircle";
import { CheckCircle } from "@styled-icons/fa-solid/CheckCircle";

const AttendanceTable = ({ attendanceData }: any) => {
  return (
    <div className="border overflow-auto rounded custom-table">
      <table className="mb-0">
        <thead className="bg-light">
          <tr className="my-3">
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
                <td>{data.topic}</td>
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <small className="bg-light p-1 d-flex flex-column align-items-center rounded">
                      <div>1</div>
                      <div className="text-xs">Monday</div>
                    </small>
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
