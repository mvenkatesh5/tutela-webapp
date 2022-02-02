import React from "react";
// react bootstrap
import { useRouter } from "next/router";
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
  const router = useRouter();

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

  const [reportView, setReportView] = React.useState<any>("performance");
  React.useEffect(() => {
    if (props.view) {
      if (props.view === "overview") setReportView("performance");
      else setReportView(props.view);
    }
  }, [props.view]);

  const [reportData, setReportData] = React.useState<any>({
    title: "",
    test_details: [],
    content: null,
    performance: null,
    syllabus: null,
    behavior: null,
  });
  const handleReportData = (value: any) => {
    setReportData(value);
  };
  const handleSlateData = (key: any, value: any) => {
    setReportData({ ...reportData, [key]: value });
  };

  const reportCreate = (event: any) => {
    event.preventDefault();
    setButtonLoader(true);
    const payload = {
      product: props.product,
      user: props.user,
      title: reportData.title,
      general: { content: reportData.content },
      performance: { content: reportData.performance },
      syllabus: { content: reportData.syllabus },
      behavior: { content: reportData.behavior },
      report: {
        content: reportData.content,
        test_details: reportData.test_details,
      },
      flags: reportView,
    };

    ReportCreate(payload)
      .then((res) => {
        router.push(`/user-report/${props.user}/${props.product}/reports`);
        // mutate(
        //   USER_REPORTS_WITH_USER_ID_ENDPOINT(props.user),
        //   async (elements: any) => {
        //     return [...elements, res];
        //   },
        //   false
        // );
        // closeModal();
        setButtonLoader(false);
      })
      .catch((errors) => {
        setButtonLoader(false);
      });
  };

  return (
    <div className="container">
      <Form onSubmit={reportCreate}>
        <h5 className="mb-3">
          Create Report.
          {/* Create Report in <strong className="text-primary">{reportView}</strong>. */}
        </h5>

        {/* report view  */}
        {/* <Form.Group className="mb-3" controlId={`form-control-report-create`}>
          <Form.Label>Report view</Form.Label>
          <Form.Control
            as="select"
            required
            size="sm"
            className="mb-2"
            value={reportView}
            onChange={(e: any) => setReportView(e.target.value)}
          >
            <option value="performance">Performance</option>
            <option value="syllabus">Syllabus</option>
            <option value="behavior">Behavior</option>
          </Form.Control>
        </Form.Group> */}

        <ReportsForm
          data={reportData}
          handleData={handleReportData}
          handleSlateData={handleSlateData}
        />

        <Button
          variant="outline-primary"
          className="btn-sm"
          type="submit"
          style={{ marginRight: "10px" }}
          disabled={buttonLoader}
        >
          {buttonLoader ? "Creating Report..." : "Create Report"}
        </Button>
      </Form>
    </div>
  );
};

export default ReportsCreateView;
