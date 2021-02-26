import React from "react";
// react bootstrap
import { Button } from "react-bootstrap";
// swr
import { mutate } from "swr";
// components
import CommentEditor from "./helpers/editor";
import CommentDeleteView from "./delete";
// api routes
import {
  THREAD_WITH_COMMENT_ENDPOINT,
  CHANNEL_WITH_THREAD_COLLAPSE_ENDPOINT,
} from "@constants/routes";
// api services
import { CommentUpdate } from "@lib/services/communicationService";
import { APIFetcher } from "@lib/services";

const CommentsEditView = (props: any) => {
  const [slateEditorEditToggle, setSlateEditorEditToggle] = React.useState<any>(false);
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
                  children: [{ text: "" }],
                },
                {
                  type: "paragraph",
                  children: [{ text: "" }],
                },
                {
                  type: "paragraph",
                  children: [{ text: "" }],
                },
                {
                  type: "paragraph",
                  children: [{ text: "" }],
                },
                {
                  type: "paragraph",
                  children: [{ text: "" }],
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
        if (!props.collapse)
          mutate(
            THREAD_WITH_COMMENT_ENDPOINT(props.thread_id),
            async (elements: any) => {
              let index = elements.findIndex((mutateData: any) => mutateData.id === res.id);
              return elements.map((oldElement: any, i: Number) => (i === index ? res : oldElement));
            },
            false
          );
        else
          mutate(
            CHANNEL_WITH_THREAD_COLLAPSE_ENDPOINT(props.channel_id),
            APIFetcher(CHANNEL_WITH_THREAD_COLLAPSE_ENDPOINT(props.channel_id)),
            false
          );
        setButtonLoader(false);
        setSlateEditorEditToggle(false);
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
            <div>
              {slateEditorEditToggle ? (
                <CommentEditor
                  data={commentData}
                  handleData={handleCommentData}
                  edit={slateEditorEditToggle}
                />
              ) : (
                <CommentEditor
                  data={commentData}
                  handleData={handleCommentData}
                  edit={slateEditorEditToggle}
                />
              )}
            </div>
          )}
        </div>
        <div className="right comment">
          <div>
            {slateEditorEditToggle ? (
              <Button
                variant="outline-primary border-0 p-0"
                className="btn-sm slate-buttons"
                onClick={threadUpdate}
                disabled={buttonLoader}
              >
                {buttonLoader ? "Updating..." : "Update"}
              </Button>
            ) : (
              <Button
                variant="outline-primary border-0 p-0"
                className="btn-sm slate-buttons"
                onClick={() => setSlateEditorEditToggle(!slateEditorEditToggle)}
              >
                Edit
              </Button>
            )}
          </div>
          <div>
            <CommentDeleteView
              data={props.data}
              channel_id={props.channel_id}
              thread_id={props.thread_id ? props.thread_id : null}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentsEditView;
