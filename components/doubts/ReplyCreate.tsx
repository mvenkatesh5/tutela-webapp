import React from "react";
// next imports
import Image from "next/image"; // react bootstrap
import { Button } from "react-bootstrap";
// swr
import { mutate } from "swr";
// components
import ImageUploader from "@components/doubts/ImageUploader";
// api routes
import { DOUBTS_WITH_QUERY_ENDPOINT } from "@constants/routes";
// api services
import { DoubtRepliesCreate } from "@lib/services/doubts.service";
import { AsyncUploadS3File } from "@lib/services";

const ReplyCreate = ({ doubt_id, currentUser, reply_id }: any) => {
  const [editor, setEditor] = React.useState(false);
  const handleEditor = () => {
    setEditor(false);
    setFormData({
      text: "",
      attachments: [],
    });
  };

  const [buttonLoader, setButtonLoader] = React.useState(false);
  const [formData, setFormData] = React.useState({
    text: "",
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
                updateReplies(assetPayload);
              }
            } else {
              updateReplies([]);
            }
          })
          .catch((error) => {
            setButtonLoader(false);
            console.log(error);
          });
      } else {
        updateReplies([]);
      }
    } else {
      updateReplies([]);
    }
  };

  const updateReplies = (assetPayload: any) => {
    if (formData.text) {
      const payload = {
        text: formData.text,
        data: {
          attachments: assetPayload,
        },
      };
      setButtonLoader(true);
      DoubtRepliesCreate(doubt_id, payload)
        .then((response) => {
          setButtonLoader(false);
          handleEditor();
          mutate(
            [DOUBTS_WITH_QUERY_ENDPOINT(doubt_id), doubt_id],
            async (elements: any) => {
              let newElement = { ...elements };
              if (elements && elements.length > 0) {
                newElement.responses = [...newElement.responses, response];
              }
              return newElement;
            },
            false
          );
        })
        .catch((error) => {
          console.log(error);
          setButtonLoader(false);
        });
    }
  };

  return (
    <div>
      <Button size={"sm"} onClick={() => setEditor(!editor)} className="mb-3">
        <div className="-mt-1">{reply_id === currentUser?.user?.id ? "Reply" : "Answer"}</div>
      </Button>
      {editor && (
        <>
          <div className="w-100">
            <textarea
              rows={6}
              placeholder="Write your reply here"
              className="w-100 border rounded px-3 py-2 m-auto"
              value={formData.text}
              onChange={(e) => handleFormData("text", e.target.value)}
            />
            <div className="mt-2">
              <div className="text-muted mb-1">Upload Attachments :</div>
              <ImageUploader data={null} handleData={handleFormData} />
            </div>
          </div>
          <div className="d-flex justify-end mt-2">
            <Button
              variant="secondary"
              className="ms-auto"
              disabled={buttonLoader}
              onClick={uploadFileToS3}
            >
              {buttonLoader ? "Processing..." : "Send"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ReplyCreate;
