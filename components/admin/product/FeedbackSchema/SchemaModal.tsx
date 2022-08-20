import React from "react";
// react bootstrap
import { Container, Modal, Button, Form } from "react-bootstrap";
// api services
import { ProductsUpdate } from "@lib/services/productsService";

const FeedbackSchemaModal = ({ product, data, setData, currentSchema, setCurrentSchema }: any) => {
  const [modal, setModal] = React.useState<boolean>(false);
  const openModal = () => setModal(true);
  const closeModal = () => {
    setModal(false);
    setSchemaData(null);
    setTimeout(() => {
      setCurrentSchema(null);
    }, 500);
  };

  const schemaList = [
    { name: "Input", type: "input" },
    { name: "Textarea", type: "textarea" },
  ];

  const [schemaData, setSchemaData] = React.useState<any>();
  const handleSchemaData = (key: any, value: any) => {
    setSchemaData((prev: any) => {
      return { ...prev, [key]: value };
    });
  };
  React.useEffect(() => {
    if (currentSchema) {
      setSchemaData(currentSchema);
      openModal();
    }
  }, [currentSchema]);

  const [buttonLoader, setButtonLoader] = React.useState<boolean>(false);
  const updateProductSchema = (type: any = null) => {
    setButtonLoader(true);

    let newSchema: any = [...data];

    if (type === "add") newSchema.push(schemaData);
    else if (type === "edit") {
      newSchema = newSchema.map((schema: any) => {
        if (schema.id === schemaData.id)
          return { id: schemaData?.id, type: schemaData?.type, name: schemaData?.name };
        else return schema;
      });
    } else {
      newSchema = newSchema.filter((schema: any) => schema?.id !== schemaData?.id);
    }

    let payload = {
      id: product?.id,
      report_schema: { data: newSchema },
    };

    ProductsUpdate(payload)
      .then((response) => {
        setButtonLoader(false);
        setData(newSchema);
        closeModal();
      })
      .catch((error) => {
        setButtonLoader(false);
      });
  };

  return (
    <div>
      {/* <div onClick={openModal}></div> */}
      <Modal show={modal} onHide={closeModal} centered backdrop={"static"}>
        <Modal.Body>
          <Container>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="m-0 p-0">Product Feedback Schema</h5>
              <div style={{ cursor: "pointer" }} onClick={closeModal}>
                Close
              </div>
            </div>

            <div>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="text-secondary text-sm">Schema Name</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  value={schemaData?.name}
                  onChange={(e) => handleSchemaData("name", e.target.value)}
                  placeholder="Enter schema name"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId={`form-control-product-session-create`}>
                <Form.Label className="text-secondary text-sm">Select Schema type</Form.Label>
                <Form.Control
                  as="select"
                  size="sm"
                  className="mb-2"
                  value={schemaData?.type}
                  onChange={(e) => handleSchemaData("type", e.target.value)}
                >
                  <option value="">No schema type selected.</option>
                  {schemaList &&
                    schemaList.length > 0 &&
                    schemaList.map((_schema: any, index: any) => (
                      <option key={_schema.type} value={_schema.type}>
                        {_schema.name}
                      </option>
                    ))}
                </Form.Control>
              </Form.Group>
            </div>

            <div className="d-flex justify-content-end">
              {schemaData?.key != "add" ? (
                <>
                  <Button
                    variant="danger"
                    className="btn-sm me-2"
                    onClick={() => updateProductSchema("delete")}
                    disabled={buttonLoader}
                  >
                    {buttonLoader ? "Processing..." : "Delete"}
                  </Button>
                  <Button
                    variant="secondary"
                    className="btn-sm"
                    onClick={() => updateProductSchema("edit")}
                    disabled={buttonLoader}
                  >
                    {buttonLoader ? "Processing..." : "Update"}
                  </Button>
                </>
              ) : (
                <Button
                  className="btn-sm"
                  onClick={() => updateProductSchema("add")}
                  disabled={buttonLoader}
                >
                  {buttonLoader ? "Processing..." : "Add new schema field"}
                </Button>
              )}
            </div>
          </Container>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default FeedbackSchemaModal;
