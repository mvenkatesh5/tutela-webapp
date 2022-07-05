import React from "react";
// next imports
import { useRouter } from "next/router";
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
import { CONCERN_ENDPOINT, COMMENT_WITH_CONCERN_ID_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";

const ConcernPage = () => {
  const meta = {
    title: "Concerns",
    description: META_DESCRIPTION,
  };

  const router = useRouter();
  const { concern: concern_id } = router.query;

  const handleCurrentConcern = (concernId: any) => {
    router.replace(`/parent/concern?concern=${concernId}`, undefined, { shallow: true });
  };

  const { data: concerns, error: concernsError } = useSWR(CONCERN_ENDPOINT, APIFetcher, {
    refreshInterval: 0,
  });

  const { data: concernComments, error: concernCommentsError } = useSWR(
    concern_id ? [COMMENT_WITH_CONCERN_ID_ENDPOINT(concern_id), concern_id] : null,
    APIFetcher,
    {
      refreshInterval: 0,
    }
  );

  const filteredOptions = [
    { key: "all", title: "All" },
    { key: "pending", title: "Pending" },
    { key: "resolved", title: "Resolved" },
  ];
  const [filtered, setConcernFilter] = React.useState<any>("all");
  const handleConcernFilter = (value: any) => {
    setConcernFilter(value);
  };

  React.useEffect(() => {
    if (!concern_id && concerns && concerns.length > 0) handleCurrentConcern(concerns[0].id);
  }, [concern_id, concerns]);

  const filteredConcerns = React.useMemo(() => {
    if (filtered === "all") return concerns;
    if (filtered === "pending")
      return concerns.filter((_concern: any) => _concern.status === "pending");
    if (filtered === "resolved")
      return concerns.filter((_concern: any) => _concern.status === "resolved");
  }, [concerns, filtered]);

  return (
    <Page meta={meta}>
      <NewLayout>
        {!concerns && !concernsError ? (
          <div className="text-center py-5">Loading...</div>
        ) : (
          <Row className="message-layout p-4">
            <Col className="overflow-auto" md={4}>
              <div className="d-flex justify-content-between align-items-center pb-1">
                <h5>Concerns</h5>
                <Dropdown>
                  <Dropdown.Toggle className="text-button text-black d-flex align-items-center gap-2">
                    <TextAlignCenter width="14px" />
                    <div className="text-capitalize">{filtered}</div>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {filteredOptions &&
                      filteredOptions.map((_option: any, _idx: any) => (
                        <Dropdown.Item key={_idx} onClick={() => handleConcernFilter(_option.key)}>
                          {_option.title}
                        </Dropdown.Item>
                      ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              <div className="border rounded">
                {filteredConcerns && filteredConcerns.length > 0 ? (
                  <>
                    {filteredConcerns.map((data: any, index: any) => (
                      <div
                        onClick={() => handleCurrentConcern(data.id)}
                        key={`index-concern-i-${index}`}
                        className={`p-3 cursor-pointer overflow-auto ${
                          concern_id == data.id
                            ? "border border-2 border-primary rounded"
                            : "border-bottom"
                        } `}
                      >
                        <small
                          className={`${
                            data.status === "resolved" ? `bg-success` : `bg-danger`
                          } bg-success text-white rounded px-2 p-1`}
                        >
                          {data.status}
                        </small>

                        <div className="mt-2 fw-bold cursor-pointer">{data.title || "Concern"}</div>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="text-center py-5">No concerns are available.</div>
                )}
              </div>
            </Col>
            <Col className="pt-1 message-layout" md={8}>
              {!concernComments && !concernCommentsError ? (
                <div className="text-center py-5">Loading...</div>
              ) : (
                <Messenger concern_id={concern_id} concernComments={concernComments} />
              )}
            </Col>
          </Row>
        )}
      </NewLayout>
    </Page>
  );
};

export default ConcernPage;
