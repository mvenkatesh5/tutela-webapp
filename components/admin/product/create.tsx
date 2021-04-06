import React from "react";
// react bootstrap
import { Button, Form, Modal } from "react-bootstrap";
// swr
import { mutate } from "swr";
// components
import ProductsForm from "./productsForm";
// api routes
import { PRODUCTS_ENDPOINT } from "@constants/routes";
// api services
import { ProductsCreate } from "@lib/services/productsService";

const ProductsCreateView = () => {
  const [modal, setModal] = React.useState(false);
  const closeModal = () => {
    setModal(false);
    setFormData({
      name: "",
      description: "",
      color: "#000000",
      data: {},
      subjects: [],
    });
  };
  const openModal = () => setModal(true);

  const [buttonLoader, setButtonLoader] = React.useState<any>(false);

  const [formData, setFormData] = React.useState({
    name: "",
    description: "",
    color: "#000000",
    data: {},
    subjects: [],
  });
  const handleFormData = (value: any) => {
    setFormData(value);
  };

  const productsCreate = (event: any) => {
    event.preventDefault();
    setButtonLoader(true);
    ProductsCreate(formData)
      .then((res) => {
        mutate(
          PRODUCTS_ENDPOINT,
          async (elements: any) => {
            return [...elements, res];
          },
          false
        );
        closeModal();
        setButtonLoader(false);
      })
      .catch((errors) => {
        console.log(errors);
        setButtonLoader(false);
      });
  };

  return (
    <div>
      <Button variant="primary" className="btn-sm" onClick={openModal}>
        Add Product
      </Button>

      <Modal show={modal} size={"lg"} onHide={closeModal} centered backdrop={"static"}>
        <Modal.Body>
          <h5>Product Create</h5>
          <Form onSubmit={productsCreate}>
            <ProductsForm data={formData} handleData={handleFormData} />
            <Button
              variant="outline-primary"
              className="btn-sm"
              type="submit"
              style={{ marginRight: "10px" }}
              disabled={buttonLoader}
            >
              {buttonLoader ? "Creating..." : "Create"}
            </Button>
            <Button variant="outline-secondary" className="btn-sm" onClick={closeModal}>
              Close
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Form></Form>
    </div>
  );
};

export default ProductsCreateView;
