import React from "react";
// react bootstrap
import { Button, Form } from "react-bootstrap";
// swr
import { mutate } from "swr";
// api services
import { SessionReport } from "@lib/services/session-report.service";

const ReportCard = ({ product, report, mutate_url }: any) => {
  const [formData, setFormData] = React.useState<any>();
  const handleFormData = (key: any, value: any) => {
    setFormData({ ...formData, [key]: value });
  };
  React.useEffect(() => {
    let data: any = {};
    if (report?.report_details && report?.report_details?.data) {
      Object.keys(report?.report_details?.data).map((item: any) => {
        data[generateKey(item)] = report?.report_details?.data[item];
      });
    }

    setFormData((prevData: any) => {
      return { ...prevData, ...data };
    });
  }, [report]);

  const generateKey = (str: any) => {
    return str.replace(/\s+/g, "_").toLowerCase();
  };

  const [loader, setLoader] = React.useState(false);
  const onSubmit = () => {
    setLoader(true);

    const payload = {
      id: report.id,
      report_details: {
        data: formData,
      },
      is_submitted: true,
    };

    console.log("payload", payload);

    SessionReport.edit(payload)
      .then((response) => {
        setLoader(false);
        mutate(
          mutate_url,
          async (elements: any) => {
            let updatedElements =
              elements && elements.reports.length > 0
                ? elements.reports.map((oldElement: any, i: any) =>
                    oldElement.id === response.id ? { ...oldElement, ...payload } : oldElement
                  )
                : elements.reports;
            return { reports: updatedElements };
          },
          false
        );
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <>
      {/* header */}
      <div className="tw-border-0 tw-border-b tw-border-solid tw-border-gray-300 tw-flex tw-items-center tw-gap-2 tw-py-1.5 tw-px-2">
        <div className="tw-font-medium">{report?.resource_detail?.title}</div>
        <div
          className={`tw-text-xs tw-font-medium tw-uppercase tw-rounded-sm tw-p-1 tw-py-0.5 tw-bg-opacity-50 ${
            report?.is_submitted
              ? ` tw-bg-green-300 tw-text-green-800`
              : ` tw-bg-red-300 tw-text-red-908`
          }`}
        >
          Report {report?.is_submitted ? "Completed" : "Pending"}
        </div>
        <div className="tw-ml-auto tw-text-xs tw-font-medium tw-uppercase tw-bg-gray-500 tw-text-white tw-rounded-sm tw-p-1 tw-py-0.5">
          {report?.resource_detail?.kind}
        </div>
        <div
          className="tw-text-xs tw-font-medium tw-uppercase tw-text-white tw-rounded-sm tw-p-1 tw-py-0.5"
          style={{ backgroundColor: report?.resource_detail.tag_details?.color }}
        >
          {report?.resource_detail?.tag_details?.name}
        </div>
      </div>

      {/* content */}
      {product && product.resource_nodes && product.resource_nodes.length > 0 ? (
        <div className="tw-py-1.5 tw-px-2 tw-space-y-2 tw-overflow-hidden">
          {product?.report_schema?.data.map((schema: any, index: any) => (
            <div key={`${index}-${schema.key}`}>
              <Form.Group>
                <Form.Label id={`${index}-${schema.key}`} className="mb-1 text-muted">
                  {schema.name}
                </Form.Label>
                {schema?.type === "input" ? (
                  <Form.Control
                    id={`${index}-${schema.key}`}
                    type="text"
                    required
                    value={formData && formData[generateKey(schema.name)]}
                    onChange={(e) => handleFormData(generateKey(schema.name), e.target.value)}
                  />
                ) : (
                  <Form.Control
                    as="textarea"
                    rows={3}
                    required
                    value={formData && formData[generateKey(schema.name)]}
                    onChange={(e) => handleFormData(generateKey(schema.name), e.target.value)}
                  />
                )}
              </Form.Group>
            </div>
          ))}

          <Button disabled={loader} type="button" className="btn-sm" onClick={onSubmit}>
            {loader ? "Processing..." : "Save Report"}
          </Button>
        </div>
      ) : (
        <div className="text-sm text-muted text-center">No Product resources is not available.</div>
      )}
    </>
  );
};

export default ReportCard;
