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
  React.useEffect(() => {
    setFormData({ ...formData, content: props.data.text ? props.data.text : " " });
  }, [props.data]);

  const formSubmit = (event: any) => {
    event.preventDefault();
    setButtonLoader(true);

    const payload = {
      id: props.data.id ? props.data.id : "",
      text: formData ? formData.content : " ",
    };

    MessageUpdate(payload)
      .then((response) => {
        setButtonLoader(false);
        globalDispatch({
          type: "ADD_TOAST_ALERT",
          payload: { kind: "success", description: "Comment Updated successfully." },
        });
        setPreviewState(false);
      })
      .catch((error) => {
        console.log(error);
        globalDispatch({
          type: "ADD_TOAST_ALERT",
          payload: { kind: "warning", description: "Comment not Updated." },
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
        <div className="content-text">
          <div className="content-text-item">{datePreview(props.data.updated)}</div>
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
      </Form>
    </div>
  );
};

export default CommentEdit;
