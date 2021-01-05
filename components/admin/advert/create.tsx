import React from "react";
// react bootstrap
import { Button, Form, Modal } from "react-bootstrap";
// swr
import { mutate } from "swr";
// components
import AdvertsForm from "./advertsForm";
// api routes
import { ADVERTS_ENDPOINT } from "@constants/routes";
// api services
import { AdvertsCreate } from "@lib/services/advertsservice";

const AdvertsCreateView = () => {
  const [modal, setModal] = React.useState(false);
  const closeModal = () => {
    setModal(false);
    setAdvertsData({
      image: "",
      title: "",
      data: {},
    });
  };
  const openModal = () => setModal(true);

  const [advertsData, setAdvertsData] = React.useState({
    image: "",
    title: "",
    data: {},
  });
  const handleAdvertsData = (value: any) => {
    setAdvertsData(value);
  };

  const advertsCreate = (event: any) => {
    event.preventDefault();
    console.log(advertsData);
    AdvertsCreate(advertsData)
      .then((res) => {
        console.log(res);
        mutate(
          ADVERTS_ENDPOINT,
          async (elements: any) => {
            return [...elements, res];
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
    <div>
      <Button variant="primary" className="btn-sm" onClick={openModal}>
        Add Adverts
      </Button>

      <Modal show={modal} onHide={closeModal} centered backdrop={"static"}>
        <Modal.Body>
          <Form onSubmit={advertsCreate}>
            <AdvertsForm data={advertsData} handleData={handleAdvertsData} />
            <Button
              variant="outline-primary"
              className="btn-sm"
              type="submit"
              style={{ marginRight: "10px" }}
            >
              Create Adverts
            </Button>
            <Button variant="outline-secondary" className="btn-sm" onClick={closeModal}>
              Close
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Form></Form>
    </div>
  );
};

export default AdvertsCreateView;
