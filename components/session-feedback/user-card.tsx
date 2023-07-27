import React from "react";
// next imports
import { useRouter } from "next/router";
// bootstrap
import { Image } from "react-bootstrap";

const UserCard = ({ data, currentSession, currentUser, currentProduct }: any) => {
  const router = useRouter();

  React.useEffect(() => {
    let scrollView = document.getElementById("report-session-user-scroll-into-view");
    if (scrollView) {
      scrollView.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [currentUser]);

  return (
    <div
      id={`${data.id == currentSession ? `report-session-user-scroll-into-view` : ``}`}
      className={`tw-flex tw-items-center tw-gap-2 tw-p-1 tw-px-2 tw-rounded-sm tw-cursor-pointer tw-border-solid ${
        data.id == currentUser
          ? "tw-border-blue-400 tw-bg-blue-100"
          : "tw-border-gray-200 tw-bg-gray-100 tw-bg-opacity-50"
      }`}
      onClick={() => {
        router.replace(
          `/session-feedback?session=${currentSession}&user=${data.id}&product=${currentProduct}`,
          undefined,
          {
            shallow: true,
          }
        );
      }}
    >
      <div className="tw-flex-shrink-0 tw-w-[30px] tw-h-[30px] tw-rounded-full tw-overflow-hidden tw-flex tw-justify-center tw-items-center">
        <Image
          className="tw-object-contain tw-object-center tw-w-full tw-h-full"
          src={"/bird.svg"}
          alt=""
        />
      </div>

      <div className="tw-font-medium tw-text-sm">
        {data?.user.first_name} {data?.user.last_name}
      </div>
    </div>
  );
};
export default UserCard;
