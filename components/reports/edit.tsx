import React from "react";
// react bootstrap
import { Button, Form, Modal } from "react-bootstrap";
// swr
import { mutate } from "swr";
// components
import ReportsForm from "./reportsForm";
// api routes
import { USER_REPORTS_WITH_USER_ID_ENDPOINT } from "@constants/routes";
// api services
import { ReportEdit } from "@lib/services/report.service";

const ReportEditView = (props: any) => {
  const [modal, setModal] = React.useState(false);
  const closeModal = () => setModal(false);
  const openModal = () => setModal(true);

  const [buttonLoader, setButtonLoader] = React.useState<any>(false);

  const [reportData, setReportData] = React.useState<any>();
  const handleReportData = (value: any) => {
    setReportData(value);
  };

  React.useEffect(() => {
    if (props.data) {
      setReportData({
        ...reportData,
        content: props.data.report.content ? props.data.report.content : "",
      });
    }
  }, [props.data]);

  const reportUpdate = (event: any) => {
    event.preventDefault();
    setButtonLoader(true);

    const payload = {
      id: props.data.id,
      report: {
        content: reportData.content,
      },
    };

    ReportEdit(payload)
      .then((res) => {
        mutate(
          USER_REPORTS_WITH_USER_ID_ENDPOINT(props.user),
          async (elements: any) => {
            let index = elements.findIndex((mutateData: any) => mutateData.id === res.id);
            return elements.map((oldElement: any, i: Number) => (i === index ? res : oldElement));
            // return elements.filter((oldElement: any, i) => i != index);
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
      <Button variant="outline-secondary" className="btn-sm" onClick={openModal}>
        Edit
      </Button>

      <Modal show={modal} onHide={closeModal} centered backdrop={"static"}>
        <Modal.Body>
          <h5>Update Delete</h5>
          <Form onSubmit={reportUpdate}>
            {reportData && (
              <div>
                <ReportsForm data={reportData} handleData={handleReportData} />
                <Button
                  variant="outline-primary"
                  className="btn-sm"
                  type="submit"
                  style={{ marginRight: "10px" }}
                  disabled={buttonLoader}
                >
                  {buttonLoader ? "Updating Report..." : "Update Report"}
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
    </>
  );
};

export default ReportEditView;
