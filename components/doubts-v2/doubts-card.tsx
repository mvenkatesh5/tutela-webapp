import React from "react";
// next imports
import Link from "next/link";

export const DoubtsCard: React.FC<any> = ({ type, doubt_id, doubts }) => {
  return (
    <>
      {doubts.map((_doubt: any) => (
        <Link key={_doubt?.id} href={`doubts-v2?type=${type}&doubt_id=${_doubt?.id}`}>
          <a>
            <div
              className={`tw-m-0 tw-border-0 tw-border-b tw-border-solid tw-border-gray-300 tw-p-2 tw-cursor-pointer tw-text-black ${
                doubt_id == _doubt?.id ? `tw-bg-gray-100` : `hover:tw-bg-gray-100`
              }`}
            >
              <div className="tw-text-sm tw-font-medium">{_doubt?.text}</div>
              <div className="tw-text-sm tw-pt-2 tw-space-y-1">
                <div className="tw-text-gray-600">
                  product:{" "}
                  <span className="tw-font-medium tw-text-black">
                    {_doubt?.product_detail?.name}
                  </span>
                </div>
                <div className="tw-text-gray-600">
                  by:{" "}
                  <span className="tw-font-medium tw-text-black">
                    {_doubt?.user?.first_name} {_doubt?.user?.last_name}
                  </span>
                </div>
              </div>
            </div>
          </a>
        </Link>
      ))}
    </>
  );
};
