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
        if (!props.collapse)
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
      <Button
        variant="outline-danger border-0 p-0"
        className="btn-sm slate-buttons"
        onClick={openModal}
      >
        Delete
      </Button>

      <Modal show={modal} onHide={closeModal} centered backdrop={"static"}>
        <Modal.Body>
          <Form onSubmit={commentDelete}>
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
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CommentDeleteView;
