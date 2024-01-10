import React from "react";
// next imports
import { useRouter } from "next/router";
// react-bootstrap
import { Container, Row, Col, Image, Card, Form, Dropdown } from "react-bootstrap";
// icons
import { TextAlignCenter } from "@styled-icons/fluentui-system-filled/TextAlignCenter";
import { ChevronDown } from "@styled-icons/boxicons-solid/ChevronDown";
import { Filter } from "@styled-icons/bootstrap/Filter";
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
    concern_id ? (url) => APIFetcher(url[0]) : null,
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

  console.log("this is filtered concerns", filteredConcerns);

  return (
    <Page meta={meta}>
      <NewLayout>
        {!concerns && !concernsError && !userDetails ? (
          <div className="text-center py-5">Loading...</div>
        ) : (
          <div className="message-layout px-5 py-4 w-100 h-100 position-relative tw-overflow-hidden ">
            <Row className="w-100 tw-h-fit position-relative">
              <Col md={4}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h3>Concerns</h3>
                  <Dropdown>
                    <Dropdown.Toggle className="text-button text-black d-flex align-items-center gap-2">
                      <Filter className="tw-w-5" />
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
              </Col>
              {/* <Col md={8}></Col> */}
            </Row>
            <Row className="tw-h-[95%] position-relative w-100 tw-overflow-hidden">
              <Col md={4} className="tw-h-[95%] overflow-auto">
                <div className="border rounded overflow-auto">
                  {filteredConcerns && filteredConcerns.length > 0 ? (
                    <>
                      {filteredConcerns.map((data: any, index: any) => (
                        <div
                          onClick={() => handleCurrentConcern(data.id)}
                          key={`index-concern-i-${index}`}
                          className={`px-4 py-4 cursor-pointer overflow-auto ${
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
                          <div className="d-flex flex-wrap align-items-center justify-content-between gap-2">
                            {/* <div>
                              {data.student_detail && (
                                <div
                                  className="flex-shrink-0 text-sm bg-primary text-white rounded"
                                  style={{ padding: "2px 6px" }}
                                >
                                  {data?.student_detail?.email}
                                  {data?.student_detail.first_name &&
                                    `(${data?.student_detail.first_name} ${data?.student_detail.last_name})`}
                                </div>
                              )}
                            </div> */}
                            <div>
                              <div
                                className={`flex-shrink-0 text-sm ${
                                  data.status === "resolved" ? `bg-success` : `tw-bg-red-500`
                                } text-white rounded tw-px-2 tw-py-1  `}
                              >
                                {data.status}
                              </div>
                            </div>
                          </div>

                          {data.title && (
                            <div className="mt-2 tw-font-semibold cursor-pointer tw-text-lg">{data.title}</div>
                          )}
                          <small className=" text-secondary mb-0">
                            {data?.concern_comments.length}{" "}
                            {data.concern_comments.length <= 1 ? "reply" : "replies"}
                          </small>
                          {/* {data.description && <div className="mt-2 mb-2">{data.description}</div>} */}
                          {/* <div>
                            {data?.user_detail?.email && (
                              <div className="mt-2 text-sm" style={{ whiteSpace: "nowrap" }}>
                                by{" "}
                                <span className="text-primary">
                                  {data?.user_detail?.email}
                                  {data?.user_detail.first_name &&
                                    `(${data?.user_detail.first_name} ${data?.user_detail.last_name})`}
                                </span>
                                ,
                              </div>
                            )}

                            {data.created && (
                              <div className="text-sm" style={{ whiteSpace: "nowrap" }}>
                                {datePreview(data.created)}
                              </div>
                            )}
                          </div> */}
                        </div>
                      ))}
                    </>
                  ) : (
                    <div className="text-center py-5">No concerns are available.</div>
                  )}
                </div>
              </Col>

              <Col md={8} className="tw-h-[95%] position-relative d-block">
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
