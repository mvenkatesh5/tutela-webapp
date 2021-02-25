import React from "react";
// react bootstrap
import { Button, Form, Modal } from "react-bootstrap";
// swr
import { mutate } from "swr";
// api routes
import {
  THREAD_WITH_COMMENT_ENDPOINT,
  CHANNEL_WITH_THREAD_COLLAPSE_ENDPOINT,
} from "@constants/routes";
// api services
import { CommentDelete } from "@lib/services/communicationService";
import { APIFetcher } from "@lib/services";

const CommentDeleteView = (props: any) => {
  const [buttonLoader, setButtonLoader] = React.useState<any>(false);

  const [modal, setModal] = React.useState<any>(false);
  const closeModal = () => setModal(false);
  const openModal = () => setModal(true);

  const commentDelete = (event: any) => {
    event.preventDefault();
    setButtonLoader(true);
    CommentDelete(props.data.id)
      .then((res) => {
        if (props.thread_id)
          mutate(
            THREAD_WITH_COMMENT_ENDPOINT(props.thread_id),
            async (elements: any) => {
              return elements.filter((oldElement: any, i: any) => oldElement.id != props.data.id);
            },
            false
          );
        else
          mutate(
            CHANNEL_WITH_THREAD_COLLAPSE_ENDPOINT(props.channel_id),
            APIFetcher(CHANNEL_WITH_THREAD_COLLAPSE_ENDPOINT(props.channel_id)),
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
          <Form onSubmit={commentDelete}>
            <h4>Delete</h4>
            <h6>Are you sure to delete the Comment?</h6>
            <div>
              <Button
                variant="outline-danger"
                className="btn-sm"
                type="submit"
                style={{ marginRight: "10px" }}
              >
                {buttonLoader ? "Deleting Comment..." : "Delete Comment"}
              </Button>
              <Button variant="outline-secondary" className="btn-sm" onClick={closeModal}>
                Close
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CommentDeleteView;
