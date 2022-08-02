import React from "react";
// react bootstrap
import { Button, Form, Modal } from "react-bootstrap";
// material icons
import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline";
import { FileTextOutline } from "@styled-icons/evaicons-outline/FileTextOutline";
// components
import ResourceSearchCheckboxView from "components/resources/ResourceCheckbox";
// swr
import { mutate } from "swr";
// api routes
import {
  USER_ENDPOINT,
  RESOURCE_ENDPOINT,
  PRODUCTS_ENDPOINT,
  PRODUCT_USER_ENDPOINT,
  PRODUCT_RESOURCES_ENDPOINT,
} from "@constants/routes";
// api services
import {
  ProductsCreate,
  AddUserUnderProductPromise,
  AddResourceUnderProductPromise,
} from "@lib/services/productsService";

const AddResourceModal = (props: any) => {
  const [modal, setModal] = React.useState(false);
  const closeModal = () => {
    setModal(false);
  };
  const openModal = () => setModal(true);

  const [buttonLoader, setButtonLoader] = React.useState(false);

  const [productResources, setProductResources] = React.useState<any>();
  const handleProductResources = (value: any) => {
    setProductResources(value);
  };

  const handleResources = () => {
    setButtonLoader(true);
    if (productResources && productResources.length > 0) {
      let resources: any = [];
      productResources.map((data: any) => {
        const payload = { resource: data };
        resources.push(payload);
      });

      AddResourceUnderProductPromise(PRODUCT_RESOURCES_ENDPOINT(props.product.id), resources)
        .then((response) => {
          mutateProducts(props.product);
          setButtonLoader(false);
          closeModal();
        })
        .catch((error) => {
          setButtonLoader(false);
        });
    } else {
      mutateProducts(props.product);
      setButtonLoader(false);
      closeModal();
    }
  };

  const mutateProducts = (product: any) => {
    mutate(
      PRODUCTS_ENDPOINT,
      async (elements: any) => {
        return [...elements, product];
      },
      false
    );
  };
  return (
    <>
      <Button onClick={openModal} className="btn btn-primary flex-shrink-0">
        Add Resource
      </Button>

      <Modal show={modal} onHide={closeModal} closeButton centered backdrop={"static"}>
        <Modal.Body>
          <div className="d-flex justify-content-between">
            <h5 className="mb-3">Add Topic Cluster</h5>
            <Button variant="" className="btn-sm text-muted" onClick={closeModal}>
              <CloseOutline width="20px" />
            </Button>
          </div>
          <Form onSubmit={handleResources}>
            {props.resources && props.resources.length > 0 && (
              <Form.Group className="my-4">
                <Form.Label className="mb-1 text-muted d-flex gap-2">Select Resources</Form.Label>
                <ResourceSearchCheckboxView
                  resources={props.resources}
                  data={props.productResources}
                  handleData={handleProductResources}
                />
              </Form.Group>
            )}
            {/* <Form.Group className="mb-3">
              <Form.Label className="mb-1 text-muted">Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={formData.comment}
                onChange={(e) => handleFromData("comment", e.target.value)}
                required
              />
            </Form.Group> */}
            <div className="d-flex justify-content-end">
              <Button variant="primary" className="btn-sm" type="submit" disabled={buttonLoader}>
                {buttonLoader ? "Adding..." : "Add Resources"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddResourceModal;
