import React from "react";
// components
import AddResource from "@components/admin/product/AddResource";
import ProductResourceStrategy from "@components/admin/product/ProductResourceStrategy";
import ResourceCard from "@components/admin/product/resourceCard";

const ProductResourceView = ({ product, resources, tags }: any) => {
  return (
    <div>
      <div className="d-flex flex-wrap align-items-center justify-content-between mt-5">
        <h3>Resources</h3>
        <div className="d-flex gap-3">
          {/* student strategy */}
          <ProductResourceStrategy
            product={product}
            tags={tags}
            name="Student review strategy"
            productKey={`student_review_strategy`}
          />

          {/* parent strategy */}
          <ProductResourceStrategy
            product={product}
            tags={tags}
            name="Teacher Review Strategy"
            productKey={`teacher_review_strategy`}
          />

          {resources && resources.length > 0 && (
            <AddResource product={product} resources={resources} />
          )}
        </div>
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

export default ProductResourceView;
