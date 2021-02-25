import React from "react";
// next imports
import { useRouter } from "next/router";
// react bootstrap
import { Container } from "react-bootstrap";
// swr
import useSWR from "swr";
// components
import ChannelCardView from "@components/communication/threads/helpers/cardDetail";
import ThreadCreateView from "@components/communication/threads/create";
import ThreadEditView from "@components/communication/threads/edit";
import ThreadDeleteView from "@components/communication/threads/delete";
// layouts
import AdminLayout from "@layouts/adminLayout";
// components
// api routes
import { CHANNEL_WITH_THREAD_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";
// hoc
import withGlobalAuth from "@lib/hoc/withGlobalAuth";

const ChannelDetail = () => {
  const router = useRouter();
  const threadView: any = router.query.view;
  const channel_id: any = router.query.channel_id;

  const { data: channelThreadList, error: channelThreadListError } = useSWR(
    channel_id ? CHANNEL_WITH_THREAD_ENDPOINT(channel_id) : null,
    (url) => APIFetcher(url)
  );

  return (
    <div>
      <AdminLayout>
        <div className="right-layout">
          <Container>
            <ThreadCreateView channel_id={channel_id} />
            <div className="channel-root-wrapper">
              {!channelThreadList && !channelThreadListError ? (
                <div className="text-center mt- 5 mb-5">Loading.....</div>
              ) : (
                <div>
                  {channelThreadList && channelThreadList.length > 0 ? (
                    <div>
                      {channelThreadList.map((data: any, index: any) => (
                        <div key={`channels-view-${data.id}`} className="mb-2">
                          <ChannelCardView data={data} channel_id={channel_id}>
                            <div className="item left">
                              <ThreadDeleteView data={data} channel_id={channel_id} />
                            </div>
                            <div className="item">
                              <ThreadEditView data={data} channel_id={channel_id} />
                            </div>
                          </ChannelCardView>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center mt- 5 mb-5">No Threads are available.</div>
                  )}
                </div>
              )}
            </div>
          </Container>

          {/* {threadView === "collapse" ? <div>Channel Thread</div> : <div>Channel Thread Detail</div>} */}
        </div>
      </AdminLayout>
    </div>
  );
};

export default withGlobalAuth(ChannelDetail);
