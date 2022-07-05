import React from "react";
// react-bootstrap
import { Container, Row, Col, Image, Card } from "react-bootstrap";
// constants
import { META_DESCRIPTION } from "@constants/page";
// components
import Page from "@components/page";
import Messenger from "@components/new/Messenger";
// layout
import NewLayout from "@layouts/newLayout";

const NotificationPage = () => {
  const meta = {
    title: "Notifications",
    description: META_DESCRIPTION,
  };
  const notifications = [
    { title: "fugiat nulla pariatur" },
    { title: "fugiat nulla pariatur" },
    { title: "fugiat nulla pariatur" },
    { title: "fugiat nulla pariatur" },
  ];

  return (
    <Page meta={meta}>
      <NewLayout>
        <div className="container mx-auto">
          <h3 className="mt-4">Notifications</h3>
          <div className="d-flex">
            <div className="bg-primary px-3 text-white rounded-pill my-4">Today</div>
          </div>
          {notifications &&
            notifications.map((data: any, index: any) => (
              <div key={`notification-index-${index}`} className="w-100 border-bottom py-3">
                <h5 className="">{data.title}</h5>
                <small className="text-muted">04:30 PM</small>
              </div>
            ))}
          <div className="d-flex mt-4">
            <div className="bg-light px-3 text-muted rounded-pill my-4">Yesterday</div>
          </div>
          {notifications &&
            notifications.map((data: any, index: any) => (
              <div key={`notification-index-${index}`} className="w-100 border-bottom py-3">
                <h5 className="">{data.title}</h5>
                <small className="text-muted">04:30 PM</small>
              </div>
            ))}
        </div>
      </NewLayout>
    </Page>
  );
};

export default NotificationPage;
