import React from "react";
// react bootstrap
import { Button, Form, Modal } from "react-bootstrap";
// material icons
import { MessageSquareEdit } from "@styled-icons/boxicons-regular/";
// swr
import { mutate } from "swr";
// components
import ProductsForm from "./productsForm";
import SearchCheckboxView from "components/admin/sessions/SearchCheckbox";
import ResourceSearchCheckboxView from "components/resources/ResourceCheckbox";
// api routes
import { PRODUCTS_ENDPOINT } from "@constants/routes";
// api services
import { ProductsUpdate } from "@lib/services/productsService";

const ProductsEditView = (props: any) => {
  const [modal, setModal] = React.useState(false);
  const closeModal = () => setModal(false);
  const openModal = () => setModal(true);

  const [buttonLoader, setButtonLoader] = React.useState<any>(false);

  const [formData, setFormData] = React.useState();
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

  React.useEffect(() => {
    if (props.data) {
      setFormData(props.data);
      if (props.data.users.length > 0) {
        let teachers: any = [];
        let students: any = [];
        props.data.users.map((data: any) => {
          let currentUser = props.users.find((element: any) => element.id === data);
          console.log(currentUser);
          if (currentUser) {
            if (currentUser.role === 1) {
              teachers.push(data);
            }
            if (currentUser.role === 0) {
              students.push(data);
            }
          }
        });
        if (teachers.length > 0) setSessionTeachers(teachers);
        if (students.length > 0) setSessionStudents(students);
      }
      if (props.data.resources.length > 0) {
        setProductResources(props.data.resources);
      }
    }
  }, [props.data]);

  const productsUpdate = (event: any) => {
    event.preventDefault();
    setButtonLoader(true);
    ProductsUpdate(formData)
      .then((res) => {
        mutate(
          PRODUCTS_ENDPOINT,
          async (elements: any) => {
            let index = elements.findIndex((mutateData: any) => mutateData.id === res.id);
            return elements.map((oldElement: any, i: Number) => (i === index ? res : oldElement));
            // return elements.filter((oldElement: any, i) => i != index);
          },
          false
        );
        closeModal();
        // handleUsers(res);
        setButtonLoader(false);
      })
      .catch((errors) => {
        console.log(errors);
        setButtonLoader(false);
      });
  };

  const handleUsers = (product: any) => {
    setButtonLoader(true);
    // mutateProducts(product);
    setButtonLoader(false);
  };

  const mutateProducts = (product: any) => {
    mutate(
      PRODUCTS_ENDPOINT,
      async (elements: any) => {
        let index = elements.findIndex((mutateData: any) => mutateData.id === product.id);
        return elements.map((oldElement: any, i: Number) => (i === index ? product : oldElement));
        // return elements.filter((oldElement: any, i) => i != index);
      },
      false
    );
    closeModal();
  };

  return (
    <div>
      <div className="content-item" onClick={openModal}>
        <div className="icon">
          <MessageSquareEdit />
        </div>
        <div className="text">Edit</div>
      </div>

      <Modal show={modal} size={"lg"} onHide={closeModal} centered backdrop={"static"}>
        <Modal.Body>
          <h5>Product Edit</h5>
          <Form onSubmit={productsUpdate}>
            {formData && (
              <div>
                <ProductsForm data={formData} handleData={handleFormData} />
                {props.users && props.users.length > 0 && (
                  <>
                    {/* <div className="mb-3 mt-3">
                      <Form.Label>Teachers</Form.Label>
                      <SearchCheckboxView
                        users={props.users}
                        data={sessionTeachers}
                        handleData={handleSessionTeachers}
                        role={1}
                        validInput={props.users.length}
                      />
                    </div>
                    <div className="mb-3">
                      <Form.Label>Users</Form.Label>
                      <SearchCheckboxView
                        users={props.users}
                        data={sessionStudents}
                        handleData={handleSessionStudents}
                        role={0}
                        validInput={props.users.length}
                      />
                    </div> */}
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
                  {buttonLoader ? "Updating..." : "Update"}
                </Button>
                <Button variant="outline-secondary" className="btn-sm" onClick={closeModal}>
                  Close
                </Button>
              </div>
            )}
          </Form>
        </Modal.Body>
      </Modal>
      <Form></Form>
    </div>
  );
};

export default ProductsEditView;
