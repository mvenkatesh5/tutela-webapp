import React, { useState, useRef } from "react";
// next imports
import { useRouter } from "next/router";
// react bootstrap
import { Button, Overlay, Popover, Badge } from "react-bootstrap";
// swr
import { mutate } from "swr";
// api service
import { CreateZoomMeeting, SessionUpdate } from "@lib/services/sessionservice";
// api routes
import { SESSION_ENDPOINT } from "@constants/routes";
// icons
import { Description } from "@styled-icons/material-rounded";
import { AttachOutline } from "@styled-icons/evaicons-outline";

const ZoomSession = (props: any) => {
  const [buttonLoader, setButtonLoader] = React.useState<any>(false);

  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
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
        setButtonLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setButtonLoader(false);
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
      })
      .catch((error) => {
        console.log(error);
        setButtonLoader(false);
      });
  };

  return (
    <div>
      {props.data && props.data.data && props.data.data.zoom ? (
        <div>
          {props.role === "student" ? (
            <a href={props.data.data.zoom.join_url} target="_blank">
              <Badge className="bg-success hover-cursor">Join Meeting</Badge>
            </a>
          ) : (
            <a href={props.data.data.zoom.start_url} target="_blank">
              <Badge className="bg-success hover-cursor">Join Meeting</Badge>
            </a>
          )}
        </div>
      ) : (
        <div>
          {props.role === "student" ? (
            <div>Session is yet to start!</div>
          ) : (
            <>
              <div ref={ref}>
                <Badge className="bg-primary hover-cursor" onClick={handleClick}>
                  Start Meeting
                </Badge>

                <Overlay
                  show={show}
                  target={target}
                  placement="right"
                  container={ref.current}
                  containerPadding={20}
                >
                  <Popover id="popover-contained">
                    <Popover.Content>
                      <h5 className="mb-1">Meeting Name</h5>
                      <p className="text-muted">
                        Sunday, November 21 ⋅ 8 AM – 9 AM <br /> Weekly on weekdays
                      </p>

                      <div className="d-flex">
                        <div className="me-2">
                          <Description className="icon-size-lg text-muted" />
                        </div>
                        <div>
                          <p className="text-muted">
                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat.
                          </p>
                        </div>
                      </div>

                      <div className="d-flex align-items-center">
                        <div className="me-2">
                          <AttachOutline className="icon-size-lg text-muted" />
                        </div>
                        <div>
                          <p className="text-muted bg-light border p-2 rounded m-0">
                            Assignment1.pdf
                          </p>
                        </div>
                      </div>

                      <Button className="btn-sm mt-3" onClick={zoomSubmit} disabled={buttonLoader}>
                        {buttonLoader ? "Starting..." : "Start Meeting"}
                      </Button>
                    </Popover.Content>
                  </Popover>
                </Overlay>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ZoomSession;
