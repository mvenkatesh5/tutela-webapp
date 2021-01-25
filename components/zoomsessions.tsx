import React from "react";
// next imports
import { useRouter } from "next/router";
// react bootstrap
import { Button } from "react-bootstrap";
// swr
import { mutate } from "swr";
// api service
import { CreateZoomMeeting, SessionUpdate } from "@lib/services/sessionservice";
// api routes
import { SESSION_ENDPOINT } from "@constants/routes";

const ZoomSession = (props: any) => {
  const [zoomData, setZoomData] = React.useState<any>();
  const [buttonLoader, setButtonLoader] = React.useState<any>(false);

  React.useEffect(() => {
    if (props.data && props.data.data && props.data.data.zoom) {
      setZoomData(props.data.data.zoom);
    }
  }, [props.data]);

  console.log("Zoom data:", zoomData);

  const zoomSubmit = () => {
    setButtonLoader(true);
    const payload = {
      topic: props.data && props.data.title ? props.data.title : "New Meeting",
      start_datetime: new Date().toISOString().replace(/.\d+Z$/g, "Z"),
    };

    CreateZoomMeeting(payload)
      .then((response) => {
        console.log(response);
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
        console.log(response);
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
      {zoomData ? (
        <div>
          {props.view === "student" ? (
            <a href={zoomData.join_url} target="_blank">
              <Button className="btn-sm">Join Meeting</Button>
            </a>
          ) : (
            <a href={zoomData.start_url} target="_blank">
              <Button className="btn-sm">Join Meeting</Button>
            </a>
          )}
        </div>
      ) : (
        <div>
          {props.view === "student" ? (
            <div>Session is yet to start!</div>
          ) : (
            <Button className="btn-sm" onClick={zoomSubmit} disabled={buttonLoader}>
              {buttonLoader ? "Starting..." : "Start Meeting"}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ZoomSession;
