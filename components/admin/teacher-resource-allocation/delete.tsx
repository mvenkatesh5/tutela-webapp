import React from "react";
// react bootstrap
import { Button, Modal } from "react-bootstrap";
// swr
import { mutate } from "swr";
// api services
import { TeacherResourceService } from "@lib/services/teacher-resource.service";

const TeacherResourceDelete: React.FC<any> = ({
  user_id,
  currentTeacherResource,
  handleCurrentTeacherResource,
}) => {
  const [buttonLoader, setButtonLoader] = React.useState<boolean>(false);

  const [modal, setModal] = React.useState(false);
  const closeModal = () => {
    setModal(false);
    setButtonLoader(false);
    handleCurrentTeacherResource(null);
  };
  const openModal = () => setModal(true);

  React.useEffect(() => {
    if (currentTeacherResource && currentTeacherResource?.type === "delete" && !modal) openModal();
  }, [modal, currentTeacherResource]);

  const onSubmit = () => {
    setButtonLoader(true);
    const payload = {
      teacher: user_id,
      node: currentTeacherResource?.data?.id,
    };
    TeacherResourceService.delete(payload)
      .then((response) => {
        mutate("TEACHER_RESOURCES", false);
        closeModal();
      })
      .catch((error) => {
        setButtonLoader(true);
      });
  };

  return (
    <div>
      <Modal show={modal} onHide={closeModal} centered backdrop={"static"}>
        <Modal.Body>
          <h6 className="mb-3">Remove resource from teacher.</h6>

          <p>
            Are you sure you want to detach resource {'"'}
            <b>{currentTeacherResource?.data?.title}</b>
            {'"'} from teacher.
          </p>

          <div>
            <Button
              variant="outline-danger"
              className="btn-sm"
              style={{ marginRight: "10px" }}
              disabled={buttonLoader}
              type="button"
              onClick={onSubmit}
            >
              {buttonLoader ? "Processing..." : "Continue"}
            </Button>
            <Button variant="outline-secondary" className="btn-sm" onClick={closeModal}>
              Close
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TeacherResourceDelete;
