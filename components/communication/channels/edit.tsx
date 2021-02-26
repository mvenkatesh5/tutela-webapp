import React from "react";
// react bootstrap
import { Button, Form, Modal } from "react-bootstrap";
// material icons
import { CalendarEdit } from "@styled-icons/boxicons-regular/CalendarEdit";
// swr
import { mutate } from "swr";
// components
import ChannelForm from "./helpers/formRender";
// api routes
import { CHANNEL_ENDPOINT } from "@constants/routes";
// api services
import { ChannelUpdate } from "@lib/services/communicationService";

const ChannelEditView = (props: any) => {
  const [buttonLoader, setButtonLoader] = React.useState<any>(false);

  const [modal, setModal] = React.useState<any>(false);
  const closeModal = () => setModal(false);
  const openModal = () => setModal(true);

  const [channelData, setChannelsData] = React.useState<any>();
  const handleChannelsData = (value: any) => {
    setChannelsData(value);
  };

  React.useEffect(() => {
    if (props.data) {
      setChannelsData({
        ...channelData,
        name: props.data.name ? props.data.name : "",
        description: props.data.description ? props.data.description : "",
        collapse:
          props.data.settings && props.data.settings.collapse
            ? props.data.settings.collapse
            : false,
      });
    }
  }, [props.data]);

  const channelUpdate = (event: any) => {
    event.preventDefault();
    setButtonLoader(true);
    const channelPayload = {
      id: props.data.id,
      name: channelData.name,
      description: channelData.description,
      settings: {
        collapse: channelData.collapse,
      },
    };

    ChannelUpdate(channelPayload)
      .then((res) => {
        mutate(
          CHANNEL_ENDPOINT,
          async (elements: any) => {
            let index = elements.findIndex((mutateData: any) => mutateData.id === res.id);
            return elements.map((oldElement: any, i: Number) => (i === index ? res : oldElement));
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
      <p className="m-0 text-primary" onClick={openModal}>
        Edit
      </p>
      {/* <Button variant="outline-primary border-0" className="btn-sm" onClick={openModal}>
        <CalendarEdit width="20" />
      </Button> */}

      <Modal show={modal} onHide={closeModal} centered backdrop={"static"}>
        <Modal.Body>
          <Form onSubmit={channelUpdate}>
            <div className="d-flex align-items-center mb-2">
              <div>
                <h4 className="p-0 m-0">Edit</h4>
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
            {channelData && (
              <div>
                <ChannelForm data={channelData} handleData={handleChannelsData} />
                <Button
                  variant="outline-primary"
                  className="btn-sm"
                  type="submit"
                  style={{ marginRight: "10px" }}
                  disabled={buttonLoader}
                >
                  {buttonLoader ? "Updating..." : "Update"}
                </Button>
              </div>
            )}
          </Form>
        </Modal.Body>
      </Modal>
      <Form></Form>
    </div>
  );
};

export default ChannelEditView;
