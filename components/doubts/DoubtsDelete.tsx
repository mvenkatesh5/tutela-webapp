import React from "react";
// next imports
import { useRouter } from "next/router";
// react bootstrap
import { Button, Modal } from "react-bootstrap";
// material icons
import { Close } from "@styled-icons/evaicons-solid/Close";
// swr
import { mutate } from "swr";
// api routes
import { DOUBTS_WITH_QUERY_ENDPOINT } from "@constants/routes";
// api services
import { DoubtDelete } from "@lib/services/doubts.service";

const DoubtsDeleteView = ({ children, doubt, mutateQuery, doubt_detail }: any) => {
  const router = useRouter();

  const [modal, setModal] = React.useState(false);
  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };

  const [buttonLoader, setButtonLoader] = React.useState(false);

  const deleteDoubts = (e: any) => {
    const payload = {
      id: doubt.id,
    };
    setButtonLoader(true);
    DoubtDelete(payload)
      .then((response) => {
        setButtonLoader(false);
        if (doubt_detail) {
          router.push("/doubts");
        } else
          mutate(
            mutateQuery,
            async (elements: any) => {
              let index = elements.findIndex((mutateData: any) => mutateData.id === doubt.id);
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
            <h4>Delete Doubt</h4>
            <div className="ms-auto">
              <Button onClick={closeModal} className="close-button mt-0">
                <Close width="25px" className="icon" />
              </Button>
            </div>
          </div>
          <h5 className="mb-4"> Are you sure you want to delete this Doubt.</h5>
          <div className="d-flex gap-2">
            <Button onClick={closeModal} variant="secondary" className="ms-auto">
              Close
            </Button>
            <Button variant="primary" disabled={buttonLoader} onClick={deleteDoubts}>
              {buttonLoader ? "Processing..." : "Delete"}
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      <div onClick={openModal}>{children}</div>
    </div>
  );
};

export default DoubtsDeleteView;
