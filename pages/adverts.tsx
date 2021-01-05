import React from "react";
// react bootstrap
import { Row, Col, Card } from "react-bootstrap";
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

const AdvertsView = () => {
  const advertsDelete = (id: Number) => {
    AdvertsDelete(id)
      .then((res) => {
        console.log(res);
      })
      .catch((errors) => {
        console.log(errors);
      });
  };

  const { data: advertsList, error: advertsListError } = useSWR(ADVERTS_ENDPOINT, APIFetcher);

  return (
    <div>
      <AdminLayout>
        <AdvertCreateView />
        <Row>
          {advertsList &&
            advertsList.length > 0 &&
            advertsList.map((data: any, index: Number) => (
              <Col md={3} key={data.id} style={{ marginTop: "10px" }}>
                <Card>
                  <Card.Body>
                    <div style={{ height: "175px" }}>
                      <img
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
      </AdminLayout>
    </div>
  );
};

export default AdvertsView;
