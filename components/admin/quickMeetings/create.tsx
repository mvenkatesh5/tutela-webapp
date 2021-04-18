import React from "react";
// react bootstrap
import { Button, Form, Modal } from "react-bootstrap";
// material icons
import { Calendar } from "@styled-icons/boxicons-regular/Calendar";
// swr
import { mutate } from "swr";
// components
import QuickMeetingForm from "./quickMeetingForm";
// api routes
import { QUICK_MEETINGS_ENDPOINT } from "@constants/routes";
// api services
import { QuickMeetingCreate } from "@lib/services/quickmeetingsservice";
// global imports
import { getCurrentUser } from "@constants/global";

const QuickMeetingCreateView = () => {
  const [modal, setModal] = React.useState(false);
  const closeModal = () => {
    setModal(false);
    setQuickMeetingsData({
      name: "",
      description: "",
      start_time: "",
      end_date: "",
      data: {},
      created_by: getCurrentUser() && getCurrentUser().user && getCurrentUser().user.id,
    });
  };
  const openModal = () => setModal(true);

  const [quickMeetingsData, setQuickMeetingsData] = React.useState({
    name: "",
    description: "",
    start_time: "",
    end_date: "",
    data: {},
    created_by: getCurrentUser() && getCurrentUser().user && getCurrentUser().user.id,
  });
  const handleQuickMeetingsData = (value: any) => {
    setQuickMeetingsData(value);
  };

  const quickMeetingCreate = (event: any) => {
    event.preventDefault();
    QuickMeetingCreate(quickMeetingsData)
      .then((res) => {
        mutate(
          QUICK_MEETINGS_ENDPOINT,
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
      <div className="d-flex">
        <Button variant="primary" className="btn-sm ms-auto" onClick={openModal}>
          <div className="d-flex align-items-center">
            <div className="me-2">
              <Calendar width="16" />
            </div>
            <div>Add Quick Meeting</div>
          </div>
        </Button>
      </div>

      <Modal show={modal} onHide={closeModal} centered backdrop={"static"}>
        <Modal.Body>
          <Form onSubmit={quickMeetingCreate}>
            <QuickMeetingForm data={quickMeetingsData} handleData={handleQuickMeetingsData} />
            <Button
              variant="outline-primary"
              className="btn-sm"
              type="submit"
              style={{ marginRight: "10px" }}
            >
              Create Quick Meeting
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

export default QuickMeetingCreateView;
