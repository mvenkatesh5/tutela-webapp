import React from "react";
// components
import ResourceView from "@components/resources/userRender";
// swr
import useSWR from "swr";
// api routes
import { RESOURCE_WITH_NODE_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";

const ResourceViewCard = ({ resource_id, data }: any) => {
  const [notesToggle, setNotesToggle] = React.useState<any>("");
  const handleNotesToggle = (tree: any) => {
    setPdfToggle("");
    if (tree.id === notesToggle.id) setNotesToggle("");
    else setNotesToggle(tree);
  };

  const [pdfToggle, setPdfToggle] = React.useState<any>("");
  const handlePdfToggle = (pdfObject: any) => {
    setNotesToggle("");
    if (pdfObject.id === pdfToggle.id) setPdfToggle("");
    else setPdfToggle(pdfObject);
  };

  const { data: productCategory, error: productCategoryError } = useSWR(
    resource_id ? RESOURCE_WITH_NODE_ENDPOINT(resource_id) : null,
    (url) => APIFetcher(url),
    { refreshInterval: 0 }
  );
  return (
    <>
      <div>
        {!productCategory ? (
          <div className="text-center mt-0 mb-4">Loading.....</div>
        ) : (
          <div>
            <div className="pt-2 pb-3" style={{ margin: "0px -9px -31px -9px" }}>
              {productCategory &&
              productCategory.tree &&
              productCategory.tree.length > 0 &&
              productCategory.tree[0] &&
              productCategory.tree[0].children ? (
                <ResourceView
                  data={productCategory.tree[0].children}
                  root_node_id={resource_id}
                  currentProduct={productCategory}
                  notesToggle={notesToggle}
                  handleNotesToggle={handleNotesToggle}
                  pdfToggle={pdfToggle}
                  handlePdfToggle={handlePdfToggle}
                />
              ) : (
                <div className="mt-0 mb-4 text-center text-secondary">
                  No Resources are available.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ResourceViewCard;
