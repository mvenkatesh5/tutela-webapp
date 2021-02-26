import React from "react";
// react bootstrap
import { Button, Form, Modal } from "react-bootstrap";
// material icons
import { CalendarEdit } from "@styled-icons/boxicons-regular/CalendarEdit";
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
  const openModal = () => {
    setModal(true);
    initialDataSet();
  };

  const [threadData, setThreadData] = React.useState<any>();
  const handleThreadData = (value: any) => {
    setThreadData(value);
  };

  const initialDataSet = () => {
    handleThreadData({
      title: props.data.title ? props.data.title : "",
      content:
        props.data.data && props.data.data.content
          ? props.data.data.content
          : [
              {
                type: "paragraph",
                children: [{ text: "" }],
              },
              {
                type: "paragraph",
                children: [{ text: "" }],
              },
              {
                type: "paragraph",
                children: [{ text: "" }],
              },
            ],
    });
  };

  React.useEffect(() => {
    if (props.data) {
      initialDataSet();
    }
  }, [props.data, props.data.data, props.data.data.content]);

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
      <Button variant="outline-primary border-0" className="btn-sm" onClick={openModal}>
        <CalendarEdit width="20" />
      </Button>

      <Modal show={modal} size="lg" onHide={closeModal} centered backdrop={"static"}>
        <Modal.Body>
          <Form onSubmit={threadUpdate}>
            <div className="d-flex align-items-center mb-2">
              <div>
                <h4 className="p-0 m-0">Edit</h4>
              </div>
              <div className="ms-auto">
                <Button
                  variant="outline-secondary border-0"
                  className="btn-sm"
                  onClick={closeModal}
                >
                  Close
                </Button>
              </div>
            </div>
            {threadData && (
              <div>
                {/* <ThreadForm data={threadData} handleData={handleThreadData} /> */}
                <div className="mb-2">
                  <Form.Label className="mb-1 text-muted">Description</Form.Label>
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
              </div>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ThreadEditView;
