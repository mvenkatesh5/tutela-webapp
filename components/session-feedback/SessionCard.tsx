import React from "react";
// next imports
import { useRouter } from "next/router";
// bootstrap
import { Col, Row, Image } from "react-bootstrap";
// icons
import { CheckCircleFill } from "@styled-icons/bootstrap/CheckCircleFill";
// global imports
import { datePreview } from "@constants/global";

const SessionCard = ({ data, currentSession, setStudentDetail }: any) => {
  const router = useRouter();

  return (
    <div
      onClick={() => {
        router.replace(
          `/session-feedback?session=${data?.id}${
            data?.session_users.length > 0 && `&user=${data.session_users[0].user.id}`
          }`,
          undefined,
          { shallow: true }
        );
      }}
      className={`my-2 p-2 rounded cursor-pointer ${
        data.id == currentSession
          ? "border-primary alert alert-primary text-black"
          : "bg-light border border-transparent"
      }`}
    >
      <div className="d-flex align-items-start gap-3">
        <Image className="img-fluid rounded mt-1" src={"/bird.svg"} width="40" alt="" />
        <div className="h-100">
          <div className="fw-medium text-sm">{data.title}</div>
          <div className="d-flex gap-2 mt-2">
            <div className="bg-muted rounded px-2 py-0 text-xs h-100">
              {datePreview(data.start_datetime)}
            </div>
            {/* <div className="alert alert-warning p-0 rounded text-xs">8/10</div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default SessionCard;
