import React, { useState, useRef } from "react";
// next imports
import { useRouter } from "next/router";
// react bootstrap
import { Button, Badge, Dropdown } from "react-bootstrap";
// material icons
import { Description } from "@styled-icons/material-rounded";
import { AttachOutline } from "@styled-icons/evaicons-outline";
// swr
import { mutate } from "swr";
// global imports
import { datePreview } from "@constants/global";
// api service
import { CreateZoomMeeting, SessionUpdate } from "@lib/services/sessionservice";
// api routes
import { SESSION_ENDPOINT } from "@constants/routes";

const ZoomSession = (props: any) => {
  const [zoomData, setZoomData] = React.useState<any>();
  const [buttonLoader, setButtonLoader] = React.useState<any>(false);
  const [dropdownToggle, setDropdownToggle] = React.useState<any>(false);

  React.useEffect(() => {
    if (props.data && props.data.data && props.data.data.zoom) {
      setZoomData(props.data.data.zoom);
    }
  }, [props.data && props.data.data && props.data.data.zoom]);

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

              {/* <div className="d-flex align-items-center">
                <div className="me-2">
                  <AttachOutline className="icon-size-lg text-muted" />
                </div>
                <div>
                  <p className="text-muted bg-light border p-2 rounded m-0">Assignment1.pdf</p>
                </div>
              </div> */}

              <Button className="btn-sm mt-3" onClick={zoomSubmit} disabled={buttonLoader}>
                {buttonLoader ? "Starting..." : "Start Meeting"}
              </Button>
            </div>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  };

  return (
    <div>
      {zoomData ? (
        <div>
          {props.role === "student" ? (
            <a href={zoomData.join_url} target="_blank">
              <Badge className="bg-success hover-cursor">Join Meeting</Badge>
            </a>
          ) : (
            <a href={zoomData.start_url} target="_blank">
              <Badge className="bg-success hover-cursor">Join Meeting</Badge>
            </a>
          )}
        </div>
      ) : (
        <div>
          {props.role === "student" ? (
            <div>Session is yet to start!</div>
          ) : (
            <SessionDetailModal data={props.data} />
          )}
        </div>
      )}
    </div>
  );
};

export default ZoomSession;
