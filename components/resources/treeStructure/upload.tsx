import React from "react";
// react bootstrap
import { Form } from "react-bootstrap";
// swr
import { mutate } from "swr";
// node operations
import { addFileNodeAsChild } from "./helpers/nodeOperations";
// api routes
import { RESOURCE_WITH_NODE_ENDPOINT } from "@constants/routes";
// api services
import { ResourceNodeOperation, ResourceFileUpload } from "@lib/services/resource.service";
import { APIFetcher } from "@lib/services";

const ResourceFormUpload = (props: any) => {
  const hiddenFileInput: any = React.useRef(null);
  const handleClick = (event: any) => {
    if (hiddenFileInput) hiddenFileInput.current.click();
  };

  const [formData, setFormData] = React.useState(props.data);

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
        createFileUploadTree(response);
        setUploadTimerToggle(false);
        setUploadTimer(0);
      })
      .catch((errorData) => {});
  };

  const createFileUploadTree = (assetData: any) => {
    let payload: any = null;
    payload = addFileNodeAsChild(props.data.id, assetData.attributes.name, assetData.asset);

    ResourceNodeOperation(payload)
      .then((response) => {
        mutate(
          RESOURCE_WITH_NODE_ENDPOINT(props.root_node_id),
          APIFetcher(RESOURCE_WITH_NODE_ENDPOINT(props.root_node_id)),
          false
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="p-0 m-0">
        {uploadTimerToggle ? (
          <div style={{ fontSize: "12px" }}>{uploadTimer}%</div>
        ) : (
          <div>
            <Form.Control
              ref={hiddenFileInput}
              type="file"
              onChange={readFile}
              required={true}
              style={{ display: "none" }}
            />
            <div onClick={handleClick}>{props.children}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceFormUpload;
