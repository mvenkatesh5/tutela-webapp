import React from "react";
// react bootstrap
import { Image } from "react-bootstrap";

export const DoubtConversationView: React.FC<any> = ({ conversation }) => {
  console.log("conversation", conversation);
  return (
    <div className="tw-w-full tw-h-full tw-relative tw-flex tw-flex-col tw-overflow-hidden">
      <div className="tw-flex-shrink-0 tw-w-full tw-p-2">
        <div className="tw-font-medium">{conversation?.text}</div>
        <div className="tw-flex tw-gap-2 tw-pt-1">
          {conversation?.attachments &&
            conversation?.attachments.length > 0 &&
            conversation?.attachments.map((attachment: string) => (
              <div
                key={attachment}
                className="tw-w-[80px] tw-h-[80px] tw-rounded-sm tw-overflow-hidden tw-bg-gray-100 tw-cursor-pointer"
              >
                <Image
                  src={attachment}
                  alt={attachment}
                  className="tw-object-center tw-object-contain tw-w-full tw-h-full"
                />
              </div>
            ))}
        </div>
        <div className="tw-text-sm tw-pt-2 tw-space-y-1">
          <div className="tw-text-gray-600">
            by:{" "}
            <span className="tw-font-medium tw-text-black">
              {conversation?.user?.first_name} {conversation?.user?.last_name}
            </span>
          </div>
        </div>
      </div>
      <div className="tw-w-full tw-h-full"></div>
      <div className="tw-flex-shrink-0 tw-w-full"></div>
    </div>
  );
};
