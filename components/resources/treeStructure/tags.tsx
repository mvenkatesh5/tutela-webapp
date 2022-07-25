import React from "react";
// react bootstrap
import { Dropdown } from "react-bootstrap";
// icons
import { ChevronDown } from "@styled-icons/boxicons-regular/ChevronDown";
import { SquaredCross } from "@styled-icons/entypo/SquaredCross";
// swr
import useSWR, { mutate } from "swr";
// api routes
import {
  RESOURCE_WITH_NODE_ENDPOINT,
  RESOURCE_ENDPOINT,
  TAGS_WITH_ID_ENDPOINT,
} from "@constants/routes";
// api services
import { ResourceNodeEdit } from "@lib/services/resource.service";
import { APIFetcher } from "@lib/services";

const ResourcePermission = (props: any) => {
  const { data: tagData, error: tagDataError } = useSWR(
    props.data.data.tag && props.data.data.tag ? TAGS_WITH_ID_ENDPOINT(props.data.data.tag) : null,
    (url) => APIFetcher(url),
    { refreshInterval: 0 }
  );

  React.useEffect(() => {
    setSelectedTag(tagData);
  }, [tagData]);

  const [selectedTag, setSelectedTag] = React.useState<any>(tagData);

  const updateTag = (tag_id: any) => {
    const payload = { id: props.data.id, tag: tag_id };
    ResourceNodeEdit(payload)
      .then((response) => {
        console.log(response);
        if (props.root_node_id)
          mutate(
            RESOURCE_WITH_NODE_ENDPOINT(props.root_node_id),
            APIFetcher(RESOURCE_WITH_NODE_ENDPOINT(props.root_node_id)),
            false
          );
        else mutate(RESOURCE_ENDPOINT, APIFetcher(RESOURCE_ENDPOINT), false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Dropdown>
      <Dropdown.Toggle className="text-button text-black d-flex align-items-center gap-2 plain-dropdown">
        <div className="d-flex align-items-center gap-2 border rounded px-1">
          <div
            className="py-2 px-2 rounded"
            style={{
              backgroundColor: selectedTag?.color ? selectedTag.color : "#ccc",
            }}
          ></div>
          {selectedTag?.name || "Select Tag"}
          <ChevronDown width="15px" />
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item
          onClick={() => {
            setSelectedTag({}), updateTag("");
          }}
          className="border-bottom px-2 py-1 d-flex align-items-center gap-2"
        >
          <SquaredCross width="18px" />
          <div>Remove tag</div>
        </Dropdown.Item>

        {props.tags &&
          props.tags.length > 0 &&
          props.tags.map((tag: any, index: any) => (
            <Dropdown.Item
              className="border-bottom px-2 py-1 d-flex align-items-center gap-2"
              key={`tags-in-resources-${index}`}
              onClick={() => {
                setSelectedTag(tag), updateTag(tag.id);
              }}
            >
              <div
                className="p-2 px-2 rounded"
                style={{
                  backgroundColor: tag.color ? tag.color : "#ccc",
                }}
              ></div>
              <div>{tag.name}</div>
            </Dropdown.Item>
          ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ResourcePermission;
