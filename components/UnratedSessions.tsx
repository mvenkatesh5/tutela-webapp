import React, { useEffect, useState } from "react";
// react bootstrap
import { Container, Modal } from "react-bootstrap";
// components
import UnratedSessionCard from "./UnratedSessionCard";

const UnratedSessions = (props: any) => {
  const [unratedSessionsData, setUnratedSessionsData] = useState<any>();

  useEffect(() => {
    if (props.data) setUnratedSessionsData(props.data);
  }, [props.data]);

  const [modal, setModal] = useState<boolean>(true);
  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  return (
    <div>
      <Modal size={"lg"} show={modal} onHide={closeModal} centered backdrop={"static"}>
        <Modal.Body>
          <Container>
            <h5 className="mb-3">Rate your Sessions</h5>
            {unratedSessionsData && unratedSessionsData.length > 0 && (
              <div>
                {unratedSessionsData.map((session: any, index: any) => (
                  <div key={`unrated-session-${index}`} className="mb-2">
                    <UnratedSessionCard
                      data={session}
                      handleData={setUnratedSessionsData}
                      user={props.user}
                    />
                  </div>
                ))}
              </div>
            )}
          </Container>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UnratedSessions;
