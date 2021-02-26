import React from "react";
// react bootstrap
import { Button, Form, Modal } from "react-bootstrap";
// swr
import { mutate } from "swr";
// api routes
import {
  CHANNEL_WITH_THREAD_ENDPOINT,
  CHANNEL_WITH_THREAD_COLLAPSE_ENDPOINT,
} from "@constants/routes";
// api services
import { ThreadDelete } from "@lib/services/communicationService";
import { APIFetcher } from "@lib/services";

const ThreadDeleteView = (props: any) => {
  const [buttonLoader, setButtonLoader] = React.useState<any>(false);

  const [modal, setModal] = React.useState<any>(false);
  const closeModal = () => setModal(false);
  const openModal = () => setModal(true);

  const threadDelete = (event: any) => {
    event.preventDefault();
    setButtonLoader(true);
    ThreadDelete(props.data.id)
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
              return elements.filter((oldElement: any, i: any) => oldElement.id != props.data.id);
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
      <Button variant="outline-danger" className="btn-sm" onClick={openModal}>
        Delete
      </Button>

      <Modal show={modal} onHide={closeModal} centered backdrop={"static"}>
        <Modal.Body>
          <Form onSubmit={threadDelete}>
            <div className="d-flex align-items-center mb-2">
              <div>
                <h4 className="p-0 m-0">Delete</h4>
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
            <h6>
              Are you sure to delete the thread{" "}
              <strong>{props.data.title ? props.data.title : ""}</strong>
            </h6>
            <div>
              <Button
                variant="outline-danger"
                className="btn-sm"
                type="submit"
                style={{ marginRight: "10px" }}
                disabled={buttonLoader}
              >
                {buttonLoader ? "Deleting Thread..." : "Delete Thread"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ThreadDeleteView;
