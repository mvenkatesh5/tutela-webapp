import React from "react";
// react bootstrap
import { Row, Col, Card, Image } from "react-bootstrap";
// swr
import useSWR from "swr";
// layouts
import AdminLayout from "@layouts/adminLayout";
// components
import AdvertCreateView from "@components/admin/advert/create";
import AdvertEditView from "@components/admin/advert/edit";
// api routes
import { ADVERTS_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";
import { AdvertsDelete } from "@lib/services/advertsservice";
// hoc
import withGlobalAuth from "@lib/hoc/withGlobalAuth";
// components
import Page from "@components/page";
// constants
import { META_DESCRIPTION } from "@constants/page";

const AdvertsView = () => {
  const advertsDelete = (id: Number) => {
    AdvertsDelete(id)
      .then((res) => {})
      .catch((errors) => {
        console.log(errors);
      });
  };

  const { data: advertsList, error: advertsListError } = useSWR(ADVERTS_ENDPOINT, APIFetcher);

  const meta = {
    title: "Adverts",
    description: META_DESCRIPTION,
  };

  return (
    <Page meta={meta}>
      <div>
        <AdminLayout>
          <div className="right-layout">
            <AdvertCreateView />
            <Row>
              {advertsList &&
                advertsList.length > 0 &&
                advertsList.map((data: any, index: Number) => (
                  <Col md={3} key={data.id} style={{ marginTop: "10px" }}>
                    <Card>
                      <Card.Body>
                        <div style={{ height: "175px" }}>
                          <Image
                            alt=""
                            src={data.image}
                            style={{ width: "100%", height: "100%", objectFit: "contain" }}
                          />
                        </div>
                        <h6 className="mt-2 mb-2">{data.title}</h6>
                        <AdvertEditView data={data} />
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
            </Row>
          </div>
        </AdminLayout>
      </div>
    </Page>
  );
};

export default withGlobalAuth(AdvertsView);
