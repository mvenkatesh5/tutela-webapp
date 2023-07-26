import React from "react";
// react bootstrap
import { OverlayTrigger, Tooltip, Button, Form, Modal } from "react-bootstrap";
// swr
import useSWR from "swr";
// icons
import { Books } from "@styled-icons/icomoon/Books";
import { ChevronDown } from "@styled-icons/boxicons-regular/ChevronDown";
import { ChevronRight } from "@styled-icons/boxicons-regular/ChevronRight";
// components
import RenderResources from "@components/session-feedback/attach-resources/render";
// api routes
import {
  RESOURCE_WITH_NODE_ENDPOINT,
  PRODUCTS_WITH_ID_ENDPOINT,
  TAGS_ENDPOINT,
} from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";
import { SessionReport } from "@lib/services/session-report.service";

const RenderResource = ({
  childNodes,
  selectedResources,
  handleSelectedResources,
  toggledResources,
  handleToggledResources,
  paddingLeft,
  tagsList,
}: any) => {
  const renderTag = (tag_id: any) => {
    const tag =
      tagsList && tagsList.length > 0 && tagsList?.find((_tag: any) => _tag?.id === tag_id);
    return tag ? tag : null;
  };

  return (
    <div>
      {childNodes &&
        childNodes.length > 0 &&
        childNodes.map((_childNode: any) => (
          <div key={_childNode?.id} className="tw-relative tw-overflow-hidden tw-divide-y">
            <div
              className="tw-relative tw-w-full tw-h-full tw-overflow-hidden tw-flex tw-items-center tw-gap-1 tw-p-1"
              style={{ paddingLeft: `${paddingLeft * 24}px` }}
            >
              <div
                className="tw-flex-shrink-0 tw-overflow-hidden tw-w-[20px] tw-h-[20px] tw-flex tw-justify-center tw-items-center tw-cursor-pointer hover:tw-bg-gray-100"
                onClick={() => handleToggledResources(_childNode?.id)}
              >
                {_childNode && _childNode.children && _childNode.children.length > 0 && (
                  <>
                    {!toggledResources.includes(_childNode?.id) ? (
                      <ChevronRight />
                    ) : (
                      <ChevronDown />
                    )}
                  </>
                )}
              </div>
              <div className="tw-flex-shrink-0 tw-overflow-hidden tw-w-[20px] tw-h-[20px] tw-flex tw-justify-center tw-items-center">
                <input
                  type="checkbox"
                  checked={selectedResources.includes(_childNode?.id) ? true : false}
                  onClick={() => handleSelectedResources(_childNode?.id)}
                />
              </div>
              <div className="tw-flex-shrink-0 tw-overflow-hidden tw-text-sm">
                {_childNode?.id || "-"} - {_childNode?.data?.title || "-"}
              </div>
              {renderTag(_childNode?.data?.tag) ? (
                <div
                  className="tw-flex-shrink-0 text-sm tw-ml-auto tw-overflow-hidden tw-flex tw-justify-center tw-items-center tw-border tw-border-solid tw-border-gray-100 tw-bg-gray-100 tw-uppercase tw-p-1 tw-py-0.5 tw-rounded tw-font-bold tw-text-white"
                  style={{ backgroundColor: renderTag(_childNode?.data?.tag)?.color }}
                >
                  {renderTag(_childNode?.data?.tag)?.name}
                </div>
              ) : null}
            </div>

            <div>
              {toggledResources.includes(_childNode?.id) &&
                _childNode &&
                _childNode.children &&
                _childNode.children.length > 0 && (
                  <RenderResource
                    childNodes={_childNode.children}
                    selectedResources={selectedResources}
                    handleSelectedResources={handleSelectedResources}
                    toggledResources={toggledResources}
                    handleToggledResources={handleToggledResources}
                    paddingLeft={paddingLeft + 1}
                    tagsList={tagsList}
                  />
                )}
            </div>
          </div>
        ))}
    </div>
  );
};

const AttachResourceReportSessionUser = ({ session }: any) => {
  const [selectedUsers, setSelectedUsers] = React.useState<any>([]);
  const handleSelectedUsers = (session_user_id: number | string) => {
    setSelectedUsers((prevData: any) =>
      prevData.includes(session_user_id)
        ? prevData.filter((_data: string | number) => _data != session_user_id)
        : [...prevData, session_user_id]
    );
  };

  const [selectedResources, setSelectedResources] = React.useState<any>([]);
  const handleSelectedResources = (resource_id: number | string) => {
    setSelectedResources((prevData: any) =>
      prevData.includes(resource_id)
        ? prevData.filter((_data: string | number) => _data != resource_id)
        : [...prevData, resource_id]
    );
  };

  const [toggledResources, setToggledResources] = React.useState<any>([]);
  const handleToggledResources = (resource_id: number | string) => {
    setToggledResources((prevData: any) =>
      prevData.includes(resource_id)
        ? prevData.filter((_data: string | number) => _data != resource_id)
        : [...prevData, resource_id]
    );
  };

  const [currentProductId, setCurrentProductId] = React.useState<null | number>(null);
  const [currentResourceId, setCurrentResourceId] = React.useState<null | number>(null);

  const [buttonLoader, setButtonLoader] = React.useState(false);

  const [attachModal, setAttachModal] = React.useState(false);
  const attachModalOpen = () => {
    setAttachModal(true);
    if (session && session?.product && currentProductId === null)
      setCurrentProductId(() => session?.product);
  };
  const attachModalClose = () => {
    setAttachModal(false);
    setCurrentProductId(null);
    setCurrentResourceId(null);
    setToggledResources([]);
    setSelectedResources([]);
    setSelectedUsers([]);
    setTab("render");
  };

  const { data: tagsList, error: tagsListError } = useSWR(TAGS_ENDPOINT, APIFetcher);

  const { data: product, error: productError } = useSWR(
    attachModal && currentProductId ? `session-attach-product-${currentProductId}` : null,
    attachModal && currentProductId
      ? () => APIFetcher(PRODUCTS_WITH_ID_ENDPOINT(currentProductId))
      : null,
    { refreshInterval: 0 }
  );
  React.useEffect(() => {
    if (
      product &&
      product?.resource_nodes &&
      product?.resource_nodes.length > 0 &&
      currentResourceId === null
    )
      setCurrentResourceId(() => product?.resource_nodes[0]);
  }, [currentResourceId, product]);

  const { data: resourceDetail, error: resourceDetailError } = useSWR(
    attachModal && currentResourceId ? `session-attach-resource-${currentResourceId}` : null,
    attachModal && currentResourceId
      ? () => APIFetcher(RESOURCE_WITH_NODE_ENDPOINT(currentResourceId))
      : null,
    { refreshInterval: 0 }
  );

  const bulkAttachResources = async () => {
    if (
      session &&
      selectedUsers &&
      selectedUsers.length > 0 &&
      selectedResources &&
      selectedResources.length > 0
    ) {
      setButtonLoader(true);
      let bulkCreatePayload: any = [];
      selectedUsers.forEach((_session_user_id: any) => {
        selectedResources.forEach((_resource_id: any) => {
          bulkCreatePayload.push({
            session: session?.id,
            session_user: _session_user_id,
            resource: _resource_id,
          });
        });
      });
      if (bulkCreatePayload && bulkCreatePayload.length > 0) {
        SessionReport.bulkCreate({ reports: bulkCreatePayload })
          .then((response) => {
            console.log("response", response);
            setButtonLoader(false);
            attachModalClose();
          })
          .catch((error) => {
            console.log("error", error);
          });
      }
    } else {
      alert("Please select at least one user and resource");
    }
  };

  const tabs = [
    { key: "render", title: "View Attached Resources" },
    { key: "create", title: "Attach Resources" },
  ];
  const [tab, setTab] = React.useState("render");
  const handleTab = (_tab: string) => {
    setTab(_tab);
    setToggledResources([]);
    setSelectedResources([]);
    setSelectedUsers([]);
  };

  return (
    <div>
      {/* button */}
      <OverlayTrigger
        key={`bottom`}
        placement={`bottom`}
        overlay={<Tooltip id={`tooltip-bottom`}>Attach Resources</Tooltip>}
      >
        <div className="session-detail-redirection" onClick={attachModalOpen}>
          <Books />
        </div>
      </OverlayTrigger>

      {/* render resources and select option */}
      <div>
        <Modal
          show={attachModal}
          onHide={attachModalClose}
          centered
          backdrop={"static"}
          size={`lg`}
        >
          <Modal.Body className="tw-space-y-3">
            <div className="tw-relative tw-flex tw-justify-between tw-items-center">
              <h5 className="tw-m-0 tw-p-0">Attach resources</h5>
              <div
                className="tw-text-sm tw-font-medium tw-cursor-pointer tw-text-gray-500 hover:tw-text-gray-700"
                onClick={() => {
                  if (!buttonLoader) attachModalClose();
                }}
              >
                Close
              </div>
            </div>

            <div className="tw-border-0 tw-border-b tw-border-solid tw-border-gray-200 tw-relative tw-flex tw-items-center tw-gap-2 tw-flex-grow tw-select-none">
              {tabs &&
                tabs.length > 0 &&
                tabs.map((_tab: any) => (
                  <div
                    key={_tab?.key}
                    className={`tw-border-0 tw-border-b-2 tw-border-solid tw-border-blue-500 tw-p-1 tw-font-medium tw-cursor-pointer tw-text-sm ${
                      _tab?.key == tab ? `tw-text-blue-700 ` : `tw-border-transparent`
                    }`}
                    onClick={() => handleTab(_tab?.key)}
                  >
                    {_tab?.title}
                  </div>
                ))}
            </div>

            {tab === "render" && <RenderResources session={session} />}
            {tab === "create" && (
              <>
                <div className="tw-space-y-3">
                  {/* rendering users */}
                  <div>
                    <h6 className="tw-m-0 tw-p-0 tw-pb-2">Session Users</h6>
                    <div className="tw-relative tw-flex tw-items-center tw-flex-grow tw-gap-2 tw-select-none">
                      {session &&
                        session?.session_users &&
                        session?.session_users?.length > 0 &&
                        session?.session_users.map(
                          (_session_user: any) =>
                            _session_user?.as_role === 0 && (
                              <div
                                key={_session_user?.id}
                                className="tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-flex tw-items-center tw-gap-1 tw-p-1 tw-py-0.5 tw-cursor-pointer hover:tw-bg-gray-100"
                                onClick={() => handleSelectedUsers(_session_user?.id)}
                              >
                                <div
                                  className={`tw-border tw-border-solid tw-w-[14px] tw-h-[14px] tw-rounded-sm tw-flex tw-justify-center tw-items-center ${
                                    selectedUsers.includes(_session_user?.id)
                                      ? `tw-border-blue-500`
                                      : `tw-border-gray-400`
                                  }`}
                                >
                                  {selectedUsers.includes(_session_user?.id) && (
                                    <div className="tw-border tw-border-solid tw-border-blue-500 tw-bg-blue-500 tw-w-[10px] tw-h-[10px] tw-rounded-sm"></div>
                                  )}
                                </div>
                                <div className="tw-font-medium tw-text-sm tw-capitalize">
                                  {_session_user?.user?.first_name} {_session_user?.user?.last_name}
                                </div>
                              </div>
                            )
                        )}
                    </div>
                  </div>

                  {session && session?.product ? (
                    <>
                      {product && !productError ? (
                        <>
                          {currentResourceId ? (
                            <>
                              {resourceDetail && !resourceDetailError ? (
                                <>
                                  {resourceDetail &&
                                  resourceDetail.tree &&
                                  resourceDetail.tree.length > 0 &&
                                  resourceDetail.tree[0] &&
                                  resourceDetail.tree[0].children ? (
                                    <div>
                                      <h6 className="tw-m-0 tw-p-0 tw-pb-2">
                                        Resource Name: {resourceDetail.tree[0].data.title}
                                      </h6>
                                      <RenderResource
                                        childNodes={resourceDetail.tree[0].children}
                                        selectedResources={selectedResources}
                                        handleSelectedResources={handleSelectedResources}
                                        toggledResources={toggledResources}
                                        handleToggledResources={handleToggledResources}
                                        paddingLeft={0}
                                        tagsList={tagsList}
                                      />
                                    </div>
                                  ) : (
                                    <div className="mt-4 mb-4 text-center text-secondary">
                                      No Resources are available.
                                    </div>
                                  )}
                                </>
                              ) : (
                                <div className="tw-text-center tw-text-sm tw-font-medium tw-text-gray-500">
                                  Loading...
                                </div>
                              )}
                            </>
                          ) : (
                            <div className="tw-text-center tw-text-sm tw-font-medium tw-text-gray-500">
                              No Resource is available
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="tw-text-center tw-text-sm tw-font-medium tw-text-gray-500">
                          Loading...
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="tw-text-center tw-text-sm tw-font-medium tw-text-gray-500">
                      No Product is available
                    </div>
                  )}
                </div>

                <div className="tw-relative tw-flex tw-justify-end tw-items-center tw-gap-2">
                  <Button
                    variant="outline-secondary"
                    onClick={attachModalClose}
                    className="btn-sm"
                    disabled={buttonLoader}
                  >
                    Close
                  </Button>
                  <Button
                    variant="outline-primary"
                    onClick={bulkAttachResources}
                    className="btn-sm"
                    disabled={
                      buttonLoader
                        ? true
                        : selectedUsers &&
                          selectedUsers.length > 0 &&
                          selectedResources &&
                          selectedResources.length > 0
                        ? false
                        : true
                    }
                  >
                    {buttonLoader ? "Processing..." : "Attach"}
                  </Button>
                </div>
              </>
            )}
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default AttachResourceReportSessionUser;
