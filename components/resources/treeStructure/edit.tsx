import React from "react";
// react bootstrap
import { Form, Button, Modal } from "react-bootstrap";
// swr
import { mutate } from "swr";
// api routes
import { RESOURCE_WITH_NODE_ENDPOINT, RESOURCE_ENDPOINT } from "@constants/routes";
// api services
import { ResourceNodeEdit } from "@lib/services/resource.service";
import { APIFetcher } from "@lib/services";

const ResourceEdit = (props: any) => {
  const [buttonLoader, setButtonLoader] = React.useState<any>(false);

  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formData, setFormData] = React.useState<any>({ title: "" });
  const handleFormData = (key: any, value: any) => {
    setFormData({ ...formData, [key]: value });
  };
  React.useEffect(() => {
    if (props.data) {
      setFormData({ ...formData, title: props.data.data.title ? props.data.data.title : "" });
    }
  }, [props.data]);

  const formSubmit = (event: any) => {
    event.preventDefault();
    setButtonLoader(true);
    updateResource();
  };

  const updateResource = () => {
    const payload = { id: props.data.id, title: formData.title };

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
          <h5 className="m-0">Tree Node Edit</h5>
          <hr />
          <div>
            <Form onSubmit={formSubmit}>
              <Form.Group controlId="tree-form-create.name" className="mb-2">
                <Form.Label>Category Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter category name"
                  required
                  value={formData.title}
                  onChange={(e) => handleFormData("title", e.target.value)}
                />
              </Form.Group>
              <Button variant="outline-secondary" onClick={handleClose} className="btn-sm me-2">
                Close
              </Button>
              <Button
                variant="outline-primary"
                type="submit"
                className="btn-sm"
                disabled={buttonLoader}
              >
                {buttonLoader ? "Updating..." : "Update"}
              </Button>
            </Form>
          </div>
        </Modal.Body>
      </Modal>

      <div onClick={handleShow}>{props.children}</div>
    </>
  );
};

export default ResourceEdit;
