import React from "react";
// react bootstrap
import { Form, Dropdown, Modal, Button } from "react-bootstrap";
// styled components
import { Link } from "@styled-icons/boxicons-regular/Link";
import { TextareaT } from "@styled-icons/bootstrap/TextareaT";
import { File } from "@styled-icons/boxicons-regular/File";
import { Times } from "@styled-icons/fa-solid/Times";
import { FileEdit } from "@styled-icons/remix-fill/FileEdit";
// components
import { SlateEditor } from "@components/SlateEditor";
// swr
import { mutate } from "swr";
// node operations
import { addFileNodeAsChild } from "./helpers/nodeOperations";
// api routes
import { RESOURCE_WITH_NODE_ENDPOINT } from "@constants/routes";
// api services
import {
  ResourceNodeOperation,
  ResourceFileUpload,
  ResourceNodeEdit,
} from "@lib/services/resource.service";
import { APIFetcher } from "@lib/services";

const ResourceFormUpload = (props: any) => {
  const uploadFormat = [
    {
      name: "Doc Upload",
      icon: <File />,
      key: "document",
    },
    {
      name: "URL",
      icon: <Link />,
      key: "url",
    },
    {
      name: "Rich-Text Editor",
      icon: <TextareaT />,
      key: "rich-text",
    },
  ];
  const [dropdownToggle, setDropdownToggle] = React.useState<boolean>(false);
  const [modal, setModal] = React.useState<any>("");
  const [formData, setFormData] = React.useState<any>({
    kind: "document",
    url: "",
    content: "",
  });
  const [buttonLoader, setButtonLoader] = React.useState(false);

  const handleFormData = (key: any, value: any) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleDropdownToggle = () => {
    setDropdownToggle(!dropdownToggle);
  };

  const closeModal = () => {
    setModal("");
  };
  const openModal = (value: string) => {
    setFormData({ ...formData, kind: value, url: "", content: "" });
    setModal(value);
  };

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
        handleFormData("url", response.asset);
        setUploadTimerToggle(false);
        setUploadTimer(0);
      })
      .catch((errorData) => {});
  };

  const extractFileNameFromUrl = (url: string) => {
    let urlPayload: any = url ? url.split("/") : "";
    urlPayload = urlPayload && urlPayload.length > 0 ? urlPayload[urlPayload.length - 1] : "";
    if (urlPayload) return urlPayload;
    return "Rich Editor";
  };

  const createFileUploadTree = () => {
    if (props.upload_new) {
      let payload: any = null;
      payload = addFileNodeAsChild(props.data.id, extractFileNameFromUrl(formData.url), formData);
      setButtonLoader(true);
      ResourceNodeOperation(payload)
        .then((response) => {
          setButtonLoader(false);
          setModal("");
          setFormData({
            kind: "document",
            url: "",
            content: "",
          });
          mutate(
            RESOURCE_WITH_NODE_ENDPOINT(props.root_node_id),
            APIFetcher(RESOURCE_WITH_NODE_ENDPOINT(props.root_node_id)),
            false
          );
        })
        .catch((error) => {
          setButtonLoader(false);
          console.log(error);
        });
    } else {
      const payload = { id: props.data.id, data: formData };
      setButtonLoader(true);

      ResourceNodeEdit(payload)
        .then((response) => {
          setButtonLoader(false);
          setModal("");
          setFormData({
            kind: "document",
            url: "",
            content: "",
          });
          mutate(
            RESOURCE_WITH_NODE_ENDPOINT(props.root_node_id),
            APIFetcher(RESOURCE_WITH_NODE_ENDPOINT(props.root_node_id)),
            false
          );
        })
        .catch((error) => {
          console.log(error);
          setButtonLoader(false);
        });
    }
  };

  return (
    <div className="p-0 m-0">
      {/* drop down */}
      {props.upload_new ? (
        <div className="dropdown-wrapper global-dropdown">
          <Dropdown show={dropdownToggle} onToggle={handleDropdownToggle}>
            <Dropdown.Toggle as="div" className="icon">
              <div>{props.children}</div>
            </Dropdown.Toggle>

            <Dropdown.Menu className="content-wrapper p-0">
              {uploadFormat &&
                uploadFormat.length > 0 &&
                uploadFormat.map((upload: any, index: any) => (
                  <div
                    key={upload.key}
                    className="content-item"
                    onClick={() => openModal(upload.key)}
                  >
                    <div className="icon">{upload.icon}</div>
                    <div className="text">{upload.name}</div>
                  </div>
                ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      ) : (
        <div
          onClick={() => {
            openModal(props.data.data.data.kind ? props.data.data.data.kind : "document");
            setFormData({
              kind: props.data.data.data.kind ? props.data.data.data.kind : "document",
              url: props.data.data.data.url ? props.data.data.data.url : "",
              content: props.data.data.data.content ? props.data.data.data.content : "",
            });
          }}
        >
          <FileEdit />
        </div>
      )}
      {/* modal */}
      <Modal show={modal} onHide={closeModal} centered backdrop={"static"}>
        <Modal.Body>
          <div className="d-flex align-items-center mb-3 pb-2 border-bottom">
            <h5 className="p-0 m-0">Resource Upload</h5>
            <div className="ms-auto" onClick={closeModal}>
              <Times size="16px" />
            </div>
          </div>
          <div>
            <Form.Group className="mb-3" controlId={`form-control-resources-upload`}>
              <Form.Label>Upload Kind</Form.Label>
              <Form.Control
                as="select"
                required
                size="sm"
                className="mb-2"
                value={modal}
                onChange={(e) => openModal(e.target.value)}
              >
                <option value="">Select Upload method</option>
                {uploadFormat &&
                  uploadFormat.length > 0 &&
                  uploadFormat.map((upload: any, index: any) => (
                    <option key={upload.key} value={upload.key}>
                      {upload.name}
                    </option>
                  ))}
              </Form.Control>
            </Form.Group>

            <div>
              {modal === "document" ? (
                <>
                  <Form.Control
                    ref={hiddenFileInput}
                    type="file"
                    onChange={readFile}
                    required={true}
                    style={{ display: "none" }}
                  />
                  {formData && formData.url && formData.url.length > 0 ? (
                    <>
                      <div className="d-flex align-items-center">
                        <div>{formData.url}</div>
                        <div className="ms-auto" onClick={() => handleFormData("url", "")}>
                          <Times size="16" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <Button className="btn-sm" onClick={handleClick} disabled={uploadTimerToggle}>
                      {uploadTimerToggle ? `Uploading File ${uploadTimer}%` : "Upload File"}
                    </Button>
                  )}
                </>
              ) : modal === "url" ? (
                <>
                  <Form.Group className="mb-3" controlId="resources-modal-url-editor">
                    <Form.Label>Enter File URL</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={formData.url}
                      onChange={(e: any) => handleFormData("url", e.target.value)}
                    />
                  </Form.Group>
                </>
              ) : modal === "rich-text" ? (
                <>
                  <SlateEditor
                    readOnly={false}
                    initialValue={formData.content}
                    handleData={(value: any) => handleFormData("content", value)}
                  />
                </>
              ) : (
                <div className="text-center mt-5 mb-5 text-secondary">
                  <small>Select Upload Kind</small>
                </div>
              )}
            </div>
          </div>
          <div className="mt-3 pt-2 border-top"></div>
          <Button className="btn-sm" onClick={createFileUploadTree}>
            {buttonLoader ? "Processing..." : props.upload_new ? "Upload" : "Update"}
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ResourceFormUpload;
