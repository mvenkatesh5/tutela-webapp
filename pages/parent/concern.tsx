import React from "react";
// react-bootstrap
import { Container, Row, Col, Image, Card, Form, Dropdown } from "react-bootstrap";
// icons
import { TextAlignCenter } from "@styled-icons/fluentui-system-filled/TextAlignCenter";
import { ChevronDown } from "@styled-icons/boxicons-solid/ChevronDown";
// constants
import { META_DESCRIPTION } from "@constants/page";
// components
import Page from "@components/page";
import Messenger from "@components/new/Messenger";
// layout
import NewLayout from "@layouts/newLayout";
// swr
import useSWR from "swr";
// api routes
import { CONCERNS_ENDPOINT, CONCERNS_WITH_ID_COMMENT_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";

const ConcernPage = () => {
  const meta = {
    title: "Concerns",
    description: META_DESCRIPTION,
  };

  const [status, setStatus] = React.useState("all");

  const { data: concerns, error: concernsError } = useSWR(CONCERNS_ENDPOINT, APIFetcher, {
    refreshInterval: 0,
  });

  const [concernId, setConcernID] = React.useState<any>();

  const [filtered, setFiltered] = React.useState<any>(concerns);

  React.useEffect(() => {
    if (concerns) {
      setConcernID(filtered[0]?.id);
    }
  }, [filtered]);

  React.useEffect(() => {
    setFiltered(concerns);
  }, [concerns]);
  const filteredConcerns = (status: any) => {
    if (status === "all") {
      setFiltered(concerns);
    } else {
      const filtered = concerns.filter((concern: any) => {
        return concern.status === status;
      });
      setFiltered(filtered);
    }

    setStatus(status);
  };

  return (
    <Page meta={meta}>
      <NewLayout>
        <Row className="mt-4 message-layout">
          <Col className="overflow-auto" md={4}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4>Concerns</h4>
              <div className="">
                <Dropdown>
                  <Dropdown.Toggle className="text-button text-black d-flex align-items-center gap-2">
                    <TextAlignCenter width="16px" /> <div className="text-capitalize">{status}</div>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => filteredConcerns("all")}>All</Dropdown.Item>
                    <Dropdown.Item onClick={() => filteredConcerns("pending")}>
                      Pending
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => filteredConcerns("resolved")}>
                      Resolved
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            <div className="border rounded">
              {concerns && filtered && filtered.length > 0 ? (
                <>
                  {" "}
                  {filtered &&
                    filtered.length > 0 &&
                    filtered.map((data: any, index: any) => (
                      <div
                        onClick={() => setConcernID(data.id)}
                        key={`index-concern-i-${index}`}
                        className={`p-3 cursor-pointer ${
                          concernId == data.id
                            ? "border border-2 border-primary rounded"
                            : "border-bottom"
                        } `}
                      >
                        {data.is_resolved ? (
                          <small className="bg-success text-white rounded px-2 p-1">Resolved</small>
                        ) : (
                          <small className="bg-danger text-white rounded px-2 p-1">Pending</small>
                        )}
                        <div className="mt-2 fw-bold cursor-pointer">{data.title || "Concern"}</div>
                        {/* <div className="text-muted">
                      {" "}
                      {data.reply} {data.reply == 1 ? "reply" : "replies"}
                    </div> */}
                      </div>
                    ))}
                </>
              ) : (
                <div className="text-center p-3">No Concerns....</div>
              )}
            </div>
          </Col>
          <Col className="pt-1 message-layout" md={8}>
            {filtered && filtered.length > 0 ? (
              <Messenger concernId={concernId} />
            ) : (
              <div className="text-center border rounded mt-5 p-3">No Comments...</div>
            )}
          </Col>
        </Row>
      </NewLayout>
    </Page>
  );
};

export default ConcernPage;
