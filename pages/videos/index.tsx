import React from "react";
// next imports
import Link from "next/link";
// react bootstrap
import { Container, Table, Form, Tab, Nav } from "react-bootstrap";
// swr
import useSWR, { mutate } from "swr";
// blueprint date range
import { DateRangeInput } from "@blueprintjs/datetime";
// components
// layouts
import StudentLayout from "@layouts/studentLayout";
// global imports
import { datePreview } from "@constants/global";
// api routes
import { USER_ENDPOINT, USER_MESSAGE_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher, APIUpdater } from "@lib/services";
// hoc
import withGlobalAuth from "@lib/hoc/withGlobalAuth";
// global context provider
import { globalContext } from "@contexts/global";

const VideoView = () => {
  const [globalState, globalDispatch] = React.useContext(globalContext);

  const [startDate, setStartDate] = React.useState<any>();
  const [endDate, setEndDate] = React.useState<any>();
  const handleDateChange = (value: any) => {
    setStartDate(value[0]);
    setEndDate(value[1]);
  };

  // const { data: userList, error: userListError } = useSWR(USER_ENDPOINT, APIFetcher, {
  //   refreshInterval: 0,
  // });

  // const { data: messages, error: messagesError } = useSWR(
  //   userList ? `${USER_MESSAGE_ENDPOINT}?is_actionable=true` : null,
  //   (url) => APIFetcher(url),
  //   {
  //     refreshInterval: 0,
  //   }
  // );

  // if (messagesError) console.log(messagesError);

  return (
    <div>
      <StudentLayout>
        <Container>
          <h5>My Videos</h5>
          <DateRangeInput
            formatDate={(date) => date.toLocaleString()}
            onChange={handleDateChange}
            parseDate={(str) => new Date(str)}
            shortcuts={false}
            minDate={new Date()}
            value={[startDate, endDate]}
          />
        </Container>
        {/* {!messages ? (
            <div className="text-center mt- 5 mb-5">Loading.....</div>
          ) : (
            <Container></Container>
          )} */}
      </StudentLayout>
    </div>
  );
};

export default withGlobalAuth(VideoView);
