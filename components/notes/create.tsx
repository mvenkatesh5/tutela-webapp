import React from "react";
// react bootstrap
import { Button, Form, Modal } from "react-bootstrap";
// swr
import { mutate } from "swr";
// components
import NotesForm from "./notesForm";
// api routes
import { USER_NOTES_ENDPOINT } from "@constants/routes";
// api services
import { NotesCreate } from "@lib/services/notes.service";

const NotesCreateView = (props: any) => {
  const [buttonLoader, setButtonLoader] = React.useState<any>(false);

  const [modal, setModal] = React.useState(false);
  const closeModal = () => {
    setModal(false);
    setNotesData({
      text: "",
    });
  };
  const openModal = () => setModal(true);

  const [notesData, setNotesData] = React.useState({
    text: "",
  });
  const handleNotesData = (value: any) => {
    setNotesData(value);
  };

  const notesCreate = (event: any) => {
    event.preventDefault();
    const payload: any = {
      text: notesData.text,
      user_type: "student",
      resource_connection: props.resourceNode.id,
      resource_node: props.tree.id,
      user: props.user.user.id,
    };
    setButtonLoader(true);

    NotesCreate(payload)
      .then((res) => {
        mutate(
          [
            USER_NOTES_ENDPOINT(props.resourceNode.id, props.tree.id),
            props.resourceNode.id,
            props.tree.id,
          ],
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
      <Button
        variant="outline-secondary"
        className="btn-sm notes-create-button"
        onClick={openModal}
      >
        Add Notes
      </Button>

      <Modal show={modal} onHide={closeModal} centered backdrop={"static"}>
        <Modal.Body>
          <h5>Notes create</h5>
          <Form onSubmit={notesCreate}>
            <NotesForm data={notesData} handleData={handleNotesData} />
            <Button
              variant="outline-primary"
              className="btn-sm"
              type="submit"
              style={{ marginRight: "10px" }}
              disabled={buttonLoader}
            >
              {buttonLoader ? "Creating Notes..." : "Create Notes"}
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

export default NotesCreateView;
