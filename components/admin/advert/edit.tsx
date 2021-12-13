import React from "react";
// react bootstrap
import { Button, Form, Modal } from "react-bootstrap";
// material icons
import { MessageSquareEdit } from "@styled-icons/boxicons-regular/";
// swr
import { mutate } from "swr";
// components
import AdvertsForm from "./advertsForm";
// api routes
import { ADVERTS_ENDPOINT } from "@constants/routes";
// api services
import { AdvertsUpdate } from "@lib/services/advertsservice";

const AdvertsEditView = (props: any) => {
  const [modal, setModal] = React.useState(false);
  const closeModal = () => setModal(false);
  const openModal = () => setModal(true);

  const [advertsData, setAdvertsData] = React.useState();
  const handleAdvertsData = (value: any) => {
    setAdvertsData(value);
  };

  React.useEffect(() => {
    if (props.data) {
      setAdvertsData(props.data);
    }
  }, [props.data]);

  const advertsUpdate = (event: any) => {
    event.preventDefault();
    AdvertsUpdate(advertsData)
      .then((res) => {
        mutate(
          ADVERTS_ENDPOINT,
          async (elements: any) => {
            let index = elements.findIndex((mutateData: any) => mutateData.id === res.id);
            return elements.map((oldElement: any, i: Number) => (i === index ? res : oldElement));
            // return elements.filter((oldElement: any, i) => i != index);
          },
          false
        );
        closeModal();
      })
      .catch((errors) => {
        console.log(errors);
      });
  };

  return (
    <>
      <Button variant="primary" className="btn-sm" onClick={openModal}>
        <div className="d-flex justify-content-center align-items-center">
          <MessageSquareEdit width="16" />
        </div>
      </Button>

      <Modal show={modal} onHide={closeModal} centered backdrop={"static"}>
        <Modal.Body>
          <Form onSubmit={advertsUpdate}>
            {advertsData && (
              <div>
                <AdvertsForm data={advertsData} handleData={handleAdvertsData} />
                <Button
                  variant="outline-primary"
                  className="btn-sm"
                  type="submit"
                  style={{ marginRight: "10px" }}
                >
                  Update Advert
                </Button>
                <Button variant="outline-secondary" className="btn-sm" onClick={closeModal}>
                  Close
                </Button>
              </div>
            )}
          </Form>
        </Modal.Body>
      </Modal>
      <Form></Form>
    </>
  );
};

export default AdvertsEditView;
