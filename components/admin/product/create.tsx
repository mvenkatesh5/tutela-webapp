import React from "react";
// react bootstrap
import { Button, Form, Modal } from "react-bootstrap";
// swr
import { mutate } from "swr";
// components
import ProductsForm from "./productsForm";
// components
import SearchCheckboxView from "components/admin/sessions/SearchCheckbox";
import ResourceSearchCheckboxView from "components/resources/ResourceCheckbox";
// api routes
import { PRODUCTS_ENDPOINT } from "@constants/routes";
// api services
import { ProductsCreate } from "@lib/services/productsService";

const ProductsCreateView = (props: any) => {
  const [modal, setModal] = React.useState(false);
  const closeModal = () => {
    setModal(false);
    setFormData({
      name: "",
      description: "",
      color: "#000000",
      data: {},
      subjects: [],
    });
  };
  const openModal = () => setModal(true);

  const [buttonLoader, setButtonLoader] = React.useState<any>(false);

  const [formData, setFormData] = React.useState({
    name: "",
    description: "",
    color: "#000000",
    data: {},
    subjects: [],
  });
  const handleFormData = (value: any) => {
    setFormData(value);
  };

  const [sessionTeachers, setSessionTeachers] = React.useState<any>();
  const handleSessionTeachers = (value: any) => {
    setSessionTeachers(value);
  };
  const [sessionStudents, setSessionStudents] = React.useState<any>();
  const handleSessionStudents = (value: any) => {
    setSessionStudents(value);
  };
  const [productResources, setProductResources] = React.useState<any>();
  const handleProductResources = (value: any) => {
    setProductResources(value);
  };

  const productsCreate = (event: any) => {
    event.preventDefault();
    handleUsers();
    // setButtonLoader(true);
    // ProductsCreate(formData)
    //   .then((res) => {
    //     mutate(
    //       PRODUCTS_ENDPOINT,
    //       async (elements: any) => {
    //         return [...elements, res];
    //       },
    //       false
    //     );
    //     closeModal();
    //     setButtonLoader(false);
    //   })
    //   .catch((errors) => {
    //     console.log(errors);
    //     setButtonLoader(false);
    //   });
  };

  const handleUsers = () => {
    console.log("sessionTeachers-->", sessionTeachers);
    console.log("sessionStudents-->", sessionStudents);
    console.log("productResources-->", productResources);
  };

  return (
    <div>
      <Button variant="primary" className="btn-sm" onClick={openModal}>
        Add Product
      </Button>

      <Modal show={modal} size={"lg"} onHide={closeModal} centered backdrop={"static"}>
        <Modal.Body>
          <h5>Product Create</h5>
          <Form onSubmit={productsCreate}>
            <ProductsForm data={formData} handleData={handleFormData} />
            {props.users && props.users.length > 0 && (
              <>
                <div className="mb-3 mt-3">
                  <Form.Label>Teachers</Form.Label>
                  <SearchCheckboxView
                    users={props.users}
                    data={sessionTeachers}
                    handleData={handleSessionTeachers}
                    role={1}
                  />
                </div>
                <div className="mb-3">
                  <Form.Label>Users</Form.Label>
                  <SearchCheckboxView
                    users={props.users}
                    data={sessionStudents}
                    handleData={handleSessionStudents}
                    role={0}
                  />
                </div>
                <div className="mb-3">
                  <Form.Label>Resources</Form.Label>
                  <ResourceSearchCheckboxView
                    resources={props.resources}
                    data={productResources}
                    handleData={handleProductResources}
                  />
                </div>
              </>
            )}
            <Button
              variant="outline-primary"
              className="btn-sm"
              type="submit"
              style={{ marginRight: "10px" }}
              disabled={buttonLoader}
            >
              {buttonLoader ? "Creating..." : "Create"}
            </Button>
            <Button variant="outline-secondary" className="btn-sm" onClick={closeModal}>
              Close
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Form></Form>
    </div>
  );
};

export default ProductsCreateView;
