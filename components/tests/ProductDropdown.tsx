import React from "react";
// react bootstrap
import { Form } from "react-bootstrap";

const ProductDropdown = (props: any) => {
  return (
    <div>
      {props.data && props.products && props.products.length > 0 && (
        <Form.Group className="mb-3" controlId={`form-control-product-session-create`}>
          <Form.Label>Select Product</Form.Label>
          <Form.Control
            as="select"
            size="sm"
            className="mb-2"
            value={props.data.product}
            onChange={(e) => props.handleData("product", e.target.value)}
          >
            <option value="">No Product Selected</option>
            {props.products &&
              props.products.length > 0 &&
              props.products.map((product: any, index: any) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
          </Form.Control>
        </Form.Group>
      )}
    </div>
  );
};

export default ProductDropdown;
