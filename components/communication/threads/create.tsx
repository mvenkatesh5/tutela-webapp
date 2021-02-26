import React from "react";
// react bootstrap
import { Button, Form, Modal } from "react-bootstrap";
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

const ThreadCreateView = (props: any) => {
  const [buttonLoader, setButtonLoader] = React.useState<any>(false);

  const [modal, setModal] = React.useState<any>(false);
  const closeModal = () => {
    setModal(false);
    setThreadData({
      title: "Thread",
      content: [
        {
          type: "paragraph",
          children: [{ text: "type your content here." }],
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
        children: [{ text: "type your content here." }],
      },
    ],
  });
  const handleThreadData = (value: any) => {
    setThreadData(value);
  };

  const channelCreate = (event: any) => {
    event.preventDefault();
    setButtonLoader(true);
    const threadPayload = {
      title: threadData.title,
      data: {
        content: threadData.content,
      },
      channel: props.channel_id,
    };

    console.log(threadPayload);

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
      <Button variant="primary" className="btn-sm" onClick={openModal}>
        Create Thread
      </Button>

      <Modal show={modal} size="lg" onHide={closeModal} centered backdrop={"static"}>
        <Modal.Body>
          <Form onSubmit={channelCreate}>
            <h4>Create</h4>
            {/* <ThreadForm data={threadData} handleData={handleThreadData} /> */}
            <div className="mb-2">
              <ThreadEditor data={threadData} handleData={handleThreadData} edit={true} />
            </div>
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
