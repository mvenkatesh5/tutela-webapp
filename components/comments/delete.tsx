import React from "react";
// react bootstrap
import { Form, Button } from "react-bootstrap";
// swr
import { mutate } from "swr";
// api services
import { MessageDelete } from "@lib/services/commentService";
// global context provider
import { globalContext } from "@contexts/global";

const CommentDelete = (props: any) => {
  const [globalState, globalDispatch] = React.useContext(globalContext);
  const [buttonLoader, setButtonLoader] = React.useState<any>(false);

  const formSubmit = (event: any) => {
    event.preventDefault();
    setButtonLoader(true);
    MessageDelete(props.data.id)
      .then((response) => {
        setButtonLoader(false);
        globalDispatch({
          type: "ADD_TOAST_ALERT",
          payload: { kind: "success", description: "Comment Deleted successfully." },
        });
        mutate(
          props.url,
          async (elements: any) => {
            let index = elements.findIndex((mutateData: any) => mutateData.id === props.data.id);
            return elements.filter((_: any, i: any) => i != index);
          },
          false
        );
      })
      .catch((error) => {
        console.log(error);
        globalDispatch({
          type: "ADD_TOAST_ALERT",
          payload: { kind: "warning", description: "Comment not Deleted." },
        });
        setButtonLoader(false);
      });
  };

  return (
    <div>
      <Form>
        <Button className="content-button hover" onClick={formSubmit} disabled={buttonLoader}>
          {buttonLoader ? "Deleting..." : "Delete"}
        </Button>
      </Form>
    </div>
  );
};

export default CommentDelete;
