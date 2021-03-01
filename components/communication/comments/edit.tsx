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
  React.useEffect(() => {
    setSlateEditorEditToggle(props.editToggle);
  }, [props.editToggle]);

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

      {slateEditorEditToggle && (
        <div className="mt-2">
          <Button
            variant="outline-secondary"
            className="btn-sm me-2"
            onClick={() => props.handleEditToggle(false)}
          >
            Close
          </Button>
          <Button
            variant="outline-primary"
            className="btn-sm"
            onClick={threadUpdate}
            disabled={buttonLoader}
          >
            {buttonLoader ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      )}

      <CommentDeleteView
        data={props.data}
        channel_id={props.channel_id}
        thread_id={props.thread_id ? props.thread_id : null}
        deleteToggle={props.deleteToggle}
        handleDeleteToggle={props.handleDeleteToggle}
      />
    </div>
  );
};

export default CommentsEditView;
