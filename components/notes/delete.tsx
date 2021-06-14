import React from "react";
// react bootstrap
import { Button, Form, Modal } from "react-bootstrap";
// swr
import { mutate } from "swr";
// api routes
import { USER_NOTES_ENDPOINT, NOTES_WITH_USER_ID_ENDPOINT } from "@constants/routes";
// api services
import { NotesDelete } from "@lib/services/notes.service";
import { APIFetcher } from "@lib/services";

const NotesDeleteView = (props: any) => {
  const [modal, setModal] = React.useState(false);
  const closeModal = () => setModal(false);
  const openModal = () => setModal(true);

  const [buttonLoader, setButtonLoader] = React.useState<any>(false);

  const notesDelete = (event: any) => {
    event.preventDefault();
    setButtonLoader(true);
    NotesDelete(props.data.id)
      .then((res) => {
        if (props.resourceNode && props.tree)
          mutate(
            [
              USER_NOTES_ENDPOINT(props.resourceNode.id, props.tree.id),
              props.resourceNode.id,
              props.tree.id,
            ],
            async (elements: any) => {
              let index = elements.findIndex((mutateData: any) => mutateData.id === props.data.id);
              return elements.filter((oldElement: any, i: any) => i != index);
            },
            false
          );
        else
          mutate(
            NOTES_WITH_USER_ID_ENDPOINT(props.user.id),
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
      <Button
        variant="outline-secondary"
        className="btn-sm notes-create-button"
        onClick={openModal}
      >
        Delete
      </Button>

      <Modal size={"lg"} show={modal} onHide={closeModal} centered backdrop={"static"}>
        <Modal.Body>
          <h5>Notes Delete</h5>
          <Form onSubmit={notesDelete}>
            <h6 className="mt-4 mb-4">Are you sure to delete this Notes.</h6>
            <Button
              variant="outline-primary"
              className="btn-sm"
              type="submit"
              style={{ marginRight: "10px" }}
              disabled={buttonLoader}
            >
              {buttonLoader ? "Deleting Notes..." : "Delete Notes"}
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

export default NotesDeleteView;
