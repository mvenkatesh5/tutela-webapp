import React from "react";
// react bootstrap
import { Card, Row, Col, Image, Button } from "react-bootstrap";
// material icons
import { LinkAlt } from "@styled-icons/boxicons-regular";
import { TextLeft } from "@styled-icons/bootstrap";
import { Users } from "@styled-icons/fa-solid";
import { User } from "@styled-icons/boxicons-regular";
import { Readthedocs } from "@styled-icons/simple-icons";
import { CheveronDown } from "@styled-icons/zondicons";
// components
import ZoomSessions from "@components/zoomsessions";
import IconStacking from "@components/IconStacking";
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
            <div className="d-flex align-items-center">
              <div className="icon">
                <Image className="img-fluid rounded me-3" src="/bird.svg" />
              </div>
              <div>
                <div className="heading">{props.data.title}</div>
              </div>
              <div>
                <div className="badge border bg-light text-dark ms-3">
                  {datePreview(props.data.datetime)}
                </div>
              </div>
              <div className="ms-auto">
                <ZoomSessions data={props.data} role={props.role ? props.role : null} />
              </div>
              <div className="text-end ms-2" onClick={handleSessionDetailView}>
                <CheveronDown className="text-muted" width={20} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="session-card-root-container">
            <div className="d-flex mb-3">
              <div className="icon">
                <Image className="img-fluid rounded me-3" src="/bird.svg" />
              </div>
              <div>
                <div className="heading">{props.data.title}</div>
                <div className="description">{datePreview(props.data.datetime)}</div>
                {/* <div className="description">Weekly on weekdays</div> */}
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
                      <IconStacking data={studentImages} multiple={true} />
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
                    <IconStacking data={teacherImages} multiple={true} />
                  </div>
                  {/* <div className=" mt-2 ms-2">Hello</div> */}
                </div>
              )}
            </div>

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
