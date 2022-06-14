import React from "react";
// bootstrap
import { Dropdown } from "react-bootstrap";
// icons
import { ChevronDown } from "@styled-icons/boxicons-solid/ChevronDown";

const DropdownElement = ({ children, name }: any) => {
  return (
    <div className="" style={{ width: "180px" }}>
      <Dropdown>
        <Dropdown.Toggle as="div" bsPrefix="p-0">
          <button className="btn btn-outline-secondary d-flex justify-content-between align-items-center w-100 ">
            {name}
            <ChevronDown width="16px" />
          </button>
        </Dropdown.Toggle>
        <Dropdown.Menu className="p-0 mt-1">{children}</Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default DropdownElement;
