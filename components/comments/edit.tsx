import React from "react";
// react bootstrap
import { Form, Button } from "react-bootstrap";
// components
import CommentEditor from "./helpers/editor";
import CommentDeleteView from "./delete";
// global imports
import { datePreview, getCurrentUser } from "@constants/global";
// api services
import { MessageUpdate } from "@lib/services/commentService";
// global context provider
import { globalContext } from "@contexts/global";

const CommentEdit = (props: any) => {
  const [globalState, globalDispatch] = React.useContext(globalContext);

  const [previewState, setPreviewState] = React.useState<any>(false);
  const [buttonLoader, setButtonLoader] = React.useState<any>(false);
  const [formData, setFormData] = React.useState<any>(null);
  const handleFromData = (key: any, value: any) => {
    setFormData({ ...formData, [key]: value });
    messageUpdate({ ...formData, [key]: value });
  };

  React.useEffect(() => {
    setFormData({
      ...formData,
      content: props.data.text ? props.data.text : " ",
      is_actionable: props.data.is_actionable ? props.data.is_actionable : false,
      is_accomplished: props.data.is_accomplished ? props.data.is_accomplished : false,
      assigned: props.data.assigned ? props.data.assigned : null,
    });
  }, [props.data]);

  const formSubmit = (event: any) => {
    event.preventDefault();
    setButtonLoader(true);

    const payload = {
      id: props.data.id ? props.data.id : "",
      text: formData ? formData.content : " ",
    };
  };

  const messageUpdate = (payloadObject: any) => {
    const payload = { ...payloadObject };
    payload["id"] = props.data.id;
    console.log(payload);
    MessageUpdate(payload)
      .then((response) => {
        setButtonLoader(false);
        globalDispatch({
          type: "ADD_TOAST_ALERT",
          payload: { kind: "success", description: "Message Updated successfully." },
        });
        setPreviewState(false);
      })
      .catch((error) => {
        console.log(error);
        globalDispatch({
          type: "ADD_TOAST_ALERT",
          payload: { kind: "warning", description: "Message not Updated." },
        });
        setButtonLoader(false);
      });
  };

  return (
    <div>
      <Form>
        <div>
          <CommentEditor data={formData} handleData={setFormData} edit={previewState} />
        </div>
        {formData && (
          <div className="content-text">
            <div className="content-text-item">{datePreview(props.data.updated)}</div>
            <div className="content-text-item dot">.</div>
            <div className="content-text-item">
              <Form.Check
                style={{ marginBottom: "-6px" }}
                type={`checkbox`}
                id={`message-edit-is-actionable-${props.data.id}`}
                label={`Actionable`}
                checked={formData.is_actionable}
                onChange={() => handleFromData("is_actionable", !formData.is_actionable)}
              />
            </div>
            {formData.is_actionable && <div className="content-text-item dot">.</div>}
            {formData.is_actionable && (
              <div className="content-text-item">
                <Form.Group className="m-0 p-0" controlId="message-edit-teacher">
                  <Form.Control
                    as="select"
                    value={formData.assigned}
                    onChange={(e) => handleFromData("assigned", e.target.value)}
                    style={{ fontSize: "12px", padding: "4px 8px" }}
                  >
                    <option value="">Select Teachers</option>
                    {props.allUsers &&
                      props.allUsers.length > 0 &&
                      props.allUsers.map((user: any, index: any) => {
                        if (user.role === 1)
                          return (
                            <option key={`${user.id}`} value={user.id}>
                              {user.email}
                            </option>
                          );
                      })}
                  </Form.Control>
                </Form.Group>
              </div>
            )}
            {/* {getCurrentUser() &&
            getCurrentUser().user &&
            getCurrentUser().user.id === props.data.user && (
              <div className="content-text-item dot">.</div>
            )}
          {getCurrentUser() &&
            getCurrentUser().user &&
            getCurrentUser().user.id === props.data.user && (
              <div className="content-text-item">
                {!previewState ? (
                  <Button className="content-button hover" onClick={() => setPreviewState(true)}>
                    Edit
                  </Button>
                ) : (
                  <Button
                    className="content-button hover"
                    disabled={buttonLoader}
                    onClick={formSubmit}
                  >
                    {buttonLoader ? "Updating..." : "Update"}
                  </Button>
                )}
              </div>
            )} */}
            {/* {getCurrentUser() &&
            getCurrentUser().user &&
            getCurrentUser().user.id === props.data.user && (
              <div className="content-text-item dot">.</div>
            )}
          {getCurrentUser() &&
            getCurrentUser().user &&
            getCurrentUser().user.id === props.data.user && (
              <div className="content-text-item">
                <CommentDeleteView data={props.data} url={props.url} />
              </div>
            )} */}
          </div>
        )}
      </Form>
    </div>
  );
};

export default CommentEdit;
