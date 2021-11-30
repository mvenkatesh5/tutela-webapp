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
import { TestsUpdate } from "@lib/services/tests.service";

const TestsEditView = (props: any) => {
  const [buttonLoader, setButtonLoader] = React.useState<any>(false);
  const [modal, setModal] = React.useState(false);
  const closeModal = () => setModal(false);
  const openModal = () => setModal(true);

  const [formData, setFormData] = React.useState<any>();
  const handleFormData = (value: any) => {
    setFormData(value);
  };
  const handleFormKeyData = (key: any, value: any) => {
    setFormData({ ...formData, [key]: value });
  };

  React.useEffect(() => {
    if (props.data) {
      console.log(props.data);
      setFormData(props.data);
    }
  }, [props.data]);

  const testsUpdate = (event: any) => {
    event.preventDefault();
    setButtonLoader(true);
    TestsUpdate(formData)
      .then((res) => {
        setButtonLoader(false);
        mutate(
          TESTS_ENDPOINT,
          async (elements: any) => {
            let index = elements.findIndex((mutateData: any) => mutateData.id === res.id);
            return elements.map((oldElement: any, i: Number) => (i === index ? res : oldElement));
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
      <div onClick={openModal} className="test-modal-button edit">
        <div>Edit</div>
      </div>

      <Modal show={modal} onHide={closeModal} centered backdrop={"static"}>
        <Modal.Body>
          <Form onSubmit={testsUpdate}>
            {formData && (
              <div>
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
                  {buttonLoader ? "Processing..." : "Update Test"}
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

export default TestsEditView;
