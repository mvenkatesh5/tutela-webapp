import React from "react";
// next imports
import Link from "next/link";
// react bootstrap
import { Image } from "react-bootstrap";
// material icons
import { LinkAlt } from "@styled-icons/boxicons-regular";
import { TextLeft } from "@styled-icons/bootstrap";
import { Users } from "@styled-icons/fa-solid";
import { User } from "@styled-icons/boxicons-regular";
import { Readthedocs } from "@styled-icons/simple-icons";
import { CheveronDown } from "@styled-icons/zondicons";
import { Video } from "@styled-icons/boxicons-regular/Video";
import { EyeFill } from "@styled-icons/bootstrap/EyeFill";
import { Group } from "@styled-icons/typicons/Group";
import { AttachOutline } from "@styled-icons/evaicons-outline/AttachOutline";
import { Link45deg } from "@styled-icons/bootstrap/Link45deg";
// components
import ZoomSessions from "@components/zoomsessions";
import IconRow from "@components/iconRow";
import SessionEdit from "@components/admin/sessions/edit";
import SessionDelete from "@components/admin/sessions/delete";
import SessionSuspend from "@components/admin/sessions/SessionSuspend";
import SessionReschedule from "@components/admin/sessions/SessionReschedule";
// global imports
import { datePreview, returnTime } from "@constants/global";

const SessionCard = (props: any) => {
  const [open, setOpen] = React.useState(false);
  const [studentImages, setStudentImages] = React.useState<any>();
  const [teacherImages, setTeacherImages] = React.useState<any>();

  const [sessionDetailView, setSessionDetailView] = React.useState(false);
  const handleSessionDetailView = () => {
    setSessionDetailView(!sessionDetailView);
  };

  React.useEffect(() => {
    if (props.data && props.data.session_users) {
      let learners: any = [];
      let teachers: any = [];
      props.data.session_users.map((data: any) => {
        if (data.as_role === 0) {
          learners.push({
            user_id: data.user.id,
            id: data.id,
            coins: data.coins,
            rating: data.rating,
            going: data.going,
            name: data.user.first_name,
            icon: "/bird.svg",
          });
        } else {
          teachers.push({
            user_id: data.user.id,
            id: data.id,
            coins: data.coins,
            rating: data.rating,
            going: data.going,
            name: data.user.first_name,
            icon: "/bird.svg",
          });
        }
      });
      setStudentImages(learners);
      setTeacherImages(teachers);
    }
  }, [props.data]);

  const validateSessionReschedule = (details: any) => {
    if (details && details.sessionReschedule) {
      if (details.sessionReschedule.toggle) {
        return details.sessionReschedule.scheduledOn;
      }
      return false;
    }
    return false;
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
  return (
    <>
      {open ? (
        <div onClick={() => setOpen(!open)} className="session-card-root-container">
          <div className="d-flex align-items-start gap-3">
            <Image alt="" src="/bird.svg" />
            <div>
              <div className="fw-bold">{props.data.title}</div>
              <div className="description">
                <div>
                  {returnTime(props.data.start_datetime)}- {returnTime(props.data.end_datetime)}
                </div>
                <div>Weekly on weekdays</div>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-start gap-4 mt-4">
            <TextLeft className="flex-shrink-0" width="20px" />
            <div className="ms-2 description">{props.data.description}</div>
          </div>
          <div className="d-flex align-items-start gap-4 mt-4">
            <Users className="flex-shrink-0" width="20px" />
            <div className="ms-2">
              <small>
                {studentImages.length} {studentImages.length == 1 ? "student" : "students"} -{" "}
              </small>{" "}
              <small className="description"> 18 yes, 2 awaiting</small>
              {studentImages && studentImages.length > 0 && (
                <div className="d-flex mb-3 w-100" style={{ marginRight: "10px" }}>
                  <div className="mt-1">
                    <IconRow
                      data={studentImages}
                      session={props.data}
                      user_role={props.role}
                      role="user"
                    />
                  </div>
                </div>
              )}
              {/* <div className="d-flex">
                <div
                  style={{ background: "#DFE1E6" }}
                  className="ms-2 px-1 rounded-pill d-flex align-items-center gap-1 mt-1"
                >
                  <Image
                    alt=""
                    className="rounded-circle"
                    width="16px"
                    height="16px"
                    src="/bird.svg"
                  />
                  <small>Riya</small>
                  <Image
                    alt=""
                    className="rounded-circle"
                    width="16px"
                    height="16px"
                    src="/tutela-coin.png"
                  />
                  <small>10</small>
                </div>
              </div> */}
            </div>
          </div>
          <div className="d-flex align-items-start gap-4 mt-4">
            <AttachOutline className="flex-shrink-0" width="20px" />
            <div style={{ background: "#DFE1E6" }} className="ms-2 description px-1 rounded">
              Assignment1.pdf
            </div>
          </div>
          {props.data.link && (
            <div className="d-flex align-items-start gap-4 mt-4">
              <Link45deg className="flex-shrink-0" width="20px" />
              <div className="ms-2 description">
                <a href="">{props.data.link}</a>
              </div>
            </div>
          )}

          <div className="d-flex align-items-start gap-4 mt-4">
            <User className="flex-shrink-0" width="20px" />
            <div className="ms-2 description d-flex gap-2 align-items-center">
              {teacherImages && teacherImages.length > 0 && (
                <IconRow
                  data={teacherImages}
                  session={props.data}
                  user_role={props.role}
                  role="teacher"
                />
              )}
              {/* <Image alt="" className="rounded-circle" width="16px" height="16px" src="/bird.svg" />
              <div className="">Teacher Name</div> */}
            </div>
          </div>
        </div>
      ) : (
        <div onClick={() => setOpen(!open)} className="session-card-root-container">
          <div className="d-flex align-items-center gap-3">
            <Image alt="" src="/bird.svg" />
            <div className="fw-bold">{props.data.title}</div>
            <small className="px-2 rounded" style={{ background: "#DFE1E6" }}>
              {returnTime(props.data.start_datetime)}- {returnTime(props.data.end_datetime)}
            </small>
          </div>
        </div>
      )}
    </>
  );
};

export default SessionCard;
