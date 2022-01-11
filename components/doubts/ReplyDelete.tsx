import React from "react";
// react bootstrap
import { Button, Modal } from "react-bootstrap";
// material icons
import { Close } from "@styled-icons/evaicons-solid/Close";
// swr
import { mutate } from "swr";
// api routes
import { DOUBTS_WITH_REPLIES_ENDPOINT } from "@constants/routes";
// api services
import { DoubtRepliesDelete } from "@lib/services/doubts.service";

const ReplyDelete = ({ children, doubt, doubt_id }: any) => {
  const [modal, setModal] = React.useState(false);
  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };

  const [buttonLoader, setButtonLoader] = React.useState(false);

  const deleteDoubt = (e: any) => {
    const payload = {
      id: doubt.id,
    };
    setButtonLoader(true);
    DoubtRepliesDelete(doubt_id, payload)
      .then((response) => {
        setButtonLoader(false);
        mutate(
          [DOUBTS_WITH_REPLIES_ENDPOINT(doubt_id), doubt_id],
          async (elements: any) => {
            let newElement = { ...elements };
            newElement.responses = newElement.responses.filter((_ele: any) => _ele.id != doubt.id);
            return newElement;
          },
          false
        );
        closeModal();
      })
      .catch((error) => {
        console.log(error);
        setButtonLoader(false);
      });
  };

  return (
    <div>
      <Modal
        show={modal}
        onHide={closeModal}
        backdrop="static"
        closeButton
        centered
        keyboard={false}
      >
        <Modal.Body className="m-2 mt-2 troubleshoot-wrapper">
          <div className="primary-heading pb-3 d-flex">
            <h4>Delete Reply</h4>
            <div className="ms-auto">
              <Button onClick={closeModal} className="close-button mt-0">
                <Close width="25px" className="icon" />
              </Button>
            </div>
          </div>
          <h5 className="mb-4">Are you sure want to delete this reply.</h5>

          <div className="d-flex gap-2">
            <Button onClick={closeModal} variant="secondary" className="ms-auto">
              Close
            </Button>
            <Button variant="primary" disabled={buttonLoader} onClick={deleteDoubt}>
              {buttonLoader ? "Processing..." : "Delete"}
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      <div onClick={openModal}>{children}</div>
    </div>
  );
};

export default ReplyDelete;
