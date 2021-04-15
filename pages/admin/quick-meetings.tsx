import React from "react";
// react bootstrap
import { Row, Col, Card } from "react-bootstrap";
// swr
import useSWR from "swr";
// layouts
import AdminLayout from "@layouts/adminLayout";
// components
import QuickMeetingCreateView from "@components/admin/quickMeetings/create";
import QuickMeetingEditView from "@components/admin/quickMeetings/edit";
// api routes
import { QUICK_MEETINGS_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";
import { QuickMeetingDelete } from "@lib/services/quickmeetingsservice";
// global imports
import { datePreview } from "@constants/global";
// hoc
import withAdminAuth from "@lib/hoc/withAdminAuth";

const QuickMeetingsView = () => {
  const advertsDelete = (id: Number) => {
    QuickMeetingDelete(id)
      .then((res) => {})
      .catch((errors) => {
        console.log(errors);
      });
  };

  const { data: quickMeetingsList, error: quickMeetingsListError } = useSWR(
    QUICK_MEETINGS_ENDPOINT,
    APIFetcher
  );

  return (
    <div>
      <AdminLayout>
        <div className="right-layout">
          <QuickMeetingCreateView />
          <Row>
            {quickMeetingsList &&
              quickMeetingsList.length > 0 &&
              quickMeetingsList.map((data: any, index: Number) => (
                <Col md={3} key={data.id} style={{ marginTop: "10px" }}>
                  <Card>
                    <Card.Body>
                      <h6 className="mb-2">{data.name}</h6>
                      <div>
                        <small>{data.description}</small>
                      </div>
                      <div className="mt-2">
                        <small>
                          Starts At : <strong>{datePreview(data.start_time)}</strong>
                        </small>
                      </div>
                      <div className="mt-0 mb-2">
                        <small>
                          Ends At : <strong>{datePreview(data.end_date)}</strong>
                        </small>
                      </div>

                      <QuickMeetingEditView data={data} />
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        </div>
      </AdminLayout>
    </div>
  );
};

export default withAdminAuth(QuickMeetingsView);
