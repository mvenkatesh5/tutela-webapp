// react bootstrap
import { Button, Badge } from "react-bootstrap";
// material icon
import { EventBusy } from "@styled-icons/material/EventBusy";
import { EventAvailable } from "@styled-icons/material/EventAvailable";
import { InfoCircle } from "@styled-icons/bootstrap/InfoCircle";
import { ExternalLink } from "@styled-icons/heroicons-solid/ExternalLink";
import { Link } from "@styled-icons/boxicons-regular/Link";
// global imports
import { datePreview } from "@constants/global";
// swr
import useSWR from "swr";
// layouts
import AdminLayout from "@layouts/adminLayout";
// hoc
import withAdminAuth from "@lib/hoc/withAdminAuth";
// api routes
import { ZOOM_ACCOUNT_STATUS_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";
// components
import Page from "@components/page";
// constants
import { META_DESCRIPTION } from "@constants/page";

const ZoomView = () => {
  const { data: zoomUserList, error: zoomUserListError } = useSWR(
    ZOOM_ACCOUNT_STATUS_ENDPOINT,
    APIFetcher
  );

  if (zoomUserListError) console.log(zoomUserListError);

  const meta = {
    title: "Zoom",
    description: META_DESCRIPTION,
  };

  return (
    <Page meta={meta}>
    <AdminLayout>
      <div className="right-layout">
        {!zoomUserList && !zoomUserListError ? (
          <div className="text-center mt- 5 mb-5">Loading.....</div>
        ) : (
          <div className="container mt-4">
            {!zoomUserList ? (
              <div className="text-center mt- 5 mb-5">Loading.....</div>
            ) : (
              <div className="card shadow mt-4">
                <div className="card-header bg-white fw-bold py-3">
                  <h4 className="m-0">Zoom User Status</h4>
                </div>
                <div className="card-body ">
                  {/* table start */}
                  <table className="table table-bordered mt-3" style={{ whiteSpace: "nowrap" }}>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Host Email</th>
                        <th>Status</th>
                        <th>Barge in URL</th>
                        <th>Participant URL</th>
                        <th>Topic</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Remaining Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {zoomUserList &&
                        zoomUserList.payload &&
                        zoomUserList.payload.length > 0 &&
                        zoomUserList.payload.map((key: any, index: any) => (
                          <tr key={index + "zoomKeys"}>
                            <td>{index + 1}</td>
                            <td>{key.data && key.data.host_email ? key.data.host_email : "-"}</td>
                            <td>
                              {key.status && key.status == "busy" ? (
                                <Badge
                                  pill
                                  variant="warning"
                                  style={{ width: "100%", backgroundColor: "#ffc107" }}
                                >
                                  <EventBusy style={{ height: "10px", width: "15px" }}></EventBusy>
                                  {key.status}
                                </Badge>
                              ) : (
                                <Badge
                                  pill
                                  variant="success"
                                  style={{ width: "100%", backgroundColor: "#28a745" }}
                                >
                                  <EventAvailable
                                    style={{ height: "10px", width: "15px" }}
                                  ></EventAvailable>
                                  Available
                                </Badge>
                              )}
                            </td>
                            <td className="text-center">
                              {key.data && key.data.start_url ? (
                                <a href={key.data.start_url} target="_blank">
                                  <Link style={{ width: "20px" }}></Link>
                                </a>
                              ) : (
                                "-"
                              )}
                            </td>
                            <td className="text-center">
                              {key.data && key.data.join_url ? (
                                <a href={key.data.join_url} target="_blank">
                                  <Link style={{ width: "20px" }}></Link>
                                </a>
                              ) : (
                                "-"
                              )}
                            </td>
                            <td>{key.data && key.data.topic ? key.data.topic : "-"}</td>
                            <td>
                              {key.data && key.data.start_time
                                ? datePreview(key.data.start_time)
                                : "-"}
                            </td>
                            <td>
                              {key.data && key.data.end_time ? datePreview(key.data.end_time) : "-"}
                            </td>
                            <td>{key.ttl && key.ttl === "inf" ? "-" : key.ttl}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
    </Page>
  );
};

export default withAdminAuth(ZoomView);
