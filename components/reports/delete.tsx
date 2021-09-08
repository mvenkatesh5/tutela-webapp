import React from "react";
// react bootstrap
import { Button, Form, Modal } from "react-bootstrap";
// material icons
import { Delete } from "@styled-icons/material/Delete";
// swr
import { mutate } from "swr";
// api routes
import { USER_REPORTS_WITH_USER_ID_ENDPOINT } from "@constants/routes";
// api services
import { ReportDelete } from "@lib/services/report.service";

const ReportDeleteView = (props: any) => {
  const [modal, setModal] = React.useState(false);
  const closeModal = () => setModal(false);
  const openModal = () => setModal(true);

  const [buttonLoader, setButtonLoader] = React.useState<any>(false);

  const reportDelete = (event: any) => {
    event.preventDefault();
    setButtonLoader(true);
    ReportDelete(props.data.id)
      .then((res) => {
        mutate(
          USER_REPORTS_WITH_USER_ID_ENDPOINT(props.user),
          async (elements: any) => {
            let index = elements.findIndex((mutateData: any) => mutateData.id === props.data.id);
            return elements.filter((oldElement: any, i: any) => i != index);
          },
          false
        );
        closeModal();
        setButtonLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setButtonLoader(false);
      });
  };

  return (
    <>
      <Button variant="outline-danger" className="btn-sm" onClick={openModal}>
        Delete
      </Button>

      <Modal size={"lg"} show={modal} onHide={closeModal} centered backdrop={"static"}>
        <Modal.Body>
          <h5>Report Delete</h5>
          <Form onSubmit={reportDelete}>
            <h6 className="mt-4 mb-4">Are you sure to delete this report</h6>
            <Button
              variant="outline-primary"
              className="btn-sm"
              type="submit"
              style={{ marginRight: "10px" }}
              disabled={buttonLoader}
            >
              {buttonLoader ? "Deleting Report..." : "Delete Report"}
            </Button>
            <Button variant="outline-secondary" className="btn-sm" onClick={closeModal}>
              Close
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Form></Form>
    </>
  );
};

export default ReportDeleteView;
