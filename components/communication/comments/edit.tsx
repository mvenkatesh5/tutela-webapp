import React from "react";
// react bootstrap
import { Button } from "react-bootstrap";
// swr
import { mutate } from "swr";
// components
import CommentEditor from "./helpers/editor";
import CommentDeleteView from "./delete";
// api routes
import { THREAD_WITH_COMMENT_ENDPOINT } from "@constants/routes";
// api services
import { CommentUpdate } from "@lib/services/communicationService";

const CommentsEditView = (props: any) => {
  const [buttonLoader, setButtonLoader] = React.useState<any>(false);
  const [commentData, setCommentData] = React.useState<any>({
    content: null,
  });
  const handleCommentData = (value: any) => {
    setCommentData(value);
  };

  React.useEffect(() => {
    if (props.data) {
      setCommentData({
        ...commentData,
        content:
          props.data.data && props.data.data.content
            ? props.data.data.content
            : [
                {
                  type: "paragraph",
                  children: [{ text: "type your content here." }],
                },
              ],
      });
    }
  }, [props.data]);

  const threadUpdate = (event: any) => {
    event.preventDefault();
    setButtonLoader(true);

    const commentPayload = {
      id: props.data.id,
      data: {
        content: commentData.content,
      },
    };

    CommentUpdate(commentPayload)
      .then((res) => {
        mutate(
          THREAD_WITH_COMMENT_ENDPOINT(props.thread_id),
          async (elements: any) => {
            let index = elements.findIndex((mutateData: any) => mutateData.id === res.id);
            return elements.map((oldElement: any, i: Number) => (i === index ? res : oldElement));
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
          {commentData && commentData.content && (
            <CommentEditor data={commentData} handleData={handleCommentData} edit={true} />
          )}
        </div>
        <div className="right">
          <Button
            variant="outline-primary"
            className="btn-sm"
            onClick={threadUpdate}
            disabled={buttonLoader}
          >
            {buttonLoader ? "Updating..." : "Update"}
          </Button>
        </div>
        <div className="right">
          <CommentDeleteView
            data={props.data}
            channel_id={props.channel_id}
            thread_id={props.thread_id}
          />
        </div>
      </div>
    </div>
  );
};

export default CommentsEditView;
