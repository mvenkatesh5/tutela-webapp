import React from "react";
// react bootstrap
import { Button, Form, Modal } from "react-bootstrap";
// swr
import { mutate } from "swr";
// components
import TestsForm from "./testsForm";
// api routes
import { TESTS_ENDPOINT } from "@constants/routes";
// api services
import { TestsDelete } from "@lib/services/tests.service";

const TestsEditView = (props: any) => {
  const [buttonLoader, setButtonLoader] = React.useState<any>(false);
  const [modal, setModal] = React.useState(false);
  const closeModal = () => setModal(false);
  const openModal = () => setModal(true);

  const testsUpdate = (event: any) => {
    event.preventDefault();
    setButtonLoader(true);
    TestsDelete(props.data.id)
      .then((res) => {
        setButtonLoader(false);
        mutate(
          TESTS_ENDPOINT,
          async (elements: any) => {
            let index = elements.findIndex((mutateData: any) => mutateData.id === props.data.id);
            return elements.filter((oldElement: any, i: any) => i != index);
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
      <div onClick={openModal} className="test-modal-button delete">
        <div>Delete</div>
      </div>

      <Modal show={modal} onHide={closeModal} centered backdrop={"static"}>
        <Modal.Body>
          <h5 className="mb-3">Are you sure you want to delete this test.</h5>
          <Form onSubmit={testsUpdate}>
            {props.data && (
              <div>
                <Button
                  variant="outline-danger"
                  className="btn-sm"
                  type="submit"
                  style={{ marginRight: "10px" }}
                  disabled={buttonLoader}
                >
                  {buttonLoader ? "Processing..." : "Delete Test"}
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
