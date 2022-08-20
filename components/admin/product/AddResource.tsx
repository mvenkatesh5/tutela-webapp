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
import { PRODUCTS_WITH_ID_ENDPOINT } from "@constants/routes";
// api services
import {
  ProductsCreate,
  AddUserUnderProductPromise,
  AddResourceUnderProductPromise,
} from "@lib/services/productsService";
import { ProductsUpdate } from "@lib/services/productsService";

const AddResourceModal = ({ product, resources }: any) => {
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
  React.useEffect(() => {
    if (product && product?.resource_nodes) {
      setProductResources(product?.resource_nodes);
    }
  }, [product]);

  const handleResources = (event: any) => {
    event.preventDefault();

    setButtonLoader(true);
    if (productResources && productResources.length > 0) {
      console.log("productResources", productResources);

      const productPayload = {
        id: product?.id,
        resource_nodes: productResources,
      };

      ProductsUpdate(productPayload)
        .then((res) => {
          mutate(
            PRODUCTS_WITH_ID_ENDPOINT(product?.id),
            async (elements: any) => {
              return res;
            },
            false
          );
          closeModal();
          setButtonLoader(false);
        })
        .catch((errors) => {
          console.log(errors);
          setButtonLoader(false);
        });
    } else {
      alert("Please select at least one resource.");
    }
  };

  return (
    <>
      <Button onClick={openModal} className="btn btn-primary flex-shrink-0">
        Add Resource
      </Button>

      <Modal show={modal} onHide={closeModal} closeButton centered backdrop={"static"}>
        <Modal.Body>
          <div className="d-flex justify-content-between">
            <h5 className="mb-3">Add Resources</h5>
            <Button variant="" className="btn-sm text-muted" onClick={closeModal}>
              <CloseOutline width="20px" />
            </Button>
          </div>

          <Form onSubmit={handleResources}>
            {resources && resources.length > 0 && (
              <Form.Group className="my-4">
                <Form.Label className="mb-1 text-muted d-flex gap-2">Select Resources</Form.Label>
                <ResourceSearchCheckboxView
                  resources={resources}
                  data={productResources}
                  handleData={handleProductResources}
                />
              </Form.Group>
            )}

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
