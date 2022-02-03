import React from "react";
// react bootstrap
import { Button, Modal, Form } from "react-bootstrap";
// material icons
import { Close } from "@styled-icons/evaicons-solid/Close";
// component
import ImageUploader from "@components/doubts/ImageUploader";
// swr
import { mutate } from "swr";
// api routes
import { DOUBTS_WITH_REPLIES_ENDPOINT } from "@constants/routes";
// api services
import { DoubtRepliesEdit } from "@lib/services/doubts.service";
import { AsyncUploadS3File } from "@lib/services";

const ReplyEdit = ({ children, doubt, doubt_id }: any) => {
  const [modal, setModal] = React.useState(false);
  const openModal = () => {
    if (doubt) {
      setFormData({
        ...formData,
        text: doubt.text,
        files: doubt?.data?.attachments || [],
        attachments: [],
      });
    }
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
    setFormData({ text: "" });
  };

  const [buttonLoader, setButtonLoader] = React.useState(false);
  const [formData, setFormData] = React.useState<any>({
    text: "",
    files: doubt?.data?.attachments || [],
    attachments: [],
  });
  const handleFormData = (key: any, value: any) => {
    setFormData({ ...formData, [key]: value });
  };

  const uploadFileToS3 = () => {
    let formDataPayload: any = [];
    setButtonLoader(true);

    if (formData.attachments && formData.attachments.length > 0) {
      formData.attachments.map((file: any) => {
        const formData = new FormData();
        formData.append("asset", file);
        let attributesJson = {
          type: file.type,
        };
        formData.append("attributes", JSON.stringify(attributesJson));
        formDataPayload.push(formData);
      });

      if (formDataPayload && formDataPayload.length > 0) {
        AsyncUploadS3File(formDataPayload)
          .then((response: any) => {
            setButtonLoader(false);
            let assetPayload: any = [];
            if (response && response.length > 0) {
              response.map((asset: any) => {
                assetPayload.push(asset.data);
              });
              if (assetPayload && assetPayload.length > 0) {
                editDoubt(assetPayload);
              }
            } else {
              editDoubt([]);
            }
          })
          .catch((error) => {
            setButtonLoader(false);
            console.log(error);
          });
      } else {
        editDoubt([]);
      }
    } else {
      editDoubt([]);
    }
  };

  const editDoubt = (assetPayload: any) => {
    if (formData.text) {
      const payload = {
        id: doubt.id,
        text: formData.text,
        data: {
          attachments:
            assetPayload && assetPayload.length > 0
              ? [...formData.files, ...assetPayload]
              : formData.files,
        },
      };
      setButtonLoader(true);

      DoubtRepliesEdit(doubt_id, payload)
        .then((response) => {
          setButtonLoader(false);
          mutate(
            [DOUBTS_WITH_REPLIES_ENDPOINT(doubt_id), doubt_id],
            async (elements: any) => {
              let newElement = { ...elements };
              let index = newElement.responses.findIndex(
                (mutateData: any) => mutateData.id === response.id
              );
              newElement.responses = newElement.responses.map((_ele: any, i: Number) =>
                i === index ? response : _ele
              );
              return newElement;
            },
            false
          );
          closeModal();
        })
        .catch((error) => {
          setButtonLoader(false);
        });
    }
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
            <h4>Update Reply</h4>
            <div className="ms-auto">
              <Button onClick={closeModal} className="close-button mt-0">
                <Close width="25px" className="icon" />
              </Button>
            </div>
          </div>
          <div className="mb-4">
            <Form.Group>
              <Form.Control
                as="textarea"
                rows={6}
                value={formData.text}
                placeholder="Enter news here"
                onChange={(e) => handleFormData("text", e.target.value)}
                required
              />
            </Form.Group>

            <div className="mb-3">
              <div className="text-theme-muted mb-2">Upload Attachments</div>
              <ImageUploader data={formData.files} handleData={handleFormData} />
            </div>
          </div>
          <div className="d-flex gap-2">
            <Button onClick={closeModal} variant="secondary" className="ms-auto">
              Close
            </Button>
            <Button variant="primary" disabled={buttonLoader} onClick={uploadFileToS3}>
              {buttonLoader ? "Processing..." : "Continue"}
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      <div onClick={openModal}>{children}</div>
    </div>
  );
};

export default ReplyEdit;
