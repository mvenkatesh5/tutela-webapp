import React from "react";
// react bootstrap
import { Form, Button, Modal } from "react-bootstrap";
// material icons
import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline";
// swr
import { mutate } from "swr";
// node operations
import { addNodeAsChild, addNodeAsSibling } from "./helpers/nodeOperations";
// api routes
import { RESOURCE_WITH_NODE_ENDPOINT } from "@constants/routes";
// api services
import { ResourceNodeOperation } from "@lib/services/resource.service";
import { APIFetcher } from "@lib/services";

const TreeCreate = (props: any) => {
  const [buttonLoader, setButtonLoader] = React.useState<any>(false);

  const [show, setShow] = React.useState(false);
  const handleClose = () => {
    setShow(false);
    setButtonLoader(false);
    setFormData({ ...formData, storeType: "children", name: "" });
  };
  const handleShow = () => setShow(true);

  const [formData, setFormData] = React.useState<any>({ storeType: "children", name: "" });
  const handleFormData = (key: any, value: any) => {
    setFormData({ ...formData, [key]: value });
  };

  const formSubmit = (event: any) => {
    event.preventDefault();
    setButtonLoader(true);
    createTree();
  };

  const createTree = () => {
    let payload: any = null;
    if (props.add_to === "children") {
      payload = addNodeAsChild(props.data.id, formData.name, "SECTION");
    } else {
      payload = addNodeAsSibling(props.data.id, "right", formData.name, "SECTION");
    }

    ResourceNodeOperation(payload)
      .then((response) => {
        setButtonLoader(false);
        mutate(
          RESOURCE_WITH_NODE_ENDPOINT(props.root_node_id),
          APIFetcher(RESOURCE_WITH_NODE_ENDPOINT(props.root_node_id)),
          false
        );
        handleClose();
      })
      .catch((error) => {
        console.log(error);
        setButtonLoader(false);
      });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Body>
          <div className="d-flex">
            <h5 className="m-0">Resource Create</h5>
            <div className="ms-auto" onClick={handleClose}>
              <CloseOutline width="20px" />
            </div>
          </div>

          <div className="mt-3">
            <Form onSubmit={formSubmit}>
              {/* <Form.Group controlId="tree-form-create.storeType" className="mb-2">
                <Form.Label>Add to</Form.Label>
                <Form.Control
                  as="select"
                  value={formData.storeType}
                  onChange={(e) => handleFormData("storeType", e.target.value)}
                >
                  <option value="children">sub category</option>
                  <option value="sibling">same level</option>
                </Form.Control>
              </Form.Group> */}
              <Form.Group controlId="tree-form-create.name" className="mb-2">
                <Form.Label>Category Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter category name"
                  required
                  value={formData.name}
                  onChange={(e) => handleFormData("name", e.target.value)}
                />
              </Form.Group>
              <Button
                variant="outline-primary"
                type="submit"
                className="btn-sm"
                disabled={buttonLoader}
              >
                {buttonLoader ? "Creating..." : "Create"}
              </Button>
            </Form>
          </div>
        </Modal.Body>
      </Modal>

      <div onClick={handleShow}>{props.children}</div>
    </>
  );
};

export default TreeCreate;
