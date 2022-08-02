import React from "react";
// components
import ResourceView from "@components/resources/userRender";

const ResourceViewCard = ({ resource_id, productCategory }: any) => {
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
                  isTagValidationRRequired={true}
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
