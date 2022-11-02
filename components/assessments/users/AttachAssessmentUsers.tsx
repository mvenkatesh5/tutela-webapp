import React from "react";
// react bootstrap
import { Button, Form, Modal } from "react-bootstrap";
// components
import UserDropdown from "./UserDropdown";

interface IAttachAssessmentUsers {
  resource?: any;
  handleAssessmentUserData?: any;
  users?: any;
}

const AttachAssessmentUsers: React.FC<IAttachAssessmentUsers> = ({
  resource,
  handleAssessmentUserData,
  users,
}) => {
  const [modal, setModal] = React.useState(false);
  const closeModal = () => {
    setModal(false);
    setTimeout(() => {
      if (handleAssessmentUserData) handleAssessmentUserData(null);
    }, 500);
  };
  const openModal = () => setModal(true);

  React.useEffect(() => {
    if (resource) {
      openModal();
    }
  }, [resource]);

  const [selectedUsers, setSelectedUsers] = React.useState<any>();
  const handleSelectedUsers = (value: any) => {
    setSelectedUsers(value);
  };

  const [buttonLoader, setButtonLoader] = React.useState(false);

  return (
    <div>
      <Modal show={modal} onHide={closeModal} centered backdrop={"static"}>
        <Modal.Body>
          <h6 className="mb-3">Assessment Users and scheduled At</h6>
          <div className="mb-3">
            <Form.Group>
              <Form.Label className="mb-1 text-muted text-sm">Select Users</Form.Label>
              {users && users.length > 0 && (
                <UserDropdown
                  users={users}
                  data={selectedUsers}
                  handleData={handleSelectedUsers}
                  role={0}
                  validInput={users.length}
                />
              )}
            </Form.Group>
          </div>

          <div className="d-flex gap-2">
            <Button variant="outline-secondary" className="btn-sm ms-auto" onClick={closeModal}>
              Close
            </Button>
            <Button
              variant="outline-primary"
              className="btn-sm"
              type="submit"
              style={{ marginRight: "10px" }}
              disabled={buttonLoader}
            >
              {buttonLoader ? "Processing..." : "Continue"}
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AttachAssessmentUsers;
