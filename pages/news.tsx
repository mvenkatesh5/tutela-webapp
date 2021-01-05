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
// api routes
import { NEWS_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";
import { NewsDelete } from "@lib/services/newsservice";

const NewsView = () => {
  const newsDelete = (id: Number) => {
    NewsDelete(id)
      .then((res) => {
        console.log(res);
      })
      .catch((errors) => {
        console.log(errors);
      });
  };

  const { data: newsList, error: newsListError } = useSWR(NEWS_ENDPOINT, APIFetcher);

  return (
    <div>
      <AdminLayout>
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
      </AdminLayout>
    </div>
  );
};

export default NewsView;
