import React from "react";
// icons
import { ChevronDown } from "@styled-icons/boxicons-solid/ChevronDown";
import { ChevronUp } from "@styled-icons/boxicons-solid/ChevronUp";
import { Circle } from "@styled-icons/entypo/Circle";
import { ThreeDots } from "@styled-icons/bootstrap/ThreeDots";

const Products = ({ productsList }: any) => {
  const [open, setOpen] = React.useState(false);

  const Card = ({ product }: any) => {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <div className="bg-light rounded mb-1">
          <div className="d-flex my-2 bg-light rounded p-1 px-2 gap-2 align-items-center">
            <Circle className="text-success flex-shrink-0" width="16px" />
            <div className="text-truncate">{product.product.name}</div>
            <div className="ms-auto d-flex gap-2 text-muted">
              <div
                onClick={() => {
                  setOpen(!open);
                }}
                className="cursor-pointer"
              >
                <ChevronDown width="14px" />
              </div>
            </div>
          </div>
          {open && (
            <>
              <hr className="my-0" />
              <div className="p-2 d-flex flex-wrap gap-3">
                <div>
                  <span className="text-muted">Progress:</span>{" "}
                  <span className="text-success">{product?.progress || 0}%</span>
                </div>
                <div>
                  <span className="text-muted">Join date: </span>{" "}
                  <span>{product?.join_date || "-"}</span>
                </div>
                <div>
                  <span className="text-muted">Completion date: </span>{" "}
                  <span>{product?.completion_date || "-"}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="border rounded">
      <div className="p-3 pb-2 d-flex justify-content-between">
        <h6 className="text-muted">Products</h6>

        <div className="cursor-pointer" onClick={() => setOpen(!open)}>
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

            {productsList &&
              productsList.length > 0 &&
              productsList.map((product: any, index: any) => (
                <div key={`Products-index-${index}`}>
                  <Card product={product} />
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
