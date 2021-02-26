// components
import CommentCreateView from "@components/communication/comments/create";
import CommentEditView from "@components/communication/comments/edit";
// global imports
import { datePreview } from "@constants/global";

const CommentView = (props: any) => {
  return (
    <>
      <div className="comment-root-wrapper">
        <div className="comment-detail-wrapper">
          {props.data && props.data.length > 0 ? (
            <div className="h-100">
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
