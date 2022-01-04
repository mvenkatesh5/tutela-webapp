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
import { QUICK_MEETINGS_ENDPOINT, DEFAULT_ZOOM_URL } from "@constants/routes";
// api services
import { QuickMeetingCreate } from "@lib/services/quickmeetingsservice";
import { CreateZoomMeeting } from "@lib/services/sessionservice";
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
      minutes: "",
      data: {
        link: "",
      },
      created_by: getCurrentUser() && getCurrentUser().user && getCurrentUser().user.id,
    });
  };
  const openModal = () => setModal(true);

  const [quickMeetingsData, setQuickMeetingsData] = React.useState({
    name: "",
    description: "",
    start_time: "",
    end_date: "",
    minutes: "",
    data: { link: "" },
    created_by: getCurrentUser() && getCurrentUser().user && getCurrentUser().user.id,
  });
  const handleQuickMeetingsData = (value: any) => {
    setQuickMeetingsData(value);
  };

  const [buttonLoader, setButtonLoader] = React.useState<boolean>(false);

  const quickMeetingCreate = (event: any) => {
    event.preventDefault();
    setButtonLoader(true);

    if (parseInt(quickMeetingsData.minutes) > 0) {
      let end_time: any = new Date();
      end_time.setMinutes(end_time.getMinutes() + parseInt(quickMeetingsData.minutes));

      const payload = {
        topic: quickMeetingsData.name ? quickMeetingsData.name : "New Meeting",
        start_datetime: new Date().toISOString().replace(/.\d+Z$/g, "Z"),
        end_datetime: new Date(end_time).toISOString().replace(/.\d+Z$/g, "Z"),
      };

      CreateZoomMeeting(payload)
        .then((response) => {
          if (response) {
            const meetingPayload = {
              name: quickMeetingsData.name,
              description: quickMeetingsData.description,
              start_time: payload.start_datetime,
              end_date: payload.end_datetime,
              data: { zoom: response, link: "" },
              created_by: getCurrentUser() && getCurrentUser().user && getCurrentUser().user.id,
            };
            QuickMeetingCreate(meetingPayload)
              .then((res) => {
                setButtonLoader(true);
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
                setButtonLoader(true);
              });
          }
        })
        .catch((error) => {
          console.log(error);
          setButtonLoader(true);
        });
    } else {
      alert("Please select Minutes greater than zero");
      setButtonLoader(false);
    }
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
              disabled={buttonLoader}
            >
              {buttonLoader ? "Processing..." : "Create Quick Meeting"}
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
