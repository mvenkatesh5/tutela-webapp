import React from "react";
// react bootstrap
import { Form, Button, Modal } from "react-bootstrap";
// material icons
import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline";
// swr
import useSWR, { mutate } from "swr";
// api routes
import { PRODUCTS_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";
import { DoubtsV2Service } from "@lib/services/doubts_v2.service";

export const AskDoubtModal = (props: any) => {
  const doubtKindOptions = [
    { key: "log", title: "Error Log" },
    { key: "askt", title: "Teacher Log" },
  ];

  const initialPayload = {
    product: null,
    text: "",
    attachments: "",
    kind: "log",
  };

  const [buttonLoader, setButtonLoader] = React.useState<any>(false);

  const [show, setShow] = React.useState(false);
  const handleClose = () => {
    setShow(false);
    setFormData({ ...initialPayload });
  };
  const handleShow = () => setShow(true);

  const [formData, setFormData] = React.useState<any>({ ...initialPayload });
  const handleFormData = (key: any, value: any) => {
    setFormData({ ...formData, [key]: value });
  };

  const formSubmit = (event: any) => {
    event.preventDefault();
    setButtonLoader(true);
    createDoubt();
  };

  const createDoubt = () => {
    const payload = {
      product: formData.product,
      text: formData.text,
      attachments: formData.attachments,
      kind: formData.kind,
    };

    DoubtsV2Service.create(payload)
      .then((response) => {
        console.log("response", response);
        setButtonLoader(false);
        if (payload.kind === "log") mutate("DOUBTS_V2_PERSONAL", false);
        else mutate("DOUBTS_V2_PUBLIC", false);
        handleClose();
      })
      .catch((error) => {
        console.log(error);
        setButtonLoader(false);
      });
  };

  const { data: productsList, error: productsListError } = useSWR(
    show ? PRODUCTS_ENDPOINT : null,
    APIFetcher,
    { refreshInterval: 0 }
  );

  return (
    <>
      <Modal centered show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Body>
          <div className="d-flex">
            <h5 className="m-0">Ask Doubt</h5>
            <div className="ms-auto" onClick={handleClose}>
              <CloseOutline width="20px" />
            </div>
          </div>

          <div className="mt-3">
            <Form onSubmit={formSubmit}>
              {doubtKindOptions && doubtKindOptions.length > 0 && (
                <Form.Group className="mb-3" controlId={`form-control-doubt-kind`}>
                  <Form.Label>Select kind</Form.Label>
                  <Form.Control
                    as="select"
                    className="mb-2"
                    value={formData.kind}
                    onChange={(e) => handleFormData("kind", e.target.value)}
                  >
                    <option value="">Select kind</option>
                    {doubtKindOptions &&
                      doubtKindOptions.length > 0 &&
                      doubtKindOptions.map((product: any, index: any) => (
                        <option key={product.key} value={product.key}>
                          {product.title}
                        </option>
                      ))}
                  </Form.Control>
                </Form.Group>
              )}

              {productsList && productsList.length > 0 && (
                <Form.Group className="mb-3" controlId={`form-control-doubt-products`}>
                  <Form.Label>Select Product</Form.Label>
                  <Form.Control
                    as="select"
                    className="mb-2"
                    value={formData.product}
                    onChange={(e) => handleFormData("product", e.target.value)}
                  >
                    <option value="">Select product</option>
                    {productsList &&
                      productsList.length > 0 &&
                      productsList.map((product: any, index: any) => (
                        <option key={product.id} value={product.id}>
                          {product.name}
                        </option>
                      ))}
                  </Form.Control>
                </Form.Group>
              )}

              <Form.Group controlId="doubt.text" className="mb-2">
                <Form.Label>Doubt</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter your doubt"
                  required
                  value={formData.text}
                  onChange={(e) => handleFormData("text", e.target.value)}
                />
              </Form.Group>

              <div></div>

              <Button
                variant="outline-primary"
                type="submit"
                className="btn-sm"
                disabled={buttonLoader}
              >
                {buttonLoader ? "Processing..." : "Create"}
              </Button>
            </Form>
          </div>
        </Modal.Body>
      </Modal>

      <div onClick={handleShow}>{props.children}</div>
    </>
  );
};
