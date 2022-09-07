import React from "react";
// bootstrap
import { ProgressBar } from "react-bootstrap";
// icons
import { EmojiPeople } from "@styled-icons/material-rounded/EmojiPeople";

const ProgressBarElement = ({ percent }: any) => {
  return (
    <div className="custom-progress-bar">
      <div className="d-flex justify-content-end" style={{ width: `${10}%` }}>
        {/* <div className="d-flex justify-content-end" style={{ width: `${percent}%` }}> */}
        <div className="text-muted ms-auto d-flex align-items-center">
          {/* <EmojiPeople className="text-primary" width="16px" /> */}
          <div className="text-success fw-bold" style={{ whiteSpace: "nowrap" }}>
            {percent}% Coming soon...
          </div>
        </div>
      </div>
      <ProgressBar variant="success" className="rounded-pill" now={percent} />
    </div>
  );
};

export default ProgressBarElement;
