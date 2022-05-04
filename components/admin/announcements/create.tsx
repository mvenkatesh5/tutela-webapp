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
import { AnnouncementCreate } from "@lib/services/announcement.service";

const AnnouncementCreateView = () => {
  const [modal, setModal] = React.useState(false);
  const closeModal = () => {
    setModal(false);
    setAnnouncementData({
      message: "",
      url: "",
    });
  };
  const openModal = () => setModal(true);

  const [announcementData, setAnnouncementData] = React.useState({
    message: "",
    url: "",
  });
  const handleAnnouncementData = (value: any) => {
    setAnnouncementData(value);
  };

  const announcementCreate = (event: any) => {
    event.preventDefault();
    AnnouncementCreate(announcementData)
      .then((res) => {
        mutate(
          ANNOUNCEMENT_ENDPOINT,
          async (elements: any) => {
            return [...elements, res];
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
      <div className="d-flex justify-content-end">
        <Button variant="primary" className="btn-sm" onClick={openModal}>
          Create Announcement
        </Button>
      </div>

      <Modal show={modal} onHide={closeModal} centered backdrop={"static"}>
        <Modal.Body>
          <Form onSubmit={announcementCreate}>
            <AnnouncementForm data={announcementData} handleData={handleAnnouncementData} />
            <Button
              variant="outline-primary"
              className="btn-sm"
              type="submit"
              style={{ marginRight: "10px" }}
            >
              Create Announcement
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

export default AnnouncementCreateView;
