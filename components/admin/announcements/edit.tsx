import React from "react";
// react bootstrap
import { Button, Form, Modal } from "react-bootstrap";
// swr
import { mutate } from "swr";
// components
import AnnouncementForm from "./announcementsForm";
// api routes
import { ANNOUNCEMENT_ENDPOINT } from "@constants/routes";
// api services
import { AnnouncementUpdate } from "@lib/services/announcement.service";

const AnnouncementEditView = (props: any) => {
  const [modal, setModal] = React.useState(false);
  const closeModal = () => setModal(false);
  const openModal = () => setModal(true);

  const [announcementData, setAnnouncementData] = React.useState();
  const handleAnnouncementData = (value: any) => {
    setAnnouncementData(value);
  };

  React.useEffect(() => {
    if (props.data) {
      setAnnouncementData(props.data);
    }
  }, [props.data]);

  const announcementUpdate = (event: any) => {
    event.preventDefault();
    AnnouncementUpdate(announcementData)
      .then((res) => {
        mutate(
          ANNOUNCEMENT_ENDPOINT,
          async (elements: any) => {
            let index = elements.findIndex((mutateData: any) => mutateData.id === res.id);
            return elements.map((oldElement: any, i: Number) => (i === index ? res : oldElement));
            // return elements.filter((oldElement: any, i) => i != index);
          },
          false
        );
        closeModal();
      })
      .catch((errors) => {
        console.log(errors);
      });
  };

  return (
    <div>
      <Button variant="outline-secondary" className="btn-sm" onClick={openModal}>
        Edit
      </Button>

      <Modal show={modal} onHide={closeModal} centered backdrop={"static"}>
        <Modal.Body>
          <Form onSubmit={announcementUpdate}>
            {announcementData && (
              <div>
                <AnnouncementForm data={announcementData} handleData={handleAnnouncementData} />
                <Button
                  variant="outline-primary"
                  className="btn-sm"
                  type="submit"
                  style={{ marginRight: "10px" }}
                >
                  Update Announcement
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

export default AnnouncementEditView;
