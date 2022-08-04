import React from "react";
// bootstrap
import { Col, Row, Image } from "react-bootstrap";
// icons
import { CheckCircleFill } from "@styled-icons/bootstrap/CheckCircleFill";

const SessionCard = ({ data, setSelected, selected, setStudentDetail }: any) => {
  return (
    <div
      onClick={() => {
        setSelected(data);
        setStudentDetail(data.students[0]);
      }}
      className={`my-4 p-2 rounded ${
        data.id === selected.id ? "border-primary alert alert-primary text-black" : "bg-light"
      }`}
    >
      <div className="d-flex align-items-start gap-3">
        <Image className="img-fluid rounded mt-1" src={data.image} width="40" alt="" />
        <div className="h-100">
          <div className="fw-medium text-lg">{data.name}</div>
          <div className="d-flex gap-2 mt-2">
            <div className="bg-muted rounded px-2 py-0 text-sm h-100">{data.timing}</div>
            {data.progress && (
              <>
                {data.progress == 10 ? (
                  <div className="alert alert-success p-0 px-1 text-sm mb-0 d-flex align-items-center gap-1">
                    <CheckCircleFill width="14px" />
                    <div>completed</div>
                  </div>
                ) : (
                  <div className="alert alert-warning p-0 px-1 text-sm mb-0">
                    {data.progress}/10
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      {data.id === selected.id && (
        <div className="mt-3">
          {data.topics &&
            data.topics.map((topic: any, index: any) => (
              <div
                key={`topic-student-product-${index}`}
                className="d-flex align-items-center gap-2 my-1"
              >
                <div className="p-2 h-100 bg-muted rounded"></div>
                <div className=" ">{topic.name}</div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
export default SessionCard;
