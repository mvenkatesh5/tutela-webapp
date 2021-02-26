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
        content:
          props.threadDetail.data && props.threadDetail.data.content
            ? props.threadDetail.data.content
            : [
                {
                  type: "paragraph",
                  children: [{ text: "" }],
                },
              ],
      });
  }, [props.threadDetail]);

  return (
    <>
      <div className="comment-root-wrapper">
        <div className="comment-detail-wrapper">
          {props.data && props.data.length > 0 ? (
            <div className="h-100">
              <div>
                {editorData && (
                  <div className="channel-thread-heading comment">
                    <div className="icon">
                      <Link href={`/channels/${props.channel_id}`}>
                        <a>
                          <ArrowBack width="20" />
                        </a>
                      </Link>
                    </div>
                    <div className="heading">
                      {editorData && <CommentEditor data={editorData} edit={false} />}
                    </div>
                  </div>
                )}
              </div>

              {props.data.map((data: any, index: any) => (
                <div className="mb-3">
                  <div key={`channels-comment-view-${data.id}`} className="comment-user-wrapper">
                    <div className="user-header">
                      <div className="icon">
                        <img src={`/bird.svg`} />
                      </div>
                      <div className="title">
                        {data.user_info}
                        <div className="date">{datePreview(data.created)}</div>
                        <div className="user-content">
                          <CommentEditView
                            data={data}
                            channel_id={props.channel_id}
                            thread_id={props.thread_id}
                            collapse={props.collapse}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center mt-5 mb-5">No Comments are available.</div>
          )}
        </div>
        <div className="comment-create-wrapper">
          <CommentCreateView {...props} collapse={props.collapse} />
        </div>
      </div>
    </>
  );
};

export default CommentView;
