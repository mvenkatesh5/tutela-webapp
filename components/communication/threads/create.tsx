import React from "react";
// react bootstrap
import { Button, Form, Modal } from "react-bootstrap";
// swr
import { mutate } from "swr";
// components
import ThreadForm from "./helpers/formRender";
// api routes
import { CHANNEL_WITH_THREAD_ENDPOINT } from "@constants/routes";
// api services
import { ChannelWithThreadCreate } from "@lib/services/communicationService";

const ThreadCreateView = (props: any) => {
  const [buttonLoader, setButtonLoader] = React.useState<any>(false);

  const [modal, setModal] = React.useState<any>(false);
  const closeModal = () => {
    setModal(false);
    setThreadData({
      title: "",
    });
  };
  const openModal = () => setModal(true);

  const [threadData, setThreadData] = React.useState<any>({
    title: "",
  });
  const handleThreadData = (value: any) => {
    setThreadData(value);
  };

  const channelCreate = (event: any) => {
    event.preventDefault();
    setButtonLoader(true);
    const threadPayload = {
      title: threadData.title,
      data: {},
      channel: props.channel_id,
    };

    ChannelWithThreadCreate(threadPayload)
      .then((res) => {
        mutate(
          CHANNEL_WITH_THREAD_ENDPOINT(props.channel_id),
          async (elements: any) => {
            return [...elements, res];
          },
          false
        );
        setButtonLoader(false);
        closeModal();
      })
      .catch((errors) => {
        console.log(errors);
        setButtonLoader(false);
      });
  };

  return (
    <div>
      <Button variant="primary" className="btn-sm" onClick={openModal}>
        Create Thread
      </Button>

      <Modal show={modal} onHide={closeModal} centered backdrop={"static"}>
        <Modal.Body>
          <Form onSubmit={channelCreate}>
            <h4>Create</h4>
            <ThreadForm data={threadData} handleData={handleThreadData} />
            <Button
              variant="outline-primary"
              className="btn-sm"
              type="submit"
              style={{ marginRight: "10px" }}
              disabled={buttonLoader}
            >
              {buttonLoader ? "Creating Thread..." : "Create Thread"}
            </Button>
            <Button variant="outline-secondary" className="btn-sm" onClick={closeModal}>
              Close
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ThreadCreateView;
