import React from "react";
// react bootstrap
import { Button, Form, Modal } from "react-bootstrap";
// swr
import { mutate } from "swr";
// components
import TestsForm from "./testsForm";
import ProductDropdown from "./ProductDropdown";
// api routes
import { TESTS_ENDPOINT } from "@constants/routes";
// api services
import { TestsCreate } from "@lib/services/tests.service";

const TestsCreateView = (props: any) => {
  const [buttonLoader, setButtonLoader] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const closeModal = () => {
    setModal(false);
    setFormData({
      name: "",
      description: "",
      datetime: new Date(),
      product: "",
      data: {},
    });
  };
  const openModal = () => setModal(true);

  const [formData, setFormData] = React.useState({
    name: "",
    description: "",
    datetime: new Date(),
    product: "",
    data: {},
  });
  const handleFormData = (value: any) => {
    setFormData(value);
  };
  const handleFormKeyData = (key: any, value: any) => {
    setFormData({ ...formData, [key]: value });
  };

  const testsCreate = (event: any) => {
    event.preventDefault();
    setButtonLoader(true);
    TestsCreate(formData)
      .then((res) => {
        setButtonLoader(false);
        mutate(
          TESTS_ENDPOINT,
          async (elements: any) => {
            return [...elements, res];
          },
          false
        );
        closeModal();
      })
      .catch((errors) => {
        setButtonLoader(false);
        console.log(errors);
      });
  };

  return (
    <div>
      <Button variant="primary" className="btn-sm" onClick={openModal}>
        Add Test
      </Button>

      <Modal show={modal} onHide={closeModal} centered backdrop={"static"}>
        <Modal.Body>
          <Form onSubmit={testsCreate}>
            <TestsForm data={formData} handleData={handleFormData} />
            <ProductDropdown
              data={formData}
              products={props.products}
              handleData={handleFormKeyData}
            />
            <Button
              variant="outline-primary"
              className="btn-sm"
              type="submit"
              style={{ marginRight: "10px" }}
              disabled={buttonLoader}
            >
              {buttonLoader ? "Processing..." : "Create Test"}
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

export default TestsCreateView;
