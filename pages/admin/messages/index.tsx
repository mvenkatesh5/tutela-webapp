import React from "react";
// next imports
import Link from "next/link";
// react bootstrap
import { Container, Table, Form, Tab, Nav } from "react-bootstrap";
// swr
import useSWR, { mutate } from "swr";
// components
import NotAccomplishedView from "@components/admin/messages/notAccomplished";
import AccomplishedView from "@components/admin/messages/accomplished";
// layouts
import AdminLayout from "@layouts/adminLayout";
// global imports
import { datePreview } from "@constants/global";
// api routes
import { USER_ENDPOINT, USER_MESSAGE_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher, APIUpdater } from "@lib/services";
// api services
import { MessageUpdate } from "@lib/services/commentService";
// hoc
import withAdminAuth from "@lib/hoc/withAdminAuth";
// global context provider
import { globalContext } from "@contexts/global";

const Messages = () => {
  const [globalState, globalDispatch] = React.useContext(globalContext);

  const { data: userList, error: userListError } = useSWR(USER_ENDPOINT, APIFetcher, {
    refreshInterval: 0,
  });

  const { data: messages, error: messagesError } = useSWR(
    userList ? `${USER_MESSAGE_ENDPOINT}?is_actionable=true` : null,
    (url) => APIFetcher(url),
    {
      refreshInterval: 0,
    }
  );

  if (!messages) return <div>Loading...</div>;

  if (messagesError) console.log(messagesError);

  const updateMessage = (payload: any) => {
    MessageUpdate(payload)
      .then((response) => {
        globalDispatch({
          type: "ADD_TOAST_ALERT",
          payload: { kind: "success", description: "Message Accomplished successfully." },
        });
        mutate(
          `${USER_MESSAGE_ENDPOINT}?is_actionable=true`,
          async (elements: any) => {
            let index = elements.findIndex((mutateData: any) => mutateData.id === response.id);
            return elements.map((oldElement: any, i: Number) =>
              i === index ? response : oldElement
            );
          },
          false
        );
      })
      .catch((error) => {
        console.log(error);
        globalDispatch({
          type: "ADD_TOAST_ALERT",
          payload: { kind: "warning", description: "Network error." },
        });
      });
  };

  const messageTab = [
    {
      tab_key: "not_accomplished",
      tab_label: "Not Accomplished",
      component: (
        <NotAccomplishedView data={messages} allUsers={userList} handleEdit={updateMessage} />
      ),
    },
    {
      tab_key: "is_accomplished",
      tab_label: "Accomplished",
      component: (
        <AccomplishedView data={messages} allUsers={userList} handleEdit={updateMessage} />
      ),
    },
  ];

  return (
    <div>
      <AdminLayout>
        <div className="right-layout">
          <Container>
            <h5>User Messages.</h5>

            <div>
              <Tab.Container defaultActiveKey={messageTab[0].tab_key}>
                <Nav className="custom-nav-tabs-links profile-account-nav" variant="pills">
                  {messageTab.map((item: any, index: any) => (
                    <Nav.Item className="profile-account-nav-item">
                      <Nav.Link key={`nav-item-${item.tab_key}`} eventKey={item.tab_key}>
                        {item.tab_label}
                      </Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>

                <Tab.Content className="mt-2">
                  {messageTab.map((item: any, index: any) => (
                    <Tab.Pane key={`tab-pane-${item.tab_key}`} eventKey={item.tab_key}>
                      {item.component}
                    </Tab.Pane>
                  ))}
                </Tab.Content>
              </Tab.Container>
            </div>
          </Container>
        </div>
      </AdminLayout>
    </div>
  );
};

export default withAdminAuth(Messages);
