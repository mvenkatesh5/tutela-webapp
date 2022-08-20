import React, { useEffect, useState } from "react";
// react bootstrap
import { Container, Modal } from "react-bootstrap";
// component
import TopicCard from "./TopicCard";
// icons
import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline";

const UnratedSessions = (props: any) => {
  const [unratedSessionsData, setUnratedSessionsData] = useState<any>();

  useEffect(() => {
    if (props.data) setUnratedSessionsData(props.data);
  }, [props.data]);

  const [modal, setModal] = useState<boolean>(false);
  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);
  const students = [
    { name: "Meeting Name", timing: "8 AM - 9 AM", image: "/bird.svg" },
    { name: "Meeting Name", timing: "8 AM - 9 AM", image: "/bird.svg" },
    { name: "Meeting Name", timing: "8 AM - 9 AM", image: "/bird.svg" },
  ];
  
  return (
    <div>
      <div onClick={openModal}>{props.children}</div>
      <Modal show={modal} onHide={closeModal} centered backdrop={"static"}>
        <Modal.Body>
          <Container>
            <div className="d-flex align-items-center justify-content-between">
              <h5 className="mb-3">Topic Name</h5>
              <div onClick={closeModal}>
                <CloseOutline width="20px" />
              </div>
            </div>
            {students &&
              students.map((data: any, index: any) => (
                <div key={`index-students-${index}`} className="">
                  <TopicCard data={data} />
                </div>
              ))}
          </Container>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UnratedSessions;
