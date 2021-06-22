import React from "react";
// react bootstrap
import { Form, Button, Modal } from "react-bootstrap";
// swr
import { mutate } from "swr";
// node operations
import { deleteNode } from "./helpers/nodeOperations";
// api routes
import { RESOURCE_WITH_NODE_ENDPOINT, RESOURCE_ENDPOINT } from "@constants/routes";
// api services
import { ResourceNodeEdit } from "@lib/services/resource.service";
import { APIFetcher } from "@lib/services";

const ResourcePermission = (props: any) => {
  const [buttonLoader, setButtonLoader] = React.useState<any>(false);

  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const formSubmit = (event: any) => {
    event.preventDefault();
    setButtonLoader(true);
    deleteResource();
  };

  const deleteResource = () => {
    const payload = { id: props.data.id, visible: !props.data.data.visible };
    ResourceNodeEdit(payload)
      .then((response) => {
        setButtonLoader(false);
        if (props.root_node_id)
          mutate(
            RESOURCE_WITH_NODE_ENDPOINT(props.root_node_id),
            APIFetcher(RESOURCE_WITH_NODE_ENDPOINT(props.root_node_id)),
            false
          );
        else mutate(RESOURCE_ENDPOINT, APIFetcher(RESOURCE_ENDPOINT), false);
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
          <h5 className="m-0">Resource Permission</h5>
          <hr />
          <div className="mt-3 mb-4">
            Are you sure to <strong>{props.data.data.visible ? "Disable" : "Enable"}</strong> the
            visibility of <strong>{props.data && props.data.data && props.data.data.title}</strong>
          </div>
          <div>
            <Form onSubmit={formSubmit}>
              <Button variant="outline-secondary" onClick={handleClose} className="btn-sm me-2">
                Close
              </Button>
              <Button
                variant="outline-primary"
                type="submit"
                className="btn-sm"
                disabled={buttonLoader}
              >
                {buttonLoader ? "Processing..." : props.data.data.visible ? "Disable" : "Enable"}
              </Button>
            </Form>
          </div>
        </Modal.Body>
      </Modal>

      <div onClick={handleShow}>{props.children}</div>
    </>
  );
};

export default ResourcePermission;
