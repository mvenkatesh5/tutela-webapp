import React from "react";
// react bootstrap
import { Image } from "react-bootstrap";
// material icons
import { EmojiFrown } from "@styled-icons/bootstrap/EmojiFrown";
import { EmojiExpressionless } from "@styled-icons/bootstrap/EmojiExpressionless";
import { EmojiSmile } from "@styled-icons/bootstrap/EmojiSmile";
// swr
import { mutate } from "swr";
// global imports
import { datePreview } from "@constants/global";
// api routes
import { UNRATED_SESSION_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";
import { SessionUserUpdate } from "@lib/services/sessionservice";
// global context provider
import { globalContext } from "@contexts/global";

const UnratedSessionCard = (props: any) => {
  const [globalState, globalDispatch] = React.useContext(globalContext);

  const { data, user } = props;

  const [loader, setLoader] = React.useState(false);

  const getCurrentSessionUser = () => {
    if (data && data.session_users) {
      const sessionUser = data.session_users.find(
        (sessionUser: any) => sessionUser.user.id === user.id
      );
      if (sessionUser) {
        return sessionUser;
      }
    }
  };

  const sessionReportUpdate = (rating: any) => {
    const currentSessionUser = getCurrentSessionUser();
    if (currentSessionUser) {
      const payload = { id: currentSessionUser.id, rating: rating };
      setLoader(true);
      SessionUserUpdate(payload)
        .then((response) => {
          removeSessionFromGlobal(data.id);
          mutate(UNRATED_SESSION_ENDPOINT);
          setLoader(false);
        })
        .catch((error) => {
          console.log(error);
          setLoader(false);
        });
    }
  };

  const removeSessionFromGlobal = (session_id: any) => {
    globalDispatch({
      type: "UNRATED_SESSIONS",
      payload: globalState.unratedSessions.filter((session: any) => session.id != session_id),
    });
  };

  return (
    <div className="session-card-root-container">
      <div className="d-flex flex-wrap align-items-center">
        <div className="icon">
          <Image className="img-fluid rounded me-3" src="/bird.svg" alt="" />
        </div>
        <div>
          <div className="heading">{props.data.title}</div>
          <div className="badge border bg-light text-dark">
            {datePreview(props.data.start_datetime)}
          </div>
        </div>
        {loader ? (
          <div className="ms-auto d-flex align-items-center gap-3">User Rating submitting...</div>
        ) : (
          <div className="ms-auto d-flex align-items-center gap-3">
            <div className="session-unrated-module" onClick={() => sessionReportUpdate(10)}>
              {/* Sad */}
              <EmojiFrown />
            </div>
            <div className="session-unrated-module" onClick={() => sessionReportUpdate(30)}>
              {/* Better */}
              <EmojiExpressionless />
            </div>
            <div className="session-unrated-module" onClick={() => sessionReportUpdate(50)}>
              {/* Best */}
              <EmojiSmile />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnratedSessionCard;
