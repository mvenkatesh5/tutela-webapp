import React from "react";
// react bootstrap
import { Form, Modal, Button } from "react-bootstrap";
// material icons
import { ChevronDown } from "@styled-icons/boxicons-regular/ChevronDown";
import { ChevronUp } from "@styled-icons/boxicons-regular/ChevronUp";
import { Times } from "@styled-icons/fa-solid/Times";
// swr
import { mutate } from "swr";
// api routes
import { USER_PRODUCT_RESOURCE_VIEW_ENDPOINT } from "@constants/routes";
// api services
import { AttachResourceToUser, RemoveResourceFromUser } from "@lib/services/resource.service";
import { APIFetcher } from "@lib/services";

const UserResourceView = (props: any) => {
  const [buttonLoader, setButtonLoader] = React.useState(false);
  const [deleteResource, setDeleteResource] = React.useState<any>();
  const [deleteModal, setDeleteModal] = React.useState(false);
  const closeDeleteModal = () => {
    setDeleteModal(false);
    setDeleteResource("");
  };
  const openDeleteModal = (resource_id: any) => {
    setDeleteResource(resource_id);
    setDeleteModal(true);
  };

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
            props.userResourceList &&
              props.userResourceList.user_resources &&
              props.userResourceList.user_resources.length > 0 &&
              props.userResourceList.user_resources.map((propResource: any) => {
                if (propResource.resource_node.id === resourceData.id) {
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
          USER_PRODUCT_RESOURCE_VIEW_ENDPOINT(props.userId),
          APIFetcher(USER_PRODUCT_RESOURCE_VIEW_ENDPOINT(props.userId)),
          false
        );
        clearText();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeResourceFromUser = () => {
    setButtonLoader(true);
    RemoveResourceFromUser(deleteResource)
      .then((response) => {
        mutate(
          USER_PRODUCT_RESOURCE_VIEW_ENDPOINT(props.userId),
          APIFetcher(USER_PRODUCT_RESOURCE_VIEW_ENDPOINT(props.userId)),
          false
        );
        closeDeleteModal();
        setButtonLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setButtonLoader(false);
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
              props.userResourceList.user_resources &&
              props.userResourceList.user_resources.length > 0 &&
              props.userResourceList.user_resources.map((data: any, index: any) => (
                <div
                  key={`user-resource-content-list-view-${index}`}
                  className="user-resource-content-list-view"
                >
                  <div className="title">{data.resource_node.title}</div>
                  <div className="icon" onClick={() => openDeleteModal(data.id)}>
                    <Times />
                  </div>
                </div>
              ))}
          </div>
        </>
      )}

      <Modal show={deleteModal} onHide={closeDeleteModal} centered backdrop={"static"}>
        <Modal.Body>
          <h5 className="mb-3">Do you want to delete the resource.</h5>
          <Button
            variant="outline-primary"
            className="btn-sm"
            style={{ marginRight: "10px" }}
            disabled={buttonLoader}
            onClick={removeResourceFromUser}
          >
            {buttonLoader ? "Processing..." : "Confirm"}
          </Button>
          <Button
            variant="outline-secondary"
            className="btn-sm"
            disabled={buttonLoader}
            onClick={closeDeleteModal}
          >
            Close
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UserResourceView;
