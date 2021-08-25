import React from "react";
// react bootstrap
import { Form, Modal, Button } from "react-bootstrap";
// material icons
import { Plus } from "@styled-icons/boxicons-regular/Plus";
import { Times } from "@styled-icons/fa-solid/Times";
// swr
import { mutate } from "swr";
// api routes
import { USER_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";
import { UserParentLinking } from "@lib/services/userService";

const UserParentModal = (props: any) => {
  const [buttonLoader, setButtonLoader] = React.useState<boolean>(false);
  const [currentUser, setCurrentUser] = React.useState<any>();
  const [userRole, setUserRole] = React.useState<any>();

  React.useEffect(() => {
    if (props.users && props.users.length > 0) {
      console.log(props.user_id);
      let details: any = props.users.find((element: any) => element.id === parseInt(props.user_id));
      console.log("details-->", details);
      if (details) {
        setCurrentUser(details);
        if (details.role === 2) setUserRole("admin");
        else if (details.role === 1) setUserRole("teacher");
        else if (details.role === 3) setUserRole("parent");
        else setUserRole("student");
      }
    }
  }, [props.users]);

  const [previewToggle, setPreviewToggle] = React.useState<any>(true);

  const [dropdownToggle, setDropdownToggle] = React.useState<any>(false);
  const [dropdownList, setDropdownList] = React.useState<any>([]);
  const [searchText, setSearchText] = React.useState<any>("");

  const [modal, setModal] = React.useState<boolean>(false);
  const openModal = () => setModal(true);
  const closeModal = () => {
    setModal(false);
    setSearchText("");
  };

  const [deleteParentEmail, setDeleteParentEmail] = React.useState<any>();
  const [deleteModal, setDeleteModal] = React.useState(false);
  const openDeleteModal = (email: any) => {
    setDeleteModal(true);
    setDeleteParentEmail(email);
  };
  const closeDeleteModal = () => {
    setDeleteModal(false);
    setDeleteParentEmail("");
  };

  const handleSearchText = (e: any) => {
    setSearchText(e.target.value);
    handleSearchList(e.target.value);
  };

  const handleSearchList = (value: any) => {
    if (value.length > 0) {
      if (props.users && props.users.length > 0) {
        let newUserData: any = [];
        props.users.map((currentUser: any) => {
          // console.log(currentUser);
          if (currentUser.email.toLowerCase().includes(value.toLowerCase())) {
            if (currentUser.role === 3) {
              let toggle: any = false;
              //   props.userProductList &&
              //     props.userProductList.product_users &&
              //     props.userProductList.product_users.length > 0 &&
              //     props.userProductList.product_users.map((propResource: any) => {
              //       if (propResource.product.id === productData.id) {
              //         toggle = true;
              //       }
              //     });
              if (!toggle) newUserData.push(currentUser);
            }
          }
        });
        if (newUserData && newUserData.length > 0) {
          console.log("newUserData", newUserData);
          setDropdownToggle(true);
          setDropdownList(newUserData);
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

  const addSearchUserEmailToEmail = (email: any) => {
    setSearchText(email);
    clearText();
  };

  const clearText = () => {
    setDropdownToggle(false);
    setDropdownList([]);
  };

  const addParentModalSubmit = (e: any) => {
    e.preventDefault();

    setButtonLoader(true);

    const payload = {
      action: "add",
      user_id: props.user_id,
      email: searchText,
    };

    console.log("payload -->", payload);

    UserParentLinking(payload)
      .then((response) => {
        mutate(USER_ENDPOINT, APIFetcher(USER_ENDPOINT), false);
        setButtonLoader(false);
        closeModal();
      })
      .catch((error) => {
        console.log(error);
        setButtonLoader(false);
      });
  };

  const removeParentUnderUser = () => {
    setButtonLoader(true);
    const payload = {
      action: "remove",
      user_id: props.user_id,
      email: deleteParentEmail,
    };

    UserParentLinking(payload)
      .then((response) => {
        mutate(USER_ENDPOINT, APIFetcher(USER_ENDPOINT), false);
        setButtonLoader(false);
        closeDeleteModal();
      })
      .catch((error) => {
        console.log(error);
        setButtonLoader(false);
      });
  };

  return (
    <div>
      <div className="user-resource-detail">
        <div className="user-resource-header">
          <div className="title">Add Parents</div>
          <div className="toggle" onClick={openModal}>
            <Plus />
          </div>
        </div>

        <div>
          {currentUser &&
            currentUser.linked_items &&
            currentUser.linked_items.parents &&
            currentUser.linked_items.parents.length > 0 &&
            currentUser.linked_items.parents.map((data: any, index: any) => (
              <div
                key={`user-resource-content-list-view-${index}`}
                className="user-resource-content-list-view"
              >
                <div className="title d-flex align-content-center flex-wrap" style={{ gap: "6px" }}>
                  <div>{data}</div>
                </div>
                <div className="icon" onClick={() => openDeleteModal(data)}>
                  <Times />
                </div>
              </div>
            ))}
        </div>

        <Modal show={modal} onHide={closeModal} centered backdrop={"static"}>
          <Modal.Body>
            <Form onSubmit={addParentModalSubmit}>
              <h5 className="mb-3">Add parent</h5>
              <div className="mb-3">
                {previewToggle && (
                  <div className="user-resource-detail border-0 p-0 m-0">
                    <div className="search-container m-0">
                      <div className="user-resource-search-container">
                        <div className="text-secondary mb-2">parent Email</div>
                        <Form.Control
                          type="email"
                          placeholder="Enter Parent Email"
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
                                onClick={() => addSearchUserEmailToEmail(data.email)}
                              >
                                <div className="title">
                                  {data.email}({data.username})
                                </div>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <Button
                variant="outline-primary"
                className="btn-sm"
                style={{ marginRight: "10px" }}
                disabled={buttonLoader}
                type="submit"
              >
                {buttonLoader ? "Processing..." : "Confirm"}
              </Button>
              <Button
                variant="outline-secondary"
                className="btn-sm"
                disabled={buttonLoader}
                onClick={closeModal}
              >
                Close
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

        <Modal show={deleteModal} onHide={closeDeleteModal} centered backdrop={"static"}>
          <Modal.Body>
            <h5 className="mb-3">Do you want to delete the Parent.</h5>
            <Button
              variant="outline-primary"
              className="btn-sm"
              style={{ marginRight: "10px" }}
              disabled={buttonLoader}
              onClick={removeParentUnderUser}
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
    </div>
  );
};

export default UserParentModal;
