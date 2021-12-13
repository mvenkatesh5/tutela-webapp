import React from "react";
// react bootstrap
import { Button, Form, Modal } from "react-bootstrap";
// material icons
import { Delete } from "@styled-icons/material/Delete";
// swr
import { mutate } from "swr";
// components
import AdvertsForm from "./advertsForm";
// api routes
import { ADVERTS_ENDPOINT } from "@constants/routes";
// api services
import { AdvertsDelete } from "@lib/services/advertsservice";

const AdvertsEditView = (props: any) => {
  const [modal, setModal] = React.useState(false);
  const closeModal = () => setModal(false);
  const openModal = () => setModal(true);

  const [buttonLoader, setButtonLoader] = React.useState(false);

  const advertsDelete = (event: any) => {
    event.preventDefault();
    setButtonLoader(true);
    AdvertsDelete(props.data.id)
      .then((res) => {
        setButtonLoader(false);
        mutate(
          ADVERTS_ENDPOINT,
          async (elements: any) => {
            let index = elements.findIndex((mutateData: any) => mutateData.id === props.data.id);
            return elements.filter((oldElement: any, i: any) => i != index);
          },
          false
        );
        closeModal();
      })
      .catch((errors) => {
        setButtonLoader(false);
        console.log(errors);
      });
  };

  return (
    <>
      <Button variant="danger" className="btn-sm" onClick={openModal}>
        <div className="d-flex justify-content-center align-items-center">
          <Delete width="16" />
        </div>
      </Button>

      <Modal show={modal} onHide={closeModal} centered backdrop={"static"}>
        <Modal.Body>
          <h6 className="mb-3">Delete Advert</h6>
          <p>Are you sure you want to delete this advert.</p>
          <Form onSubmit={advertsDelete}>
            <div>
              <Button
                variant="outline-danger"
                className="btn-sm"
                type="submit"
                style={{ marginRight: "10px" }}
                disabled={buttonLoader}
              >
                {buttonLoader ? "Processing..." : "Delete Advert"}
              </Button>
              <Button variant="outline-secondary" className="btn-sm" onClick={closeModal}>
                Close
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <Form></Form>
    </>
  );
};

export default AdvertsEditView;
