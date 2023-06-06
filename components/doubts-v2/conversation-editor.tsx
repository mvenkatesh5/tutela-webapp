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
import { DoubtsV2Service } from "@lib/services/doubts_v2.service";

export const DoubtConversationEditor: React.FC<any> = () => {
  const initialPayload = {
    text: "",
    attachments: "",
  };

  const [buttonLoader, setButtonLoader] = React.useState<any>(false);

  const [formData, setFormData] = React.useState<any>({ ...initialPayload });
  const handleFormData = (key: any, value: any) => {
    setFormData({ ...formData, [key]: value });
  };

  const formSubmit = (event: any) => {
    event.preventDefault();
    setButtonLoader(true);
    createConversation();
  };

  const createConversation = () => {
    const payload = {
      text: formData.text,
      attachments: formData.attachments,
    };

    // DoubtsV2Service.create(payload)
    //   .then((response) => {
    //     console.log("response", response);
    //     setButtonLoader(false);
    //     if (payload.kind === "log") mutate("DOUBTS_V2_PERSONAL", false);
    //     else mutate("DOUBTS_V2_PUBLIC", false);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setButtonLoader(false);
    //   });
  };

  return (
    <div className="tw-flex-shrink-0 tw-w-full tw-flex tw-gap-3 tw-items-center tw-p-2">
      {/* <div className="tw-flex-shrink-0 tw-w-[32px] tw-h-[32px] tw-rounded-sm tw-bg-gray-100 hover:tw-bg-gray-200 tw-cursor-pointer tw-border tw-border-solid tw-border-gray-100 tw-overflow-hidden tw-flex tw-justify-center tw-items-center tw-p-1.5">
        <Images />
      </div> */}
      <div className="tw-w-full">Content</div>
      <div className="tw-flex-shrink-0 tw-w-[32px] tw-h-[32px] tw-rounded-sm tw-bg-gray-100 hover:tw-bg-gray-200 tw-cursor-pointer tw-border tw-border-solid tw-border-gray-100 tw-overflow-hidden tw-flex tw-justify-center tw-items-center tw-p-1.5">
        <Loader />
        {/* <Send /> */}
      </div>
    </div>
  );
};
