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
import {
  USER_RESOURCE_VIEW_ENDPOINT,
  USER_PRODUCT_RESOURCE_VIEW_ENDPOINT,
} from "@constants/routes";
// api services
import { AddProductUnderUser } from "@lib/services/productsService";
import { AttachResourceToUserPromise } from "@lib/services/resource.service";
import { APIFetcher } from "@lib/services";

const UserProductView = (props: any) => {
  const [modalProductResources, setModalProductResources] = React.useState<any>();

  const [buttonLoader, setButtonLoader] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const closeModal = () => {
    setModal(false);
    setModalProductResources("");
    clearText();
  };
  const openModal = () => setModal(true);

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
      if (props.products && props.products.length > 0) {
        let newProductData: any = [];
        props.products.map((productData: any) => {
          if (productData.name.toLowerCase().includes(value.toLowerCase())) {
            let toggle: any = false;
            props.userProductList &&
              props.userProductList.product_users &&
              props.userProductList.product_users.length > 0 &&
              props.userProductList.product_users.map((propResource: any) => {
                if (propResource.product.id === productData.id) {
                  toggle = true;
                }
              });
            if (!toggle) newProductData.push(productData);
          }
        });
        if (newProductData && newProductData.length > 0) {
          setDropdownToggle(true);
          setDropdownList(newProductData);
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

  const attachProductToUser = (product: any) => {
    if (
      props.userProductList &&
      props.userProductList.user_resources &&
      props.userProductList.user_resources.length > 0
    ) {
      setModalProductResources(product);
      openModal();
    } else {
      attachProductToUserRequest(product);
    }
  };

  const confirmProductResourcesAttachToUser = () => {
    if (modalProductResources) {
      setButtonLoader(true);
      let userResources = props.userProductList.user_resources;
      let productResources = modalProductResources.resources;

      let resourcePayload: any = [];
      productResources.map((resource: any) => {
        if (!userResources.map((data: any) => data.resource_node.id).includes(resource)) {
          const payload: any = {
            resource_node: resource,
            user: props.userId,
          };
          resourcePayload.push(payload);
        }
      });

      if (resourcePayload && resourcePayload.length > 0) {
        AttachResourceToUserPromise(resourcePayload)
          .then((response) => {
            attachProductToUserRequest(modalProductResources);
          })
          .catch((error) => {
            console.log(error);
            setButtonLoader(false);
          });
      } else {
        attachProductToUserRequest(modalProductResources);
      }
    }
  };

  const cancelProductResourcesAttachToUser = () => {
    if (modalProductResources) {
      attachProductToUserRequest(modalProductResources);
    }
  };

  const attachProductToUserRequest = (product: any) => {
    const payload: any = {
      product: product.id,
      user: props.userId,
    };
    setButtonLoader(true);

    AddProductUnderUser(payload)
      .then((response) => {
        mutate(
          USER_PRODUCT_RESOURCE_VIEW_ENDPOINT(props.userId),
          APIFetcher(USER_PRODUCT_RESOURCE_VIEW_ENDPOINT(props.userId)),
          false
        );
        closeModal();
        setButtonLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setButtonLoader(false);
      });
  };

  const removeProductUnderUser = (product_bridge_id: any) => {
    alert("currently in development get back to you as soon as possible. Thank you!");
    // RemoveResourceFromUser(product_bridge_id)
    //   .then((response) => {
    //     mutate(
    //       USER_PRODUCT_RESOURCE_VIEW_ENDPOINT(props.userId),
    //       APIFetcher(USER_PRODUCT_RESOURCE_VIEW_ENDPOINT(props.userId)),
    //       false
    //     );
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  const renderModalResourceBinding = () => {
    if (modalProductResources) {
      let userResources = props.userProductList.user_resources;
      let productResources = modalProductResources.resources;

      if (productResources && productResources.length > 0)
        return (
          <>
            {productResources.map((resource: any) => {
              const currentResource: any = props.resources.find(
                (element: any) => element.id === resource
              );
              if (currentResource)
                return (
                  <li className={`mt-1 mb-1`} style={{ fontSize: "14px", fontWeight: 500 }}>
                    {currentResource.title}
                  </li>
                );
            })}
          </>
        );
    }
    return "";
  };

  return (
    <div className="user-resource-detail">
      <div className="user-resource-header">
        <div className="title">Products</div>
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
                placeholder="Search Products"
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
                      onClick={() => attachProductToUser(data)}
                    >
                      <div className="title">{data.name}</div>
                    </div>
                  ))}
              </div>
            )}
          </div>

          <div>
            {props.userProductList &&
              props.userProductList.product_users &&
              props.userProductList.product_users.length > 0 &&
              props.userProductList.product_users.map((data: any, index: any) => (
                <div
                  key={`user-resource-content-list-view-${index}`}
                  className="user-resource-content-list-view"
                >
                  <div className="title">{data.product.name}</div>
                  {/* <div className="icon" onClick={() => removeProductUnderUser(data.id)}>
                    <Times />
                  </div> */}
                </div>
              ))}
          </div>
        </>
      )}

      <Modal show={modal} onHide={closeModal} centered backdrop={"static"}>
        <Modal.Body>
          <h5 className="mb-3">
            Do you want to add product resources that are displayed below to the user.
          </h5>
          <h6>Resources:</h6>
          <ol>{modalProductResources && renderModalResourceBinding()}</ol>
          <Button
            variant="outline-primary"
            className="btn-sm"
            style={{ marginRight: "10px" }}
            onClick={confirmProductResourcesAttachToUser}
            disabled={buttonLoader}
          >
            {buttonLoader ? "Processing..." : "Continue"}
          </Button>
          <Button
            variant="outline-secondary"
            className="btn-sm"
            onClick={cancelProductResourcesAttachToUser}
            disabled={buttonLoader}
          >
            Close
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UserProductView;
