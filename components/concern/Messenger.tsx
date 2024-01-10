import React from "react";
// icons
import { Send } from "@styled-icons/feather/Send";
// components
import CommentCard from "./CommentCard";
// swr
import { mutate } from "swr";
// api routes
import { COMMENT_WITH_CONCERN_ID_ENDPOINT } from "@constants/routes";
// api services
import { ConcernComment } from "@lib/services/concernService";

const Messenger = ({ concern_id, concernComments, currentUser }: any) => {
  const [comment, setComment] = React.useState("");
  const [buttonLoader, setButtonLoader] = React.useState(false);

  React.useEffect(() => {
    let scrollView = document.getElementById("scroll-into-view");
    if (scrollView) {
      scrollView.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [concernComments]);

  const createComment = () => {
    if (comment && comment.length >= 0) {
      const payload = {
        concern: concern_id,
        data: {
          text: comment,
        },
      };
      setButtonLoader(true);
      ConcernComment.create(payload)
        .then((response) => {
          mutate(
            [COMMENT_WITH_CONCERN_ID_ENDPOINT(concern_id), concern_id],
            async (elements: any) => {
              return [...elements, response];
            },
            false
          );
          setComment("");
          setButtonLoader(false);
        })
        .catch((error) => {
          setButtonLoader(false);
        });
    } else {
      console.log("no data");
    }
  };

  const deleteComment = (comment: any) => {
    const payload = {
      concern: concern_id,
      comment: comment,
    };
    ConcernComment.delete(payload)
      .then((res) => {
        mutate(
          [COMMENT_WITH_CONCERN_ID_ENDPOINT(concern_id), concern_id],
          async (elements: any) => {
            return elements.filter((element: any) => element.id !== comment);
          },
          false
        );
      })
      .catch((errors) => {
        console.log(errors);
      });
  };

  return (
    <div className="position-relative border border-2 h-100 w-100 rounded-2">
      {/* comment section */}
      <div className="position-relative tw-h-5/6 tw-w-full tw-space-y-8 px-4 mt-4 tw-overflow-auto">
        {concernComments && concernComments.length > 0 ? (
          <>
            {concernComments &&
              concernComments.map((data: any, index: any) => (
                <div key={`replies-index-${index} `}>
                  <CommentCard
                    currentUser={currentUser}
                    data={data}
                    deleteComment={deleteComment}
                  />
                </div>
              ))}
            <div id="scroll-into-view"></div>
          </>
        ) : (
          <div className="text-center py-5">No comments are available.</div>
        )}
      </div>
      {/* write section */}
      <div className="position-relative tw-h-1/6 tw-bottom-0 d-flex justify-content-center align-items-center">
        <div className="comment-input-wrapper d-flex align-items-center bg-light mx-3 ">
          <textarea
            rows={1}
            value={comment}
            onChange={(e: any) => setComment(e.target.value)}
            placeholder="Write something..."
            className="w-100 input bg-light"
            disabled={buttonLoader}
          />
          <button onClick={createComment} disabled={buttonLoader} className="text-button">
            <Send className="flex-shrink-0" width="20px" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Messenger;
