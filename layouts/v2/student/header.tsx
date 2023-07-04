import React from "react";
// react bootstrap
import { Image } from "react-bootstrap";
// cookie
import { getAuthenticationToken } from "@lib/cookie";

const StudentHeader = () => {
  const defaultImageUrl = "/default-image.png";

  const [tokenDetails, setTokenDetails] = React.useState<any>();
  React.useEffect(() => {
    if (getAuthenticationToken()) {
      let details: any = getAuthenticationToken();
      details = details ? JSON.parse(details) : null;
      if (details && details.info) {
        setTokenDetails(details);
      }
    }
  }, []);

  console.log("tokenDetails", tokenDetails);

  return (
    <div className="tw-relative tw-overflow-hidden tw-w-full tw-h-full tw-py-1 tw-flex tw-items-center">
      <div className="tw-container tw-mx-auto tw-px-5">
        <div className="tw-flex tw-justify-end tw-items-center">
          <div className="tw-flex tw-items-center tw-gap-3">
            <div className="tw-shrink-0 tw-w-[40px] tw-h-[40px] tw-rounded-full tw-bg-gray-200 tw-overflow-hidden">
              <Image
                src={tokenDetails?.user?.photo ? tokenDetails?.user?.photo : "/user.png"}
                alt=""
                className="tw-object-contain tw-w-full tw-h-full"
              />
            </div>
            <div>
              <strong className="tw-font-base">Welcome back, {tokenDetails?.user?.username}</strong>
              <div className="tw-text-sm tw-font-medium">Have a great learning!</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHeader;
