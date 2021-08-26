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

const ReportStatusView = (props: any) => {
  const [reportData, setReportData] = React.useState<any>();
  const handleReportData = (value: any) => {
    setReportData(value);
    reportUpdate(value);
  };

  React.useEffect(() => {
    if (props.data) {
      setReportData(props.data.is_approved ? props.data.is_approved : false);
    }
  }, [props.data]);

  const reportUpdate = (approved: any) => {
    const payload = {
      id: props.data.id,
      is_approved: approved,
    };

    ReportEdit(payload)
      .then((res) => {
        mutate(
          USER_REPORTS_WITH_USER_ID_ENDPOINT(props.user),
          async (elements: any) => {
            let index = elements.findIndex((mutateData: any) => mutateData.id === res.id);
            return elements.map((oldElement: any, i: Number) => (i === index ? res : oldElement));
          },
          false
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Form.Group controlId="report-status">
        <Form.Check
          type="checkbox"
          id="report-status-check"
          label={reportData ? ` Un Publish` : ` Waiting to Publish`}
          value={reportData}
          checked={reportData}
          onChange={() => handleReportData(!reportData)}
        />
      </Form.Group>
    </>
  );
};

export default ReportStatusView;
