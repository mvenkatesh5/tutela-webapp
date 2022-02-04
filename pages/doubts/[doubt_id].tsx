import React from "react";
// next imports
import NextLink from "next/link";
import { useRouter } from "next/router";
// swr
import useSWR, { mutate } from "swr";
// react bootstrap
import { Button, Form, Image } from "react-bootstrap";
// material icons
import { Pencil } from "@styled-icons/ionicons-sharp/Pencil";
import { TrashFill } from "@styled-icons/bootstrap/TrashFill";
// seo
import Page from "@components/page";
import { META_DESCRIPTION } from "@constants/page";
// components
import DoubtsStatus from "@components/doubts/DoubtsStatus";
import DoubtsEdit from "@components/doubts/DoubtsEdit";
import DoubtsDelete from "@components/doubts/DoubtsDelete";
import ReplyCreate from "@components/doubts/ReplyCreate";
import ReplyEdit from "@components/doubts/ReplyEdit";
import ReplyDelete from "@components/doubts/ReplyDelete";
import ImageUploader from "@components/doubts/ImageUploader";
// layout
import AdminLayout from "@layouts/adminLayout";
// common
import { timeDateFormat } from "@constants/global";
// cookie
import { getAuthenticationToken } from "@lib/cookie";
// api routes
import { DOUBTS_WITH_REPLIES_ENDPOINT, USER_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";
import { DoubtRepliesCreate } from "@lib/services/doubts.service";
// hoc
import withGlobalAuth from "@lib/hoc/withGlobalAuth";

const DoubtsPageDetail = () => {
  const meta = {
    title: "Doubts Detail",
    description: META_DESCRIPTION,
  };

  const getCurrentRole = (user: any) => {
    if (user && user.user && user.user.role === 0) return "student";
    if (user && user.user && user.user.role === 1) return "teacher";
    if (user && user.user && user.user.role === 2) return "admin";
    if (user && user.user && user.user.role === 3) return "parent";
  };

  const router = useRouter();
  const { doubt_id } = router.query;

  const getCurrentUser = () => {
    let user: any = getAuthenticationToken();
    user = user ? JSON.parse(user) : "";
    if (user) {
      return user;
    }
    return null;
  };

  const [currentUser, setCurrentUser] = React.useState<any>(getCurrentUser());

  const { data: doubtWithReplies, error: doubtWithRepliesError } = useSWR(
    doubt_id ? [DOUBTS_WITH_REPLIES_ENDPOINT(doubt_id), doubt_id] : null,
    APIFetcher
  );

  const { data: users, error: usersError } = useSWR(USER_ENDPOINT, APIFetcher);


  const renderUserDetails = (user: any, user_id: any) => {
    let userElement = user.find((_: any) => _.id === user_id);
    if (userElement) return `${userElement.first_name} ${userElement.last_name}`;
  };

  return (
    <Page meta={meta}>
      <AdminLayout>
        <div className="right-layout px-5">
          <div className="">
            {!doubtWithReplies && !doubtWithRepliesError ? (
              <div className="text-center text-muted mt-5">Loading...</div>
            ) : (
              <>
                <h2 className="mb-2">{doubtWithReplies.text}</h2>

                <div className="doubts-detail-card gap-4 mt-1">
                  <div className="Image">
                    <Image src="/bird.svg" alt="" className="image" />
                  </div>
                  <div className="w-100">
                    <div className="title">
                      {doubtWithReplies?.user?.first_name} {doubtWithReplies?.user?.last_name}
                    </div>
                    <div className="text-muted date">
                      {timeDateFormat(doubtWithReplies.created)}
                    </div>
                    {users && doubtWithReplies?.allocated_to && (
                      <div className="description-doubt mt-1">
                        Assigned to: {renderUserDetails(users, doubtWithReplies?.allocated_to)}
                      </div>
                    )}
                  </div>
                  {currentUser &&
                    (getCurrentRole(currentUser) === "teacher" ||
                      getCurrentRole(currentUser) === "admin") && (
                      <div className="ml-auto">
                        <DoubtsStatus
                          doubt={doubtWithReplies}
                          mutateQuery={[DOUBTS_WITH_REPLIES_ENDPOINT(doubt_id), doubt_id]}
                          doubt_detail={true}
                        >
                          {!doubtWithReplies?.is_resolved && (
                            <Button variant="secondary" size={"sm"}>
                              Resolve
                            </Button>
                          )}
                        </DoubtsStatus>
                      </div>
                    )}
                  {currentUser &&
                    getCurrentRole(currentUser) === "student" &&
                    doubtWithReplies?.user?.id === currentUser?.user?.id && (
                      <>
                        <div className="ml-auto">
                          <DoubtsStatus
                            doubt={doubtWithReplies}
                            mutateQuery={[DOUBTS_WITH_REPLIES_ENDPOINT(doubt_id), doubt_id]}
                            doubt_detail={true}
                          >
                            {doubtWithReplies?.is_resolved && <Button size={"sm"}>Reopen</Button>}
                          </DoubtsStatus>
                        </div>
                        <div>
                          <DoubtsEdit
                            doubt={doubtWithReplies}
                            mutateQuery={[DOUBTS_WITH_REPLIES_ENDPOINT(doubt_id), doubt_id]}
                            doubt_detail={true}
                            users={users}
                          >
                            <Button variant="secondary" size={"sm"}>
                              <Pencil width="16" height="16" />
                            </Button>
                          </DoubtsEdit>
                        </div>
                        <div>
                          <DoubtsDelete
                            doubt={doubtWithReplies}
                            mutateQuery={[DOUBTS_WITH_REPLIES_ENDPOINT(doubt_id), doubt_id]}
                            doubt_detail={true}
                          >
                            <Button size={"sm"}>
                              <TrashFill width="16" height="16" />
                            </Button>
                          </DoubtsDelete>
                        </div>
                      </>
                    )}
                </div>

                {doubtWithReplies?.data?.description && (
                  <div className="py-2 description-doubt">
                    {doubtWithReplies?.data?.description}
                  </div>
                )}
                {doubtWithReplies && doubtWithReplies.data && doubtWithReplies.data?.attachments && (
                  <div className="pb-4">
                    <div className="text-muted pb-2">Attachments:</div>
                    <ImageUploader data={doubtWithReplies.data?.attachments} edit={false} />
                  </div>
                )}

                {doubt_id && currentUser && (
                  <ReplyCreate doubt_id={doubt_id} currentUser={currentUser} />
                )}

                {doubtWithReplies &&
                doubtWithReplies.responses &&
                doubtWithReplies.responses.length > 0 ? (
                  <>
                    <h4 className="mt-3">{doubtWithReplies.responses.length} Answers</h4>
                    {doubtWithReplies.responses.map((data: any, index: any) => (
                      <div key={`doubts-responses-${index}`}>
                        <div className="doubts-answer-card pt-3 mt-3">
                          <Image className="image" src="/bird.svg" alt="" />
                          <div className="w-full">
                            <div className="text-sm font-medium">
                              {data?.user?.first_name} {data?.user?.last_name}
                            </div>
                            <div className="date">{timeDateFormat(data.created)}</div>
                          </div>
                          {currentUser.user.id === data.user.id && (
                            <>
                              <div className="ms-auto mt-4">
                                <ReplyEdit doubt_id={doubt_id} doubt={data}>
                                  <Button variant="secondary" size={"sm"}>
                                    <Pencil width="16" height="16" />
                                  </Button>
                                </ReplyEdit>
                              </div>
                              <div className="mt-4">
                                <ReplyDelete doubt_id={doubt_id} doubt={data}>
                                  <Button size={"sm"}>
                                    <TrashFill width="16" height="16" />
                                  </Button>
                                </ReplyDelete>
                              </div>
                            </>
                          )}
                        </div>
                        <div>
                          {data && data.data && data.data?.attachments && (
                            <div className="pb-1">
                              <div className="font-light pb-2">Attachments:</div>
                              <ImageUploader data={data.data?.attachments} edit={false} />
                            </div>
                          )}
                        </div>
                        <div className="my-2">{data.text}</div>
                      </div>
                    ))}
                    <div className="mt-4">
                      {doubt_id && currentUser && (
                        <ReplyCreate doubt_id={doubt_id} currentUser={currentUser} />
                      )}
                    </div>
                  </>
                ) : (
                  <div className="text-center text-muted mt-5">No Replies are available...</div>
                )}
              </>
            )}
          </div>
        </div>
      </AdminLayout>
    </Page>
  );
};

export default withGlobalAuth(DoubtsPageDetail);
