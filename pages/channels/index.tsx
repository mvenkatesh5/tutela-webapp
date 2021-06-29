import React from "react";
// react bootstrap
import { Dropdown, DropdownButton } from "react-bootstrap";
// material icons
import { ArrowDropDown } from "@styled-icons/remix-line";
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
// components
import Page from "@components/page";
// constants
import { META_DESCRIPTION } from "@constants/page";

const Channel = () => {
  const { data: channelList, error: channelListError } = useSWR(CHANNEL_ENDPOINT, APIFetcher);

  const meta = {
    title: "Channels",
    description: META_DESCRIPTION,
  };

  return (
    <Page meta={meta}>
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
                        <div key={`channels-view-${data.id}`} className="col-lg-3 mt-4">
                          <ChannelCardView data={data}>
                            <Dropdown>
                              <Dropdown.Toggle as="div"></Dropdown.Toggle>
                              <Dropdown.Menu>
                              <div>
                                <ChannelEditView data={data} />
                                </div>
                                <div>
                                <ChannelDeleteView data={data} />
                                </div>
                              </Dropdown.Menu>
                            </Dropdown>
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
    </Page>
  );
};

export default withGlobalAuth(Channel);
