import React from "react";
// react bootstrap
import { Button, Form, Modal } from "react-bootstrap";
// swr
import { mutate } from "swr";
// components
import QuickMeetingForm from "./quickMeetingForm";
// api routes
import { QUICK_MEETINGS_ENDPOINT } from "@constants/routes";
// api services
import { QuickMeetingUpdate } from "@lib/services/quickmeetingsservice";

const QuickMeetingsEditView = (props: any) => {
  const [modal, setModal] = React.useState(false);
  const closeModal = () => setModal(false);
  const openModal = () => setModal(true);

  const [quickMeetingsData, setQuickMeetingsData] = React.useState();
  const handleQuickMeetingsData = (value: any) => {
    setQuickMeetingsData(value);
  };

  React.useEffect(() => {
    if (props.data) {
      setQuickMeetingsData(props.data);
    }
  }, [props.data]);

  const quickMeetingsUpdate = (event: any) => {
    event.preventDefault();
    QuickMeetingUpdate(quickMeetingsData)
      .then((res) => {
        mutate(
          QUICK_MEETINGS_ENDPOINT,
          async (elements: any) => {
            let index = elements.findIndex((mutateData: any) => mutateData.id === res.id);
            return elements.map((oldElement: any, i: Number) => (i === index ? res : oldElement));
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
      <Button variant="primary" className="btn-sm" onClick={openModal}>
        Edit Quick Meeting
      </Button>

      <Modal show={modal} onHide={closeModal} centered backdrop={"static"}>
        <Modal.Body>
          <Form onSubmit={quickMeetingsUpdate}>
            {quickMeetingsData && (
              <div>
                <QuickMeetingForm data={quickMeetingsData} handleData={handleQuickMeetingsData} />
                <Button
                  variant="outline-primary"
                  className="btn-sm"
                  type="submit"
                  style={{ marginRight: "10px" }}
                >
                  Update Quick Meeting
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

export default QuickMeetingsEditView;
