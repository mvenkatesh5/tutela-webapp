import React from "react";
// react bootstrap
import { Button, Form, Modal } from "react-bootstrap";
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
      <Button variant="outline-primary" className="btn-sm" onClick={openModal}>
        Edit
      </Button>

      <Modal show={modal} onHide={closeModal} centered backdrop={"static"}>
        <Modal.Body>
          <Form onSubmit={channelUpdate}>
            <h4>Edit</h4>
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
                  {buttonLoader ? "Updating Channel..." : "Update Channel"}
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
    </div>
  );
};

export default ChannelEditView;
