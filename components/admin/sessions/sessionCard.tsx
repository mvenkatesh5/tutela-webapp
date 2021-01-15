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
import IconStacking from "@components/IconStacking";

const SessionCard = (props: any) => {
  const [studentImages, setStudentImages] = React.useState([
    "/bird.svg",
    "/logo.svg",
    "/questions.svg",
    "/quote.svg",
    "/news.svg",
    "/bird.svg",
  ]);

  const [teacherImage, setTeacherImage] = React.useState();
  const [sessionDetailView, setSessionDetailView] = React.useState(false);
  const handleSessionDetailView = () => {
    setSessionDetailView(!sessionDetailView);
  };

  console.log("props", props);

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
                <div className="badge border bg-light text-dark ms-3">8 AM – 9 AM</div>
              </div>
              <div className="ms-auto text-end" onClick={handleSessionDetailView}>
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
                <div className="description">Sunday, November 21 ⋅ 8 AM – 9 AM</div>
                <div className="description">Weekly on weekdays</div>
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
                  <div className="description">https://us02web.zoom.us/j/9870999452</div>
                </div>
              </div>
            </div>

            <div className="d-flex">
              <div className="d-flex mb-3 w-100" style={{ marginRight: "10px" }}>
                <div className="small-icon">
                  <Users className="text-muted" width={20} />
                </div>
                <div>
                  <div className="d-flex">
                    <div className="secondary-heading">20 students</div>
                    <div className="description ms-2">- 18 yes, 2 awaiting</div>
                  </div>
                  <div className="mt-1">
                    <IconStacking data={studentImages} multiple={true} />
                  </div>
                </div>
              </div>
              <div className="d-flex mb-3 w-100" style={{ marginLeft: "10px" }}>
                <div className="small-icon">
                  <User className="text-muted" width={20} />
                </div>
                <div className="">
                  <IconStacking data={teacherImage} multiple={false} />
                </div>
                <div className=" mt-2 ms-2">Hello</div>
              </div>
            </div>

            <div className="d-flex mb-3">
              <div className="icon">
                <Readthedocs className="text-muted" width={20} />
              </div>
              <div>
                <div className="description">assessment.pdf</div>
                <div className="description">assessment.pdf</div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* <IconStacking data={studentImages} multiple={true} />
      <IconStacking data={teacherImage} multiple={false} /> */}
    </div>
  );
};

export default SessionCard;
