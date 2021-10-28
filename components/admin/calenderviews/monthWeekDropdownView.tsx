import React from "react";
// next imports
import Link from "next/link";
// react bootstrap
import { OverlayTrigger, Badge, Tooltip, Dropdown, Image } from "react-bootstrap";
// material icons
import { LinkAlt } from "@styled-icons/boxicons-regular";
import { TextLeft } from "@styled-icons/bootstrap";
import { Users } from "@styled-icons/fa-solid";
import { User } from "@styled-icons/boxicons-regular";
import { Readthedocs } from "@styled-icons/simple-icons";
import { CheveronDown } from "@styled-icons/zondicons";
import { Video } from "@styled-icons/boxicons-regular/Video";
import { EyeFill } from "@styled-icons/bootstrap/EyeFill";
// components
import ZoomSessions from "@components/zoomsessions";
import IconRow from "@components/iconRow";
import SessionEdit from "@components/admin/sessions/edit";
import SessionDelete from "@components/admin/sessions/delete";
import SessionSuspend from "@components/admin/sessions/SessionSuspend";
import SessionReschedule from "@components/admin/sessions/SessionReschedule";
// global imports
import { datePreview } from "@constants/global";

const CalendarWeekMonthCardDetailView = (props: any) => {
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

  const [dropdownToggle, setDropdownToggle] = React.useState<any>(false);
  const [studentImages, setStudentImages] = React.useState<any>();
  const [teacherImages, setTeacherImages] = React.useState<any>();

  React.useEffect(() => {
    if (props.data && props.data.session_users) {
      let learners: any = [];
      let teachers: any = [];
      props.data.session_users.map((data: any) => {
        if (data.as_role === 0) {
          learners.push({
            id: data.id,
            coins: data.coins,
            going: data.going,
            name: data.user.first_name,
            icon: "/bird.svg",
          });
        } else {
          teachers.push({
            id: data.id,
            coins: data.coins,
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

  return (
    <div>
      <Dropdown
        onToggle={(value: any) => {
          setDropdownToggle(value);
        }}
        show={dropdownToggle}
      >
        <Dropdown.Toggle as="div" className="global-dropdown-toggle-white-space">
          {props.children}
        </Dropdown.Toggle>

        <Dropdown.Menu className="month-week-dropdown-content-wrapper">
          <div>
            <div className="d-flex mb-2">
              <div className="icon">
                <Image className="img-fluid rounded me-3" src="/bird.svg" />
              </div>
              <div>
                <div className="heading">{props.data.title}</div>
                <div className="description">
                  <small>Starts At: {datePreview(props.data.start_datetime)}</small>
                </div>
                <div className="description">
                  <small>Ends At: {datePreview(props.data.end_datetime)}</small>
                </div>
              </div>
            </div>

            <div className="d-flex w-100 mb-2">
              <div className="small-icon">
                <TextLeft width={20} className="text-muted" />
              </div>
              <div className="ms-2">
                <div className="description">{props.data.description}</div>
              </div>
            </div>

            <div className="d-flex w-100 mb-2">
              <div className="small-icon">
                <LinkAlt width={20} className="text-muted" />
              </div>
              <div className="ms-2">
                <div className="description">
                  {props.data && props.data.data && props.data.data.zoom ? (
                    <div>
                      {props.role === "student" ? (
                        <a href={props.data.data.zoom.join_url} target="_blank">
                          Join Session
                        </a>
                      ) : (
                        <a href={props.data.data.zoom.start_url} target="_blank">
                          Start Session
                        </a>
                      )}
                    </div>
                  ) : (
                    <div>{props.role === "student" && <div>Session is yet to start!</div>}</div>
                  )}
                </div>
              </div>
            </div>

            {studentImages && studentImages.length > 0 && (
              <div className="d-flex mb-2 w-100">
                <div className="small-icon">
                  <Users className="text-muted" width={20} />
                </div>
                <div>
                  <div className="d-flex">
                    <div className="secondary-heading ms-2 pt-1">
                      {studentImages.length} students
                    </div>
                    {/* <div className="description ms-2">- 18 yes, 2 awaiting</div> */}
                  </div>
                  <div className="mt-1">
                    <IconRow data={studentImages} />
                  </div>
                </div>
              </div>
            )}

            {teacherImages && teacherImages.length > 0 && (
              <div className="d-flex mb-2 w-100">
                <div className="small-icon">
                  <User className="text-muted" width={20} />
                </div>
                <div className="">
                  <IconRow data={teacherImages} />
                </div>
                {/* <div className=" mt-2 ms-2">Hello</div> */}
              </div>
            )}

            <div className="d-flex w-100 mb-2 align-items-center">
              <div className="small-icon">
                <Video width={20} className="text-muted" />
              </div>
              <div className="ms-2">
                {props.data.recording_link ? (
                  <a href={props.data.recording_link} target="_blank" className="description">
                    {props.data.recording_link}
                  </a>
                ) : (
                  <div className="description">No recording is available.</div>
                )}
              </div>
            </div>

            <div className="mb-2">
              {validateSessionReschedule(props.data.details) ? (
                <Badge className="bg-info">
                  Session Rescheduled on
                  {` ${datePreview(validateSessionReschedule(props.data.details).start_datetime)}`}
                </Badge>
              ) : (
                <ZoomSessions data={props.data} role={props.role ? props.role : null} />
              )}
            </div>
          </div>
          {!validateSessionReschedule(props.data.details) && (
            <div className="d-flex align-items-center w-100">
              <div className="ms-auto">
                <Link href={`/session-detail/${props.data.id}`}>
                  <a target="_blank">
                    <OverlayTrigger
                      key={`bottom`}
                      placement={`bottom`}
                      overlay={<Tooltip id={`tooltip-bottom`}>Session Detail</Tooltip>}
                    >
                      <div className="ms-2 session-detail-redirection">
                        <EyeFill />
                      </div>
                    </OverlayTrigger>
                  </a>
                </Link>
              </div>
              {(props.role === "admin" || props.role === "teacher") && (
                <div className="ms-2">
                  <SessionEdit
                    data={props.data}
                    users={props.users}
                    role={props.role ? props.role : null}
                    currentDateQuery={props.currentDateQuery}
                  />
                </div>
              )}
              {props.role === "admin" && (
                <div className="ms-2">
                  <SessionDelete data={props.data} currentDateQuery={props.currentDateQuery} />
                </div>
              )}
              {(props.role === "admin" || props.role === "teacher") &&
                disablePreviousDate(props.data.start_datetime) && (
                  <div className="ms-2">
                    <SessionSuspend data={props.data} currentDateQuery={props.currentDateQuery} />
                  </div>
                )}
              {(props.role === "admin" || props.role === "teacher") &&
                disablePreviousDate(props.data.start_datetime) && (
                  <div className="ms-2">
                    <SessionReschedule
                      data={props.data}
                      currentDateQuery={props.currentDateQuery}
                    />
                  </div>
                )}
            </div>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default CalendarWeekMonthCardDetailView;
