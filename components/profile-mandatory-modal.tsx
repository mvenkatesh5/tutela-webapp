import React, { useEffect, useState } from "react";
// next imports
import { useRouter } from "next/router";
// react bootstrap
import { Button, Container, Modal } from "react-bootstrap";
// icons
import { UserCheck } from "@styled-icons/fa-solid/UserCheck";
// global context provider
import { globalContext } from "@contexts/global";

const ProfileMandatoryModal = () => {
  const router = useRouter();
  const [globalState, globalDispatch] = React.useContext(globalContext);

  const [modal, setModal] = useState<boolean>(true);
  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  useEffect(() => {
    if (globalState && globalState?.profileMandatoryToggle) openModal();
  }, [globalState]);

  const redirect = () => {
    globalDispatch({
      type: "PROFILE_MANDATORY_TOGGLE",
      payload: false,
    });
    router.push("/profile");
  };

  return (
    <div>
      <Modal size={"lg"} show={modal} onHide={closeModal} centered backdrop={"static"}>
        <Modal.Body>
          <Container>
            <h5 className="mb-3">Mandatory profile completion.</h5>
            <div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-gap-5">
              <UserCheck className="tw-w-[120px] tw-h-[120px] tw-text-[#1f475f]" />
              <div className="tw-text-xl tw-font-medium tw-text-transparent tw-bg-clip-text tw-bg-gradient-to-r tw-from-[#11293a] tw-to-[#1f475f]">
                Complete your profile to continue accessing the tutelaprep
              </div>
              <div className="tw-mb-5">
                <Button onClick={redirect}>Complete your profile</Button>
              </div>
            </div>
          </Container>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProfileMandatoryModal;
