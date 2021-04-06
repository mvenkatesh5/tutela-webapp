import React from "react";
// react bootstrap
import { Form } from "react-bootstrap";
// components
import ProductSubjectsView from "./productSubjects";

const ProductsFormView = (props: any) => {
  const [formPayload, setFormPayload] = React.useState(Object);
  const handleFormPayload = (key: any, value: any) => {
    setFormPayload({ ...formPayload, [key]: value });
    props.handleData({ ...formPayload, [key]: value });
  };

  React.useEffect(() => {
    if (props.data) {
      setFormPayload(props.data);
    }
  }, [props.data]);

  return (
    <div>
      <Form.Group className="mb-2">
        <Form.Label className="mb-1 text-muted">Name</Form.Label>
        <Form.Control
          type="text"
          value={formPayload.name}
          onChange={(e) => handleFormPayload("name", e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="mb-1 text-muted">Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={formPayload.description}
          onChange={(e) => handleFormPayload("description", e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label className="mb-1 text-muted">Color</Form.Label>
        <Form.Control
          style={{ width: "60px", height: "30px" }}
          className="p-1"
          type="color"
          value={formPayload.color}
          onChange={(e) => handleFormPayload("color", e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label className="mb-1 text-muted">Subjects</Form.Label>
        <ProductSubjectsView data={formPayload.subjects} handleFormData={handleFormPayload} />
      </Form.Group>
    </div>
  );
};

export default ProductsFormView;
