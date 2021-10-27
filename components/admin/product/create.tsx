import React from "react";
// react bootstrap
import { Button, Form, Modal } from "react-bootstrap";
// swr
import { mutate } from "swr";
// components
import ProductsForm from "./productsForm";
import SearchCheckboxView from "components/admin/sessions/SearchCheckbox";
import ResourceSearchCheckboxView from "components/resources/ResourceCheckbox";
// api routes
import {
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
    setSessionTeachers("");
    setSessionStudents("");
    setProductResources("");
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

  const [sessionMentors, setSessionMentors] = React.useState<any>();
  const handleSessionMentors = (value: any) => {
    setSessionMentors(value);
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
    setButtonLoader(true);
    let payload: any = formData;
    // payload["mentor"] = sessionMentors[0];
    ProductsCreate(payload)
      .then((res) => {
        handleUsers(res);
      })
      .catch((errors) => {
        console.log(errors);
        setButtonLoader(false);
      });
  };

  const handleUsers = (product: any) => {
    setButtonLoader(true);
    let users: any = [];

    if (sessionTeachers && sessionTeachers.length > 0) {
      sessionTeachers.map((data: any) => {
        const payload = { user: data, as_user: "TEACHER" };
        users.push(payload);
      });
    }

    if (sessionStudents && sessionStudents.length > 0) {
      sessionStudents.map((data: any) => {
        const payload = { user: data, as_user: "STUDENT" };
        users.push(payload);
      });
    }

    if (users && users.length > 0) {
      AddUserUnderProductPromise(PRODUCT_USER_ENDPOINT(product.id), users)
        .then((response) => {
          handleMentors(product);
        })
        .catch((error) => {
          setButtonLoader(false);
          console.log(error);
        });
    } else {
      handleMentors(product);
      setButtonLoader(false);
    }
  };

  const handleMentors = (product: any) => {
    handleResources(product);
  };

  const handleResources = (product: any) => {
    setButtonLoader(true);
    if (productResources && productResources.length > 0) {
      let resources: any = [];
      productResources.map((data: any) => {
        const payload = { resource: data };
        resources.push(payload);
      });

      AddResourceUnderProductPromise(PRODUCT_RESOURCES_ENDPOINT(product.id), resources)
        .then((response) => {
          mutateProducts(product);
          setButtonLoader(false);
        })
        .catch((error) => {
          // console.log(error);
          setButtonLoader(false);
        });
    } else {
      mutateProducts(product);
      setButtonLoader(false);
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
    closeModal();
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
                  <Form.Label>Mentors</Form.Label>
                  <SearchCheckboxView
                    users={props.users}
                    data={sessionMentors}
                    handleData={handleSessionMentors}
                    role={1}
                    validInput={1}
                  />
                </div>
                {/* <div className="mb-3 mt-3">
                  <Form.Label>Teachers</Form.Label>
                  <SearchCheckboxView
                    users={props.users}
                    data={sessionTeachers}
                    handleData={handleSessionTeachers}
                    role={1}
                    validInput={props.users.length}
                  />
                </div> */}
                {/* <div className="mb-3">
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
