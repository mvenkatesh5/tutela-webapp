import React from "react";
// next imports
import Link from "next/link";
// react bootstrap
import { Container, Button } from "react-bootstrap";
// style icons
import { Warning } from "@styled-icons/material-rounded/Warning";

const WarningPopup = (props: any) => {
  return (
    <>
      <Link href={props.href}>
        <a>
          <div className="trail-message-box-container">
            <div className="toast-icon">
              <Warning />
            </div>
            <div className="toast-text">{props.children}</div>
            <div className="toast-button">
              <Button variant="primary" className="btn-sm">
                Go to Profile
              </Button>
            </div>
          </div>
        </a>
      </Link>
    </>
  );
};

export default WarningPopup;
