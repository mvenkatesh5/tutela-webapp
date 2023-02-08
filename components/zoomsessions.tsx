import React, { useState, useRef } from "react";
// next imports
import { useRouter } from "next/router";
// react bootstrap
import { Button, Badge, Dropdown } from "react-bootstrap";
// headless ui
import { Dialog } from "@headlessui/react";
// material icons
import { Description } from "@styled-icons/material-rounded";
import { AttachOutline } from "@styled-icons/evaicons-outline";
// swr
import { mutate } from "swr";
// components
import SessionTimer from "./sessionTimer";
// global imports
import { datePreview } from "@constants/global";
// api service
import { CreateZoomMeeting, SessionUpdate, SessionUserUpdate } from "@lib/services/sessionservice";
import { createChimeSession } from "@components/meet-chime/helpers/chime-session";
// api routes
import { SESSION_ENDPOINT } from "@constants/routes";
// global imports
import { getCurrentUser } from "@constants/global";
import Cookies from "js-cookie";

const ZoomSession = (props: any) => {
  // const router = useRouter();
  const [zoomData, setZoomData] = React.useState<any>();
  const [chimeData, setChimeData] = React.useState<any>();
  const [buttonLoader, setButtonLoader] = React.useState<any>(false);
  const [chimeButtonLoader, setChimeButtonLoader] = React.useState<boolean>(false);
  const [dropdownToggle, setDropdownToggle] = React.useState<any>(false);
  const [openModel, setOpenModel] = useState<boolean>(false);
  const [loader, setLoader] = React.useState<any>(false);
  const [currentUser, setCurrentUser] = React.useState<any>();
  const urlParams = new URLSearchParams(window.location.search);
  const meetingId = urlParams.get("id");

  React.useEffect(() => {
    let authDetail = getCurrentUser();
    if (authDetail) setCurrentUser(authDetail);

    if (meetingId === props?.data?.data?.chime?.MeetingId) {
      const payload = {
        id: props.data.id,
        end_datetime: new Date(),
      };
      SessionUpdate(payload)
        .then((r) => r)
        .catch((e) => e);
    }
  }, []);

  React.useEffect(() => {
    console.log(props);
    if (props.data && props.data.data && props.data.data.zoom) {
      setZoomData(props.data.data.zoom);
    }
    if (props.data && props.data.data && props.data.data.chime) {
      setChimeData(props.data.data.chime);
    }
  }, [props.data && props.data.data && props.data.data.zoom]);

  const chimeSubmit = () => {
    setChimeButtonLoader(true);
    createChimeSession(currentUser.user.id)
      .then((res) => {
        updateChimeSession(res);
        setChimeData(res);
        setChimeButtonLoader(false);
        setDropdownToggle(false);
      })
      .catch((e) => {
        setChimeButtonLoader(false);
        console.log("this is error", e);
      });
  };

  const zoomSubmit = () => {
    setButtonLoader(true);
    const payload = {
      topic: props.data && props.data.title ? props.data.title : "New Meeting",
      start_datetime: new Date(props.data.start_datetime).toISOString().replace(/.\d+Z$/g, "Z"),
      end_datetime: new Date(props.data.end_datetime).toISOString().replace(/.\d+Z$/g, "Z"),
    };

    CreateZoomMeeting(payload)
      .then((response) => {
        updateZoomInSession(response);
        setZoomData(response);
        setButtonLoader(false);
        setDropdownToggle(false);
      })
      .catch((error) => {
        console.log(error);
        setButtonLoader(false);
        setDropdownToggle(false);
      });
  };

  const updateChimeSession = (response: any) => {
    setChimeButtonLoader(true);
    const payload = {
      id: props.data.id,
      data: {
        chime: response,
      },
      link: response.start_url,
      recording_files: {
        data: [
          {
            uuid: response.MeetingId,
            medium: "CHIME_CLOUD",
            file_type: "MP4",
            recording_link: `https://tutela-connect-records.s3.ap-south-1.amazonaws.com/${response?.MeetingId}/composited-video/${response?.MediaPipelineId}.mp4`,
          },
        ],
      },
    };
    SessionUpdate(payload)
      .then((response) => {
        mutate(SESSION_ENDPOINT);
        setChimeButtonLoader(false);
        setDropdownToggle(false);
      })
      .catch((error) => {
        console.log(error);
        setChimeButtonLoader(false);
        setDropdownToggle(false);
      });
  };

  const updateZoomInSession = (zoomData: any) => {
    setButtonLoader(true);
    const payload = {
      id: props.data.id,
      data: {
        zoom: zoomData,
      },
    };

    SessionUpdate(payload)
      .then((response) => {
        mutate(SESSION_ENDPOINT);
        setButtonLoader(false);
        setDropdownToggle(false);
      })
      .catch((error) => {
        console.log(error);
        setButtonLoader(false);
        setDropdownToggle(false);
      });
  };

  // detailed validations
  const disablePreviousDate = (date: any) => {
    var currentDate = new Date();
    var endDate = new Date(date);
    if (endDate >= currentDate) {
      return true;
    } else {
      return false;
    }
  };

  const convertTimeToSeconds = (data: any) => {
    const startDateTime: any = new Date(data);
    const currentDate: any = new Date();
    const ZoomDate: any = new Date(
      `${
        currentDate.getMonth() + 1
      }/${currentDate.getDate()}/${currentDate.getFullYear()} ${startDateTime.getHours()}:${startDateTime.getMinutes()}:${startDateTime.getSeconds()}`
    );
    const difference = ZoomDate.getTime() - currentDate.getTime();
    const differenceInSeconds = difference / 1000;
    const absSeconds = Math.floor(differenceInSeconds);
    return absSeconds;
  };

  const SessionDetailModal = ({ data }: any) => {
    return (
      <div className="zoom-settings-dropdown-wrapper">
        <Dropdown
          style={{ position: "relative" }}
          onToggle={(value: any) => {
            setDropdownToggle(value);
          }}
          show={dropdownToggle}
        >
          <Dropdown.Toggle as="div">
            <Button className="btn-sm start-meeting">Start Meeting</Button>
          </Dropdown.Toggle>

          <Dropdown.Menu className="content-wrapper p-0">
            <div className="title-header">Zoom Schedule</div>
            <div className="content">
              <h5 className="mb-1">{props.data && props.data.title}</h5>
              <small className="text-muted">
                {props.data && datePreview(props.data.start_datetime)}
              </small>
              <div className="d-flex">
                <div className="me-2">
                  <Description className="icon-size-lg text-muted" />
                </div>
                <div>
                  <p className="text-muted m-0 p-0">{props.data && props.data.description}</p>
                </div>
              </div>
              <Button className="btn-sm mt-3 mx-2" onClick={zoomSubmit} disabled={buttonLoader}>
                {buttonLoader ? "Starting..." : "Start Zoom"}
              </Button>
              <Button
                className="btn-sm mt-3 mx-2"
                onClick={chimeSubmit}
                disabled={chimeButtonLoader}
              >
                {chimeButtonLoader ? "Starting..." : "Start Chime"}
              </Button>
            </div>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  };

  const validateSessionSuspend = (details: any) => {
    if (details) {
      if (details.sessionSuspend) return false;
      return true;
    }
    return true;
  };

  const userAttendanceRedirection = (url: any) => {
    setLoader(true);
    if (props.data && props.data.session_users && props.data.session_users.length > 0) {
      let currentUserSession: any = props.data.session_users.find(
        (_ele: any) => _ele.user.id === currentUser.user.id
      );
      if (currentUserSession && !currentUserSession.going) {
        const payload = {
          id: currentUserSession.id,
          going: true,
        };
        SessionUserUpdate(payload)
          .then((response) => {
            console.log(response);
            if (url) window.open(url, "_blank");
            setLoader(false);
          })
          .catch((error) => {
            console.log(error);
            setLoader(false);
          });
      } else {
        if (url) window.open(url, "_blank");
        setLoader(false);
      }
    } else {
      if (url) window.open(url, "_blank");
      setLoader(false);
    }
  };

  return (
    <div>
      {validateSessionSuspend(props.data.details) ? (
        <>
          {disablePreviousDate(props.data.end_datetime) ? (
            <div>
              {zoomData || chimeData ? (
                <div>
                  {props.role === "student" ? (
                    <SessionTimer
                      date={props.data.start_datetime}
                      time={convertTimeToSeconds(props.data.start_datetime)}
                    >
                      <div
                        onClick={() => {
                          if (!loader)
                            userAttendanceRedirection(
                              zoomData?.join_url || chimeData?.start_url || props.data.link
                            );
                        }}
                      >
                        <Badge className="bg-success hover-cursor">Join Meeting</Badge>
                      </div>
                      {/* <a href={zoomData.join_url} target="_blank">
                        <Badge className="bg-success hover-cursor">Join Meeting</Badge>
                      </a> */}
                    </SessionTimer>
                  ) : (
                    <SessionTimer
                      date={props.data.start_datetime}
                      time={convertTimeToSeconds(props.data.start_datetime)}
                    >
                      <a
                        href={zoomData?.start_url || chimeData?.start_url || props.data.link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Badge className="bg-success hover-cursor">Join Meeting</Badge>
                      </a>
                    </SessionTimer>
                  )}
                </div>
              ) : (
                <div>
                  {props.role === "student" ? (
                    <SessionTimer
                      date={props.data.start_datetime}
                      time={convertTimeToSeconds(props.data.start_datetime)}
                    >
                      <Badge className="bg-info hover-cursor">Session is yet to start!</Badge>
                    </SessionTimer>
                  ) : (
                    <SessionTimer
                      date={props.data.start_datetime}
                      time={convertTimeToSeconds(props.data.start_datetime)}
                    >
                      <SessionDetailModal data={props.data} />
                    </SessionTimer>
                  )}
                </div>
              )}
            </div>
          ) : (
            <small>
              {(zoomData && zoomData.host_id) || (chimeData && chimeData.MeetingId) ? (
                <Badge className="bg-success">Conducted!</Badge>
              ) : (
                <Badge className="bg-warning">Not conducted!</Badge>
              )}
            </small>
          )}
        </>
      ) : (
        <>
          <small>
            <Badge className="bg-danger">Session Suspended</Badge>
          </small>
        </>
      )}
    </div>
  );
};

export default ZoomSession;
