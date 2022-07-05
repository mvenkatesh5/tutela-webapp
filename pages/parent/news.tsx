import React from "react";
// constants
import { META_DESCRIPTION } from "@constants/page";
// react-bootstrap
import { Row, Col } from "react-bootstrap";
// components
import Page from "@components/page";
import NewsCard from "@components/new/NewsCard";
// layout
import NewLayout from "@layouts/newLayout";
// swr
import useSWR from "swr";
// api routes
import { NEWS_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";
import { NewsDelete } from "@lib/services/newsservice";

const ParentNewsPage = () => {
  const meta = {
    title: "News",
    description: META_DESCRIPTION,
  };
  const { data: newsList, error: newsListError } = useSWR(NEWS_ENDPOINT, APIFetcher);

  return (
    <Page meta={meta}>
      <NewLayout>
        <Row className="pe-3">
          {newsList &&
            newsList.length > 0 &&
            newsList.map((data: any, index: Number) => (
              <Col md={4} className="d-flex my-3" key={data.id}>
                <NewsCard data={data} />
              </Col>
            ))}
        </Row>
      </NewLayout>
    </Page>
  );
};

export default ParentNewsPage;
