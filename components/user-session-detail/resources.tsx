import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import useSWR, { mutate } from "swr";
// material icons
import { ChevronDown } from "@styled-icons/boxicons-regular/ChevronDown";
import { ChevronRight } from "@styled-icons/boxicons-regular/ChevronRight";
import { Folder } from "@styled-icons/boxicons-solid/Folder";
import { FilePng } from "@styled-icons/boxicons-solid/FilePng";
import { FileJson } from "@styled-icons/boxicons-solid/FileJson";
import { FileBlank } from "@styled-icons/boxicons-regular/FileBlank";
import { FilePdf } from "@styled-icons/boxicons-solid/FilePdf";
import { ClipboardNotes } from "@styled-icons/foundation/ClipboardNotes";
import { BookReader } from "@styled-icons/boxicons-regular/BookReader";
import { LaptopChromebook } from "@styled-icons/material-rounded/LaptopChromebook";
// services
import { SessionReport } from "@lib/services/session-report.service";

interface IUserResources {
  user: any;
  session: any;
}

export const UserResources: FC<IUserResources> = (props) => {
  const { user, session } = props;

  const router = useRouter();
  const { session_id } = router.query as { session_id: string };

  const [currentSessionUser, setCurrentSessionUser] = useState();

  useEffect(() => {
    if (session && session?.session_users && session?.session_users.length > 0 && user) {
      const sessionUser = session?.session_users?.filter(
        (session_user: any) => session_user?.user?.id === user?.user?.id
      );
      if (sessionUser && sessionUser.length > 0) setCurrentSessionUser(sessionUser[0]?.id);
    }
  }, [session, user]);

  const { data: userReports, error: userReportsError } = useSWR(
    session_id && currentSessionUser ? `session_user_report_student-${session_id}-${user}` : null,
    session_id && currentSessionUser
      ? () => SessionReport.getBySessionUserId(currentSessionUser, { session_id: session_id })
      : null,
    { refreshInterval: 0 }
  );

  const imageFileNameSplitRender = (value: any) => {
    let splitValue = value.split("/");
    if (splitValue && splitValue.length > 0) {
      splitValue = splitValue[splitValue.length - 1];
      splitValue = splitValue.split(".");
      splitValue = splitValue[splitValue.length - 1];
      return splitValue.toUpperCase();
    }
    return "";
  };

  const extractFileNameFromUrl = (url: string) => {
    let urlPayload: any = url ? url.split("/") : "";
    urlPayload = urlPayload && urlPayload.length > 0 ? urlPayload[urlPayload.length - 1] : "";
    urlPayload = urlPayload ? urlPayload.split(".") : "";
    urlPayload = urlPayload && urlPayload.length > 0 ? urlPayload[urlPayload.length - 1] : "";
    if (urlPayload.toLowerCase() === "pdf") return true;
    return false;
  };

  console.log("userReports", userReports);

  const product_resource_id =
    session?.product?.resources && session?.product?.resources.length > 0
      ? session?.product?.resources[0]?.id || null
      : null;

  console.log("product_resource_id", product_resource_id);

  return (
    <div>
      {!userReports && !userReportsError ? (
        <div className="text-center text-secondary m-5">Loading...</div>
      ) : (
        <>
          {userReports && userReports?.reports && userReports?.reports?.length > 0 ? (
            <div className="tw-space-y-2">
              {userReports?.reports.map((_report: any) => (
                <div
                  key={_report?.id}
                  className="tw-border tw-border-solid tw-border-gray-200 tw-flex tw-items-center tw-gap-2 tw-p-2 tw-rounded-sm"
                >
                  <div className="tw-flex tw-items-center tw-gap-2">
                    <div className="tw-w-[24px] tw-h-[24px] tw-overflow-hidden">
                      {_report?.resource_detail.kind === "SECTION" ? (
                        <div className="flex-item">
                          <Folder />
                        </div>
                      ) : _report?.resource_detail.data.kind === "digital_sat" ? (
                        <div className="flex-item" style={{ color: "#0077C8" }}>
                          <LaptopChromebook />
                        </div>
                      ) : (
                        <div className="flex-item">
                          {imageFileNameSplitRender(_report?.resource_detail.data.url) === "PNG" ? (
                            <FilePng />
                          ) : imageFileNameSplitRender(_report?.resource_detail.data.url) ===
                            "JSON" ? (
                            <FileJson />
                          ) : imageFileNameSplitRender(_report?.resource_detail.data.url) ===
                            "PDF" ? (
                            <FilePdf />
                          ) : (
                            <FileBlank />
                          )}
                        </div>
                      )}
                    </div>
                    <div className="tw-font-medium">{_report?.resource_detail?.title}</div>
                  </div>
                  <div className="tw-ml-auto">
                    {(_report?.resource_detail.data.kind === "document_objective_answers" ||
                      _report?.resource_detail.data.kind === "document_subjective_answers") && (
                      <div className="text-sm" style={{ whiteSpace: "nowrap" }}>
                        <Link
                          href={`/user-resources/${product_resource_id}/assessment?resource_node_id=${_report?.resource_detail?.id}&session_id=${_report?.session}&session_user=${_report?.session_user}`}
                        >
                          <a target="_blank" rel="noreferrer">
                            Take test
                          </a>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>No resources are allocated to this user</div>
          )}
        </>
      )}
    </div>
  );
};
