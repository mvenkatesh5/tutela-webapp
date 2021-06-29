import React from "react";
// react bootstrap
import { Row, Col, Card } from "react-bootstrap";
// swr
import useSWR from "swr";
// layouts
import AdminLayout from "@layouts/adminLayout";
// components
import NewsCreateView from "@components/admin/news/create";
import NewsEditView from "@components/admin/news/edit";
import Page from "@components/page";
// api routes
import { NEWS_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";
import { NewsDelete } from "@lib/services/newsservice";
// hoc
import withAdminAuth from "@lib/hoc/withAdminAuth";
// constants
import { META_DESCRIPTION } from "@constants/page";

const NewsView = () => {
  const newsDelete = (id: Number) => {
    NewsDelete(id)
      .then((res) => {})
      .catch((errors) => {
        console.log(errors);
      });
  };

  const { data: newsList, error: newsListError } = useSWR(NEWS_ENDPOINT, APIFetcher);

  const meta = {
    title: "News",
    description: META_DESCRIPTION,
  };

  return (
    <Page meta={meta}>
      <AdminLayout>
        <div className="right-layout">
          <NewsCreateView />

          <Row>
            {newsList &&
              newsList.length > 0 &&
              newsList.map((data: any, index: Number) => (
                <Col md={6} key={data.id} style={{ marginTop: "10px" }}>
                  <Card>
                    <Card.Body>
                      <h6 className="mt-2 mb-2">{data.title}</h6>
                      <p>{data.description}</p>
                      <NewsEditView data={data} />
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        </div>
      </AdminLayout>
    </Page>
  );
};

export default withAdminAuth(NewsView);
