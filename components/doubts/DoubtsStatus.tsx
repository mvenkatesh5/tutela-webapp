import React from "react";
// react bootstrap
import { Button, Modal } from "react-bootstrap";
// material icons
import { Close } from "@styled-icons/evaicons-solid/Close";
// swr
import { mutate } from "swr";
// api routes
import { DOUBTS_WITH_QUERY_ENDPOINT } from "@constants/routes";
// api services
import { DoubtEdit } from "@lib/services/doubts.service";

const DoubtStatus = ({ children, doubt, mutateQuery, doubt_detail }: any) => {
  const [modal, setModal] = React.useState(false);
  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };

  const [buttonLoader, setButtonLoader] = React.useState(false);

  const updateDontStatus = () => {
    const payload = {
      id: doubt.id,
      is_resolved: !doubt.is_resolved,
    };
    setButtonLoader(true);

    DoubtEdit(payload)
      .then((response) => {
        setButtonLoader(false);
        if (doubt_detail)
          mutate(
            mutateQuery,
            async (elements: any) => {
              let element = { ...elements };
              element.is_resolved = response.is_resolved;
              return element;
            },
            false
          );
        else
          mutate(
            mutateQuery,
            async (elements: any) => {
              let index = elements.findIndex((mutateData: any) => mutateData.id === response.id);
              return elements.filter((item: any, itemIndex: any) => index != itemIndex);
            },
            false
          );
        closeModal();
      })
      .catch((error) => {
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
            <h4>Doubt Review Confirmation</h4>
            <div className="ms-auto">
              <Button onClick={closeModal} className="close-button mt-0">
                <Close width="25px" className="icon" />
              </Button>
            </div>
          </div>
          <div className="my-3">
            Are you sure want to change this doubt status as{" "}
            <b className="blue-text">{doubt?.is_resolved ? "Not Resolved" : "Resolved"}</b>
          </div>

          <div className="d-flex gap-2">
            <Button onClick={closeModal} variant="secondary" className="ms-auto">
              Close
            </Button>
            <Button variant="primary" disabled={buttonLoader} onClick={updateDontStatus}>
              {buttonLoader ? "Processing..." : "Update"}
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      <div onClick={openModal}>{children}</div>
    </div>
  );
};

export default DoubtStatus;
