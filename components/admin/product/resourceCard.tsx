import React from "react";
// swr
import useSWR from "swr";
// icons
import { Folder } from "@styled-icons/boxicons-solid/Folder";
import { CaretDownFill } from "@styled-icons/bootstrap/CaretDownFill";
// components
import ResourceViewCard from "./resourceViewCard";
// api routes
import { RESOURCE_WITH_NODE_ENDPOINT, TAGS_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";

const ResourceCard = ({ data }: any) => {
  const [show, setShow] = React.useState(false);

  // render
  const { data: productCategory, error: productCategoryError } = useSWR(
    data ? [RESOURCE_WITH_NODE_ENDPOINT(data), data] : null,
    (url) => APIFetcher(url),
    { refreshInterval: 0 }
  );

  return (
    <>
      {productCategory && !productCategoryError ? (
        <>
          {productCategory && productCategory?.tree && productCategory?.tree.length > 0 && (
            <div onClick={() => setShow(!show)} className="border rounded p-2 w-100 cursor-pointer">
              <div className="d-flex d-flex align-items-center gap-2 text-muted">
                <CaretDownFill width="12px" />
                <Folder width="20px" />
                <div>{productCategory?.tree[0]?.data?.title}</div>
              </div>

              {show && <ResourceViewCard resource_id={data} productCategory={productCategory} />}
            </div>
          )}
        </>
      ) : (
        <div className="text-muted text-center">Loading...</div>
      )}
    </>
  );
};
export default ResourceCard;
