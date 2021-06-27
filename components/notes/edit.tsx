import React from "react";
// react bootstrap
import { Button, Form, Modal } from "react-bootstrap";
// swr
import { mutate } from "swr";
// components
import NotesForm from "./notesForm";
// api routes
import { USER_NOTES_ENDPOINT, NOTES_WITH_USER_ID_ENDPOINT } from "@constants/routes";
// api services
import { NotesUpdate } from "@lib/services/notes.service";
import { APIFetcher } from "@lib/services";

const NotesEditView = (props: any) => {
  const [buttonLoader, setButtonLoader] = React.useState<any>(false);

  const [modal, setModal] = React.useState(false);
  const closeModal = () => setModal(false);
  const openModal = () => setModal(true);

  const [notesData, setNotesData] = React.useState();
  const handleNotesData = (value: any) => {
    setNotesData(value);
  };

  React.useEffect(() => {
    if (props.data) {
      setNotesData(props.data);
    }
  }, [props.data]);

  const notesUpdate = (event: any) => {
    event.preventDefault();
    setButtonLoader(true);
    NotesUpdate(notesData)
      .then((res) => {
        if (props.resourceNode && props.tree) {
          mutate(
            [
              USER_NOTES_ENDPOINT(props.resourceNode.id, props.tree.id),
              props.resourceNode.id,
              props.tree.id,
            ],
            async (elements: any) => {
              let index = elements.findIndex((mutateData: any) => mutateData.id === res.id);
              return elements.map((oldElement: any, i: Number) => (i === index ? res : oldElement));
              // return elements.filter((oldElement: any, i) => i != index);
            },
            false
          );
        } else {
          console.log("Hello polo");
          mutate(
            NOTES_WITH_USER_ID_ENDPOINT(props.user.id),
            async (elements: any) => {
              let index = elements.findIndex((mutateData: any) => mutateData.id === res.id);
              return elements.map((oldElement: any, i: Number) => (i === index ? res : oldElement));
              // return elements.filter((oldElement: any, i) => i != index);
            },
            false
          );
        }
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
        Edit
      </Button>

      <Modal show={modal} onHide={closeModal} centered backdrop={"static"}>
        <Modal.Body>
          <Form onSubmit={notesUpdate}>
            {notesData && (
              <div>
                <NotesForm data={notesData} handleData={handleNotesData} />
                <Button
                  variant="outline-primary"
                  className="btn-sm"
                  type="submit"
                  style={{ marginRight: "10px" }}
                  disabled={buttonLoader}
                >
                  {buttonLoader ? "Updating Notes..." : "Update Notes"}
                </Button>
                <Button variant="outline-secondary" className="btn-sm" onClick={closeModal}>
                  Close
                </Button>
              </div>
            )}
          </Form>
        </Modal.Body>
      </Modal>
      <Form></Form>
    </div>
  );
};

export default NotesEditView;
