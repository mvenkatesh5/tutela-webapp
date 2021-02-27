import React from "react";
// next imports
import Link from "next/link";
// material icons
import { ArrowBack } from "@styled-icons/boxicons-regular/ArrowBack";
// components
import CommentCreateView from "@components/communication/comments/create";
import CommentEditView from "@components/communication/comments/edit";
import CommentEditor from "./helpers/editor";

// global imports
import { datePreview } from "@constants/global";

const CommentView = (props: any) => {
  const [editorData, setEditorData] = React.useState<any>(false);
  React.useEffect(() => {
    if (props.threadDetail)
      setEditorData({
        ...editorData,
        title: props.threadDetail.title ? props.threadDetail.title : "",
        content:
          props.threadDetail.data && props.threadDetail.data.content
            ? props.threadDetail.data.content
            : [
                {
                  type: "paragraph",
                  children: [{ text: " " }],
                },
              ],
      });
  }, [props.threadDetail]);

  const MessageRenderComponent = ({ data }: any) => {
    const [commentEditToggle, setCommentEditToggle] = React.useState<any>(false);
    const [commentDeleteToggle, setCommentDeleteToggle] = React.useState<any>(false);

    return (
      <>
        <div className="message-item">
          <div className="icon">{data.user_info.substring(0, 1)}</div>
          <div className="content">
            <div className="header">
              <div className="text">{data.user_info}</div>
              <div className="time">{datePreview(data.created)}</div>
              <div className="edit-options">
                {!commentEditToggle && (
                  <div
                    className="edit-item"
                    onClick={() => setCommentEditToggle(!commentEditToggle)}
                  >
                    Edit
                  </div>
                )}
                {!commentDeleteToggle && (
                  <div
                    className="edit-item"
                    onClick={() => setCommentDeleteToggle(!commentDeleteToggle)}
                  >
                    Delete
                  </div>
                )}
              </div>
            </div>
            <div className="message">
              <CommentEditView
                data={data}
                channel_id={props.channel_id}
                thread_id={props.thread_id}
                collapse={props.collapse}
                editToggle={commentEditToggle}
                handleEditToggle={setCommentEditToggle}
                deleteToggle={commentDeleteToggle}
                handleDeleteToggle={setCommentDeleteToggle}
              />
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="comment-default-wrapper">
        {!props.data && !props.dataError ? (
          <div className="comment-content text-center mt- 5 mb-5">Loading.....</div>
        ) : (
          <div className="comment-content">
            {editorData && (
              <div className="header-wrapper">
                {/* <div className="icon">{editorData.title.substring(0, 1)}</div> */}
                <div className="content">
                  <div className="content-heading">{editorData.title}</div>
                  <div className="content-description">
                    <CommentEditor data={editorData} edit={false} />
                  </div>
                </div>
              </div>
            )}
            <div className="message-wrapper">
              {props.data && props.data.length > 0 && (
                <div>
                  {props.data.map((data: any, index: any) => (
                    <MessageRenderComponent data={data} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        <div className="comment-footer">
          <CommentCreateView {...props} collapse={props.collapse} threadView={props.threadView} />
        </div>
      </div>
    </>
  );
};

export default CommentView;
