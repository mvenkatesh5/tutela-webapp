import React from "react";
// react bootstrap
import { Dropdown } from "react-bootstrap";

const MultiSelectDropdown = ({ data, name }: any) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
        {name}
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ maxHeight: "150px" }} className="px-3 overflow-auto mt-1">
        {data &&
          data.map((data: any, index: any) => (
            <div
              key={`dropdown-data-menu-${index}`}
              className="d-flex align-items-center gap-3 my-2"
            >
              <input type="checkbox" /> <div>{data.name}</div>
            </div>
          ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default MultiSelectDropdown;
