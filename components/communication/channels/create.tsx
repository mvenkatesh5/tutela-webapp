import React from "react";
// react bootstrap
import { Button, Form, Modal } from "react-bootstrap";
// material icons
import { Plus } from "@styled-icons/bootstrap";
// swr
import { mutate } from "swr";
// components
import ChannelForm from "./helpers/formRender";
// api routes
import { CHANNEL_ENDPOINT } from "@constants/routes";
// api services
import { ChannelCreate } from "@lib/services/communicationService";

const ChannelCreateView = () => {
  const [buttonLoader, setButtonLoader] = React.useState<any>(false);

  const [modal, setModal] = React.useState<any>(false);
  const closeModal = () => {
    setModal(false);
    setChannelData({
      name: "",
      description: "",
      collapse: false,
    });
  };
  const openModal = () => setModal(true);

  const [channelData, setChannelData] = React.useState<any>({
    name: "",
    description: "",
    collapse: false,
  });
  const handleChannelData = (value: any) => {
    setChannelData(value);
  };

  const channelCreate = (event: any) => {
    event.preventDefault();
    setButtonLoader(true);
    const channelPayload = {
      name: channelData.name,
      description: channelData.description,
      settings: {
        collapse: channelData.collapse,
      },
    };

    ChannelCreate(channelPayload)
      .then((res) => {
        mutate(
          CHANNEL_ENDPOINT,
          async (elements: any) => {
            return [...elements, res];
          },
          false
        );
        closeModal();
        setButtonLoader(false);
      })
      .catch((errors) => {
        console.log(errors);
        setButtonLoader(false);
      });
  };

  return (
    <div>
      <div className="d-flex">
        <div className="ms-auto">
          <Button variant="primary" className="btn-sm border ms-auto" onClick={openModal}>
            <Plus width="20" />
            Add Channel
          </Button>
        </div>
      </div>

      <Modal show={modal} onHide={closeModal} centered backdrop={"static"}>
        <Modal.Body>
          <Form onSubmit={channelCreate}>
            <div className="d-flex align-items-center mb-2">
              <div>
                <h4 className="p-0 m-0">Create</h4>
              </div>
              <div className="ms-auto">
                <Button
                  variant="outline-secondary border-0"
                  className="btn-sm"
                  onClick={closeModal}
                >
                  Close
                </Button>
              </div>
            </div>

            <ChannelForm data={channelData} handleData={handleChannelData} />
            <Button
              variant="outline-primary"
              className="btn-sm"
              type="submit"
              style={{ marginRight: "10px" }}
              disabled={buttonLoader}
            >
              {buttonLoader ? "Creating Channel..." : "Create Channel"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ChannelCreateView;
