import React from "react";
// components
import AddResource from "@components/admin/product/AddResource";
import ProductResourceStrategy from "@components/admin/product/ProductResourceStrategy";
import ResourceCard from "@components/admin/product/resourceCard";

const SessionProductResourceView = ({ product }: any) => {
  return (
    <div>
      <div className="d-flex flex-wrap align-items-center justify-content-between p-1 px-2">
        <h3>Resources</h3>
      </div>

      {product ? (
        <>
          {product?.resource_nodes && product?.resource_nodes.length > 0 ? (
            <>
              {product?.resource_nodes.map((data: any, index: any) => (
                <div key={`resources-index-${index}`} className="d-flex flex-wrap gap-4 mt-4 w-100">
                  <ResourceCard data={data} />
                </div>
              ))}
            </>
          ) : (
            <div className="text-center text-muted my-5">Resources not available</div>
          )}
        </>
      ) : (
        <div className="text-center text-muted my-5">Loading...</div>
      )}
    </div>
  );
};

export default SessionProductResourceView;
