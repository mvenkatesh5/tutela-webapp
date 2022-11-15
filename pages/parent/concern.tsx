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
import Messenger from "@components/concern/Messenger";
// layout
import NewLayout from "@layouts/newLayout";
// swr
import useSWR from "swr";
// api routes
import { CONCERN_ENDPOINT, COMMENT_WITH_CONCERN_ID_ENDPOINT } from "@constants/routes";
// cookie
import { getAuthenticationToken } from "@lib/cookie";
// api services
import { APIFetcher } from "@lib/services";
// global imports
import { datePreview } from "@constants/global";

const ConcernPage = () => {
  const meta = {
    title: "Concerns",
    description: META_DESCRIPTION,
  };

  const router = useRouter();
  const { concern: concern_id } = router.query;

  const [userDetails, setUserDetails] = React.useState<any>();
  React.useEffect(() => {
    if (getAuthenticationToken()) {
      let details: any = getAuthenticationToken();
      details = details ? JSON.parse(details) : null;
      if (details && details.info) {
        setUserDetails(details);
      }
    }
  }, []);

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

  React.useEffect(() => {
    let scrollView = document.getElementById("concern-scroll-into-view");
    if (scrollView) {
      scrollView.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [concern_id]);

  return (
    <Page meta={meta}>
      <NewLayout>
        {!concerns && !concernsError && !userDetails ? (
          <div className="text-center py-5">Loading...</div>
        ) : (
          <div className="message-layout p-4 w-100 h-100 border">
            <Row className="w-100 h-100 overflow-hidden">
              <Col md={4} className="h-100 overflow-auto">
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
                          <Dropdown.Item
                            key={_idx}
                            onClick={() => handleConcernFilter(_option.key)}
                          >
                            {_option.title}
                          </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>

                <div className="border rounded overflow-auto">
                  {filteredConcerns && filteredConcerns.length > 0 ? (
                    <>
                      {filteredConcerns.map((data: any, index: any) => (
                        <div
                          onClick={() => handleCurrentConcern(data.id)}
                          key={`index-concern-i-${index}`}
                          className={`p-3 cursor-pointer overflow-auto ${
                            filteredConcerns.length - 1 != index && "border-bottom"
                          } ${data.id == concern_id ? "concern-scroll-into-view" : ""}`}
                          style={
                            concern_id == data.id
                              ? {
                                  backgroundColor: "#e8f4ff",
                                }
                              : {}
                          }
                        >
                          <div className="d-flex align-items-center justify-content-between gap-2">
                            {data.student_detail && (
                              <small
                                className="flex-shrink-0 text-sm bg-primary text-white rounded"
                                style={{ padding: "2px 6px" }}
                              >
                                {data?.student_detail?.email}
                              </small>
                            )}
                            <small
                              className={`flex-shrink-0 ${
                                data.status === "resolved" ? `bg-success` : `bg-danger`
                              } bg-success text-white rounded`}
                              style={{ padding: "2px 6px" }}
                            >
                              {data.status}
                            </small>
                          </div>

                          {data.title && (
                            <div className="mt-2 fw-bold cursor-pointer">{data.title}</div>
                          )}
                          {data.description && <div className="mt-2 mb-2">{data.description}</div>}
                          <div>
                            {data?.user_detail?.email && (
                              <div className="mt-2 text-sm" style={{ whiteSpace: "nowrap" }}>
                                by <span className="text-primary">{data?.user_detail?.email}</span>,
                              </div>
                            )}

                            {data.created && (
                              <div className="text-sm" style={{ whiteSpace: "nowrap" }}>
                                {datePreview(data.created)}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <div className="text-center py-5">No concerns are available.</div>
                  )}
                </div>
              </Col>

              <Col md={8} className="overflow-hidden">
                {filteredConcerns && filteredConcerns.length > 0 && (
                  <>
                    {!concernComments && !concernCommentsError ? (
                      <div className="text-center py-5">Loading...</div>
                    ) : (
                      <Messenger
                        currentUser={userDetails?.user}
                        concern_id={concern_id}
                        concernComments={concernComments}
                      />
                    )}
                  </>
                )}
              </Col>
            </Row>
          </div>
        )}
      </NewLayout>
    </Page>
  );
};

export default ConcernPage;
