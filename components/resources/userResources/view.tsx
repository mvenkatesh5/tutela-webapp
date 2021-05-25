import React from "react";
// react bootstrap
import { Form } from "react-bootstrap";
// material icons
import { ChevronDown } from "@styled-icons/boxicons-regular/ChevronDown";
import { ChevronUp } from "@styled-icons/boxicons-regular/ChevronUp";
import { Times } from "@styled-icons/fa-solid/Times";
// swr
import { mutate } from "swr";
// api routes
import { USER_RESOURCE_VIEW_ENDPOINT } from "@constants/routes";
// api services
import { AttachResourceToUser, RemoveResourceFromUser } from "@lib/services/resource.service";
import { APIFetcher } from "@lib/services";

const UserResourceView = (props: any) => {
  const [previewToggle, setPreviewToggle] = React.useState<any>(true);

  const [dropdownToggle, setDropdownToggle] = React.useState<any>(false);
  const [dropdownList, setDropdownList] = React.useState<any>([]);
  const [searchText, setSearchText] = React.useState<any>("");

  const handleSearchText = (e: any) => {
    setSearchText(e.target.value);
    handleSearchList(e.target.value);
  };

  const handleSearchList = (value: any) => {
    if (value.length > 0) {
      if (props.resources && props.resources.length > 0) {
        let newResourceData: any = [];
        props.resources.map((resourceData: any) => {
          if (resourceData.title.toLowerCase().includes(value.toLowerCase())) {
            let toggle: any = false;
            props.userResourceList.map((propResource: any) => {
              if (propResource.id === resourceData.id) {
                toggle = true;
              }
            });
            if (!toggle) newResourceData.push(resourceData);
          }
        });
        if (newResourceData && newResourceData.length > 0) {
          setDropdownToggle(true);
          setDropdownList(newResourceData);
        } else {
          setDropdownToggle(false);
          setDropdownList([]);
        }
      }
    } else {
      setDropdownToggle(false);
      setDropdownList([]);
    }
  };

  const clearText = () => {
    setDropdownToggle(false);
    setDropdownList([]);
    setSearchText("");
  };

  const attachResourceToUser = (resourceId: any) => {
    const payload: any = {
      resource_node: resourceId,
      user: props.userId,
    };

    AttachResourceToUser(payload)
      .then((response) => {
        mutate(
          USER_RESOURCE_VIEW_ENDPOINT(props.userId),
          APIFetcher(USER_RESOURCE_VIEW_ENDPOINT(props.userId)),
          false
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeResourceFromUser = (resourceId: any) => {
    RemoveResourceFromUser(resourceId)
      .then((response) => {
        mutate(
          USER_RESOURCE_VIEW_ENDPOINT(props.userId),
          APIFetcher(USER_RESOURCE_VIEW_ENDPOINT(props.userId)),
          false
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="user-resource-detail">
      <div className="user-resource-header">
        <div className="title">Resources</div>
        <div className="toggle" onClick={() => setPreviewToggle(!previewToggle)}>
          {previewToggle ? <ChevronUp /> : <ChevronDown />}
        </div>
      </div>

      {previewToggle && (
        <>
          <div className="search-container">
            <div className="user-resource-search-container">
              <Form.Control
                type="text"
                placeholder="Search Resources"
                value={searchText}
                onChange={handleSearchText}
              />
            </div>

            {dropdownToggle && (
              <div className="resource-dropdown-clear">
                <small onClick={clearText}>Clear</small>
              </div>
            )}

            {dropdownToggle && (
              <div className="resource-dropdown-list-container">
                {dropdownList &&
                  dropdownList.length > 0 &&
                  dropdownList.map((data: any, index: any) => (
                    <div
                      key={`resource-dropdown-list-item-${index}`}
                      className="resource-dropdown-list-item"
                      onClick={() => attachResourceToUser(data.id)}
                    >
                      <div className="title">{data.title}</div>
                    </div>
                  ))}
              </div>
            )}
          </div>

          <div>
            {props.userResourceList &&
              props.userResourceList.length > 0 &&
              props.userResourceList.map((data: any, index: any) => (
                <div
                  key={`user-resource-content-list-view-${index}`}
                  className="user-resource-content-list-view"
                  onClick={() => attachResourceToUser(data.id)}
                >
                  <div className="title">{data.title}</div>
                  <div className="icon" onClick={() => removeResourceFromUser(data.id)}>
                    <Times />
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UserResourceView;
