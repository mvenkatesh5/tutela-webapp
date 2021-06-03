import React from "react";
// react bootstrap
import { Button } from "react-bootstrap";
// style icons
import { Warning } from "@styled-icons/entypo/Warning";

const WarningPopup = () => {
  return (
    <>
      <div className="container">
        <div className=" trail-message-box-container">
          <Warning className="icon m-3" />
          <div className="text p-3">Please fill up your profile.</div>
        </div>
      </div>
    </>
  );
};

export default WarningPopup;
