import React from "react";
// next imports
import Link from "next/link";
import { useRouter } from "next/router";
// swr
import useSWR, { mutate } from "swr";
// react bootstrap
import { Button } from "react-bootstrap";
// seo
import Page from "@components/page";
import { META_DESCRIPTION } from "@constants/page";
// layout
import AdminLayout from "@layouts/adminLayout";
// components
import { DoubtsCard, DoubtConversationView, AskDoubtModal } from "@components/doubts-v2";
// services
import { DoubtsV2Service, DoubtsRepliesV2Service } from "@lib/services/doubts_v2.service";
// cookie
import { getAuthenticationToken } from "@lib/cookie";
// hoc
import withGlobalAuth from "@lib/hoc/withGlobalAuth";

const DoubtsV2Render = () => {
  const meta = {
    title: "Doubts",
    description: META_DESCRIPTION,
  };

  const doubtsOptions = [
    { title: "Error Log", key: "log" },
    { title: "Teacher Log", key: "ask" },
  ];

  const [currentUser, setCurrentUser] = React.useState<any>();
  React.useEffect(() => {
    let user: any = getAuthenticationToken();
    user = user ? JSON.parse(user) : "";
    if (user && user?.user) {
      setCurrentUser(user?.user);
    }
  }, []);

  const router = useRouter();
  const { type, doubt_id } = router.query as { type: string; doubt_id: string };

  const { data: doubtsPersonal, error: doubtsPersonalError } = useSWR(
    type && type === "log" ? `DOUBTS_V2_PERSONAL` : null,
    type && type === "log" ? () => DoubtsV2Service.getPersonalDoubts() : null
  );

  const { data: doubtsPublic, error: doubtsPublicError } = useSWR(
    type && type === "ask" ? `DOUBTS_V2_PUBLIC` : null,
    type && type === "ask" ? () => DoubtsV2Service.getPublicDoubts() : null
  );

  const { data: doubtsConversation, error: doubtsConversationError } = useSWR(
    doubt_id ? `DOUBTS_V2_CONVERSATION_${doubt_id}` : null,
    doubt_id ? () => DoubtsRepliesV2Service.getReplies(doubt_id) : null
  );

  return (
    <Page meta={meta}>
      <AdminLayout>
        <div className="tw-relative tw-w-full tw-h-full tw-overflow-hidden tw-container tw-mx-auto tw-py-4 ">
          <div className="tw-relative tw-w-full tw-h-full tw-flex tw-flex-col tw-border tw-border-solid tw-border-gray-300 tw-rounded-sm">
            <div className="tw-border-0 tw-border-b tw-border-gray-300 tw-border-solid tw-flex-shrink-0 tw-w-full tw-flex tw-justify-between tw-items-center tw-p-2 tw-px-3">
              <div className="tw-font-medium tw-text-xl">Doubts</div>
              <div>
                <AskDoubtModal>
                  <Button size="sm" variant="outline-primary">
                    Ask Doubt
                  </Button>
                </AskDoubtModal>
              </div>
            </div>
            <div className="tw-relative tw-w-full tw-h-full tw-flex tw-overflow-hidden">
              {/* chat root */}
              <div className="tw-relative tw-w-full tw-h-full tw-flex tw-overflow-hidden">
                {/* sidebar */}
                <div className="tw-border-0 tw-border-r tw-border-solid tw-border-gray-300 tw-flex-shrink-0 tw-w-[320px] tw-relative tw-flex tw-flex-col">
                  {/* header */}
                  <div className="tw-border-0 tw-border-b tw-border-solid tw-border-gray-300 tw-flex-shrink-0 tw-w-full tw-flex tw-justify-between">
                    {doubtsOptions &&
                      doubtsOptions.length > 0 &&
                      doubtsOptions.map((_item) => (
                        <Link href={`/doubts-v2?type=${_item?.key}`} key={_item?.key}>
                          <a
                            className={`tw-w-full tw-h-full tw-p-2 tw-text-center tw-cursor-pointer tw-border-0 tw-border-b-2 tw-border-solid ${
                              type === _item?.key
                                ? `tw-border-blue-500 tw-text-blue-500 tw-font-semibold`
                                : `tw-border-transparent tw-font-medium hover:tw-bg-gray-100 tw-text-black hover:tw-text-gray-800`
                            }`}
                          >
                            {_item?.title}
                          </a>
                        </Link>
                      ))}
                  </div>
                  {/* doubts Render */}
                  <div className="tw-w-full tw-h-full tw-overflow-hidden tw-overflow-y-auto">
                    {type == "log" ? (
                      <>
                        {doubtsPersonal && !doubtsPersonalError ? (
                          <>
                            {doubtsPersonal && doubtsPersonal.length > 0 ? (
                              <DoubtsCard type={type} doubt_id={doubt_id} doubts={doubtsPersonal} />
                            ) : (
                              <div className="tw-text-sm tw-text-center tw-py-6 tw-text-gray-500">
                                No personal doubts found
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="tw-text-sm tw-text-center tw-py-6 tw-text-gray-500">
                            Looking for personal doubts
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        {doubtsPublic && !doubtsPublicError ? (
                          <>
                            {doubtsPublic && doubtsPublic.length > 0 ? (
                              <DoubtsCard type={type} doubt_id={doubt_id} doubts={doubtsPublic} />
                            ) : (
                              <div className="tw-text-sm tw-text-center tw-py-6 tw-text-gray-500">
                                No public doubts found
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="tw-text-sm tw-text-center tw-py-6 tw-text-gray-500">
                            Looking for public doubts
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
                {/* rendering messages */}
                <div className="tw-border-0 tw-border-solid tw-border-red-500 tw-w-full tw-h-full">
                  {doubtsConversation && !doubtsConversationError ? (
                    <>
                      <DoubtConversationView conversation={doubtsConversation} />
                    </>
                  ) : (
                    <div className="tw-text-sm tw-text-center tw-py-6 tw-text-gray-500">
                      Loading
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </Page>
  );
};

export default withGlobalAuth(DoubtsV2Render);
