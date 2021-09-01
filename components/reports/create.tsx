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
import { ReportCreate } from "@lib/services/report.service";

const ReportsCreateView = (props: any) => {
  const [modal, setModal] = React.useState(false);
  const closeModal = () => {
    setModal(false);
    setReportData({
      content: "",
      test_details: [],
    });
  };
  const openModal = () => setModal(true);

  const [buttonLoader, setButtonLoader] = React.useState<any>(false);

  const [reportData, setReportData] = React.useState({
    content: "",
    test_details: [],
  });
  const handleReportData = (value: any) => {
    setReportData(value);
  };

  console.log(reportData.test_details);

  const reportCreate = (event: any) => {
    event.preventDefault();
    setButtonLoader(true);
    const payload = {
      product: props.product,
      user: props.user,
      report: {
        content: reportData.content,
        test_details: reportData.test_details,
      },
      flags: props.view,
    };

    console.log(payload);

    ReportCreate(payload)
      .then((res) => {
        mutate(
          USER_REPORTS_WITH_USER_ID_ENDPOINT(props.user),
          async (elements: any) => {
            return [...elements, res];
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
  };

  return (
    <div>
      <Button variant="primary" className="btn-sm" onClick={openModal}>
        Add Report
      </Button>

      <Modal show={modal} size="xl" onHide={closeModal} centered backdrop={"static"}>
        <Modal.Body>
          <Form onSubmit={reportCreate}>
            <h5>
              Create Report in <strong className="text-primary">{props.view}</strong>.
            </h5>
            <ReportsForm data={reportData} handleData={handleReportData} />
            <Button
              variant="outline-primary"
              className="btn-sm"
              type="submit"
              style={{ marginRight: "10px" }}
              disabled={buttonLoader}
            >
              {buttonLoader ? "Creating Report..." : "Create Report"}
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

export default ReportsCreateView;
