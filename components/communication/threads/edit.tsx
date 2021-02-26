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
import { ThreadUpdate } from "@lib/services/communicationService";
import { APIFetcher } from "@lib/services";

const ThreadEditView = (props: any) => {
  const [buttonLoader, setButtonLoader] = React.useState<any>(false);

  const [modal, setModal] = React.useState<any>(false);
  const closeModal = () => setModal(false);
  const openModal = () => setModal(true);

  const [threadData, setThreadData] = React.useState<any>();
  const handleThreadData = (value: any) => {
    setThreadData(value);
  };

  React.useEffect(() => {
    if (props.data) {
      setThreadData({
        ...threadData,
        title: props.data.title ? props.data.title : "",
        content:
          props.data.data && props.data.data.content
            ? props.data.data.content
            : [
                {
                  type: "paragraph",
                  children: [{ text: "type your content here." }],
                },
              ],
      });
    }
  }, [props.data]);

  const threadUpdate = (event: any) => {
    event.preventDefault();
    setButtonLoader(true);

    const channelPayload = {
      id: props.data.id,
      title: threadData.title,
      data: {
        content: threadData.content,
      },
    };

    ThreadUpdate(channelPayload)
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
              let index = elements.findIndex((mutateData: any) => mutateData.id === res.id);
              return elements.map((oldElement: any, i: Number) => (i === index ? res : oldElement));
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
      <Button variant="outline-primary" className="btn-sm" onClick={openModal}>
        Edit
      </Button>

      <Modal show={modal} size="lg" onHide={closeModal} centered backdrop={"static"}>
        <Modal.Body>
          <Form onSubmit={threadUpdate}>
            <h4>Edit</h4>
            {threadData && (
              <div>
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
                  {buttonLoader ? "Updating Thread..." : "Update Thread"}
                </Button>
                <Button variant="outline-secondary" className="btn-sm" onClick={closeModal}>
                  Close
                </Button>
              </div>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ThreadEditView;
