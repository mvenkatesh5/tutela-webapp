import React from "react";
// react bootstrap
import { Button, Form, Modal } from "react-bootstrap";
// material icons
import { Delete } from "@styled-icons/material/Delete";
// swr
import { mutate } from "swr";
// api routes
import { CHANNEL_ENDPOINT } from "@constants/routes";
// api services
import { ChannelDelete } from "@lib/services/communicationService";

const ChannelDeleteView = (props: any) => {
  const [buttonLoader, setButtonLoader] = React.useState<any>(false);

  const [modal, setModal] = React.useState<any>(false);
  const closeModal = () => setModal(false);
  const openModal = () => setModal(true);

  const channelDelete = (event: any) => {
    event.preventDefault();
    setButtonLoader(true);
    ChannelDelete(props.data.id)
      .then((res) => {
        mutate(
          CHANNEL_ENDPOINT,
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
      <p className="m-0 text-danger" onClick={openModal}>
        Delete
      </p>
      {/* <Button variant="outline-danger border-0" className="btn-sm">
        <Delete width="20" />
      </Button> */}

      <Modal show={modal} onHide={closeModal} centered backdrop={"static"}>
        <Modal.Body>
          <Form onSubmit={channelDelete}>
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
              Are you sure to delete the Channel
              <strong>
                {" "}
                {`"`}
                {props.data.name ? props.data.name : ""}
                {`"`}
              </strong>
            </h6>
            <div>
              <Button
                variant="outline-danger"
                className="btn-sm"
                type="submit"
                style={{ marginRight: "10px" }}
              >
                {buttonLoader ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ChannelDeleteView;
