import React from "react";
// react-bootstrap
import { Image } from "react-bootstrap";
// icons
import { Send } from "@styled-icons/feather/Send";
import { DeleteOutline } from "@styled-icons/material-rounded/DeleteOutline";
// components
import CommentCard from "./CommentCard";
// swr
import useSWR from "swr";
import { mutate } from "swr";
// api routes
import { CONCERNS_WITH_ID_COMMENT_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";
import { ConcernCommentCreate, ConcernCommentDelete } from "@lib/services/concernService";

const Messenger = ({ concernId }: any) => {
  const { data: productsList, error: productsListError } = useSWR(
    concernId && concernId ? [CONCERNS_WITH_ID_COMMENT_ENDPOINT(concernId), concernId] : null,
    (url) => APIFetcher(url)
  );

  const [comment, setComment] = React.useState("");
  const [buttonLoader, setButtonLoader] = React.useState(false);
  const sendComment = () => {
    const payload = {
      id: concernId,
      data: {
        text: comment,
      },
    };
    if (comment && comment.length >= 0) {
      setButtonLoader(true);
      ConcernCommentCreate(payload)
        .then((response) => {
          mutate(
            CONCERNS_WITH_ID_COMMENT_ENDPOINT(concernId),
            APIFetcher(CONCERNS_WITH_ID_COMMENT_ENDPOINT(concernId)),
            false
          );
          console.log("response", response);
          setComment("");
          setButtonLoader(false);
        })
        .catch((error) => {
          console.log("error", error);
          setButtonLoader(false);
        });
    } else {
      console.log("no data");
    }
  };

  const deleteComment = (commentId: any) => {
    const payload = {
      id: concernId,
      reply_id: commentId,
    };
    ConcernCommentDelete(payload)
      .then((res) => {})
      .catch((errors) => {
        console.log(errors);
      });
  };
  return (
    <div className="border rounded mt-5 d-flex flex-column p-3 pb-0 h-100">
      {!productsList || productsListError ? (
        <div className="text-center">loading...</div>
      ) : (
        <div className="overflow-auto">
          {productsList && productsList.length > 0 ? (
            <>
              {productsList &&
                productsList.map((data: any, index: any) => (
                  <div key={`replies-index-${index} `}>
                    <CommentCard data={data} deleteComment={deleteComment} />
                  </div>
                ))}
            </>
          ) : (
            <div className="text-center"> No comments available</div>
          )}
        </div>
      )}
      <div className="mt-auto comment-input-wrapper d-flex align-items-center bg-light">
        <textarea
          rows={3}
          value={comment}
          onChange={(e: any) => setComment(e.target.value)}
          placeholder="Write something..."
          className="w-100 input bg-light"
        />
        <button onClick={sendComment} disabled={buttonLoader} className="text-button">
          <Send className="flex-shrink-0" width="20px" />
        </button>
      </div>
    </div>
  );
};

export default Messenger;
