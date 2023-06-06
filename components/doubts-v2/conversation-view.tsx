import React from "react";
// react bootstrap
import { Image } from "react-bootstrap";
// components
import { ImagePreview } from "@components/image-preview";
import { DoubtConversationEditor } from "./conversation-editor";

export const DoubtConversationView: React.FC<any> = ({ conversation }) => {
  const [previewImages, setPreviewImages] = React.useState<string[] | null>(null);
  const handlePreviewImages = (data: string[] | null) => {
    setPreviewImages(() => data);
  };

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
        <div className="tw-w-full tw-h-full tw-border-0 tw-border-t tw-border-b tw-border-solid tw-border-gray-300 tw-p-2"></div>

        {/* editor */}
        <DoubtConversationEditor />
      </div>
      {previewImages && previewImages.length > 0 && (
        <ImagePreview images={previewImages} handleImages={handlePreviewImages} />
      )}
    </>
  );
};
