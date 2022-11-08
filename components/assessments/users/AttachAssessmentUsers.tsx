import React from "react";
// react bootstrap
import { Button, Form, Modal } from "react-bootstrap";
// components
import UserDropdown from "./UserDropdown";
// api services
import { CreateResourceUserAllocation } from "@lib/services/resource.service";
// global context provider
import { globalContext } from "@contexts/global";

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
  const [globalState, globalDispatch] = React.useContext(globalContext);

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

  const [selectedTeachers, setSelectedTeachers] = React.useState<any>();
  const handleSelectedTeachers = (value: any) => {
    setSelectedTeachers(value);
  };

  const [selectedUsers, setSelectedUsers] = React.useState<any>();
  const handleSelectedUsers = (value: any) => {
    setSelectedUsers(value);
  };
  const [selectedUserDates, setSelectedUserDates] = React.useState<any>([]);
  const handleSelectedUserDates = (value: any) => {
    setSelectedUserDates(value);
  };

  const [buttonLoader, setButtonLoader] = React.useState(false);
  const onSubmit = () => {
    if (
      selectedTeachers &&
      selectedTeachers.length > 0 &&
      selectedUserDates &&
      selectedUserDates.length > 0
    ) {
      setButtonLoader(true);
      let studentDateData: any = [];
      selectedUserDates.map((_date: any) => {
        studentDateData.push({ ..._date, datetime: new Date(_date?.datetime) });
      });
      let assessmentEnrollPayload = {
        node_id: resource?.id,
        data: {
          teacher_id: selectedTeachers[0],
          students: studentDateData,
        },
      };
      CreateResourceUserAllocation(assessmentEnrollPayload)
        .then((response) => {
          console.log(response);
          setButtonLoader(false);
          handleAssessmentUserData(null);
          globalDispatch({
            type: "ADD_TOAST_ALERT",
            payload: { kind: "success", description: "Added user successfully." },
          });
        })
        .catch((error) => {
          console.log(error);
          setButtonLoader(false);
          globalDispatch({
            type: "ADD_TOAST_ALERT",
            payload: { kind: "warning", description: "Something went wrong. PLease check later." },
          });
        });
    } else {
      alert("Please select user and teachers");
    }
  };

  return (
    <div>
      <Modal show={modal} onHide={closeModal} centered backdrop={"static"}>
        <Modal.Body>
          <h6 className="mb-3">Assessment Users and scheduled At</h6>
          <div className="mb-3">
            <Form.Group>
              <Form.Label className="mb-1 text-muted text-sm">Select Teacher</Form.Label>
              {users && users.length > 0 && (
                <UserDropdown
                  users={users}
                  data={selectedTeachers}
                  handleData={setSelectedTeachers}
                  role={1}
                  validInput={1}
                />
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label className="mb-1 text-muted text-sm">Select Users</Form.Label>
              {users && users.length > 0 && (
                <UserDropdown
                  users={users}
                  data={selectedUsers}
                  handleData={handleSelectedUsers}
                  dates={selectedUserDates}
                  handleDates={handleSelectedUserDates}
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
              type="button"
              style={{ marginRight: "10px" }}
              disabled={buttonLoader}
              onClick={onSubmit}
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
