import React from "react";
// icons
import { ChevronDown } from "@styled-icons/boxicons-solid/ChevronDown";
import { ChevronUp } from "@styled-icons/boxicons-solid/ChevronUp";
import { Circle } from "@styled-icons/entypo/Circle";
import { ThreeDots } from "@styled-icons/bootstrap/ThreeDots";

const Products = ({ data }: any) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="border rounded">
      <div className="p-3 pb-2 d-flex justify-content-between">
        <h6 className="text-muted">Products</h6>

        <div onClick={() => setOpen(!open)}>
          {open ? <ChevronUp width="16px" /> : <ChevronDown width="16px" />}
        </div>
      </div>
      {open && (
        <>
          <hr className="my-0" />
          <div className="p-3">
            <input
              type="text"
              className="w-100 border border-light p-1 px-2"
              placeholder="Search and add products"
            />

            {data &&
              data.map((products: any, index: any) => (
                <div
                  key={`Products-index-${index}`}
                  className="d-flex my-2 bg-light p-1 gap-2 align-items-center"
                >
                  <Circle className="text-success" width="16px" />
                  <div className="">{products.name}</div>

                  <div className="ms-auto d-flex gap-2 text-muted">
                    <ThreeDots width="16px" />
                    <ChevronDown width="14px" />
                  </div>
                </div>
              ))}
          </div>
          <div className=""></div>
        </>
      )}
    </div>
  );
};

export default Products;
