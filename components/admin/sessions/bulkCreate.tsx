import React from "react";
// react bootstrap
import { Button, Form } from "react-bootstrap";
// material icons
import { CalendarPlus } from "@styled-icons/boxicons-regular";
import { Times } from "@styled-icons/fa-solid";
// swr
import { mutate } from "swr";
// cron parser
const parser = require("cron-parser");
// components
import SessionForm from "./sessionForm";
import SessionUser from "./sessionUser";
// api routes
import { USER_CALENDAR_SESSION_ENDPOINT } from "@constants/routes";
// api services
import {
  SessionBulkCreate,
  SessionUserCreate,
  SessionBulkUserCreate,
} from "@lib/services/sessionservice";
import { APIFetcher } from "@lib/services";

const SessionBulkCreateView = (props: any) => {
  const [buttonLoader, setButtonLoader] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const closeModal = () => {
    setModal(false);
    setSessionData({
      title: "",
      description: "",
      start_date: new Date(),
      end_date: new Date(),
      start_time: new Date(),
      end_time: new Date(),
      link: "",
      data: {},
      listeners: [],
      teachers: [],
      cornJobKind: "daily",
      cornJobKindValue: "everyday",
    });
  };
  const openModal = () => setModal(true);

  const [sessionData, setSessionData] = React.useState({
    title: "",
    description: "",
    start_date: new Date(),
    end_date: new Date(),
    start_time: new Date(),
    end_time: new Date(),
    link: "",
    data: {},
    listeners: [],
    teachers: [],
    cornJobKind: "daily",
    cornJobKindValue: "everyday",
  });
  const handleSessionData = (value: any) => {
    setSessionData(value);
  };
  const handleSessionListeners = (key: any, value: any) => {
    setSessionData({ ...sessionData, [key]: value });
  };
  const handleDateTime = (date: any, time: any) => {
    return date;
  };

  const returnCalenderDays = (days: any) => {
    const array = [];
    for (let i = 0; i < days.length; i++) {
      if (days[i] === "Sunday") array.push("SUN");
      if (days[i] === "Monday") array.push("MON");
      if (days[i] === "Tuesday") array.push("TUE");
      if (days[i] === "Wednesday") array.push("WED");
      if (days[i] === "Thursday") array.push("THU");
      if (days[i] === "Friday") array.push("FRI");
      if (days[i] === "Saturday") array.push("SAT");
    }
    return array.toString();
  };

  const sessionCreate = (event: any) => {
    event.preventDefault();

    if (sessionData.start_date && sessionData.end_date) {
      var options = {
        currentDate: new Date(sessionData.start_date),
        endDate: new Date(sessionData.end_date),
        iterator: true,
      };
      options.endDate.setDate(options.endDate.getDate() + 1);
      let returnArray = [];
      let dateArray = [];
      // second(0 - 59), minute(0 - 59), hour(0 - 23), dayOfMonth(1 - 31), month(1 - 12), dayOfWeek (0 - 7) (0 or 7 is Sun)
      let cronExpression = `0 ${sessionData.start_time.getMinutes()} ${sessionData.start_time.getHours()} * * *`;
      if (sessionData.cornJobKind === "daily") {
        if (sessionData.cornJobKindValue === "everyday") {
          cronExpression = `0 ${sessionData.start_time.getMinutes()} ${sessionData.start_time.getHours()} * * *`;
        }
        // if (sessionData.cornJobKindValue === "weekday") {
        //   cronExpression = `0 ${sessionData.start_time.getMinutes()} ${sessionData.start_time.getHours()} * * MON-FRI`;
        // }
        // if (sessionData.cornJobKindValue === "weekend") {
        //   cronExpression = `0 ${sessionData.start_time.getMinutes()} ${sessionData.start_time.getHours()} * * SAT,SUN`;
        // }
      }
      // if (sessionData.cornJobKind === "weekly" && sessionData.cornJobKindValue.length > 0) {
      //   const weeklyDay = returnCalenderDays(sessionData.cornJobKindValue);
      //   cronExpression = `0 ${sessionData.start_time.getMinutes()} ${sessionData.start_time.getHours()} * * ${weeklyDay}`;
      // }
      // if (sessionData.cornJobKind === "monthly") {
      //   if (sessionData.cornJobKindValue) {
      //     if (sessionData.cornJobKindValue.category === "c1") {
      //       cronExpression = `0 ${sessionData.start_time.getMinutes()} ${sessionData.start_time.getHours()} ${
      //         sessionData.cornJobKindValue.date
      //       } 1/${sessionData.cornJobKindValue.month} *`;
      //     }
      //     if (sessionData.cornJobKindValue.category === "c2") {
      //       const weeklyDay = returnCalenderDays([sessionData.cornJobKindValue.day]);

      //       cronExpression = `0 ${sessionData.start_time.getMinutes()} ${sessionData.start_time.getHours()} * 1/${
      //         sessionData.cornJobKindValue.month
      //       } ${weeklyDay}#${sessionData.cornJobKindValue.week}`;
      //     }
      //   }
      // }

      try {
        var interval = parser.parseExpression(cronExpression, options);

        while (true) {
          try {
            var obj = interval.next();
            returnArray.push(obj.value.toString());
          } catch (e) {
            break;
          }
        }
      } catch (err: any) {
        console.log("Error: " + err.message);
      }

      if (returnArray) {
        for (let i = 0; i < returnArray.length; i++) {
          const newDate = new Date(returnArray[i]);

          const currentDate = new Date(returnArray[i]);
          currentDate.setHours(sessionData.end_time.getHours());
          currentDate.setMinutes(sessionData.end_time.getMinutes());
          currentDate.setSeconds(sessionData.end_time.getSeconds());

          const data = {
            title: sessionData.title,
            description: sessionData.description,
            start_datetime: new Date(newDate),
            end_datetime: new Date(currentDate),
            link: sessionData.link,
            data: sessionData.data,
          };

          dateArray.push(data);
        }

        sessionBulkCreate(dateArray);
      }
    } else {
      alert("Please select start date and end date");
    }
  };

  const sessionBulkCreate = (session_payload: any) => {
    setButtonLoader(true);
    const payload = { sessions: session_payload };

    SessionBulkCreate(payload)
      .then((res) => {
        createSessionUsers(res);
      })
      .catch((errors) => {
        console.log(errors);
        setButtonLoader(false);
      });
  };

  const createSessionUsers = (session: any) => {
    let currentUsers: any = [];

    sessionData.listeners.map((listeners: any) => {
      const data = {
        as_role: 0,
        session: session.id,
        user: parseInt(listeners),
      };
      currentUsers.push(data);
    });

    sessionData.teachers.map((teachers: any) => {
      const data = {
        as_role: 1,
        session: session.id,
        user: parseInt(teachers),
      };
      currentUsers.push(data);
    });

    if (currentUsers && currentUsers.length > 0) {
      SessionBulkUserCreate(currentUsers)
        .then((res) => {
          mutate(
            [USER_CALENDAR_SESSION_ENDPOINT(props.currentDateQuery), props.currentDateQuery],
            APIFetcher(USER_CALENDAR_SESSION_ENDPOINT(props.currentDateQuery)),
            false
          );
          closeModal();
          setButtonLoader(false);
        })
        .catch((errors) => {
          console.log(errors);
          setButtonLoader(false);
        });
    } else {
      mutate(
        [USER_CALENDAR_SESSION_ENDPOINT(props.currentDateQuery), props.currentDateQuery],
        async (elements: any) => {
          return [...elements, session];
        },
        false
      );
      closeModal();
      setButtonLoader(false);
    }
  };

  return (
    <div>
      <Button variant="primary" className="btn-sm" onClick={openModal}>
        <div className="d-flex justify-items-center">
          <div style={{ width: "18px", marginRight: "8px" }}>
            <CalendarPlus />
          </div>
          <div>Bulk Schedule Sessions</div>
        </div>
      </Button>

      {modal && (
        <div
          style={{
            width: "420px",
            position: "fixed",
            top: "125px",
            bottom: "10px",
            right: "20px",
            marginTop: "20px",
            minHeight: "450px",
            background: "#fff",
            boxShadow: `#0f0f0f0d 0px 0px 0px 1px, #0f0f0f1a 0px 3px 6px, #0f0f0f33 0px 9px 24px`,
            borderRadius: "4px",
            overflow: "hidden",
            zIndex: 9999999,
          }}
        >
          <Form onSubmit={sessionCreate}>
            <div
              style={{
                position: "absolute",
                top: 0,
                width: "100%",
                display: "flex",
                background: "#f5f5f5",
                padding: "8px 12px",
                zIndex: 99999,
                height: "40px",
              }}
            >
              <div style={{ fontWeight: 500 }}>Schedule a Meeting</div>
              <div
                style={{ marginLeft: "auto", width: "12px", cursor: "pointer" }}
                onClick={closeModal}
              >
                <Times />
              </div>
            </div>
            <div
              style={{
                position: "absolute",
                top: "40px",
                bottom: "45px",
                width: "100%",
                overflow: "hidden",
                overflowY: "auto",
                padding: "10px 12px",
              }}
            >
              <SessionForm data={sessionData} handleData={handleSessionData} view_end_date={true} />
              {/* <SessionUser
                data={sessionData}
                users={props.users}
                handleData={handleSessionListeners}
              /> */}
            </div>
            <div
              style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                display: "flex",
                background: "#f5f5f5",
                padding: "8px 12px",
                height: "45px",
                zIndex: 99999,
              }}
            >
              <div style={{ marginLeft: "auto" }}>
                <Button
                  variant="outline-secondary"
                  className="btn-sm"
                  onClick={closeModal}
                  style={{ marginRight: "10px" }}
                >
                  Close
                </Button>
              </div>
              <div>
                <Button variant="primary" className="btn-sm" type="submit" disabled={buttonLoader}>
                  {buttonLoader ? "Saving..." : "Save"}
                </Button>
              </div>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
};

export default SessionBulkCreateView;
