import React from "react";
// react bootstrap
import { Form, Button } from "react-bootstrap";
// swr
import { mutate } from "swr";
// components
import CommentEditor from "./helpers/editor";
// global imports
import { getCurrentUser } from "@constants/global";
// api routes
import { USER_MESSAGE_WITH_STUDENT_ENDPOINT } from "@constants/routes";
// api services
import { MessageCreate } from "@lib/services/commentService";
// global context provider
import { globalContext } from "@contexts/global";

const CommentCreate = (props: any) => {
  const [globalState, globalDispatch] = React.useContext(globalContext);

  const [buttonLoader, setButtonLoader] = React.useState<any>(false);
  const [formData, setFormData] = React.useState<any>(null);

  console.log(getCurrentUser());

  const formSubmit = (event: any) => {
    event.preventDefault();
    setButtonLoader(true);

    const payload = {
      text: formData ? formData.content : " ",
      student: props.userId,
      user: getCurrentUser() && getCurrentUser().user && getCurrentUser().user.id,
    };

    MessageCreate(payload)
      .then((response) => {
        setButtonLoader(false);
        globalDispatch({
          type: "ADD_TOAST_ALERT",
          payload: { kind: "success", description: "Comment Added successfully." },
        });
        setFormData({ content: "" });
        mutate(
          USER_MESSAGE_WITH_STUDENT_ENDPOINT(props.userId),
          async (elements: any) => {
            return [...elements, response];
          },
          false
        );
      })
      .catch((error) => {
        console.log(error);
        globalDispatch({
          type: "ADD_TOAST_ALERT",
          payload: { kind: "warning", description: "Comment not added." },
        });
        setButtonLoader(false);
      });
  };

  return (
    <div>
      <Form onSubmit={formSubmit}>
        <div className="d-flex align-items-center">
          <div className="w-100 me-3">
            <CommentEditor data={formData} handleData={setFormData} edit={true} />
          </div>
          <div>
            <Button type="submit" className="btn-sm mt-2" disabled={buttonLoader}>
              {buttonLoader ? "Sending..." : "Send"}
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default CommentCreate;
