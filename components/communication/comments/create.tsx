import React from "react";
// react bootstrap
import { Button } from "react-bootstrap";
// swr
import { mutate } from "swr";
// components
import CommentEditor from "./helpers/editor";
// api routes
import {
  THREAD_WITH_COMMENT_ENDPOINT,
  CHANNEL_WITH_THREAD_COLLAPSE_ENDPOINT,
} from "@constants/routes";
// api services
import { ThreadWithCommentCreate } from "@lib/services/communicationService";
import { APIFetcher } from "@lib/services";

const CommentsCreateView = (props: any) => {
  const [buttonLoader, setButtonLoader] = React.useState<any>(false);
  const [commentData, setCommentData] = React.useState<any>({
    content: [
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
        if (!props.collapse)
          mutate(
            THREAD_WITH_COMMENT_ENDPOINT(props.thread_id),
            async (elements: any) => {
              return [...elements, res];
            },
            false
          );
        else
          mutate(
            CHANNEL_WITH_THREAD_COLLAPSE_ENDPOINT(props.channel_id),
            APIFetcher(CHANNEL_WITH_THREAD_COLLAPSE_ENDPOINT(props.channel_id)),
            false
          );
        handleCommentData({
          ...commentData,
          content: [
            {
              type: "paragraph",
              children: [{ text: "Type content here..." }],
            },
          ],
        });
        setButtonLoader(false);
      })
      .catch((errors) => {
        console.log(errors);
        setButtonLoader(false);
      });
  };

  return (
    <div>
      <CommentEditor data={commentData} handleData={handleCommentData} edit={true} />
      <Button
        variant="primary"
        className="btn-sm mt-2"
        onClick={threadCreate}
        disabled={buttonLoader}
      >
        {buttonLoader ? "Replying..." : "Reply"}
      </Button>
    </div>
  );
};

export default CommentsCreateView;
