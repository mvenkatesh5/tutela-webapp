import React from "react";
// next imports
import { useRouter } from "next/router";
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
  const router = useRouter();

  const [modal, setModal] = React.useState(false);
  const closeModal = () => setModal(false);
  const openModal = () => setModal(true);

  const [buttonLoader, setButtonLoader] = React.useState<any>(false);

  const [reportData, setReportData] = React.useState<any>();
  const handleReportData = (value: any) => {
    setReportData(value);
  };
  const handleSlateData = (key: any, value: any) => {
    setReportData({ ...reportData, [key]: value });
  };

  React.useEffect(() => {
    if (props.data) {
      setReportData({
        ...reportData,
        title: props.data.title ? props.data.title : "",
        content: props.data.report.content ? props.data.report.content : "",
        performance: props?.data?.performance?.content ? props?.data?.performance?.content : "",
        behavior: props?.data?.behavior?.content ? props?.data?.behavior?.content : "",
        syllabus: props?.data?.syllabus?.content ? props?.data?.syllabus?.content : "",
        test_details:
          props?.data?.report && props?.data?.report?.test_details
            ? props?.data?.report?.test_details
            : [],
      });
    }
  }, []);

  const reportUpdate = (event: any) => {
    event.preventDefault();
    setButtonLoader(true);

    const payload = {
      id: props.data.id,
      title: reportData.title,
      general: { content: reportData.content },
      performance: { content: reportData.performance },
      syllabus: { content: reportData.syllabus },
      behavior: { content: reportData.behavior },
      report: {
        content: reportData.content,
        test_details: reportData.test_details,
      },
    };

    console.log(payload);

    ReportEdit(payload)
      .then((res) => {
        router.push(`/user-report/${props.user}/${props.product}/reports`);
        // mutate(
        //   USER_REPORTS_WITH_USER_ID_ENDPOINT(props.user),
        //   async (elements: any) => {
        //     let index = elements.findIndex((mutateData: any) => mutateData.id === res.id);
        //     return elements.map((oldElement: any, i: Number) => (i === index ? res : oldElement));
        //     // return elements.filter((oldElement: any, i) => i != index);
        //   },
        //   false
        // );
        // closeModal();
        setButtonLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setButtonLoader(false);
      });
  };

  return (
    <div className="container">
      <h5>Update Report</h5>
      <Form onSubmit={reportUpdate}>
        {reportData && (
          <div>
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
              {buttonLoader ? "Updating Report..." : "Update Report"}
            </Button>
          </div>
        )}
      </Form>
    </div>
  );
};

export default ReportEditView;
