import React from "react";
// react bootstrap
import { Form, Button, Modal } from "react-bootstrap";
// swr
import { mutate } from "swr";
// api routes
import { RESOURCE_ENDPOINT } from "@constants/routes";
// api services
import { ResourceCreate } from "@lib/services/resource.service";
import { APIFetcher } from "@lib/services";

const ResourceCreateView = (props: any) => {
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
    createResource();
  };

  const createResource = () => {
    let payload: any = {
      title: formData.name,
    };

    ResourceCreate(payload)
      .then((response) => {
        setButtonLoader(false);
        mutate(RESOURCE_ENDPOINT, APIFetcher(RESOURCE_ENDPOINT), false);
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
          <h5 className="m-0">Resource Create</h5>
          <hr />
          <div>
            <Form onSubmit={formSubmit}>
              <Form.Group controlId="resource-form-create.name" className="mb-2">
                <Form.Label>Resource Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter resource name"
                  required
                  value={formData.name}
                  onChange={(e) => handleFormData("name", e.target.value)}
                />
              </Form.Group>
              <Button variant="outline-secondary" onClick={handleClose} className="btn-sm  me-2">
                Close
              </Button>
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

export default ResourceCreateView;
