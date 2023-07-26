import React from "react";
// react bootstrap
import { Button } from "react-bootstrap";
// swr
import useSWR, { mutate } from "swr";

// api services
import { SessionReport } from "@lib/services/session-report.service";

const AttachResourceReportSessionUser = ({ session }: any) => {
  const [selectedUser, setSelectedUser] = React.useState<any>(null);

  const { data: userResourcesAttached, error: userResourcesAttachedError } = useSWR(
    session && session?.id && selectedUser
      ? `session-attach-resource-render-${selectedUser}`
      : null,
    session && session?.id && selectedUser
      ? () => SessionReport.getBySessionUserId(selectedUser, { session_id: session?.id })
      : null,
    { refreshInterval: 0 }
  );

  const [buttonLoader, setButtonLoader] = React.useState<any>([]);
  const handleButtonLoader = (attach_id: any) => {
    setButtonLoader((prevData: any) =>
      prevData.includes(attach_id)
        ? prevData.filter((_data: string | number) => _data != attach_id)
        : [...prevData, attach_id]
    );
  };

  const detachResource = (attach_id: any) => {
    handleButtonLoader(attach_id);
    SessionReport.delete(attach_id)
      .then((response: any) => {
        mutate(
          `session-attach-resource-render-${selectedUser}`,
          async (elements: any) => {
            let updatedElements =
              elements && elements.reports.length > 0
                ? elements.reports.filter((oldElement: any, i: any) => oldElement.id != attach_id)
                : elements.reports;
            return { reports: updatedElements };
          },
          false
        );
        handleButtonLoader(attach_id);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <div>
      <div className="tw-space-y-3">
        {/* rendering users */}
        <div>
          <h6 className="tw-m-0 tw-p-0 tw-pb-2">Session Users</h6>
          <div className="tw-relative tw-flex tw-items-center tw-flex-grow tw-gap-2 tw-select-none">
            {session &&
              session?.session_users &&
              session?.session_users?.length > 0 &&
              session?.session_users.map(
                (_session_user: any) =>
                  _session_user?.as_role === 0 && (
                    <div
                      key={_session_user?.id}
                      className="tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-flex tw-items-center tw-gap-1 tw-p-1 tw-py-0.5 tw-cursor-pointer hover:tw-bg-gray-100"
                      onClick={() => setSelectedUser(_session_user?.id)}
                    >
                      <div
                        className={`tw-border tw-border-solid tw-w-[14px] tw-h-[14px] tw-rounded-full tw-flex tw-justify-center tw-items-center 
                          ${
                            selectedUser == _session_user?.id
                              ? `tw-border-blue-500`
                              : `tw-border-gray-400`
                          }
                          `}
                      >
                        {selectedUser == _session_user?.id && (
                          <div className="tw-border tw-border-solid tw-border-blue-500 tw-bg-blue-500 tw-w-[10px] tw-h-[10px] tw-rounded-full"></div>
                        )}
                      </div>
                      <div className="tw-font-medium tw-text-sm tw-capitalize">
                        {_session_user?.user?.first_name} {_session_user?.user?.last_name}
                      </div>
                    </div>
                  )
              )}
          </div>
        </div>

        {/* attached resources */}
        <div>
          {selectedUser ? (
            <>
              {userResourcesAttached && !userResourcesAttachedError ? (
                <>
                  {userResourcesAttached &&
                  userResourcesAttached?.reports &&
                  userResourcesAttached?.reports.length > 0 ? (
                    <div className="tw-space-y-1">
                      {userResourcesAttached?.reports.map((_resource_attachment: any) => (
                        <div
                          key={_resource_attachment?.id}
                          className="tw-border tw-border-solid tw-border-gray-300 tw-rounded-sm tw-p-1 tw-flex tw-items-center tw-gap-2"
                        >
                          <div className="tw-text-sm tw-font-medium">
                            <div className="tw-flex tw-items-center tw-gap-2">
                              <div className="tw-text-gray-500">Resource:</div>
                              <div>{_resource_attachment?.resource_detail?.title}</div>
                            </div>
                            <div className="tw-flex tw-items-center tw-gap-2">
                              <div className="tw-text-gray-500">Session:</div>
                              <div className="tw-text-xs">
                                {_resource_attachment?.session_details?.title}
                              </div>
                            </div>
                          </div>
                          <div className="tw-ml-auto">
                            <Button
                              variant="outline-danger"
                              className="btn-sm"
                              disabled={buttonLoader.includes(_resource_attachment?.id)}
                              onClick={() => detachResource(_resource_attachment?.id)}
                            >
                              {buttonLoader.includes(_resource_attachment?.id)
                                ? "Detaching..."
                                : "Detach"}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="tw-text-center tw-text-sm tw-font-medium tw-text-gray-500 tw-py-6">
                      No attached resources found. Please attach resources to the student.
                    </div>
                  )}
                </>
              ) : (
                <div className="tw-text-center tw-text-sm tw-font-medium tw-text-gray-500 tw-py-6">
                  Loading...
                </div>
              )}
            </>
          ) : (
            <div className="tw-text-center tw-text-sm tw-font-medium tw-text-gray-500 tw-py-6">
              Select a user to view attached resources
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttachResourceReportSessionUser;
