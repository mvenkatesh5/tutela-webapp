import React from "react";
// react bootstrap
import { Button, Form, Modal } from "react-bootstrap";
// material icons
import { Delete } from "@styled-icons/material/Delete";
// swr
import { mutate } from "swr";
// api routes
import { PRODUCTS_ENDPOINT } from "@constants/routes";
// api services
import { ProductsDelete } from "@lib/services/productsService";

const SessionEditView = (props: any) => {
  const [modal, setModal] = React.useState(false);
  const closeModal = () => setModal(false);
  const openModal = () => setModal(true);

  const [buttonLoader, setButtonLoader] = React.useState<any>(false);

  const productDelete = (event: any) => {
    event.preventDefault();
    setButtonLoader(true);
    ProductsDelete(props.data.id)
      .then((res) => {
        mutate(
          PRODUCTS_ENDPOINT,
          async (elements: any) => {
            let index = elements.findIndex((mutateData: any) => mutateData.id === props.data.id);
            return elements.filter((oldElement: any, i: any) => i != index);
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
      <div className="content-item" onClick={openModal}>
        <div className="icon">
          <Delete />
        </div>
        <div className="text">Delete</div>
      </div>

      <Modal size={"lg"} show={modal} onHide={closeModal} centered backdrop={"static"}>
        <Modal.Body>
          <h5>Product Delete</h5>
          <Form onSubmit={productDelete}>
            <h6 className="mt-4 mb-4">
              Are you sure to delete this Product <strong>"{props.data.name}"</strong>
            </h6>
            <Button
              variant="outline-primary"
              className="btn-sm"
              type="submit"
              style={{ marginRight: "10px" }}
              disabled={buttonLoader}
            >
              {buttonLoader ? "Deleting Product..." : "Delete Product"}
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

export default SessionEditView;
