import React from "react";
// bootstrap
import { ProgressBar } from "react-bootstrap";
// icons
import { Man } from "@styled-icons/icomoon/Man";

const ProgressBarElement = ({ percent }: any) => {
  return (
    <div className="custom-progress-bar">
      <div className="d-flex justify-content-end" style={{ width: `${percent }%` }}>
        <div className="text-muted d-flex align-items-center mb-2">
          <Man className="text-primary tw-w-7" />
          <div className="text-success fw-bold " style={{ whiteSpace: "nowrap" }}>
            {percent}%
          </div>
        </div>
      </div>
      <ProgressBar variant="success" className="rounded-pill" now={percent} />
    </div>
  );
};

export default ProgressBarElement;
