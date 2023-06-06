import React from "react";
// react bootstrap
import { Form } from "react-bootstrap";
// material icons
import { Images, Send, Loader } from "@styled-icons/boxicons-regular";
// swr
import useSWR, { mutate } from "swr";
// api routes
import { PRODUCTS_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";
import { DoubtsRepliesV2Service } from "@lib/services/doubts_v2.service";

export const DoubtConversationEditor: React.FC<any> = ({ doubt_id }) => {
  const initialPayload = {
    text: "",
    attachments: "",
  };

  const [buttonLoader, setButtonLoader] = React.useState<any>(false);

  const [formData, setFormData] = React.useState<any>({ ...initialPayload });
  const handleFormData = (key: any, value: any) => {
    setFormData({ ...formData, [key]: value });
  };

  const createConversation = () => {
    if (formData.text) {
      setButtonLoader(true);
      const payload = {
        text: formData.text,
        attachments: formData.attachments,
      };

      DoubtsRepliesV2Service.create({ doubt: doubt_id, data: payload })
        .then((response) => {
          setButtonLoader(false);
          setFormData({ ...initialPayload });
          mutate(
            `DOUBTS_V2_CONVERSATION_${doubt_id}`,
            async (elements: any) => {
              console.log("elements");
              elements = { ...elements, responses: [...elements.responses, response] };
              return elements;
            },
            false
          );
        })
        .catch((error) => {
          setButtonLoader(false);
        });
    } else {
      alert("Please enter the comment");
    }
  };

  return (
    <div className="tw-flex-shrink-0 tw-w-full tw-flex tw-gap-3 tw-items-center tw-p-2">
      {/* <div className="tw-flex-shrink-0 tw-w-[32px] tw-h-[32px] tw-rounded-sm tw-bg-gray-100 hover:tw-bg-gray-200 tw-cursor-pointer tw-border tw-border-solid tw-border-gray-100 tw-overflow-hidden tw-flex tw-justify-center tw-items-center tw-p-1.5">
        <Images />
      </div> */}
      <div className="tw-w-full">
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Comment"
          required
          value={formData.text}
          onChange={(e) => handleFormData("text", e.target.value)}
        />
      </div>
      <div
        className="tw-flex-shrink-0 tw-w-[32px] tw-h-[32px] tw-rounded-sm tw-bg-gray-100 hover:tw-bg-gray-200 tw-cursor-pointer tw-border tw-border-solid tw-border-gray-100 tw-overflow-hidden tw-flex tw-justify-center tw-items-center tw-p-1.5"
        onClick={() => {
          if (!buttonLoader) createConversation();
        }}
      >
        {buttonLoader ? <Loader /> : <Send />}
      </div>
    </div>
  );
};
