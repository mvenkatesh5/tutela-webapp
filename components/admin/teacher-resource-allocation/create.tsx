import React from "react";
// react bootstrap
import { Button, Modal } from "react-bootstrap";
// swr
import { mutate } from "swr";
// icons
import { FileTextOutline } from "@styled-icons/evaicons-outline/FileTextOutline";
// components
import ResourceSearchCheckboxView from "./resource-checkbox";
// api services
import { TeacherResourceService } from "@lib/services/teacher-resource.service";

const TeacherResourceCreate: React.FC<any> = ({
  currentTeacher,
  resources,
  teacherResources,
  currentTeacherResource,
  handleCurrentTeacherResource,
}) => {
  const [buttonLoader, setButtonLoader] = React.useState<boolean>(false);

  const [productResources, setProductResources] = React.useState<any>(null);
  const handleProductResources = (value: any) => {
    setProductResources(value);
  };

  const [modal, setModal] = React.useState(false);
  const closeModal = () => {
    setModal(false);
    setButtonLoader(false);
    handleCurrentTeacherResource(null);
    setProductResources(null);
  };
  const openModal = () => setModal(true);

  React.useEffect(() => {
    if (currentTeacherResource && currentTeacherResource?.type === "create" && !modal) openModal();
  }, [modal, currentTeacherResource]);

  const onSubmit = () => {
    if (productResources && productResources.length > 0) {
      setButtonLoader(true);
      const payload = {
        teacher: currentTeacher?.id,
        node: productResources[0],
      };
      TeacherResourceService.create(payload)
        .then((response) => {
          mutate("TEACHER_RESOURCES", false);
          closeModal();
        })
        .catch((error) => {
          setButtonLoader(true);
        });
    } else {
      alert("Please select at least one resource to allocate");
    }
  };

  const renderResources = (_resources: any) => {
    if (teacherResources.teacher_nodes && teacherResources.teacher_nodes.length > 0) {
      return _resources.filter((_item: any) => !teacherResources.teacher_nodes.includes(_item?.id));
    } else return _resources;
    console.log("teacher_nodes", teacherResources.teacher_nodes);
  };

  return (
    <div>
      <Modal show={modal} onHide={closeModal} centered backdrop={"static"}>
        <Modal.Body>
          <h6 className="mb-3">Allocate resource to teacher.</h6>

          <div>
            {resources && resources.length > 0 && (
              <>
                <div className="mb-1 text-muted tw-flex tw-items-center gap-2">
                  <FileTextOutline size={20} />
                  Resources
                </div>
                <ResourceSearchCheckboxView
                  resources={renderResources(resources)}
                  data={productResources}
                  handleData={handleProductResources}
                />
              </>
            )}
          </div>

          <div>
            <Button
              variant="outline-primary"
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

export default TeacherResourceCreate;
