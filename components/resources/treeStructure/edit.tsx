import React from "react";
// react bootstrap
import { Form, Button, Modal } from "react-bootstrap";
// swr
import { mutate } from "swr";
// api services

const ResourceEdit = (props: any) => {
  const [buttonLoader, setButtonLoader] = React.useState<any>(false);

  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formData, setFormData] = React.useState<any>({ name: "" });
  const handleFormData = (key: any, value: any) => {
    setFormData({ ...formData, [key]: value });
  };
  React.useEffect(() => {
    setFormData({ ...formData, name: props.data.name ? props.data.name : "" });
  }, [props.data]);

  const formSubmit = (event: any) => {
    event.preventDefault();
    setButtonLoader(true);
    updateResource();
  };

  const updateResource = () => {
    const payload = props.data.id ? props.data.id : "";

    // DeleteTask(payload)
    //   .then((response) => {
    //     setButtonLoader(false);
    //     mutate(
    //       props.currentUrl,
    //       async (elements: any) => {
    //         let index = elements.findIndex((mutateData: any) => mutateData.id === payload);
    //         return elements.filter((_: any, i: any) => i != index);
    //       },
    //       false
    //     );
    //     handleClose();
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setButtonLoader(false);
    //   });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Body>
          <h5 className="m-0">Tree Node Edit</h5>
          <hr />
          <div>
            <Form onSubmit={formSubmit}>
              <Form.Group controlId="tree-form-create.name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter tree name"
                  required
                  value={formData.name}
                  onChange={(e) => handleFormData("name", e.target.value)}
                />
              </Form.Group>
              <Button variant="outline-secondary" onClick={handleClose} className="btn-sm mr-2">
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
