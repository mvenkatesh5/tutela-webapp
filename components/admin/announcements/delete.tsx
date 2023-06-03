import React from "react";
// react bootstrap
import { Button, Form, Modal } from "react-bootstrap";
// swr
import { mutate } from "swr";
// api routes
import { ANNOUNCEMENT_ENDPOINT } from "@constants/routes";
// api services
import { AnnouncementDelete } from "@lib/services/announcement.service";

const AnnouncementDeleteView = (props: any) => {
  const [modal, setModal] = React.useState(false);
  const closeModal = () => setModal(false);
  const openModal = () => setModal(true);

  const announcementDelete = (event: any) => {
    event.preventDefault();
    AnnouncementDelete(props.data.id)
      .then((res: any) => {
        mutate(
          ANNOUNCEMENT_ENDPOINT,
          async (elements: any) => {
            let index = elements.findIndex((mutateData: any) => mutateData.id === props.data.id);
            return elements.filter((oldElement: any, i: any) => i != index);
          },
          false
        );
        closeModal();
      })
      .catch((errors: any) => {
        console.log(errors);
      });
  };

  return (
    <div>
      <Button variant="outline-danger" className="btn-sm" onClick={openModal}>
        Delete
      </Button>

      <Modal show={modal} onHide={closeModal} centered backdrop={"static"}>
        <Modal.Body>
          <Form onSubmit={announcementDelete}>
            <div>
              <h4 className="my-4 mb-5">
                Are you sure you want to delete the announcement <strong>{props.data.title}</strong>{" "}
              </h4>
              <div className="d-flex gap-2">
                <Button variant="outline-danger" className="btn-sm" type="submit">
                  Delete
                </Button>
                <Button variant="outline-secondary" className="btn-sm" onClick={closeModal}>
                  Close
                </Button>
              </div>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <Form></Form>
    </div>
  );
};

export default AnnouncementDeleteView;
