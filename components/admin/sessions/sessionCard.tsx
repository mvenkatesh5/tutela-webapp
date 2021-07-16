import React from "react";
// next imports
import Link from "next/link";
// react bootstrap
import { Card, Row, Col, Image, Button } from "react-bootstrap";
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
// global imports
import { datePreview } from "@constants/global";

const SessionCard = (props: any) => {
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
            name: data.user.first_name,
            icon: "/bird.svg",
          });
        } else {
          teachers.push({
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
      {!sessionDetailView ? (
        <div>
          <div className="session-card-root-container">
            <div className="d-flex flex-wrap align-items-center">
              <div className="icon">
                <Image className="img-fluid rounded me-3" src="/bird.svg" />
              </div>
              <div>
                <div className="heading">{props.data.title}</div>
              </div>
              <div>
                <div className="badge border bg-light text-dark ms-3">
                  {datePreview(props.data.start_datetime)}
                </div>
              </div>

              <div className="ms-auto">
                <ZoomSessions data={props.data} role={props.role ? props.role : null} />
              </div>

              {(props.role === "admin" || props.role === "teacher") && (
                <Link href={`/session-detail/${props.data.id}`}>
                  <a target="_blank">
                    <div className="ms-2 session-detail-redirection">
                      <EyeFill />
                    </div>
                  </a>
                </Link>
              )}
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
              <div className="text-end ms-2" onClick={handleSessionDetailView}>
                <CheveronDown className="text-muted" width={20} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="session-card-root-container">
            <div className="d-flex flex-wrap mb-3">
              <div className="icon">
                <Image className="img-fluid rounded me-3" src="/bird.svg" />
              </div>
              <div>
                <div className="heading">{props.data.title}</div>
                <div className="description">
                  Starts At: {datePreview(props.data.start_datetime)}
                </div>
                <div className="description">Ends At: {datePreview(props.data.end_datetime)}</div>
              </div>
              <div className="ms-auto text-end" onClick={handleSessionDetailView}>
                <CheveronDown className="text-muted" width={20} />
              </div>
            </div>

            <div className="d-flex mb-3">
              <div className="d-flex w-100" style={{ marginRight: "10px" }}>
                <div className="small-icon">
                  <TextLeft className="text-muted" />
                </div>
                <div>
                  <div className="description">{props.data.description}</div>
                </div>
              </div>
              <div className="d-flex w-100" style={{ marginLeft: "10px" }}>
                <div className="small-icon">
                  <LinkAlt className="text-muted" />
                </div>
                <div>
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
            </div>

            <div className="d-flex">
              {studentImages && studentImages.length > 0 && (
                <div className="d-flex mb-3 w-100" style={{ marginRight: "10px" }}>
                  <div className="small-icon">
                    <Users className="text-muted" width={20} />
                  </div>
                  <div>
                    <div className="d-flex">
                      <div className="secondary-heading">{studentImages.length} students</div>
                      {/* <div className="description ms-2">- 18 yes, 2 awaiting</div> */}
                    </div>
                    <div className="mt-1">
                      <IconRow data={studentImages} />
                    </div>
                  </div>
                </div>
              )}
              {teacherImages && teacherImages.length > 0 && (
                <div className="d-flex mb-3 w-100" style={{ marginLeft: "10px" }}>
                  <div className="small-icon">
                    <User className="text-muted" width={20} />
                  </div>
                  <div className="">
                    <IconRow data={teacherImages} />
                  </div>
                  {/* <div className=" mt-2 ms-2">Hello</div> */}
                </div>
              )}
            </div>

            {props.data.recording_link  && (
              <div className="d-flex w-100 mb-3 align-items-center" style={{ marginRight: "10px" }}>
                <div className="small-icon">
                  <Video className="text-muted" />
                </div>
                <div>
                  {props.data.recording_link ? (
                    <a href={props.data.recording_link} target="_blank" className="description">
                      {props.data.recording_link}
                    </a>
                  ) : (
                    <div className="description">No recording is available.</div>
                  )}
                </div>
              </div>
            )}

            <div className="ms-auto">
              <ZoomSessions data={props.data} role={props.role ? props.role : null} />
            </div>

            {/* <div className="d-flex mb-3">
              <div className="icon">
                <Readthedocs className="text-muted" width={20} />
              </div>
              <div>
                <div className="description">assessment.pdf</div>
                <div className="description">assessment.pdf</div>
              </div>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionCard;
