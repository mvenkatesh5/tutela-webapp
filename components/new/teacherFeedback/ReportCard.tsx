import React from "react";
// react bootstrap
import { Button, Modal, Form, Image } from "react-bootstrap";

const ReportCard = ({ user, data: product }: any) => {
  const [formData, setFormData] = React.useState<any>();
  const handleFormData = (key: any, value: any) => {
    setFormData({ ...formData, [key]: value });
  };

  const [loader, setLoader] = React.useState(false);
  const onSubmit = () => {
    setLoader(true);
    console.log("formData", formData);
    setTimeout(() => {
      window.alert("Report updated successfully.");
      setLoader(false);
    }, 1000);
  };

  const generateKey = (str: any) => {
    return str.replace(/\s+/g, "_").toLowerCase();
  };

  return (
    <div className="w-100 mt-3">
      <div className="bg-light p-2 px-3 rounded ">
        {user?.user?.first_name} {user?.user?.last_name} - report
      </div>

      {product?.report_schema?.data.map((schema: any, index: any) => (
        <Form.Group key={`${index}-${schema.key}`} className="mt-2">
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

      <Button disabled={loader} className="mt-2" type="button" onClick={onSubmit}>
        {loader ? "Processing..." : "Save Report"}
      </Button>
    </div>
  );
};

export default ReportCard;
