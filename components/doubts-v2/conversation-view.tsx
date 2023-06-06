import React from "react";
// react bootstrap
import { Image } from "react-bootstrap";
// components
import { ImagePreview } from "@components/image-preview";
import { DoubtConversationEditor } from "./conversation-editor";

export const DoubtConversationView: React.FC<any> = ({ conversation, doubt_id, user }) => {
  const [previewImages, setPreviewImages] = React.useState<string[] | null>(null);
  const handlePreviewImages = (data: string[] | null) => {
    setPreviewImages(() => data);
  };

  React.useEffect(() => {
    let scrollView = document.getElementById("doubt-conversation-scroll-into-view");
    if (scrollView) {
      scrollView.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [conversation]);

  return (
    <>
      <div className="tw-w-full tw-h-full tw-relative tw-flex tw-flex-col tw-overflow-hidden">
        <div className="tw-flex-shrink-0 tw-w-full tw-p-2">
          <div className="tw-font-medium">{conversation?.text}</div>
          {conversation?.attachments && conversation?.attachments.length > 0 && (
            <div className="tw-flex tw-gap-2 tw-pt-1">
              {conversation?.attachments.map((attachment: string) => (
                <div
                  key={attachment}
                  className="tw-w-[80px] tw-h-[80px] tw-rounded-sm tw-overflow-hidden tw-bg-gray-100 tw-cursor-pointer"
                  onClick={() => handlePreviewImages(conversation?.attachments)}
                >
                  <Image
                    src={attachment}
                    alt={attachment}
                    className="tw-object-center tw-object-contain tw-w-full tw-h-full"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* rendering previous messages */}
        <div className="tw-w-full tw-h-full tw-border-0 tw-border-t tw-border-b tw-border-solid tw-border-gray-300 tw-p-2 tw-overflow-hidden tw-overflow-y-auto">
          {conversation?.responses && conversation?.responses.length > 0 ? (
            <div className="tw-space-y-3" id="doubt-conversation-scroll-into-view">
              {conversation?.responses.map((_response: any) => (
                <div key={_response?.id} className="tw-flex">
                  <div
                    className={`tw-px-3 tw-py-1 tw-rounded tw-bg-gray-100 tw-bg-opacity-60 ${
                      _response?.user?.id === user?.id ? `tw-ml-auto` : ``
                    }`}
                  >
                    <div>{_response?.text}</div>
                    <div></div>
                    <div className="tw-text-gray-600 tw-text-sm tw-pt-1">
                      by:{" "}
                      <span className="tw-font-medium tw-text-black">
                        {_response?.user?.first_name} {_response?.user?.last_name}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="tw-text-center tw-py-10 tw-text-sm">No Comments available.</div>
          )}
          <div></div>
        </div>

        {/* editor */}
        <DoubtConversationEditor doubt_id={doubt_id} />
      </div>
      {previewImages && previewImages.length > 0 && (
        <ImagePreview images={previewImages} handleImages={handlePreviewImages} />
      )}
    </>
  );
};
