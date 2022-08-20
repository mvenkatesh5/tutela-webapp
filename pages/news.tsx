import React from "react";
// react bootstrap
import { Row, Col, Card, Image ,Button } from "react-bootstrap";
// swr
import useSWR from "swr";
// layouts
import AdminLayout from "@layouts/adminLayout";
// components
import NewsCreateView from "@components/admin/news/create";
import NewsEditView from "@components/admin/news/edit";
import NewsDeleteView from "@components/admin/news/delete";
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

  console.log("newsList", newsList);
  // link: "https://www.tutelaprep.com/blog/how-to-get-an-upper-edge-in-applications-despite-of-boards-being-cancelled-postponed/";

  return (
    <Page meta={meta}>
      <AdminLayout>
        <div className="right-layout">
          <NewsCreateView />

          <Row>
            {newsList &&
              newsList.length > 0 &&
              newsList.map((data: any, index: Number) => (
                <Col md={4} key={data.id} style={{ marginTop: "10px" }}>
                  <Card style={{ height: "100%" }}>
                    <Card.Body
                      style={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "between",
                      }}
                    >
                      <div style={{ height: "100%" }}>
                        <div style={{ height: "175px" }}>
                          <Image
                            alt=""
                            src={data?.image_url ? data?.image_url : "/default-image.png"}
                            style={{ width: "100%", height: "100%", objectFit: "contain" }}
                          />
                        </div>
                        <h6 className="mt-2 mb-2">{data.title}</h6>
                        <p>{data.description}</p>
                      </div>
                      <div className="d-flex gap-2">
                        <div>
                          <NewsEditView data={data} />
                        </div>
                        <NewsDeleteView data={data} />
                        {/* <Button variant="danger" className="btn btn-sm" onClick={() => newsDelete(data.id)}>
                          Delete
                        </Button> */}
                      </div>
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
