import React from "react";
// react bootstrap
import { Button, Form, Modal } from "react-bootstrap";
// material icons
import { Plus } from "@styled-icons/bootstrap";
// swr
import { mutate } from "swr";
// components
import ThreadForm from "./helpers/formRender";
import ThreadEditor from "./helpers/editor";
// api routes
import {
  CHANNEL_WITH_THREAD_ENDPOINT,
  CHANNEL_WITH_THREAD_COLLAPSE_ENDPOINT,
} from "@constants/routes";
// api services
import { ChannelWithThreadCreate } from "@lib/services/communicationService";
import { APIFetcher } from "@lib/services";

const ThreadCreateModalView = (props: any) => {
  const [buttonLoader, setButtonLoader] = React.useState<any>(false);
  const [modal, setModal] = React.useState<any>(false);
  const closeModal = () => {
    setModal(false);
    setThreadData({
      ...threadData,
      title: "Thread",
      content: [
        {
          type: "paragraph",
          children: [{ text: "" }],
        },
      ],
    });
  };
  const openModal = () => setModal(true);

  const [threadData, setThreadData] = React.useState<any>({
    title: "Thread",
    content: [
      {
        type: "paragraph",
        children: [{ text: "" }],
      },
    ],
  });
  const handleThreadData = (value: any) => {
    setThreadData(value);
  };

  const channelThread = (event: any) => {
    event.preventDefault();
    setButtonLoader(true);
    const threadPayload = {
      title: threadData.title,
      data: {
        content: threadData.content,
      },
      channel: props.channel_id,
    };

    ChannelWithThreadCreate(threadPayload)
      .then((res) => {
        if (props.threadView === "collapse")
          mutate(
            CHANNEL_WITH_THREAD_COLLAPSE_ENDPOINT(props.channel_id),
            APIFetcher(CHANNEL_WITH_THREAD_COLLAPSE_ENDPOINT(props.channel_id)),
            false
          );
        else
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
      <div className="d-flex">
        <div>
          <Button variant="primary" className="btn-sm border ms-auto" onClick={openModal}>
            <Plus width="20" />
            Add Thread
          </Button>
        </div>
      </div>

      <Modal show={modal} size="lg" onHide={closeModal} centered backdrop={"static"}>
        <Modal.Body>
          <div className="d-flex align-items-center mb-2">
            <div>
              <h4 className="p-0 m-0">Create</h4>
            </div>
            <div className="ms-auto">
              <Button variant="outline-secondary border-0" className="btn-sm" onClick={closeModal}>
                Close
              </Button>
            </div>
          </div>

          <div className="mb-2">
            <Form.Label className="mb-1 text-muted">Title</Form.Label>
            <ThreadEditor data={threadData} handleData={handleThreadData} edit={true} />
          </div>

          <Button
            variant="outline-primary"
            className="btn-sm"
            style={{ marginRight: "10px" }}
            disabled={buttonLoader}
            onClick={channelThread}
          >
            {buttonLoader ? "Creating Thread..." : "Create Thred"}
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ThreadCreateModalView;
