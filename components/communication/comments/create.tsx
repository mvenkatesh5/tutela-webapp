import React from "react";
// react bootstrap
import { Button } from "react-bootstrap";
// swr
import { mutate } from "swr";
// components
import CommentEditor from "./helpers/editor";
// api routes
import { THREAD_WITH_COMMENT_ENDPOINT } from "@constants/routes";
// api services
import { ThreadWithCommentCreate } from "@lib/services/communicationService";

const CommentsCreateView = (props: any) => {
  const [buttonLoader, setButtonLoader] = React.useState<any>(false);
  const [commentData, setCommentData] = React.useState<any>({
    content: [
      {
        type: "paragraph",
        children: [{ text: "Type content here..." }],
      },
    ],
  });
  const handleCommentData = (value: any) => {
    setCommentData(value);
  };

  const threadCreate = (event: any) => {
    event.preventDefault();
    setButtonLoader(true);

    const commentPayload = {
      title: "Comment Section",
      data: {
        content: commentData.content,
      },
      thread: props.thread_id,
    };

    ThreadWithCommentCreate(commentPayload)
      .then((res) => {
        mutate(
          THREAD_WITH_COMMENT_ENDPOINT(props.thread_id),
          async (elements: any) => {
            return [...elements, res];
          },
          false
        );
        setButtonLoader(false);
      })
      .catch((errors) => {
        console.log(errors);
        setButtonLoader(false);
      });
  };

  return (
    <div>
      <div className="slate-editor-wrapper">
        <div className="left">
          <CommentEditor data={commentData} handleData={handleCommentData} edit={true} />
        </div>
        <div className="right">
          <Button
            variant="primary"
            className="btn-sm"
            onClick={threadCreate}
            disabled={buttonLoader}
          >
            {buttonLoader ? "Sending..." : "Send"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentsCreateView;
