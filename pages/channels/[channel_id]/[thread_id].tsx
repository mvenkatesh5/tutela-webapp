import React from "react";
// next imports
import { useRouter } from "next/router";
// react bootstrap
import { Container } from "react-bootstrap";
// swr
import useSWR from "swr";
// components
import CommentDetailView from "@components/communication/comments/view";
// layouts
import AdminLayout from "@layouts/adminLayout";
// api routes
import { THREAD_WITH_COMMENT_ENDPOINT, THREAD_WITH_ID_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";
// hoc
import withGlobalAuth from "@lib/hoc/withGlobalAuth";

const ChannelDetail = () => {
  const router = useRouter();
  const channel_id: any = router.query.channel_id;
  const thread_id: any = router.query.thread_id;

  const { data: threadDetail, error: threadDetailError } = useSWR(
    thread_id ? THREAD_WITH_ID_ENDPOINT(thread_id) : null,
    (url) => APIFetcher(url)
  );

  const { data: channelDetailList, error: channelDetailListError } = useSWR(
    thread_id && threadDetail ? THREAD_WITH_COMMENT_ENDPOINT(thread_id) : null,
    (url) => APIFetcher(url)
  );

  return (
    <div>
      <AdminLayout>
        <div className="right-layout-comment container ps-5 pe-5">
          <CommentDetailView
            threadDetail={threadDetail}
            data={channelDetailList}
            dataError={channelDetailListError}
            channel_id={channel_id}
            thread_id={thread_id}
          />
        </div>
      </AdminLayout>
    </div>
  );
};

export default withGlobalAuth(ChannelDetail);
