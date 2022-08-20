import React from "react";
// react bootstrap
import { Button, Form, Modal } from "react-bootstrap";
// material icons
import { Delete } from "@styled-icons/material/Delete";
// swr
import { mutate } from "swr";
// api routes
import { TAGS_ENDPOINT } from "@constants/routes";
// api services
import { Tag } from "@lib/services/tagService";

const TagDeleteView = ({ data, modal, setModal }: any) => {
  const closeModal = () => setModal(false);
  const openModal = () => setModal(true);

  const [buttonLoader, setButtonLoader] = React.useState(false);

  const tagDelete = (event: any) => {
    event.preventDefault();
    setButtonLoader(true);
    Tag.delete(data.id)
      .then((res) => {
        setButtonLoader(false);
        mutate(
          TAGS_ENDPOINT,
          async (elements: any) => {
            let index = elements.findIndex((mutateData: any) => mutateData.id === data.id);
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
      <Modal show={modal} onHide={closeModal} centered backdrop={"static"}>
        <Modal.Body>
          <h5 className="mb-3">Delete Tag</h5>
          <p>
            Are you sure you want to delete <strong>{data?.name}</strong>.
          </p>
          <Form onSubmit={tagDelete}>
            <div>
              <Button
                variant="outline-danger"
                className="btn-sm"
                type="submit"
                style={{ marginRight: "10px" }}
                disabled={buttonLoader}
              >
                {buttonLoader ? "Processing..." : "Delete Tag"}
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

export default TagDeleteView;
