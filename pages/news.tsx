import React from "react";
// react bootstrap
import { Button, Form } from "react-bootstrap";
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

  const { data: news, error: newsError } = useSWR(NEWS_ENDPOINT, APIFetcher);

  console.log(news);

  return (
    <div>
      <AdminLayout>
        <NewsCreateView />

        {news &&
          news.length > 0 &&
          news.map((data: any, index: Number) => (
            <div className="border" key={data.id} style={{ marginTop: "10px" }}>
              <h6>{data.title}</h6>
              <p>{data.description}</p>
              <NewsEditView data={data} />
            </div>
          ))}
      </AdminLayout>
    </div>
  );
};

export default NewsView;
