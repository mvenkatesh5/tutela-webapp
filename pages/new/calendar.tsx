import React from "react";
// react-bootstrap
import {  Row, Col } from "react-bootstrap";
// constants
import { META_DESCRIPTION } from "@constants/page";
// components
import Page from "@components/page";
import Messenger from "@components/new/Messenger";
// layout
import NewLayout from "@layouts/newLayout";

const ConcernPage = () => {
  const meta = {
    title: "New Dashboard",
    description: META_DESCRIPTION,
  };

  const concerns = [
    {
      title: "What exactly do I do to ensure Educational achievements of my child?",
      reply: "4",
      is_resolved: false,
    },
    {
      title:
        "I am concerned about my child's education. I want him to be successful educationally. Where do I b..",
      reply: "1",
      is_resolved: true,
    },
  ];

  const replies = [
    {
      image: "/bird.svg",
      name: "Raj Gopal",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
    {
      image: "/bird.svg",
      name: "Abhinav Gupta",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco. laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
  ];
  return (
    <Page meta={meta}>
      <NewLayout>
        <Row className="mt-4">
          <Col className="" md={4}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4>Concerns</h4>
              <div>All</div>
            </div>
            <div className="border rounded">
              {concerns &&
                concerns.map((data: any, index: any) => (
                  <div key={`index-concern-i-${index}`} className="p-3 border-bottom">
                    {data.is_resolved ? (
                      <small className="bg-success text-white rounded px-2 p-1">Resolved</small>
                    ) : (
                      <small className="bg-danger text-white rounded px-2 p-1">Pending</small>
                    )}
                    <div className="mt-2 fw-bold">{data.title}</div>
                    <div className="text-muted">
                      {" "}
                      {data.reply} {data.reply == 1 ? "reply" : "replies"}
                    </div>
                  </div>
                ))}
            </div>
          </Col>
          <Col className="pt-1" md={8}>
            <Messenger replies={replies} />
          </Col>
        </Row>
      </NewLayout>
    </Page>
  );
};

export default ConcernPage;
