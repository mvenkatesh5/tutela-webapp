import React from "react";
// react bootstrap
import { Button, Modal, Form, Image } from "react-bootstrap";
// api services
import { AsyncResourceFetcher } from "@lib/services/teacherFeedback.service";

const ReportCard = ({ session, user, data: product }: any) => {
  const [productResourcesTeacherReview, setProductResourcesTeacherReview] = React.useState<any>([]);

  React.useEffect(() => {
    if (product && product?.resource_nodes && product?.resource_nodes.length > 0) {
      AsyncResourceFetcher(product.resource_nodes)
        .then((resourceResponse: any) => {
          if (resourceResponse && resourceResponse.length > 0) {
            resourceResponse.map((resource: any) => {
              if (resource && resource?.data?.tree && resource?.data?.tree.length > 0) {
                if (
                  resource?.data?.tree[0].children &&
                  resource?.data?.tree[0].children.length > 0
                ) {
                  resource?.data?.tree[0].children.map((child: any) => {
                    resourceRecursion(child);
                  });
                }
              }
            });
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  }, [product]);

  React.useEffect(() => {
    setProductResourcesTeacherReview([]);
  }, [session]);

  const resourceRecursion = (resourceChild: any) => {
    if (resourceChild && resourceChild?.data && resourceChild?.data.tag) {
      if (product?.teacher_review_strategy.includes(resourceChild?.data?.tag)) {
        setProductResourcesTeacherReview((prevState: any) => [...prevState, resourceChild?.data]);
      }
    }
    if (resourceChild.children && resourceChild.children.length > 0) {
      resourceChild.children.map((child: any) => {
        resourceRecursion(child);
      }).length;
    }
  };

  const [formData, setFormData] = React.useState<any>();
  const handleFormData = (key: any, value: any) => {
    setFormData({ ...formData, [key]: value });
  };

  const [loader, setLoader] = React.useState(false);
  const onSubmit = () => {
    setLoader(true);
    setTimeout(() => {
      window.alert("Report updated successfully.");
      setLoader(false);
    }, 1000);
  };

  const generateKey = (str: any) => {
    return str.replace(/\s+/g, "_").toLowerCase();
  };

  return (
    <>
      {product && product.resource_nodes && product.resource_nodes.length > 0 ? (
        <>
          {productResourcesTeacherReview && productResourcesTeacherReview.length > 0 ? (
            <>
              {productResourcesTeacherReview.map((resource: any, index: any) => (
                <div key={index} className="pb-3">
                  <div className="p-2 px-3 rounded" style={{ backgroundColor: "#0052CC0D" }}>
                    {resource?.title} - report
                  </div>

                  {product?.report_schema?.data.map((schema: any, index: any) => (
                    <Form.Group key={`${index}-${schema.key}`}>
                      <Form.Label id={`${index}-${schema.key}`} className="mb-1 text-muted">
                        {schema.name}
                      </Form.Label>
                      {schema?.type === "input" ? (
                        <Form.Control
                          id={`${index}-${schema.key}`}
                          type="text"
                          required
                          value={formData && formData[generateKey(schema.name)]}
                          onChange={(e) => handleFormData(generateKey(schema.name), e.target.value)}
                        />
                      ) : (
                        <Form.Control
                          as="textarea"
                          rows={3}
                          required
                          value={formData && formData[generateKey(schema.name)]}
                          onChange={(e) => handleFormData(generateKey(schema.name), e.target.value)}
                        />
                      )}
                    </Form.Group>
                  ))}
                </div>
              ))}

              <div className="pb-5">
                <Button disabled={loader} type="button" onClick={onSubmit}>
                  {loader ? "Processing..." : "Save Report"}
                </Button>
              </div>
            </>
          ) : (
            <div className="text-sm text-muted text-center">Loading...</div>
          )}
        </>
      ) : (
        <div className="text-sm text-muted text-center">No Product resources is not available.</div>
      )}
    </>
  );
};

export default ReportCard;
