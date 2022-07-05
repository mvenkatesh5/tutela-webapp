import React, { Fragment } from "react";
// next imports
import Link from "next/link";
import {useRouter} from "next/router";
// icons
import { PeopleTeam } from "@styled-icons/fluentui-system-filled/PeopleTeam";
import { FileTextOutline } from "@styled-icons/evaicons-outline/FileTextOutline";
import { Book } from "@styled-icons/fluentui-system-filled/Book";
// react-bootstrap
import { Button, Row, Col, Form } from "react-bootstrap";
// components
import SearchCheckboxView from "components/admin/sessions/SearchCheckbox";
import ResourceSearchCheckboxView from "components/resources/ResourceCheckbox";
// constants
import { META_DESCRIPTION } from "@constants/page";
// swr
import useSWR from "swr";
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
import { APIFetcher } from "@lib/services";
// components
import Page from "@components/page";
// layouts
import AdminLayout from "@layouts/adminLayout";
// api services
import {
  ProductsCreate,
  AddUserUnderProductPromise,
  AddResourceUnderProductPromise,
} from "@lib/services/productsService";
// hoc
import withAdminAuth from "@lib/hoc/withAdminAuth";

const ProductCreatePage = () => {
  const meta = {
    title: "Product",
    description: META_DESCRIPTION,
  };
  const router = useRouter();
  const { data: usersList, error: usersListError } = useSWR(USER_ENDPOINT, APIFetcher);
  const { data: resourcesList, error: resourcesListError } = useSWR(RESOURCE_ENDPOINT, APIFetcher);


  const [buttonLoader, setButtonLoader] = React.useState<any>(false);

  const [formData, setFormData] = React.useState({
    name: "",
    description: "",
    color: "#000000",
    data: {},
    subjects: [],
  });
  const handleFormData = (key: any, value: any) => {
    setFormData({ ...formData, [key]: value });
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
        router.push("/products");
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
  };

  return (
    <Page meta={meta}>
      <AdminLayout>
        <Form className="w-100 p-3" onSubmit={productsCreate}>
          <div className="container mx-auto mt-5">
            <h3>Create Product</h3>
            <Row className="mt-5">
              <Col md={6} className="">
                <div className="text-primary w-100 border-bottom fw-bold pb-2">Product Details</div>
                <div className="my-4 d-flex flex-column">
                  <Form.Label className="mb-1 text-muted">Color</Form.Label>
                  <Form.Control
                    className="p-1"
                    type="color"
                    value={formData.color}
                    onChange={(e) => handleFormData("color", e.target.value)}
                    required
                  />
                </div>
                <Form.Group className="my-4">
                  <Form.Label className="mb-1 text-muted">Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleFormData("name", e.target.value)}
                    required
                  />{" "}
                </Form.Group>
                <Form.Group className="my-4">
                  <Form.Label className="mb-1 text-muted">Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={formData.description}
                    onChange={(e) => handleFormData("description", e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="my-4">
                  <Form.Label className="mb-1 text-muted d-flex gap-2">
                    <Book size={20} />
                    Subject
                  </Form.Label>{" "}
                  <Form.Control type="text" required />
                </Form.Group>
              </Col>
              <Col md={6} className="">
                <div className="text-primary w-100 border-bottom fw-bold pb-2">
                  Members & Resources
                </div>

                {usersList && usersList.length > 0 && (
                  <>
                    <Form.Group className="my-4">
                      <Form.Label className="mb-1 text-muted d-flex gap-2">
                        <PeopleTeam size={20} />
                        Members
                      </Form.Label>
                      <SearchCheckboxView
                        users={usersList}
                        data={sessionStudents}
                        handleData={handleSessionStudents}
                        role={0}
                        validInput={usersList.length}
                      />
                    </Form.Group>

                    <Form.Group className="my-4">
                      <Form.Label className="mb-1 text-muted d-flex gap-2">
                        <PeopleTeam size={20} />
                        Teachers
                      </Form.Label>
                      <SearchCheckboxView
                        users={usersList}
                        data={sessionTeachers}
                        handleData={handleSessionTeachers}
                        role={1}
                        validInput={usersList.length}
                      />
                    </Form.Group>
                  </>
                )}

                {resourcesList && resourcesList.length > 0 && (
                  <Form.Group className="my-4">
                    <Form.Label className="mb-1 text-muted d-flex gap-2">
                      <FileTextOutline size={20} />
                      Resources
                    </Form.Label>
                    <ResourceSearchCheckboxView
                      resources={resourcesList}
                      data={productResources}
                      handleData={handleProductResources}
                    />{" "}
                  </Form.Group>
                )}
              </Col>
            </Row>
            <div className="d-flex justify-content-end d-flex gap-3">
              <Link href="/products">
                <a>
                  <Button variant="outline-secondary">Cancel</Button>
                </a>
              </Link>
              <Button type="submit" variant="primary">
                Create Product
              </Button>
            </div>
          </div>
        </Form>
      </AdminLayout>
    </Page>
  );
};

export default withAdminAuth(ProductCreatePage);
