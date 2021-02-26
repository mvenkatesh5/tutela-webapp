import React from "react";
// react bootstrap
import { Container, Row, Col } from "react-bootstrap";
// material icons
import { ArrowsCollapse } from "@styled-icons/bootstrap/ArrowsCollapse";
import { Selector } from "@styled-icons/heroicons-solid/Selector";
// swr
import useSWR from "swr";
// components
import ChannelCardView from "@components/communication/channels/helpers/cardDetail";
import ChannelCreateView from "@components/communication/channels/create";
import ChannelEditView from "@components/communication/channels/edit";
import ChannelDeleteView from "@components/communication/channels/delete";
// layouts
import AdminLayout from "@layouts/adminLayout";
// api routes
import { CHANNEL_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";
// hoc
import withGlobalAuth from "@lib/hoc/withGlobalAuth";

const Channel = () => {
  const { data: channelList, error: channelListError } = useSWR(CHANNEL_ENDPOINT, APIFetcher);

  return (
    <div>
      <AdminLayout>
        <div className="right-layout">
          <ChannelCreateView />
          <div className="channel-root-wrapper">
            {!channelList && !channelListError ? (
              <div className="text-center mt- 5 mb-5">Loading.....</div>
            ) : (
              <div>
                {channelList && channelList.length > 0 ? (
                  <div className="container-fluid">
                    <div className="row">
                      {channelList.map((data: any, index: any) => (
                        <div key={`channels-view-${data.id}`} className="col-md-3 mt-4">
                          <ChannelCardView data={data}>
                            <div className="d-flex">
                              <div>
                                <small className="item me-3">
                                  {data.settings && data.settings.collapse ? (
                                    // <Selector width="20" />
                                    <>Chat</>
                                  ) : (
                                    //  <ArrowsCollapse width="20" />
                                    <>Discuss</>
                                  )}
                                </small>
                              </div>
                              <div className="me-3">
                                <ChannelDeleteView data={data} />
                              </div>
                              <div>
                                <ChannelEditView data={data} />
                              </div>
                            </div>
                          </ChannelCardView>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center mt- 5 mb-5">No channels are available.</div>
                )}
              </div>
            )}
          </div>
        </div>
      </AdminLayout>
    </div>
  );
};

export default withGlobalAuth(Channel);
