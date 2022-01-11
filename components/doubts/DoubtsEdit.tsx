import React from "react";
// react bootstrap
import { Button, Modal, Form } from "react-bootstrap";
// material icons
import { Close } from "@styled-icons/evaicons-solid/Close";
// swr
import { mutate } from "swr";
// components
import SearchCheckboxView from "@components/admin/sessions/SearchCheckbox";
// api services
import { DoubtEdit } from "@lib/services/doubts.service";

const DoubtsEdit = ({ children, doubt, mutateQuery, doubt_detail, users }: any) => {
  const [modal, setModal] = React.useState(false);
  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
    setFormData({ text: "" });
  };

  const [teachersList, setTeachersList] = React.useState<any>();
  const [teachers, setTeachers] = React.useState<any>();

  const [buttonLoader, setButtonLoader] = React.useState(false);
  const [formData, setFormData] = React.useState<any>({
    text: "",
  });
  const handleFormData = (key: any, value: any) => {
    setFormData({ ...formData, [key]: value });
  };

  React.useEffect(() => {
    if (doubt) {
      setFormData({
        ...formData,
        text: doubt.text,
        description: doubt?.data?.description || "",
      });
    }
  }, [doubt]);

  React.useEffect(() => {
    if (users && users.length > 0) {
      let user_role_teacher: any = [{ name: "No teacher selected", value: null }];
      users.map((user: any) => {
        if (user.role === 1) {
          const payload = {
            name: `${user.first_name} ${user.last_name} (${user.email})`,
            value: user.id,
          };
          user_role_teacher.push(payload);
        }
      });
      if (user_role_teacher && user_role_teacher.length > 0) {
        setTeachersList(user_role_teacher);
        if (doubt.allocated_to) {
          let userElement = user_role_teacher.find((_: any) => _.value === doubt.allocated_to);
          if (userElement) setTeachers(userElement);
        } else setTeachers(user_role_teacher[0]);
      }
    }
  }, [users]);

  const editDoubt = () => {
    if (formData.text) {
      const payload = {
        id: doubt.id,
        text: formData.text,
        data: {
          description: formData.description,
        },
        allocated_to: teachers.value,
      };
      setButtonLoader(true);
      DoubtEdit(payload)
        .then((response) => {
          setButtonLoader(false);
          if (doubt_detail)
            mutate(
              mutateQuery,
              async (elements: any) => {
                let element = { ...elements };
                element.text = response.text;
                element.data = response.data;
                return element;
              },
              false
            );
          else
            mutate(
              mutateQuery,
              async (elements: any) => {
                let index = elements.findIndex((mutateData: any) => mutateData.id === response.id);
                return elements.map((_ele: any, i: Number) => (i === index ? response : _ele));
              },
              false
            );
          closeModal();
        })
        .catch((error) => {
          setButtonLoader(false);
        });
    }
  };

  return (
    <div>
      <Modal
        show={modal}
        onHide={closeModal}
        backdrop="static"
        closeButton
        centered
        keyboard={false}
      >
        <Modal.Body className="m-2 mt-2 troubleshoot-wrapper">
          <div className="primary-heading pb-3 d-flex">
            <h4>Delete Doubt</h4>
            <div className="ms-auto">
              <Button onClick={closeModal} className="close-button mt-0">
                <Close width="25px" className="icon" />
              </Button>
            </div>
          </div>
          <div className="my-4 mt-1">
            <div className="mb-2">
              <Form.Group className="mb-2">
                <Form.Label className="mb-1 text-muted">Title</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.text}
                  onChange={(e: any) => handleFormData("text", e.target.value)}
                  required
                />
              </Form.Group>
            </div>
            <div>
              <Form.Group className="mb-2">
                <Form.Label className="mb-1 text-muted">Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={formData.description}
                  placeholder="Enter news here"
                  onChange={(e) => handleFormData("description", e.target.value)}
                  required
                />
              </Form.Group>
            </div>
            <div>
              <div>
                <Form.Group className="mb-2">
                  <Form.Label>
                    <div className="text-muted">Teachers</div>
                  </Form.Label>
                  <SearchCheckboxView
                    users={teachersList}
                    data={teachers}
                    handleData={(value: any) => setTeachers(value)}
                  />
                </Form.Group>
              </div>
            </div>
          </div>

          <div className="d-flex gap-2">
            <Button onClick={closeModal} variant="secondary" className="ms-auto">
              Close
            </Button>
            <Button variant="primary" disabled={buttonLoader} onClick={editDoubt}>
              {buttonLoader ? "Processing..." : "Continue"}
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      <div onClick={openModal}>{children}</div>
    </div>
  );
};

export default DoubtsEdit;
