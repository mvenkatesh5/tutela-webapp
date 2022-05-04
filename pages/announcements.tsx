import React from "react";
// react bootstrap
import { Row, Col, Card } from "react-bootstrap";
// swr
import useSWR from "swr";
// layouts
import AdminLayout from "@layouts/adminLayout";
// components
import AnnouncementCreateView from "@components/admin/announcements/create";
import AnnouncementEditView from "@components/admin/announcements/edit";
import Page from "@components/page";
// api routes
import { ANNOUNCEMENT_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";
import { AnnouncementDelete } from "@lib/services/announcement.service";
// hoc
import withAdminAuth from "@lib/hoc/withAdminAuth";
// constants
import { META_DESCRIPTION } from "@constants/page";

const AnnouncementView = () => {
  const announcementDelete = (id: Number) => {
    AnnouncementDelete(id)
      .then((res) => {})
      .catch((errors) => {
        console.log(errors);
      });
  };

  const { data: announcementList, error: announcementListError } = useSWR(
    ANNOUNCEMENT_ENDPOINT,
    APIFetcher
  );

  const meta = {
    title: "Announcements",
    description: META_DESCRIPTION,
  };

  console.log("announcementList", announcementList);

  return (
    <Page meta={meta}>
      <AdminLayout>
        <div className="right-layout">
          <h5 className="mb-3">Announcements</h5>
          <AnnouncementCreateView />
          <Row>
            {!announcementList && !announcementList ? (
              <div className="text-center text-secondary mt-5">Loading...</div>
            ) : (
              <>
                {announcementList && announcementList.length > 0 ? (
                  <>
                    {announcementList.map((data: any, index: Number) => (
                      <Col md={6} key={data.id} style={{ marginTop: "10px" }}>
                        <Card>
                          <Card.Body>
                            <h6 className="mt-2 mb-2">{data.message}</h6>
                            <p className="text-sm text-primary">
                              <a href={data.url} rel="noreferrer" target="_blank">
                                {data.url}
                              </a>
                            </p>
                            <AnnouncementEditView data={data} />
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </>
                ) : (
                  <div className="text-center text-secondary mt-5">
                    No Announcements are available.
                  </div>
                )}
              </>
            )}
          </Row>
        </div>
      </AdminLayout>
    </Page>
  );
};

export default withAdminAuth(AnnouncementView);
