import React from "react";
// swr
import useSWR from "swr";
// components
import CommentEditView from "./edit";
// api routes
import { USER_MESSAGE_WITH_STUDENT_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services/index";
// components
import CommentCreate from "./create";

const CommentView = (props: any) => {
  const defaultImageUrl =
    "https://www.searchpng.com/wp-content/uploads/2019/02/Profile-PNG-Icon.png";

  const { data: commentDetail, error: commentDetailError } = useSWR(
    props.userId ? USER_MESSAGE_WITH_STUDENT_ENDPOINT(props.userId) : null,
    (url) => APIFetcher(url),
    { refreshInterval: 0 }
  );

  const commentBottomScroll = () => {
    let scrollElement = document.getElementById("messages");
    if (scrollElement) {
      let scrollElementHeight = scrollElement.scrollHeight;
      if (scrollElementHeight > 0) {
        scrollElement.scrollTo(0, scrollElementHeight + 1000);
      }
    }
  };
  React.useEffect(() => {
    if (commentDetail) commentBottomScroll();
  }, [commentDetail]);

  if (!commentDetail) return <div>Loading...</div>;

  if (commentDetailError) console.log(commentDetailError);

  return (
    <div className="user-comments-root-wrapper">
      <div className="messages" id="messages">
        {commentDetail && commentDetail.length > 0 ? (
          <>
            {commentBottomScroll()}
            {commentDetail.map((comment: any, index: any) => (
              <div className="message-item" key={`user-comment-${comment.id}`}>
                <div className="icon">
                  <img className="rounded-circle img-fluid" src={defaultImageUrl} />
                </div>
                <div className="content">
                  {/* <div className="content-user">{renderUserName(comment.user)}</div> */}
                  <CommentEditView data={comment} currentUserDetail={props.currentUserDetail} />
                </div>
              </div>
            ))}
          </>
        ) : (
          <div>No messages are available...</div>
        )}
      </div>
      <div className="editor">
        <CommentCreate {...props} />
      </div>
    </div>
  );
};

export default CommentView;
