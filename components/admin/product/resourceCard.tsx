import React from "react";
// icons
import { Folder } from "@styled-icons/boxicons-solid/Folder";
import { CaretDownFill } from "@styled-icons/bootstrap/CaretDownFill";
// components
import ResourceViewCard from "./resourceViewCard";

const ResourceCard = ({ data }: any) => {
  const [show, setShow] = React.useState(false);
  return (
    <>
      <div onClick={() => setShow(!show)} className="border rounded p-2 w-100 cursor-pointer">
        <div className="d-flex d-flex align-items-center gap-2 text-muted">
          <CaretDownFill width="12px" />
          <Folder width="20px" />
          <div>{data.title}</div>
        </div>

        {show && <ResourceViewCard resource_id={data.id} data={data} />}
      </div>
    </>
  );
};
export default ResourceCard;
