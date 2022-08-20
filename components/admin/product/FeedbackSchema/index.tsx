import React from "react";
// icons
import { Plus } from "@styled-icons/boxicons-regular/Plus";
import { Edit } from "@styled-icons/boxicons-solid/Edit";
// uuid
import { v4 as uuidV4 } from "uuid";
// components
import FeedbackSchemaModal from "./SchemaModal";
// api services
import { ProductsUpdate } from "@lib/services/productsService";

const FeedbackSchema = ({ product }: any) => {
  const [currentSchema, setCurrentSchema] = React.useState<any>(null);

  const handleCurrentSection = (key: any, data: any = null) => {
    setCurrentSchema((prev: any) => {
      let payload: any;

      if (key != "add" && data) payload = { ...data, key: key };
      else payload = { id: uuidV4(), name: "", type: "input", key: key };

      return payload;
    });
  };

  const [schema, setSchema] = React.useState<any>([]);
  React.useEffect(() => {
    if (product && product?.report_schema && product?.report_schema?.data) {
      setSchema(product?.report_schema?.data);
    }
  }, [product]);

  return (
    <div>
      <div className="d-flex align-items-center gap-2 flex-wrap text-sm">
        {schema && schema.length > 0 ? (
          <>
            {schema.map((schemaData: any, index: any) => (
              <div
                key={index}
                className="px-3 p-1 bg-muted rounded-pill h-100 d-flex justify-content-center align-items-center gap-2"
              >
                <div>{schemaData?.name}</div>
                <div
                  className="cursor-pointer"
                  onClick={() => handleCurrentSection("edit", schemaData)}
                >
                  <Edit width="16" />
                </div>
              </div>
            ))}
          </>
        ) : (
          <div>No Feedback Schema are available.</div>
        )}

        <div
          style={{ height: "30px", width: "30px" }}
          className="d-flex bg-muted rounded-circle flex-shrink-0 align-items-center justify-content-center cursor-pointer"
          onClick={() => handleCurrentSection("add", null)}
        >
          <Plus width="18" />
        </div>
      </div>
      {currentSchema && (
        <FeedbackSchemaModal
          data={schema}
          setData={setSchema}
          product={product}
          currentSchema={currentSchema}
          setCurrentSchema={setCurrentSchema}
        />
      )}
    </div>
  );
};

export default FeedbackSchema;
