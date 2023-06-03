import React from "react";
// styled icons
import { Times } from "@styled-icons/fa-solid/Times";
// react bootstrap
import { Form, Button } from "react-bootstrap";
// api routes
import { RESOURCE_WITH_NODE_ENDPOINT } from "@constants/routes";
// api services
import { ResourceFileUpload } from "@lib/services/resource.service";

const NewsFormView = (props: any) => {
  const [formPayload, setFormPayload] = React.useState(Object);
  const handleFormPayload = (key: any, value: any) => {
    setFormPayload({ ...formPayload, [key]: value });
    props.handleData({ ...formPayload, [key]: value });
  };

  React.useEffect(() => {
    if (props.data) {
      setFormPayload(props.data);
    }
  }, [props.data]);

  const hiddenFileInput: any = React.useRef(null);
  const handleClick = (event: any) => {
    if (hiddenFileInput) hiddenFileInput.current.click();
  };
  const [uploadTimerToggle, setUploadTimerToggle] = React.useState(false);
  const [uploadTimer, setUploadTimer] = React.useState(0);

  const readFile = (input: any) => {
    if (input.target.files && input.target.files[0]) {
      setUploadTimerToggle(true);
      let formData = new FormData();
      const ImageData = {
        name: input.target.files[0].name,
      };
      formData.append("asset", input.target.files[0]);
      formData.append("attributes", JSON.stringify(ImageData));

      uploadImageToS3(formData);
    }
  };

  const uploadImageToS3 = (formData: any) => {
    const config: any = {
      onUploadProgress: function (progressEvent: any) {
        var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setUploadTimer(percentCompleted);
        if (percentCompleted === 100) {
          // setUploadTimerToggle(false);
          // setUploadTimer(0);
        }
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    };
    ResourceFileUpload(formData, config)
      .then((response) => {
        handleFormPayload("image_url", response.asset);
        setUploadTimerToggle(false);
        setUploadTimer(0);
      })
      .catch((errorData) => {});
  };

  return (
    <div>
      <Form.Group className="mb-2">
        <Form.Label as="div" className="mb-1 text-muted">
          Image URL
        </Form.Label>
        {formPayload && formPayload.image_url && formPayload.image_url.length > 0 ? (
          <>
            <div className="d-flex align-items-center">
              <div>{formPayload.image_url}</div>
              <div className="ms-auto" onClick={() => handleFormPayload("image_url", "")}>
                <Times size="16" />
              </div>
            </div>
          </>
        ) : (
          <>
            <Button className="btn-sm" onClick={handleClick} disabled={uploadTimerToggle}>
              {uploadTimerToggle ? `Uploading File ${uploadTimer}%` : "Upload Image"}
            </Button>
            <Form.Control
              ref={hiddenFileInput}
              type="file"
              onChange={readFile}
              required={true}
              style={{ display: "none" }}
            />
          </>
        )}
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label className="mb-1 text-muted">Title</Form.Label>
        <Form.Control
          type="text"
          value={formPayload.title}
          onChange={(e) => handleFormPayload("title", e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="mb-1 text-muted">Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={formPayload.description}
          onChange={(e) => handleFormPayload("description", e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="mb-1 text-muted">Redirection Link</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={formPayload.link}
          onChange={(e) => handleFormPayload("link", e.target.value)}
          required
        />
      </Form.Group>
    </div>
  );
};

export default NewsFormView;
