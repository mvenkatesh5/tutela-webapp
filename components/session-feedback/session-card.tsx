import React from "react";
// next imports
import { useRouter } from "next/router";
// bootstrap
import { Image } from "react-bootstrap";
// global imports
import { datePreview } from "@constants/global";

const SessionCard = ({ data, currentSession, currentUser, currentProduct }: any) => {
  const router = useRouter();

  React.useEffect(() => {
    let scrollView = document.getElementById("report-session-scroll-into-view");
    if (scrollView) {
      scrollView.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [currentSession]);

  const sessionStudents = data.session_users.filter((_user: any) => _user.as_role === 0);

  return (
    <div
      onClick={() => {
        router.replace(
          `/session-feedback?session=${data?.id}${
            data?.session_users.length > 0 && `&user=${sessionStudents[0].id}`
          }${data?.product && `&product=${data?.product}`}`,
          undefined,
          { shallow: true }
        );
      }}
      className={`tw-p-1 tw-px-2 tw-rounded-sm tw-cursor-pointer tw-border-solid ${
        data.id == currentSession
          ? "tw-border-blue-400 tw-bg-blue-100"
          : "tw-border-gray-200 tw-bg-gray-100 tw-bg-opacity-50"
      }`}
      id={`${data.id == currentSession ? `report-session-scroll-into-view` : ``}`}
    >
      <div className="tw-flex tw-gap-2">
        <div className="tw-flex-shrink-0 tw-w-[40px] tw-h-[40px] tw-overflow-hidden tw-flex tw-justify-center tw-items-center">
          <Image
            className="tw-object-contain tw-object-center tw-w-full tw-h-full"
            src={"/bird.svg"}
            alt=""
          />
        </div>
        <div className="tw-space-y-1">
          <div className="tw-font-medium tw-text-sm">{data.title}</div>
          <div className="tw-flex tw-items-center tw-gap-2">
            {/* <div className="tw-inline-flex tw-bg-gray-300 tw-rounded-sm tw-text-xs tw-font-medium tw-p-1 tw-py-0.5">
              8/10
            </div> */}
            <div className="tw-inline-flex tw-bg-gray-300 tw-text-xs tw-font-medium tw-rounded-sm tw-p-1 tw-py-0.5">
              {datePreview(data.start_datetime)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SessionCard;
