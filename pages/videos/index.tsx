import React from "react";
// next imports
import Link from "next/link";
// react bootstrap
import { Container, Table, Badge } from "react-bootstrap";
// swr
import useSWR, { mutate } from "swr";
// blueprint date range
import { DateRangeInput } from "@blueprintjs/datetime";
// blueprint css
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/datetime/lib/css/blueprint-datetime.css";
// components
// layouts
import StudentLayout from "@layouts/studentLayout";
// global imports
import { datePreview, returnDate, dateTimeFormat } from "@constants/global";
// api routes
import { USER_CALENDAR_SESSION_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";
// cookie
import { getAuthenticationToken } from "@lib/cookie";
// hoc
import withGlobalAuth from "@lib/hoc/withGlobalAuth";
// global context provider
import { globalContext } from "@contexts/global";
// components
import Page from "@components/page";
// constants
import { META_DESCRIPTION } from "@constants/page";

const VideoView = () => {
  const [globalState, globalDispatch] = React.useContext(globalContext);

  const [userRole, setUserRole] = React.useState<any>();
  const [tokenDetails, setTokenDetails] = React.useState<any>();
  React.useEffect(() => {
    if (getAuthenticationToken()) {
      let details: any = getAuthenticationToken();
      details = details ? JSON.parse(details) : null;
      if (details) {
        setTokenDetails(details);
        if (details.info.role === 2) setUserRole("admin");
        else if (details.info.role === 1) setUserRole("teacher");
        else setUserRole("student");
      }
    }
  }, []);

  const [currentDateQuery, setCurrentDateQuery] = React.useState<any>();
  const [startDate, setStartDate] = React.useState<any>();
  const [endDate, setEndDate] = React.useState<any>();
  const handleDateChange = (value: any) => {
    setStartDate(value[0]);
    setEndDate(value[1]);
  };
  React.useEffect(() => {
    let date: any = new Date();
    setStartDate(date);
    let newDate: any = new Date();
    newDate.setMonth(date.getMonth() + 1);
    setEndDate(newDate);
  }, []);

  React.useEffect(() => {
    if (startDate && endDate) {
      let currentRoute = `start_date=${returnDate(startDate)}&end_date=${returnDate(endDate)}`;
      if (userRole && userRole != "admin") {
        if (tokenDetails && tokenDetails.user && tokenDetails.user.id) {
          currentRoute = currentRoute + `&user_id=${tokenDetails.user.id}`;
        }
      }
      setCurrentDateQuery(currentRoute);
    }
  }, [startDate, endDate]);

  const disablePreviousDate = (date: any) => {
    var currentDate = new Date();
    var endDate = new Date(date);
    if (endDate >= currentDate) {
      return true;
    } else {
      return false;
    }
  };

  const { data: sessionList, error: sessionListError } = useSWR(
    currentDateQuery && currentDateQuery
      ? [
          USER_CALENDAR_SESSION_ENDPOINT(currentDateQuery && currentDateQuery),
          currentDateQuery && currentDateQuery,
        ]
      : null,
    (url) => APIFetcher(url),
    { refreshInterval: 5000 }
  );

  if (sessionListError) console.log(sessionListError);

  console.log(sessionList);

  const meta = {
    title: "Video",
    description: META_DESCRIPTION,
  };

  return (
    <Page meta={meta}>
    <div>
      <StudentLayout>
        <Container className="pt-3 pb-3">
          <h5 className="mb-3">My Videos</h5>
          <div>
            <small className="text-secondary">Select Date Range</small>
          </div>
          <DateRangeInput
            formatDate={(date) => date.toLocaleString()}
            onChange={handleDateChange}
            parseDate={(str) => new Date(str)}
            shortcuts={false}
            // minDate={new Date()}
            value={[startDate, endDate]}
          />
        </Container>
        {startDate && endDate ? (
          <>
            {!sessionList && !sessionListError ? (
              <div className="text-center tex-secondary mt- 5 mb-5">Loading.....</div>
            ) : (
              <Container>
                <Table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>
                        <div>Title</div>
                        <div>Description</div>
                      </th>
                      <th>
                        <div>Start Date</div>
                        <div>End Date</div>
                      </th>
                      <th>Status</th>
                      <th>Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {console.log(sessionList)}
                    {sessionList &&
                      sessionList.length > 0 &&
                      sessionList.map((session: any, index: any) => (
                        <tr key={`session-table-${index}`}>
                          <td>{index + 1}</td>
                          <td>
                            <div>{session.title}</div>
                            <small className="text-secondary">{session.description}</small>
                          </td>
                          <td>
                            <div className="text-secondary">
                              {dateTimeFormat(session.start_datetime)}
                            </div>
                            <div className="text-secondary">
                              {dateTimeFormat(session.end_datetime)}
                            </div>
                          </td>
                          <td>
                            {disablePreviousDate(session.end_datetime) ? (
                              <Badge className="bg-info">Not yet started!</Badge>
                            ) : (
                              <Badge className="bg-warning">Completed!</Badge>
                            )}
                          </td>
                          <td>
                            {session.recording_link ? (
                              <a
                                href={session.recording_link}
                                target="_blank"
                                className="btn btn-primary btn-sm"
                              >
                                Click here
                              </a>
                            ) : (
                              <Badge className="bg-warning">Not Available</Badge>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </Container>
            )}
          </>
        ) : (
          <div className="text-secondary text-center">Please select start date and end date</div>
        )}
      </StudentLayout>
    </div>
    </Page>
  );
};

export default withGlobalAuth(VideoView);
